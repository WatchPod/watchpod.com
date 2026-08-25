import { NextRequest, NextResponse } from "next/server";

const APP_STORE_URL = "https://apps.apple.com/app/watchpod/id6761643517";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.watchpod.android";

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
    const destination = inviteCode
      ? `${PLAY_STORE_URL}&referrer=${encodeURIComponent(`code=${inviteCode}`)}`
      : PLAY_STORE_URL;
    return NextResponse.redirect(destination);
  }

  const destination = isIOS ? APP_STORE_URL : new URL("/", request.url);

  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ["/invite", "/invite/:path*", "/collections/:path*"],
};
