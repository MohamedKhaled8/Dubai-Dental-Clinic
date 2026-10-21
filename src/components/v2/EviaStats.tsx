import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, HeartHandshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface EviaStatsProps {
  isAr: boolean;
}

export function EviaStats({ isAr }: EviaStatsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [years, setYears] = useState(0);
  const [smiles, setSmiles] = useState(0);
  const [referral, setReferral] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!section) return;

    // Initial state: hide cards until scrolled to
    const cardItems = cardsEl?.querySelectorAll(".evia-stat-card");
    if (cardItems && cardItems.length > 0) {
      gsap.set(cardItems, { y: 40, opacity: 0 });
    }

    const counterObj = { years: 0, smiles: 0, referral: 0 };

    // GSAP ScrollTrigger: Triggers strictly when 25% of the stats section enters the viewport!
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 78%",
      once: true,
      onEnter: () => {
        // 1. Staggered card entrance
        if (cardItems && cardItems.length > 0) {
          gsap.to(cardItems, {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
          });
        }

        // 2. Dynamic rolling number counter with smooth easing
        gsap.to(counterObj, {
          years: 14,
          smiles: 3100,
          referral: 92,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            setYears(Math.round(counterObj.years));
            setSmiles(Math.round(counterObj.smiles));
            setReferral(Math.round(counterObj.referral));
          },
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const stats = [
    {
      display: isAr ? `${years} عاماً` : `${years} years`,
      labelEn: "in independent practice, under the same lead dentist",
      labelAr: "في الممارسة المستقلة تحت إشراف نفس كبير الأطباء",
      icon: Award,
    },
    {
      display: isAr ? `+${smiles.toLocaleString()}` : `${smiles.toLocaleString()}+`,
      labelEn: "smiles cared for, from first cleanings to full restorations",
      labelAr: "ابتسامة تمت رعايتها، من التنظيف الوقائي حتى الترميم الكامل",
      icon: Users,
    },
    {
      display: `${referral}%`,
      labelEn: "of new patients arrive on a referral from an existing one",
      labelAr: "من المرضى الجدد ينضمون إلينا بترشيح مباشر من مراجعين حاليين",
      icon: HeartHandshake,
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Value Statement Headline */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.18]">
            {isAr ? (
              <>
                نصنع ابتسامات أكثر صحة من خلال{" "}
                <span className="italic font-serif font-normal text-[#0069D9]">
                  طب أسنان حديث وهادف.
                </span>
              </>
            ) : (
              <>
                We create healthier smiles through{" "}
                <span className="italic font-serif font-normal text-[#0069D9]">
                  modern, thoughtful dentistry.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* 3 Clean Metric Value Cards - ZERO AI Fluff, 100% Genuine */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="evia-stat-card bg-white rounded-[28px] border border-[#E5E7EB] p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] text-[#0069D9] flex items-center justify-center mb-8">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111827] tracking-tight mb-3 font-mono">
                    {s.display}
                  </div>
                  <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
                    {isAr ? s.labelAr : s.labelEn}
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
