import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TreatmentCardData {
  title: string;
  tags: string[];
  desc: string;
  image: string;
  bgColor: string;
  specialist: string;
}

const TREATMENTS: TreatmentCardData[] = [
  {
    title: "Guided Titanium Dental Implants",
    tags: ["3D CBCT Guided", "Biocompatible Titanium", "Permanent Solution"],
    desc: "Titanium posts surgically anchored into the jawbone using 3D guided surgical templates to replace missing teeth with natural-feeling, long-lasting Zirconia crowns. Preserves jawbone structure and bite strength.",
    image: "/oris/treatment2.webp",
    bgColor: "from-[#0B1B3A] to-[#13314a]",
    specialist: "Supervised by Dr. Amr Adel & Dr. Ahmed Hany",
  },
  {
    title: "Clear Aligners & Aesthetic Orthodontics",
    tags: ["Invisible Trays", "Custom Digital Fit", "Predictable Milestones"],
    desc: "Discreet clear aligners and modern ceramic braces that gently move teeth into proper harmony, correcting crowding and bite alignment without affecting your everyday lifestyle or speech.",
    image: "/oris/treatment3.webp",
    bgColor: "from-[#1d4ed8] to-[#3365e2]",
    specialist: "Supervised by Dr. Sherif Fathy",
  },
  {
    title: "Bespoke Veneers & Smile Architecture",
    tags: ["Natural Translucency", "E-max Porcelain", "Minimal Enamel Prep"],
    desc: "Handcrafted ultra-thin porcelain veneers calibrated to your unique facial symmetry and lip line. Delivers lifelike luminosity, closes gaps, and permanently corrects discoloration.",
    image: "/oris/treatment1.webp",
    bgColor: "from-[#0F172A] to-[#1E293B]",
    specialist: "Supervised by Dr. Nouran Ahmed",
  },
];

export function OrisTreatmentsStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!container || cards.length < 2) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Pin cleanly and animate cards with zero dead scroll space
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 10%",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Cards enter and stack cleanly
      cards.slice(1).forEach((card) => {
        tl.fromTo(
          card,
          { yPercent: 120, opacity: 0.8 },
          { yPercent: 0, opacity: 1, ease: "power1.inOut" }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="dental-treatments"
      className="w-full bg-white relative z-10 pt-4 pb-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="oris-paddx mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3365e2] text-xs font-semibold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3365e2]" />
          <span>Specialized Clinical Procedures · إجراءات تخصصية</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B1B3A] leading-tight">
          Specialist Dental Treatments
        </h2>
        <p className="oris-text22 mt-2 text-slate-600 max-w-2xl">
          Personalized clinical care performed by certified consultants at Dubai Dental Clinic Al-Haram.
        </p>
      </div>

      {/* Pinned Stacking Deck Container (Zero Dead Space) */}
      <div
        ref={containerRef}
        className="w-full oris-paddx relative"
      >
        <div className="relative w-full max-w-6xl mx-auto h-[520px] max-[1024px]:h-auto max-[1024px]:space-y-6">
          {TREATMENTS.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{
                zIndex: idx + 1,
                top: `${idx * 24}px`,
              }}
              className={`rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl border border-white/10 bg-gradient-to-br ${item.bgColor} ${
                idx === 0
                  ? "relative"
                  : "absolute inset-x-0 max-[1024px]:relative max-[1024px]:top-0"
              } flex flex-col md:flex-row items-center justify-between gap-8 h-[480px] max-[1024px]:h-auto transition-shadow`}
            >
              {/* Content Column */}
              <div className="flex flex-col justify-between h-full flex-1 max-[1024px]:gap-6">
                <div>
                  <span className="text-xs font-medium text-blue-200 tracking-wider uppercase block mb-2">
                    {item.specialist}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/90"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-300" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                    {item.desc}
                  </p>

                  <div>
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent("open-quick-book"))}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0B1B3A] font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-md hover:scale-103 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#3365e2]" />
                      <span>Book Consultation for this Treatment</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Column */}
              <div className="relative w-full md:w-[320px] lg:w-[360px] h-[240px] md:h-[360px] rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                <img
                  alt={item.title}
                  src={item.image}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
