import React, { useState } from "react";
import { HelpCircle, Plus, Minus, ArrowUpRight, MessageCircle } from "lucide-react";
import { EVIA_FAQS } from "./evia-data";

interface EviaFaqProps {
  isAr: boolean;
  onOpenBooking: () => void;
}

export function EviaFaq({ isAr, onOpenBooking }: EviaFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 evia-reveal-item">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isAr ? "الأسئلة الشائعة" : "FAQ"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              {isAr ? "إجابات واضحة لاستفساراتك" : "Questions, Answered"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "إجابات سريعة وشفافة عن خدماتنا، وطرق الحجز، والأسعار، وما تتوقعه خلال زيارتك الأولى."
              : "Find quick answers about our treatments, appointments, pricing, and what to expect at your visit."}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Still have questions callout */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="bg-[#F7F7F7] rounded-[28px] border border-[#E5E5E5] p-7 sm:p-8">
              <h3 className="text-2xl font-extrabold text-[#111827] mb-3">
                {isAr ? "ما زال لديك استفسار آخر؟" : "Still have questions?"}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-6 font-normal">
                {isAr
                  ? "فريق الاستقبال الطبي لدينا يسعده دائماً تقديم المساعدة والإجابة عن جميع تساؤلاتك بدقة."
                  : "Our team is happy to help. Get in touch and we’ll be glad to point you in the right direction."}
              </p>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0069D9] hover:bg-[#0055b3] text-white text-xs font-bold transition-all shadow-xs hover:scale-102 active:scale-98"
              >
                <span>{isAr ? "تواصل معنا مباشرة" : "Reach out to us"}</span>
                <span className={isAr ? "rotate-180" : ""}>↗</span>
              </button>
            </div>
          </div>

          {/* Right Column: 6 Accordions */}
          <div className="lg:col-span-8 space-y-3.5">
            {EVIA_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-[20px] sm:rounded-[24px] border border-[#E5E5E5] overflow-hidden transition-all shadow-xs"
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-start gap-4 hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-[#111827]">
                      {isAr ? faq.questionAr : faq.questionEn}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-[#0069D9] text-white rotate-180" : "bg-[#F3F4F6] text-[#6B7280]"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Content with smooth height transition */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F3F4F6] animate-in fade-in duration-200">
                      {isAr ? faq.answerAr : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
