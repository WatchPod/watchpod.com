const APP_STORE_URL: string | null = null;
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.watchpod.android";

interface StoreButtonsProps {
  className?: string;
}

export function StoreButtons({ className = "" }: StoreButtonsProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${className}`}
    >
      {APP_STORE_URL && (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl bg-black hover:bg-noir-800 border border-white/10 hover:border-white/20 px-5 py-3 transition-colors w-56"
          aria-label="Download on the App Store"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white shrink-0"
            aria-hidden="true"
          >
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[10px] text-white/60 uppercase tracking-wide">
              Download on the
            </span>
            <span className="text-lg font-semibold text-white -mt-0.5">
              App Store
            </span>
          </div>
        </a>
      )}

      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-xl bg-black hover:bg-noir-800 border border-white/10 hover:border-white/20 px-5 py-3 transition-colors w-56"
        aria-label="Get it on Google Play"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 512 512"
          className="shrink-0"
          aria-hidden="true"
        >
          <path
            fill="#00D2FF"
            d="M22.5 20.5C15.5 27.5 12 37.5 12 50v412c0 12.5 3.5 22.5 10.5 29.5L308 256 22.5 20.5z"
          />
          <path
            fill="#FFD400"
            d="M394.5 351L308 256l86.5-95 106.7 61.8c15.3 8.7 15.3 30.7 0 39.4L394.5 351z"
          />
          <path
            fill="#FF3A44"
            d="M394.5 351L308 256 22.5 491.5C29.5 498.5 43 500 60.5 490l334-139z"
          />
          <path
            fill="#00E676"
            d="M394.5 161L60.5 22C43 12 29.5 13.5 22.5 20.5L308 256l86.5-95z"
          />
        </svg>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] text-white/60 uppercase tracking-wide">
            Get it on
          </span>
          <span className="text-lg font-semibold text-white -mt-0.5">
            Google Play
          </span>
        </div>
      </a>
    </div>
  );
}
