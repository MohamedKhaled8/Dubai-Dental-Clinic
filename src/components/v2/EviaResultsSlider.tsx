import React, { useState, useRef, useCallback } from "react";
import { Sparkles, ArrowLeftRight, CheckCircle2 } from "lucide-react";

interface EviaResultsSliderProps {
  isAr: boolean;
  onOpenBooking: (service?: string) => void;
  caseData?:
    | {
        beforeImage?: string;
        afterImage?: string;
        titleEn?: string;
        titleAr?: string;
      }
    | undefined;
}

export function EviaResultsSlider({ isAr, onOpenBooking, caseData }: EviaResultsSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeImg = caseData?.beforeImage || "https://framerusercontent.com/images/E5VtCUtG8dUklZWKGgyK4GdtDA.png";
  const afterImg = caseData?.afterImage || "https://framerusercontent.com/images/Oqy9319b2uv11O0YWGDDUoh5c.png";


  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = Math.max(0, Math.min(100, (clampedX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section id="results" className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 evia-reveal-item">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? "النتائج الحقيقية" : "Real Results"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              {isAr ? "شاهد الفرق بنفسك" : "See the difference for yourself"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "اسحب المقبض في أي اتجاه لرؤية النتيجة الفورية قبل وبعد العلاج مباشرة بدون أي تأخير."
              : "Drag the slider in real-time to compare the immediate transformation before and after treatment."}
          </p>
        </div>

        {/* Interactive Comparison Card Container */}
        <div className="bg-white rounded-[28px] border border-[#E5E5E5] p-4 sm:p-7 shadow-xs">
          <div
            ref={containerRef}
            className="relative h-[380px] sm:h-[520px] md:h-[600px] rounded-[22px] overflow-hidden select-none cursor-ew-resize bg-[#F7F7F7] touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* After Image (Full Background) */}
            <img
              src={afterImg}
              alt="After Smile Transformation"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              loading="eager"
              decoding="async"
            />

            {/* Before Image (Clipped Overlay with Instant ClipPath) */}
            <div
              className="absolute inset-0 pointer-events-none select-none will-change-[clip-path]"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={beforeImg}
                alt="Before Smile Transformation"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none will-change-transform"
              style={{
                left: `${sliderPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              {/* Vertical line */}
              <div className="w-[3px] h-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]" />

              {/* Floating Circular Handle */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-[#111827] shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex items-center justify-center border-2 border-white pointer-events-none transition-transform duration-100 ${
                  isDragging ? "scale-115 ring-4 ring-[#0069D9]/30" : "scale-100"
                }`}
              >
                <ArrowLeftRight className="w-5 h-5 text-[#0069D9]" />
              </div>
            </div>

            {/* Pill Labels (Before & After) */}
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase border border-white/20 shadow-md">
                {isAr ? "قبل العلاج" : "Before"}
              </span>
            </div>
            <div className="absolute top-5 right-5 z-20 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0069D9]/85 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase border border-white/30 shadow-md">
                {isAr ? "بعد العلاج" : "After"}
              </span>
            </div>

            {/* Bottom Floating Note Pill */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
              <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/95 text-xs font-medium border border-white/15 shadow-sm">
                {isAr ? "حالة حقيقية: عدسات فينير خزفية — جلستان فقط" : "Real Case: Full Arch Ceramic Veneers · 2 Visits"}
              </div>
            </div>
          </div>

          {/* Clinical Highlights Strip */}
          <div className="mt-6 pt-5 border-t border-[#F0F0F0] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#4B5563]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0069D9]" />
                <span className="font-semibold">{isAr ? "خطة علاج مخصصة" : "Bespoke Ceramic Lab Work"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0069D9]" />
                <span className="font-semibold">{isAr ? "بدون برد مفرط للمينا" : "Minimally Invasive Prep"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0069D9]" />
                <span className="font-semibold">{isAr ? "ضمان ابتسامة 10 سنوات" : "10-Year Clinical Warranty"}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking(isAr ? "تصميم الابتسامة (فينير)" : "Complete Smile Makeover")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0069D9] hover:bg-[#0055b3] text-white text-xs font-bold transition-all shadow-xs hover:scale-102 active:scale-98"
            >
              <span>{isAr ? "احجز استشارة ابتسامتك" : "Book your smile consultation"}</span>
              <span className={isAr ? "rotate-180" : ""}>↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
