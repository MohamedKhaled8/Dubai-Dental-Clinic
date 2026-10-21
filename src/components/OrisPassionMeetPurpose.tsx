import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Stethoscope, Microscope, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CLINICAL_PILLARS = [
  {
    image: "/oris/hc1.webp",
    alt: "Comprehensive Dental Diagnostics",
    title: "Multidisciplinary Consultation",
    subtitle: "8+ Board-Certified Specialists",
    icon: Stethoscope,
  },
  {
    image: "/oris/hc2.webp",
    alt: "3D Digital Treatment Planning",
    title: "Digital CBCT & Guided Surgery",
    subtitle: "Computer-Calibrated Precision",
    icon: Microscope,
  },
  {
    image: "/oris/hc3.webp",
    alt: "Pediatric and Family Dentistry",
    title: "Fear-Free Gentle Techniques",
    subtitle: "Calm Visits for Adults & Children",
    icon: Sparkles,
  },
  {
    image: "/oris/hc4.webp",
    alt: "Sterilization and Patient Safety",
    title: "Hospital-Grade Sterilization",
    subtitle: "Highest Biosafety Standards",
    icon: ShieldCheck,
  },
];

export function OrisPassionMeetPurpose() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!section || !cardsEl) return;

    const cards = cardsEl.querySelectorAll(".pmp-card");
    gsap.set(cards, { y: 50, opacity: 0, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    tl.to(cards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="passion-meet-purpose"
      ref={sectionRef}
      className="w-full bg-white relative z-10 text-oris-secondary py-[8vw] max-md:py-16 border-t border-gray-100"
    >
      <div className="oris-paddx">
        {/* Header */}
        <div className="flex flex-col items-center text-center mx-auto mb-[5vw] max-md:mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#3365e2] text-xs font-semibold mb-3">
            <span>Dubai Dental Clinical Standards · المعايير السريرية</span>
          </div>
          <h2 className="text-[3.8vw] max-[1025px]:text-[5.5vw] max-md:text-[7.5vw] font-normal leading-[1.15] text-[#13314a]">
            Where Passion Meets Purpose
          </h2>
          <p className="oris-text22 text-gray-600 mt-3 leading-relaxed">
            Behind every healthy smile is a specialized medical team in Al-Haram,
            advanced sterilization protocols, and a commitment to genuine patient
            comfort.
          </p>
        </div>

        {/* 4 Elegant Interactive Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          {CLINICAL_PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="pmp-card group relative rounded-2xl overflow-hidden aspect-[3/4.2] shadow-md hover:shadow-2xl transition-all duration-500 will-change-transform bg-slate-900 border border-gray-100 cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                />

                {/* Dark to Clear Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-[#0B1B3A]/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 pointer-events-none">
                  {/* Top Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white self-start group-hover:bg-[#3365e2] group-hover:border-transparent transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Bottom Text */}
                  <div>
                    <span className="text-[11px] font-medium text-blue-300 uppercase tracking-wider block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold leading-snug drop-shadow-sm text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
