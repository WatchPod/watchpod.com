import { NextRequest, NextResponse } from "next/server";

const APP_STORE_URL = "https://apps.apple.com/app/watchpod/id6761643517";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.watchpod.android";

/**
 * Share links that carry a payload in the path and must survive an App Store
 * install on iOS: /collections/<id> and /invite/<code>.
 *
 * The trailing `[^/]` requires a non-empty second segment, so the bare
 * /invite?code=... pod-invite URL does NOT match and keeps its existing
 * straight-to-store behaviour.
 */
const SHARE_LINK_PATTERN = /^\/(collections|invite)\/[^/]/;

// Universal Links / App Links intercept these paths at the OS level when the
// app is installed (see the intent-filters / associated-domains entitlements
// in the Android and iOS repos), so a request only reaches this proxy
// when the app isn't installed. Send the visitor to the right store based on
// device OS; desktop/other visitors have no app to install, so send them home.
export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);
  const isAndroid = /android/i.test(userAgent);
  const pathname = request.nextUrl.pathname;

  if (isAndroid) {
    // Referral codes arrive as /invite/<code> (path segment) — distinct from
    // the pod-invite /invite?code=<code> (query param) case, which keeps its
    // existing behavior untouched. Embed the code in Play Store's referrer
    // param so the Play Install Referrer API can read it back after install.
    const inviteCode = pathname.startsWith("/invite/")
      ? pathname.slice("/invite/".length)
      : null;
    // Same trick for /collections/<id> so the app can open the collection the
    // user tapped once it is installed.
    const collectionId = pathname.startsWith("/collections/")
      ? pathname.slice("/collections/".length).split("/")[0]
      : null;

    const referrer = inviteCode
      ? `code=${inviteCode}`
      : collectionId
        ? `collection_id=${collectionId}`
        : null;

    const destination = referrer
      ? `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer)}`
      : PLAY_STORE_URL;
    return NextResponse.redirect(destination);
  }

  // iOS has no deferred deep linking and no install referrer, so redirecting
  // straight to the App Store loses the collection id / referral code for good:
  // a redirect renders no HTML, so no script ever runs to save it anywhere.
  //
  // Serve the home page AT THIS URL instead (a rewrite, not a redirect, so the
  // address bar keeps /collections/42). The store button then copies
  // location.href inside its click handler — the only moment Safari permits a
  // clipboard write — and the app reads it back on first launch. See the
  // deferred-link script in app/layout.tsx.
  //
  // NOTE: must be rewrite(). There is no route at /collections/<id>, so
  // NextResponse.next() would 404.
  if (isIOS && SHARE_LINK_PATTERN.test(pathname)) {
    const response = NextResponse.rewrite(new URL("/", request.url));
    // These URLs now serve home-page content under unbounded paths; keep them
    // out of the index so they don't read as duplicate content.
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  const destination = isIOS ? APP_STORE_URL : new URL("/", request.url);

  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ["/invite", "/invite/:path*", "/collections/:path*"],
};
