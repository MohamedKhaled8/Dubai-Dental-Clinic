import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Stethoscope, Microscope, Sparkles, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface EviaClinicFacilitiesProps {
  isAr: boolean;
  onOpenBooking?: () => void;
}

const CLINIC_ROOMS = [
  {
    image: "/oris/hc1.webp",
    alt: "Private Consultation Suites Dubai Dental Clinic",
    icon: Stethoscope,
    badgeEn: "Suite 01",
    badgeAr: "الجناح الأول",
    titleEn: "Private 1-on-1 Consultation",
    titleAr: "أجنحة تشخيص واستشارة خاصة",
    subtitleEn: "Unhurried, personalized treatment planning",
    subtitleAr: "جلسة تشخيص هادئة وخطة علاجية مفصلة",
    descEn:
      "A quiet, private consultation suite at Dubai Dental Clinic in Al-Haram where your doctor reviews your digital scans and discusses options without rush.",
    descAr:
      "جناح خاص وهادئ بمركز دبي لطب الأسنان بالهرم، يناقش فيه الطبيب تفاصيل حالتك وصورك الرقمية بكل هدوء وشفافية.",
  },
  {
    image: "/oris/hc2.webp",
    alt: "3D CBCT & Digital Guided Surgery Unit",
    icon: Microscope,
    badgeEn: "Suite 02",
    badgeAr: "الجناح الثاني",
    titleEn: "3D CBCT & Digital Guided Surgery",
    titleAr: "الأشعة المقطعية والجراحة الموجهة",
    subtitleEn: "Sub-millimeter German imaging precision",
    subtitleAr: "دقة تصوير مجهرية لزراعة وتجميل الأسنان",
    descEn:
      "In-house German CBCT scanners provide instant, precise 3D bone mapping for computer-guided implants and diagnostics.",
    descAr:
      "أحدث أجهزة التصوير المقطعي ثلاثي الأبعاد بالمركز، لتحديد كثافة العظام وتوجيه زراعة الأسنان بدقة متناهية.",
  },
  {
    image: "/oris/hc3.webp",
    alt: "Pediatric & Family Dental Lounge",
    icon: Sparkles,
    badgeEn: "Suite 03",
    badgeAr: "الجناح الثالث",
    titleEn: "Fear-Free Pediatric & Family Lounge",
    titleAr: "جناح الأطفال والعائلة بدون خوف",
    subtitleEn: "Reassuring, comfortable environment",
    subtitleAr: "بيئة مبهجة تزيل رهاب الأسنان لدى الصغار والكبار",
    descEn:
      "Designed specifically to make children and anxious patients feel at ease, with gentle approaches and friendly clinicians.",
    descAr:
      "مصمم خصيصاً ليمنح أطفالك تجربة مرحة ولطيفة، مع أحدث تقنيات التخدير الموضعي غير المؤلم والمتابعة الوقائية.",
  },
  {
    image: "/oris/hc4.webp",
    alt: "Hospital-Grade Class B Sterilization Suite",
    icon: ShieldCheck,
    badgeEn: "Suite 04",
    badgeAr: "الجناح الرابع",
    titleEn: "Class B European Sterilization",
    titleAr: "أجنحة التعقيم الأوروبية Class B",
    subtitleEn: "Highest biological safety protocols",
    subtitleAr: "أعلى معايير الأمان الحيوي ومكافحة العدوى",
    descEn:
      "Medical-grade vacuum autoclaves and individualized sterile instrument pouching opened directly in front of each patient.",
    descAr:
      "أجهزة أوتوكلاف فراغية أوروبية Class B تضمن تعقيماً ميكروبياً تاماً، مع أكياس معقمة مختومة تُفتح أمام المراجع مباشرة.",
  },
];

export function EviaClinicFacilities({ isAr, onOpenBooking }: EviaClinicFacilitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !cardsEl) return;

    const cards = cardsEl.querySelectorAll(".facility-card");
    const header = section.querySelector(".facility-header");

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 92%",
            once: true,
          },
        }
      );
    }

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsEl,
            start: "top 88%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="px-4 sm:px-6 py-16 sm:py-24 bg-[#091528] text-white relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0069D9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#3365e2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Header */}
        <div className="facility-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-bold mb-4 border border-white/15">
              <MapPin className="w-3.5 h-3.5 text-blue-300" />
              <span>{isAr ? "داخل مركز دبي بالهرم · شارع عز الدين عمر" : "Inside Dubai Dental Clinic · Al-Haram"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">
              {isAr ? (
                <>
                  صرح طبي متكامل،{" "}
                  <span className="italic font-serif font-normal text-blue-300">
                    مُصمم لأجلك.
                  </span>
                </>
              ) : (
                <>
                  Where medical rigor meets{" "}
                  <span className="italic font-serif font-normal text-blue-300">
                    boutique comfort.
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/75 max-w-md leading-relaxed font-normal">
            {isAr
              ? "نلتقي بك في ٢٠ شارع عز الدين عمر متفرع من شارع الهرم (محطة العريش)، في أجنحة طبية مجهزة بأحدث معايير الأمان الحيوي والتقنيات الرقمية وعلاج الجذور المجهري."
              : "Discover our specialized clinical suites at 20 Ezz El-Din Omar St. in Al-Haram, Giza, built around hospital-grade biosafety and patient tranquility."}
          </p>
        </div>

        {/* 4 Real Clinic Facility Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_ROOMS.map((room, idx) => {
            const Icon = room.icon;
            return (
              <div
                key={idx}
                className="facility-card group relative rounded-[26px] overflow-hidden aspect-[3/4.4] bg-[#0E1E38] border border-white/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-blue-400/50 flex flex-col justify-between p-6"
              >
                {/* Real High-Resolution Photo */}
                <img
                  src={room.image}
                  alt={room.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-90 group-hover:scale-108 group-hover:brightness-100 transition-all duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />

                {/* Dark to Clear Cinematic Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06101E] via-[#06101E]/50 to-black/25 pointer-events-none" />

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15">
                    {isAr ? room.badgeAr : room.badgeEn}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-[#0069D9] group-hover:border-transparent transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Text Content */}
                <div className="relative z-10 text-white">
                  <span className="text-[11px] font-semibold text-blue-300 block mb-1">
                    {isAr ? room.subtitleAr : room.subtitleEn}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold leading-snug mb-2 text-white">
                    {isAr ? room.titleAr : room.titleEn}
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed line-clamp-3">
                    {isAr ? room.descAr : room.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
