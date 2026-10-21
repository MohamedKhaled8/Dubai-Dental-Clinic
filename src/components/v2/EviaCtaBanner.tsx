import React from "react";

interface EviaCtaBannerProps {
  isAr: boolean;
  onOpenBooking: () => void;
}

export function EviaCtaBanner({ isAr, onOpenBooking }: EviaCtaBannerProps) {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Main CTA Card with Framer deep royal blue and halftone watermark */}
        <div className="relative rounded-[28px] overflow-hidden bg-[#005bb7] text-white p-10 sm:p-20 md:p-24 shadow-2xl flex flex-col items-center justify-center text-center">
          {/* Subtle Halftone Matrix Watermark Overlay matching Screenshot 5 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.14] select-none overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Large Monogram Ambient Watermark */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.07] select-none text-[320px] font-black leading-none text-white blur-[1px]">
            G
          </div>

          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            {/* Top Pill */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-6 shadow-xs">
              <span>{isAr ? "ابتسامتك في انتظارك" : "Your smile awaits"}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-5 text-white">
              {isAr ? "جاهز لاتخاذ الخطوة التالية؟" : "Ready to take the next step?"}
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal mb-8 max-w-lg">
              {isAr
                ? "احجز موعدك ودعنا نصمم لك خطة علاجية مخصصة تناسب رغباتك وأسلوب حياتك."
                : "Book your appointment and let's create a personalized treatment plan that works for you."}
            </p>

            {/* Centered Action Buttons matching Screenshot 5 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[#005bb7] hover:bg-blue-50 text-xs sm:text-sm font-extrabold shadow-lg hover:scale-103 active:scale-97 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isAr ? "احجز موعد كشف" : "Book an appointment"}</span>
                <span className={isAr ? "rotate-180" : ""}>↗</span>
              </button>

              <a
                href="tel:+201022013314"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#002f6c]/60 hover:bg-[#002f6c]/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 hover:scale-103 active:scale-97"
              >
                <span dir="ltr">{isAr ? "اتصل: 01022013314" : "Call +20 102 201 3314"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
