import React from "react";
import { Star } from "lucide-react";

interface EviaHeroProps {
  isAr: boolean;
  onOpenBooking: () => void;
}

export function EviaHero({ isAr, onOpenBooking }: EviaHeroProps) {
  return (
    <section className="relative w-full h-[100svh] min-h-[580px] max-h-[850px] flex flex-col justify-between overflow-hidden bg-[#061122] text-white">
      {/* 1. Real Background Image from Evia Dental with glowing smile profile - Edge to Edge */}
      <img
        src="https://framerusercontent.com/images/Lvb4MdoHeC9h7FdsuKxuIuJLje8.png"
        alt="Evia Dental Studio - Radiant Smile Profile"
        className="evia-hero-bg absolute inset-0 w-full h-full object-cover object-[75%_center] md:object-[65%_center] lg:object-center pointer-events-none select-none transition-transform duration-1000 ease-out"
        fetchPriority="high"
        decoding="async"
      />

      {/* 2. Cinematic Vignette & Ambient Glow Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030914] via-[#030914]/70 md:via-[#030914]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030914] via-transparent to-[#030914]/40 pointer-events-none" />

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 sm:px-10 lg:px-12 flex-1 flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Top Spacer */}
        <div className="pt-2 sm:pt-4" />

        {/* Center Main Copy Block */}
        <div className="max-w-2xl my-auto py-2 sm:py-4 evia-hero-item">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
            {isAr ? (
              <>
                طب أسنان يمنحك راحة <br />
                <span className="italic font-serif font-normal text-blue-200">كنقاء ضوء النهار</span>
              </>
            ) : (
              <>
                Dentistry that feels <br />
                <span className="italic font-serif font-normal text-blue-200">like daylight</span>
              </>
            )}
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/80 leading-relaxed font-normal max-w-xl">
            {isAr
              ? "مركز دبي لطب الأسنان بالهرم — صرح تخصصي متكامل في ٢٠ شارع عز الدين عمر (محطة العريش)، يجمع بين دقة علاج الجذور والزراعة والتقويم الشفاف بأحدث التقنيات وأعلى معايير الأمان."
              : "Dubai Dental Clinic in Al-Haram, Giza — comprehensive specialist dentistry at 20 Ezz El-Din Omar St. (El-Arish), combining advanced endodontics, implants, and clear aligners."}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onOpenBooking}
              className="px-6 sm:px-7 py-3 rounded-full bg-white text-[#0B1527] hover:bg-blue-50 text-xs sm:text-sm font-bold transition-all shadow-lg hover:scale-103 active:scale-97 flex items-center gap-2 cursor-pointer"
            >
              <span>{isAr ? "احجز موعداً الآن" : "Book an appointment"}</span>
              <span className={isAr ? "rotate-180" : ""}>↗</span>
            </button>

            <a
              href="tel:+201022013314"
              className="px-6 py-3 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 hover:scale-103 active:scale-97"
            >
              <span dir="ltr">{isAr ? "اتصل: 01022013314" : "Call 01022013314"}</span>
            </a>
          </div>

          {/* Social Proof Avatar Stack right below buttons matching Framer Screenshot 2 */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
              <img
                src="https://framerusercontent.com/images/42mB9rHOECcWFr3XsCvLvbT49s.jpg"
                alt="Client avatar"
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white/60 object-cover"
              />
              <img
                src="https://framerusercontent.com/images/K3VjU9D3puplGF7OV8J2UnsdY.jpg"
                alt="Client avatar"
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white/60 object-cover"
              />
              <img
                src="https://framerusercontent.com/images/P659ALGW4tnp2Pobr7kKFATZfw.jpg"
                alt="Client avatar"
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white/60 object-cover"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-white/90">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-extrabold text-white">4.5</span>
              <span className="text-white/60">•</span>
              <span className="text-white/90 font-medium">
                {isAr ? "أكثر من 1,200 تقييم موثق للمرضى" : "1,200+ Verified Patient Reviews"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
