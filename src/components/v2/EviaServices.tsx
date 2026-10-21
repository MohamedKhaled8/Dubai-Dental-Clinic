import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowUpRight, Clock, ShieldCheck, Microscope, CheckCircle2, UserCheck } from "lucide-react";
import { DentalService } from "./evia-data";

gsap.registerPlugin(ScrollTrigger);

interface EviaServicesProps {
  isAr: boolean;
  onSelectService: (service: DentalService) => void;
  onOpenBooking: (serviceTitle?: string) => void;
  servicesList?: DentalService[];
}

export function EviaServices({
  isAr,
  onSelectService,
  onOpenBooking,
}: EviaServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !cardsEl) return;

    const cards = cardsEl.querySelectorAll(".evia-treatment-card");
    const header = section.querySelector(".services-header");

    if (header) {
      gsap.fromTo(
        header,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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

  // 3 Flagship Clinical Treatments Side-by-Side (Matching user requirement)
  const coreTreatments = [
    {
      id: "smile-design",
      titleEn: "Bespoke Veneers & Smile Architecture",
      titleAr: "تجميل الابتسامة وعدسات الفينيرز",
      categoryEn: "Aesthetic Dentistry",
      categoryAr: "تجميل الأسنان",
      specialistEn: "Supervised by Dr. Nouran Ahmed & Dr. Ahmed Karam",
      specialistAr: "إشراف د. نورهان أحمد ود. أحمد كرم",
      image: "/oris/treatment1.webp",
      priceEn: "Handcrafted Porcelain",
      priceAr: "خزف إيماكس سويسري",
      durationEn: "2 Visits · 7–10 Days",
      durationAr: "جلستان · ٧-١٠ أيام",
      descriptionEn:
        "Handcrafted ultra-thin porcelain veneers calibrated to your unique facial symmetry and lip line. Delivers lifelike luminosity, closes gaps, and permanently corrects discoloration.",
      descriptionAr:
        "عدسات خزفية فائقة الرقة مصممة خصيصاً لتناسب تناسق ملامح وجهك وخط الابتسامة، تمنحك بياضاً طبيعياً يدوم طويلاً مع الحفاظ على بنية السن الطبيعية.",
      tagsEn: ["Facial Harmony Mapping", "Zero-Pain E-max", "Digital 3D Preview"],
      tagsAr: ["تناسق ملامح الوجه", "خزف E-max بدون ألم", "معاينة رقمية للابتسامة"],
      numericPrice: 3500,
    },
    {
      id: "implants",
      titleEn: "3D Guided Titanium Dental Implants",
      titleAr: "زراعة الأسنان الموجهة ثلاثية الأبعاد",
      categoryEn: "Restorative Surgery",
      categoryAr: "جراحة وزراعة الأسنان",
      specialistEn: "Supervised by Dr. Amr Adel",
      specialistAr: "إشراف د. عمرو عادل (استشاري الجراحة)",
      image: "/oris/treatment2.webp",
      priceEn: "German Titanium / Lifetime Care",
      priceAr: "تيتانيوم ألماني / ضمان مدى الحياة",
      durationEn: "30–45 Mins · Computer Guided",
      durationAr: "٣٠-٤٥ دقيقة · توجيه كمبيوتري",
      descriptionEn:
        "Biocompatible titanium root fixtures placed under computer-guided 3D templates. Preserves jawbone structure, restores 100% chewing force, and supports permanent Zirconia crowns.",
      descriptionAr:
        "غرسات تيتانيوم ألمانية متوافقة حيوياً يتم تثبيتها بدقة الكمبيوتر والأشعة المقطعية، لتعويض الأسنان المفقودة بتاج زركونيا دائم يحافظ على عظام الفك.",
      tagsEn: ["Computer Guided Stent", "Zero Scalpel Incision", "Immediate Loading Option"],
      tagsAr: ["دليل جراحي رقمي", "بدون شق جراحي تقليدي", "إمكانية التركيب الفوري"],
      numericPrice: 8500,
    },
    {
      id: "aligners",
      titleEn: "Clear Aligners & Invisible Orthodontics",
      titleAr: "تقويم الأسنان الشفاف وغير المرئي",
      categoryEn: "Orthodontic Care",
      categoryAr: "تقويم وتنسيق الأسنان",
      specialistEn: "Supervised by Dr. Sherif Fathy",
      specialistAr: "إشراف د. شريف فتحي (استشاري التقويم)",
      image: "/oris/treatment3.webp",
      priceEn: "Custom Digital Aligners",
      priceAr: "قوالب شفافة رقمية مخصصة",
      durationEn: "6–12 Months · Discrete Plan",
      durationAr: "٦-١٢ شهراً · خطة غير مرئية",
      descriptionEn:
        "Discreet clear aligner trays tailored via 3D intraoral optical scanning. Corrects crowding, gaps, and bite misalignment comfortably without metal wires or diet restrictions.",
      descriptionAr:
        "قوالب علاجية شفافة غير مرئية مصممة بمسح رقمي ثلاثي الأبعاد لتعديل إطباق وتزاحم الأسنان بسلاسة تامة دون أي أسلاك معدنية أو قيود على الطعام.",
      tagsEn: ["3D Optical Scan (No Molds)", "Removable & Transparent", "Bi-Weekly Progress Milestones"],
      tagsAr: ["مسح ضوئي بدون معجون", "شفافة وقابلة للإزالة", "متابعات دورية دقيقة"],
      numericPrice: 12000,
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="px-4 sm:px-6 py-16 sm:py-24 bg-[#F7F7F7] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="services-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? "خدماتنا وتخصصاتنا الطبية" : "Clinical Specialties"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.2]">
              {isAr ? (
                <>
                  رعاية سريرية شاملة،{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    صُممت خصيصاً لك.
                  </span>
                </>
              ) : (
                <>
                  Comprehensive care,{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    built around you.
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "خدمات سريرية متكاملة تُنفذ بأيدي نخبة من أطباء واستشاريي الأسنان بمركز دبي بالهرم، مع دعم كامل بأحدث تقنيات التصوير وعلاج الجذور المجهري."
              : "Comprehensive specialist disciplines delivered by certified consultants at Dubai Dental Clinic in Al-Haram, supported by in-house digital diagnostics."}
          </p>
        </div>

        {/* 3 Core Treatment Cards Side-by-Side (Clean, Premium, Zero Tab Clutter) */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coreTreatments.map((treatment) => (
            <div
              key={treatment.id}
              onClick={() => {
                onSelectService({
                  id: treatment.id,
                  titleEn: treatment.titleEn,
                  titleAr: treatment.titleAr,
                  categoryEn: treatment.categoryEn,
                  categoryAr: treatment.categoryAr,
                  priceEn: treatment.priceEn,
                  priceAr: treatment.priceAr,
                  numericPrice: treatment.numericPrice,
                  descriptionEn: treatment.descriptionEn,
                  descriptionAr: treatment.descriptionAr,
                  image: treatment.image,
                  durationEn: treatment.durationEn,
                  durationAr: treatment.durationAr,
                  stepsEn: treatment.tagsEn,
                  stepsAr: treatment.tagsAr,
                  includesEn: treatment.tagsEn,
                  includesAr: treatment.tagsAr,
                });
              }}
              className="evia-treatment-card group bg-white rounded-[28px] border border-[#E5E7EB] overflow-hidden p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-2xl hover:border-[#0069D9]/40 transition-all duration-400 cursor-pointer hover:-translate-y-2"
            >
              <div>
                {/* Real High-Resolution Treatment Image */}
                <div className="relative h-[250px] sm:h-[280px] rounded-[22px] overflow-hidden bg-[#E5E7EB] mb-5">
                  <img
                    src={treatment.image}
                    alt={treatment.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-3.5 start-3.5 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#111827] text-[11px] font-bold tracking-wider uppercase shadow-xs">
                      {isAr ? treatment.categoryAr : treatment.categoryEn}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3.5 end-3.5 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold tracking-tight shadow-md border border-white/20">
                      {isAr ? treatment.priceAr : treatment.priceEn}
                    </span>
                  </div>
                </div>

                {/* Supervising Doctor Badge */}
                <div className="flex items-center gap-1.5 text-xs text-[#0069D9] font-semibold mb-2">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? treatment.specialistAr : treatment.specialistEn}</span>
                </div>

                {/* Card Title & Description */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight group-hover:text-[#0069D9] transition-colors mb-2.5">
                  {isAr ? treatment.titleAr : treatment.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal mb-5">
                  {isAr ? treatment.descriptionAr : treatment.descriptionEn}
                </p>

                {/* 3 Key Clinical Benefits */}
                <div className="space-y-1.5 mb-6">
                  {(isAr ? treatment.tagsAr : treatment.tagsEn).map((tag, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2 text-xs text-[#374151] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between text-xs font-bold text-[#0069D9]">
                <div className="flex items-center gap-1.5 text-[#6B7280] font-medium text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isAr ? treatment.durationAr : treatment.durationEn}</span>
                </div>
                <div className="flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{isAr ? "تفاصيل واستشارة" : "Consult & Details"}</span>
                  <span className={isAr ? "rotate-180" : ""}>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Quality Assurance Banner below Services */}
        <div className="mt-12 bg-white rounded-[24px] border border-[#E5E7EB] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] text-[#0069D9] flex items-center justify-center shrink-0">
              <Microscope className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#111827] text-sm sm:text-base">
                {isAr ? "أشعة تشخيصية دقيقة وأحدث أجهزة علاج الجذور بمركز دبي بالهرم" : "Digital Diagnostics & Advanced Endodontics at Dubai Dental in Haram"}
              </h4>
              <p className="text-xs text-[#6B7280] mt-0.5">
                {isAr ? "نوفر فحصاً فورياً متكاملاً وتشخيصاً دقيقاً بأحدث الأجهزة" : "Instant precision digital imaging during your visit for accurate treatment planning"}
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenBooking("3D Guided Titanium Dental Implants")}
            className="px-6 py-2.5 rounded-full bg-[#0069D9] hover:bg-[#0055b3] text-white text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            {isAr ? "احجز استشارة فورية" : "Book Initial Consultation"}
          </button>
        </div>
      </div>
    </section>
  );
}
