import { useI18n } from "@/lib/i18n";

interface LogoProps {
  className?: string;
  inverted?: boolean;
  compact?: boolean;
  size?: "sm" | "md" | "lg";
}

export function DubaiDentalLogo({ className = "", inverted = false, compact = false, size = "md" }: LogoProps) {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const primaryBlue = inverted ? "#60A5FA" : "#0B4FC7";
  const goldAccent = inverted ? "#F6D89B" : "#C2A06A";
  const navyText = inverted ? "#FFFFFF" : "#0B1B3A";
  const captionColor = inverted ? "#93C5FD" : "#4A7CD2";

  const pxSize = size === "sm" ? 34 : size === "lg" ? 48 : 40;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Premium Emblem with Crown & Tooth Motif */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={pxSize}
          height={pxSize}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Subtle Outer Shield Glow */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="12"
            fill={inverted ? "rgba(255,255,255,0.08)" : "rgba(11,79,199,0.06)"}
            stroke={inverted ? "rgba(255,255,255,0.15)" : "rgba(11,79,199,0.18)"}
            strokeWidth="1.5"
          />

          {/* Royal Dental Crown Top */}
          <path
            d="M13 14L16.5 17L22 12L27.5 17L31 14V19H13V14Z"
            fill={goldAccent}
            opacity="0.9"
          />

          {/* Stylized Sculptural Tooth Geometry */}
          <path
            d="M15 20C15 17.5 18 17 22 17C26 17 29 17.5 29 20C29 24.5 27.5 28 26.5 31.5C25.5 35 24 35.5 22 34C20 35.5 18.5 35 17.5 31.5C16.5 28 15 24.5 15 20Z"
            stroke={primaryBlue}
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill={inverted ? "rgba(96,165,250,0.12)" : "rgba(11,79,199,0.08)"}
          />

          {/* Internal Enamel Contour */}
          <path
            d="M19 23C19 21.5 20.2 20.5 22 20.5C23.8 20.5 25 21.5 25 23C25 26 23.5 28.5 22 30C20.5 28.5 19 26 19 23Z"
            stroke={goldAccent}
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Sparkle of Brilliance */}
          <circle cx="28.5" cy="15.5" r="1.5" fill={goldAccent} />
        </svg>
      </div>

      {/* Brand Wordmark & Typography */}
      <div className="flex flex-col text-start leading-none">
        {isAr ? (
          <div className="flex flex-col">
            <span
              className="font-bold text-lg sm:text-xl tracking-tight"
              style={{ color: navyText }}
            >
              مركز دبي لطب الأسنان
            </span>
            {!compact && (
              <span
                className="text-[10px] sm:text-[11px] font-semibold tracking-wider mt-1"
                style={{ color: captionColor }}
              >
                الهرم · زراعة · تقويم · تجميل
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <span
              className="font-bold text-lg sm:text-xl tracking-tight font-sans"
              style={{ color: navyText }}
            >
              Dubai Dental Clinic
            </span>
            {!compact && (
              <span
                className="text-[9.5px] font-bold tracking-[0.2em] mt-1 uppercase font-sans"
                style={{ color: captionColor }}
              >
                Al-Haram · Giza
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Re-export as UtopiaLogo for backward compatibility across existing views
export const UtopiaLogo = DubaiDentalLogo;
