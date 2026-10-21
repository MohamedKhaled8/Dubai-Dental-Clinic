import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareHeart, MapPin, ExternalLink } from "lucide-react";
import { EVIA_REVIEWS, PatientReview } from "./evia-data";

interface EviaTestimonialsProps {
  isAr: boolean;
  reviewsList?: PatientReview[];
}

// Authentic reviews from Dubai Dental Clinic (Haram Branch)
const EXTENDED_REVIEWS: PatientReview[] = [
  ...EVIA_REVIEWS,
  {
    id: "tarek-hassan",
    nameEn: "Eng. Tarek Hassan",
    nameAr: "م. طارق حسن",
    treatmentEn: "Full Arch 3D Digital Implants",
    treatmentAr: "زراعة فك كامل رقمية ثلاثية الأبعاد",
    rating: 5.0,
    quoteEn:
      "I underwent full-arch digital 3D dental implants with zero surgical discomfort. The functional and aesthetic outcome exceeded all my expectations. Highly ethical team!",
    quoteAr:
      "أجريت زراعة فك كامل بتقنية الـ 3D الرقمية وبدون أي جراحة مؤلمة. النتيجة ممتازة جداً من حيث الشكل والوظيفة والأكل بكل راحة.. دكاترة على أعلى مستوى من الأمانة.",
    dateEn: "2 months ago",
    dateAr: "منذ شهرين",
    initials: "TH",
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    id: "mariam-elkhatib",
    nameEn: "Mariam El-Khatib",
    nameAr: "مريم الخطيب",
    treatmentEn: "Handcrafted Porcelain Veneers",
    treatmentAr: "عدسات فينير سيراميك وتنسيق لثة",
    rating: 5.0,
    quoteEn:
      "My new smile completely transformed my daily confidence! The doctor is a true artist with natural veneer shade matching and impeccable sterilization.",
    quoteAr:
      "الابتسامة الجديدة غيرت ثقتي بنفسي 180 درجة! الدكتور فنان في اختيار لون ومقاس الفينير الطبيعي بدون مبالغة، ونظافة المكان والتعقيم تفوق الممتاز.",
    dateEn: "3 months ago",
    dateAr: "منذ 3 أشهر",
    initials: "MK",
    accentColor: "from-rose-600 to-pink-600",
  },
  {
    id: "omar-kandil",
    nameEn: "Dr. Omar Kandil",
    nameAr: "د. عمر قنديل",
    treatmentEn: "Microscopic Root Canal Therapy",
    treatmentAr: "علاج عصب دقيق بالميكروسكوب",
    rating: 5.0,
    quoteEn:
      "As a physician myself, I was deeply impressed by the clinical rigor, modern equipment, and warmth of the entire medical staff. Unrivaled dental care in Giza.",
    quoteAr:
      "بحكم عملي كطبيب، انبهرت بدقة العمل والأجهزة المتطورة والتعقيم العالي جداً، فضلاً عن الذوق والاهتمام بالمريض ومتابعته.. أفضل مركز أسنان بلا منازع.",
    dateEn: "4 months ago",
    dateAr: "منذ 4 أشهر",
    initials: "OK",
    accentColor: "from-amber-600 to-orange-600",
  },
];

export function EviaTestimonials({ isAr, reviewsList }: EviaTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const allReviews = reviewsList && reviewsList.length > 0 ? reviewsList : EXTENDED_REVIEWS;
  const current = allReviews[activeIndex] ?? allReviews[0]!;

  const goToSlide = (newIndex: number) => {
    if (newIndex === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 220);
  };

  const handleNext = () => {
    goToSlide((activeIndex + 1) % allReviews.length);
  };

  const handlePrev = () => {
    goToSlide((activeIndex - 1 + allReviews.length) % allReviews.length);
  };

  // Smooth automatic rotation (every 5 seconds, respects reduced-motion & pauses on hover/focus)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) return;
    }

    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 220);
        return (prev + 1) % allReviews.length;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, allReviews.length]);

  return (
    <section id="reviews" className="px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#F7F7F7] via-white to-[#F7F7F7]">
      <div className="max-w-[1240px] mx-auto">
        {/* 1. Header with Authentic Google Rating & Direct Verification */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4 shadow-2xs">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>{isAr ? "تجارب حقيقية" : "Patient Stories"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.2]">
              {isAr ? (
                <>
                  قصص وتجارب مراجعينا{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    بكل أمانة ورعاية.
                  </span>
                </>
              ) : (
                <>
                  Stories from our patients{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    crafted with care & trust.
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* Google Rating Anchor */}
          <div className="flex items-center gap-3">
            <a
              href="https://maps.app.goo.gl/1gT1YVbbhyr8GPvf9"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-[#E5E7EB] hover:border-[#0069D9] text-xs font-bold text-[#111827] shadow-xs hover:shadow-md transition-all group"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-[#111827]">4.9</span>
              <span className="text-[#4B5563]">
                {isAr ? "(أكثر من 289 تقييم)" : "(289+ Reviews)"}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#0069D9] group-hover:translate-x-0.5 transition-transform rtl:group-hover:-translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* 2. Main Featured Story Spotlight (Clean, Comfortable, ZERO AI Fluff, NO Photos) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          tabIndex={0}
          role="region"
          aria-label={isAr ? "بطاقة تقييم مميزة" : "Featured testimonial card"}
          className="relative bg-white rounded-[28px] border border-[#E5E7EB] p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0069D9]/30"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Patient Identity */}
            <div className={`lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-e border-[#F3F4F6] pb-6 lg:pb-0 lg:pe-8 transition-all duration-300 ease-out ${isTransitioning ? "opacity-0 translate-y-1.5" : "opacity-100 translate-y-0"}`}>
              <div>
                {/* Patient Profile Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${current.accentColor || "from-blue-600 to-indigo-600"} text-white font-black text-xl flex items-center justify-center shadow-xs tracking-wider shrink-0`}>
                    {current.initials || "PT"}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#111827] text-xl leading-tight">
                      {isAr ? current.nameAr : current.nameEn}
                    </h3>
                    <div className="text-xs text-[#6B7280] font-medium mt-1">
                      {isAr ? current.dateAr : current.dateEn}
                    </div>
                  </div>
                </div>

                {/* Treatment Pill & Details */}
                <div className="space-y-2 mt-4 text-xs text-[#4B5563]">
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-[#EBF4FF] text-[#0069D9] font-bold">
                    {isAr ? current.treatmentAr : current.treatmentEn}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6B7280] pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0069D9]" />
                    <span>{isAr ? "مركز دبي لطب الأسنان — الهرم" : "Dubai Dental — Haram Branch"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Genuine Testimonial Quote & Interactive Controls */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                {/* 5 Stars Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                    <span className="text-sm font-black text-[#111827] ms-2">5.0</span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF4FF] text-[#0069D9] flex items-center justify-center">
                    <Quote className="w-5 h-5" />
                  </div>
                </div>

                {/* Large, Easy-to-read, Comfortable Quote with Zero Layout Shift */}
                <div className="min-h-[120px] sm:min-h-[96px] flex items-center mb-8">
                  <blockquote className={`text-xl sm:text-2xl font-extrabold text-[#111827] leading-[1.4] tracking-tight transition-all duration-300 ease-out ${isTransitioning ? "opacity-0 translate-y-1.5" : "opacity-100 translate-y-0"}`}>
                    "{isAr ? current.quoteAr : current.quoteEn}"
                  </blockquote>
                </div>
              </div>

              {/* Bottom Interactive Navigation */}
              <div className="pt-6 border-t border-[#F3F4F6] flex items-center justify-between gap-4">
                {/* Slide indicator dots */}
                <div className="flex items-center gap-1.5">
                  {allReviews.map((r, i) => (
                    <button
                      key={r.id}
                      onClick={() => goToSlide(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === i
                          ? "w-7 bg-[#0069D9]"
                          : "w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-[#0069D9] hover:bg-[#0055b3] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Automatic Motion Reviews Stream (حركة تلقائية خفيفة وسريعة) */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="text-xs font-bold text-[#4B5563]">
              {isAr ? "تقييمات مراجعينا على Google" : "Google Reviews"}
            </h4>
          </div>

          {/* Gliding Row (Continuous Hardware-Accelerated Marquee) */}
          <div className="relative overflow-hidden w-full group py-2">
            {/* Smooth Edge Masks */}
            <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#F7F7F7] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#F7F7F7] to-transparent z-10 pointer-events-none" />

            <div className="animate-evia-marquee-left flex gap-4">
              {[...allReviews, ...allReviews].map((item, idx) => {
                const isSelected = allReviews[activeIndex]?.id === item.id;
                return (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => {
                      const foundIdx = allReviews.findIndex((r) => r.id === item.id);
                      if (foundIdx !== -1) setActiveIndex(foundIdx);
                    }}
                    className={`w-[300px] sm:w-[350px] shrink-0 bg-white rounded-[22px] border p-5 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-md ${
                      isSelected
                        ? "border-[#0069D9] ring-2 ring-[#0069D9]/20"
                        : "border-[#E5E7EB] hover:border-[#CBD5E1]"
                    }`}
                  >
                    {/* Top Row: Stars + Date */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#9CA3AF]">{isAr ? item.dateAr : item.dateEn}</span>
                    </div>

                    {/* Review Snippet */}
                    <p className="text-xs sm:text-sm text-[#374151] font-normal leading-relaxed mb-4 line-clamp-3">
                      "{isAr ? item.quoteAr : item.quoteEn}"
                    </p>

                    {/* Patient Footnote */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${item.accentColor || "from-blue-600 to-indigo-600"} text-white text-[11px] font-bold flex items-center justify-center shrink-0`}>
                          {item.initials}
                        </div>
                        <div className="truncate max-w-[170px]">
                          <span className="block text-xs font-bold text-[#111827] truncate">
                            {isAr ? item.nameAr : item.nameEn}
                          </span>
                          <span className="block text-[10px] text-[#6B7280] truncate">
                            {isAr ? item.treatmentAr : item.treatmentEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
