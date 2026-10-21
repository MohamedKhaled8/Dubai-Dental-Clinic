import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  UserCheck,
  Cpu,
  Award,
  Coffee,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface EviaWhyUsProps {
  isAr: boolean;
}

export function EviaWhyUs({ isAr }: EviaWhyUsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftVisualRef = useRef<HTMLDivElement>(null);
  const rightPillarsRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    const visual = leftVisualRef.current;
    const pillars = rightPillarsRef.current?.querySelectorAll(".evia-pillar-item");

    if (visual) {
      gsap.fromTo(
        visual,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: visual,
            start: "top 92%",
            once: true,
          },
        }
      );
    }

    if (pillars && pillars.length > 0) {
      gsap.fromTo(
        pillars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightPillarsRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }
  }, []);

  const pillars = [
    {
      num: "01",
      icon: UserCheck,
      titleEn: "Personalized treatment",
      titleAr: "خطة علاج شخصية ومخصصة",
      descEn:
        "A calmer, more attentive kind of dentistry, from the moment you walk in to your last checkup.",
      descAr:
        "نهج هادئ وواعٍ لطب الأسنان، يركز على احتياجاتك الفردية من اللحظة الأولى لدخولك وحتى آخر زيارة متابعة.",
      pointsEn: [
        "Dedicated treatment coordinator",
        "1-on-1 unhurried consultation",
        "Transparent upfront pricing",
      ],
      pointsAr: [
        "منسق علاجي مخصص لكل مراجع",
        "استشارة متأنية وشرح وافٍ بدون تعجل",
        "خطة علاج وأسعار شفافة ومكتوبة مسبقاً",
      ],
    },
    {
      num: "02",
      icon: Cpu,
      titleEn: "Modern technology",
      titleAr: "تكنولوجيا رقمية متطورة",
      descEn:
        "Digital scanning and 3D imaging mean faster, more precise treatment with fewer surprises.",
      descAr:
        "المسح الرقمي والأشعة المقطعية ثلاثية الأبعاد تعني علاجاً أسرع وأعلى دقة مع صفر مفاجآت أو ألم.",
      pointsEn: [
        "Zero-impression 3D optical scans",
        "Guided computer implantology",
        "Same-day smile preview",
      ],
      pointsAr: [
        "مسح ضوئي ثلاثي الأبعاد بدون قوالب معجون",
        "زراعة أسنان موجهة بدقة الكمبيوتر",
        "معاينة فورية لتصميم الابتسامة",
      ],
    },
    {
      num: "03",
      icon: Award,
      titleEn: "Experienced team",
      titleAr: "نخبة من كبار الاستشاريين",
      descEn:
        "Our clinicians bring decades of combined experience across general and specialist care.",
      descAr:
        "فريقنا الطبي يضم كفاءات استشارية معتمدة وأساتذة جامعيين في الجراحة والزراعة والتجميل والتقويم.",
      pointsEn: [
        "Board-certified university consultants",
        "Gentle family & pediatric specialists",
        "Continuous European clinical training",
      ],
      pointsAr: [
        "استشاريون معتمدون وأساتذة جامعات",
        "أخصائيون لطفاء لطب أسنان الأطفال والأسرة",
        "تدريب سريري مستمر وفق المعايير الأوروبية",
      ],
    },
    {
      num: "04",
      icon: Coffee,
      titleEn: "Comfortable environment",
      titleAr: "بيئة استرخاء فندقية متكاملة",
      descEn:
        "Noise-cancelling headphones, warm refreshments, and gentle clinicians who respect your pace.",
      descAr:
        "سماعات عازلة للضوضاء، مشروبات ضيافة، وأطباء يمنحونك كل الوقت لتشعر بالراحة التامة والهدوء.",
      pointsEn: [
        "Hospital-grade Class B sealed sterilization",
        "Comfort treatment loungers & calming atmosphere",
        "Zero-stress appointment pacing",
      ],
      pointsAr: [
        "أجنحة تعقيم أوروبية Class B بأكياس تفتح أمامك",
        "مقاعد علاج مريحة وأجواء خالية من التوتر",
        "مواعيد مرنة تحترم وقتك وراحتك النفسية",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="px-4 sm:px-6 py-16 sm:py-24 bg-white relative overflow-hidden border-t border-[#F3F4F6]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? "لماذا يختارنا مراجعونا؟" : "Why Choose Our Clinic"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.2]">
              {isAr ? (
                <>
                  رعاية سريرية هادئة{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    تضعك أنت أولاً.
                  </span>
                </>
              ) : (
                <>
                  Care that puts you{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    first, always.
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "صممنا مركز دبي لطب الأسنان بالهرم ليجمع بين أدق ما توصل إليه طب الأسنان التخصصي وعلاج الجذور المجهري والزراعة، وتجربة مريحة تبدد كل أشكال القلق والتوتر."
              : "A calmer, more attentive kind of dentistry at Dubai Dental Clinic in Al-Haram, powered by certified specialists and modern clinical suites."}
          </p>
        </div>

        {/* 2-Column Architectural Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Real Clinic Photography & Living Verification Frame */}
          <div
            ref={leftVisualRef}
            className="lg:col-span-5 relative rounded-[32px] overflow-hidden bg-[#0A192F] shadow-xl border border-black/[0.06] sticky top-28"
          >
            {/* Real Clinic Photo */}
            <div className="relative h-[480px] sm:h-[540px] w-full overflow-hidden">
              <img
                src="/oris/parallax.webp"
                alt="Clinic Interior - Dubai Dental Haram"
                className="w-full h-full object-cover object-center brightness-95 hover:scale-104 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Ambient Dark-to-Clear Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-[#0B1B3A]/30 to-black/20 pointer-events-none" />

              {/* Top Status & Location Badge */}
              <div className="absolute top-5 inset-x-5 flex flex-wrap items-center justify-between gap-2 z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0B1B3A] text-xs font-bold shadow-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{isAr ? "مفتوح يومياً ١:٠٠ م – ١١:٠٠ م" : "Open Daily 1:00 PM – 11:00 PM"}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.5 (1,200+ {isAr ? "تقييم" : "Reviews"})</span>
                </div>
              </div>

              {/* Bottom Clinical Trust Overlay */}
              <div className="absolute bottom-5 inset-x-5 z-10 text-white">
                <div className="bg-black/55 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{isAr ? "الهرم، الجيزة · محطة العريش" : "Al-Haram, Giza · El-Arish"}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                    {isAr
                      ? "٢٠ شارع عز الدين عمر (برج المروة)"
                      : "20 Ezz El-Din Omar St. (Al-Marwa Tower)"}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/15 text-[11px] text-white/85">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{isAr ? "تعقيم Class B أوروبي" : "Class B Sterilization"}</span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-blue-300" />
                      <span>{isAr ? "أشعة 3D CBCT فورية" : "In-House 3D CBCT"}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Clean Editorial Pillars (Zero Clutter, Pure Craft) */}
          <div ref={rightPillarsRef} className="lg:col-span-7 space-y-4 sm:space-y-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activeIdx === idx;

              return (
                <div
                  key={pillar.num}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`evia-pillar-item group rounded-[26px] border p-6 sm:p-7 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white border-[#0069D9]/40 shadow-xl ring-2 ring-[#0069D9]/5 translate-x-1 rtl:-translate-x-1"
                      : "bg-[#FAFAFA] hover:bg-white border-[#E5E7EB] hover:border-[#D1D5DB] shadow-2xs"
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Number Badge */}
                    <span
                      className={`text-sm sm:text-base font-mono font-black px-3.5 py-1.5 rounded-xl border shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#0069D9] text-white border-[#0069D9]"
                          : "bg-white text-[#6B7280] border-[#E5E7EB] group-hover:text-[#111827]"
                      }`}
                    >
                      {pillar.num}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3
                          className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors ${
                            isActive ? "text-[#0069D9]" : "text-[#111827] group-hover:text-[#0069D9]"
                          }`}
                        >
                          {isAr ? pillar.titleAr : pillar.titleEn}
                        </h3>
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                            isActive
                              ? "bg-[#EBF4FF] text-[#0069D9] scale-110"
                              : "bg-white text-[#9CA3AF] border border-[#E5E7EB]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <p className="text-sm text-[#4B5563] leading-relaxed font-normal mb-4">
                        {isAr ? pillar.descAr : pillar.descEn}
                      </p>

                      {/* 3 Checkpoint Bullets */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-black/[0.04]">
                        {(isAr ? pillar.pointsAr : pillar.pointsEn).map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2 text-xs text-[#374151] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0069D9] shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
