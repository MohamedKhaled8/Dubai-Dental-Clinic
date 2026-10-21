import React, { useState } from "react";
import { CreditCard, ShieldCheck, Check, DollarSign, Calculator, ArrowUpRight } from "lucide-react";

interface EviaFinancingProps {
  isAr: boolean;
  onOpenBooking: (service?: string) => void;
}

export function EviaFinancing({ isAr, onOpenBooking }: EviaFinancingProps) {
  const [treatmentCost, setTreatmentCost] = useState(1500);
  const [months, setMonths] = useState(12);

  const monthlyPayment = Math.round(treatmentCost / months);

  const insurances = [
    "Delta Dental",
    "Cigna",
    "Aetna",
    "MetLife",
    "Guardian",
    "United Healthcare",
  ];

  const financingOptionsEn = [
    "CareCredit healthcare financing",
    "0% APR introductory plans available",
    "Flexible monthly payments up to 36 months",
    "In-house membership discount plan",
  ];

  const financingOptionsAr = [
    "تقسيط بدون فوائد بالتعاون مع بنك مصر",
    "دفع ميسر عبر ValU وسهولة وأمان حتى 36 شهراً",
    "برامج تمويل مباشرة مع المركز على دفعات مريحة",
    "خصومات خاصة للباقات العائلية الشاملة",
  ];

  return (
    <section id="financing" className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4">
              <CreditCard className="w-3.5 h-3.5" />
              <span>{isAr ? "التأمين والتقسيط المريح" : "Insurance / Financing"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              {isAr ? "رعاية فائقة، بتكاليف ميسرة." : "Quality care, made easier."}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "خيارات سداد مرنة ودعم تأميني متكامل لتخطيط علاجك وعلاج أسرتك بكل سهولة وراحة بال."
              : "Flexible payment options and insurance support help make the care you need easier to plan for."}
          </p>
        </div>

        {/* Insurance & Financing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Card 1: Accepted Insurance */}
          <div className="lg:col-span-6 bg-white rounded-[28px] border border-[#E5E5E5] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#0069D9]" />
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                  {isAr ? "شركات التأمين المعتمدة" : "Accepted insurance"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] mb-6">
                {isAr
                  ? "نتعامل مع شبكة واسعة من كبرى شركات التأمين الطبي المحلي والدولي لتغطية الفحوصات والترميمات."
                  : "We are in-network with premier carriers and maximize your benefits before out-of-pocket costs."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {insurances.map((ins, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#1E293B]"
                  >
                    <Check className="w-3.5 h-3.5 text-[#0069D9]" />
                    <span>{ins}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F1F5F9] text-xs text-[#64748B]">
              <span className="font-semibold text-[#0F172A]">
                {isAr ? "فحص التغطية التأمينية مسبقاً:" : "Complimentary Benefits Verification:"}
              </span>{" "}
              {isAr
                ? "يقوم فريقنا بفحص نسبة تغطية بطاقتك التأمينية قبل موعدك لتجنب أي تكاليف غير متوقعة."
                : "Our billing team checks your benefits before your first visit, so there's never a surprise invoice."}
            </div>
          </div>

          {/* Card 2: Financing Options */}
          <div className="lg:col-span-6 bg-white rounded-[28px] border border-[#E5E5E5] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-[#0069D9]" />
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                  {isAr ? "خيارات التمويل والتقسيط" : "Financing options"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] mb-6">
                {isAr
                  ? "خيارات تقسيط سهلة ومريحة بدون فوائد لتبدأ خطتك العلاجية اليوم دون تأجيل."
                  : "Spread the cost of your dental care over comfortable monthly installments with 0% APR plans."}
              </p>

              <div className="space-y-3">
                {(isAr ? financingOptionsAr : financingOptionsEn).map((opt, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E293B]"
                  >
                    <Check className="w-4 h-4 text-[#0069D9] shrink-0" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-xs text-[#64748B]">
                {isAr ? "هل لديك استفسار بخصوص الحسابات؟" : "Have insurance questions?"}
              </span>
              <button
                onClick={() => onOpenBooking(isAr ? "استفسار تأمين وحسابات" : "Insurance & Billing Consultation")}
                className="text-xs font-bold text-[#0069D9] hover:underline inline-flex items-center gap-1"
              >
                <span>{isAr ? "تحدث مع قسم الحسابات" : "Talk to billing"}</span>
                <span className={isAr ? "rotate-180" : ""}>↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Payment Estimator Calculator */}
        <div className="bg-[#0B1527] text-white rounded-[28px] p-6 sm:p-10 shadow-lg border border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="lg:max-w-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-3">
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>{isAr ? "حاسبة الأقساط الشهرية الفورية" : "Interactive Monthly Payment Estimator"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                {isAr ? "احسب قسطك الشهري لخطتك العلاجية" : "Estimate your monthly investment"}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {isAr
                  ? "حدد تكلفة الإجراء العلاجي المقترحة والمدة المفضلة لترى القسط التقريبي بدون أي فوائد خفية."
                  : "Choose your estimated treatment total and term to see how accessible world-class dental care can be."}
              </p>
            </div>

            {/* Slider & Controls */}
            <div className="flex-1 max-w-xl bg-white/5 rounded-[22px] p-5 sm:p-7 border border-white/10">
              <div className="mb-5">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white/80">{isAr ? "تكلفة العلاج الإجمالية" : "Estimated Treatment Total"}</span>
                  <span className="text-blue-400 font-mono font-bold text-sm">
                    ${treatmentCost.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="6000"
                  step="100"
                  value={treatmentCost}
                  onChange={(e) => setTreatmentCost(Number(e.target.value))}
                  className="w-full accent-[#0069D9] cursor-pointer"
                />
              </div>

              {/* Month Term Buttons */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-white/80 block mb-2">
                  {isAr ? "فترة السداد (أشهر)" : "Installment Period (Months)"}
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 12, 24, 36].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`py-2 text-xs font-bold rounded-xl transition-all ${
                        months === m
                          ? "bg-[#0069D9] text-white shadow-md"
                          : "bg-white/10 hover:bg-white/20 text-white/90"
                      }`}
                    >
                      {m} {isAr ? "شهر" : "mos"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Output Box */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-[11px] text-white/60 block">
                    {isAr ? "القسط الشهري التقديري (0% فوائد)" : "Estimated Monthly Payment (0% APR)"}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    ${monthlyPayment}
                    <span className="text-xs text-white/60 font-sans font-normal"> / {isAr ? "شهرياً" : "mo"}</span>
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking(isAr ? `خطة علاج بالتقسيط ($${treatmentCost})` : `Financing Plan ($${treatmentCost})`)}
                  className="px-5 py-2.5 rounded-full bg-white text-[#0B1527] hover:bg-blue-50 text-xs font-bold transition-all shadow-md hover:scale-102 active:scale-98"
                >
                  <span>{isAr ? "بدء الإجراء" : "Apply Now"}</span>
                  <span className={isAr ? "rotate-180" : ""}> ↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
