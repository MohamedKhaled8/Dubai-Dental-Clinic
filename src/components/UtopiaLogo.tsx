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

  const toothColor = "#2ABFBF";
  const darkText = inverted ? "#FFFFFF" : "#1a1a2e";
  const captionColor = inverted ? "#7de8e8" : "#2ABFBF";

  const scale = size === "sm" ? 0.72 : size === "lg" ? 1.2 : 0.95;
  const toothW = Math.round(60 * scale);
  const toothH = Math.round(72 * scale);

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Real Dubai Dental Tooth Icon */}
      <svg
        width={toothW}
        height={toothH}
        viewBox="0 0 60 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Main teal tooth body */}
        <path
          d="M30 3C22 3 17 8 13 8C10 8 7 6 4 6C4 22 7 32 10 44C12 52 14 62 18 67C20.5 70.5 24 71 27 68C28.5 66 29 64 30 64C31 64 31.5 66 33 68C36 71 39.5 70.5 42 67C46 62 48 52 50 44C53 32 56 22 56 6C53 6 50 8 47 8C43 8 38 3 30 3Z"
          fill={inverted ? "rgba(42,191,191,0.18)" : "rgba(42,191,191,0.12)"}
          stroke={toothColor}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Top cusp details */}
        <path d="M13 8C13 8 16 4 20 4" stroke={toothColor} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        <path d="M47 8C47 8 44 4 40 4" stroke={toothColor} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        {/* Inner enamel line */}
        <path d="M22 30C22 26 25 24 30 24C35 24 38 26 38 30" stroke={toothColor} strokeWidth="1.6" strokeLinecap="round" opacity="0.5"/>
      </svg>

      {/* Brand text */}
      <div className="flex flex-col leading-none">
        {isAr ? (
          <div className="flex flex-col gap-0.5">
            <span
              className="font-bold tracking-tight"
              style={{
                color: darkText,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: size === "sm" ? "15px" : size === "lg" ? "22px" : "18px",
                fontStyle: "italic",
              }}
            >
              مركز دبي لطب الأسنان
            </span>
            {!compact && (
              <span
                className="font-semibold tracking-wide"
                style={{
                  color: captionColor,
                  fontSize: size === "sm" ? "9px" : "10.5px",
                }}
              >
                د. كريم كمال · الهرم · الجيزة
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            {/* Dubai + ental stacked to mimic logo */}
            <div className="flex items-baseline gap-0" style={{ lineHeight: 1.05 }}>
              <span
                style={{
                  color: darkText,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: size === "sm" ? "15px" : size === "lg" ? "22px" : "18px",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                Dubai
              </span>
            </div>
            <div style={{ lineHeight: 1.05 }}>
              <span
                style={{
                  color: toothColor,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: size === "sm" ? "15px" : size === "lg" ? "22px" : "18px",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                ental
              </span>
            </div>
            {!compact && (
              <div className="flex items-center gap-1 mt-0.5">
                <div style={{ width: "18px", height: "1px", backgroundColor: darkText, opacity: 0.5 }} />
                <span
                  style={{
                    color: darkText,
                    fontSize: "7.5px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    opacity: 0.75,
                  }}
                >
                  Dr. Karim Kamal
                </span>
                <div style={{ width: "18px", height: "1px", backgroundColor: darkText, opacity: 0.5 }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Re-export as UtopiaLogo for backward compatibility across existing views
export const UtopiaLogo = DubaiDentalLogo;
