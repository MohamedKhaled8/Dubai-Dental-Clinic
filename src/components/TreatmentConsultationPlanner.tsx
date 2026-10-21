import { useState } from "react";
import {
  Calendar,
  MessageCircle,
  Clock,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { clinic, doctors, services, type Service } from "@/lib/site";

export function TreatmentConsultationPlanner() {
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";

  const options = [
    {
      id: "dental-implants",
      label: { ar: "زراعة الأسنان الثابتة", en: "Dental Implants" },
      subtitle: {
        ar: "تعويض دائم للأسنان المفقودة بجذور تيتانيوم",
        en: "Permanent titanium replacement for missing teeth",
      },
      duration: { ar: "مرحلتان (خلال ٣ إلى ٦ أشهر)", en: "2 stages (3–6 months)" },
      steps: {
        ar: [
          "فحص وأشعة ثلاثية الأبعاد للعظم",
          "تثبيت دعامة التيتانيوم الدقيقة",
          "تركيب تاج الزيركونيا النهائي",
        ],
        en: [
          "3D bone evaluation & scan",
          "Precision titanium post integration",
          "Permanent custom Zirconia crown",
        ],
      },
      doctor: doctors.find((d) => d.id === "amr-adel") || doctors[0]!,
    },
    {
      id: "dental-veneers",
      label: { ar: "عدسات الفينيرز وتجميل الابتسامة", en: "Veneers & Smile Design" },
      subtitle: {
        ar: "تناسق لوني وشكلي فائق الرقة بخامات E.max",
        en: "Flawless shade and shape harmony with E.max",
      },
      duration: { ar: "جلستان (خلال أسبوع واحد)", en: "2 visits within 1 week" },
      steps: {
        ar: [
          "استشارة وتصميم الابتسامة الرقمي",
          "أخذ القياسات واختيار اللون الطبيعي",
          "تثبيت ومتابعة العدسات الخزفية",
        ],
        en: [
          "Digital smile analysis & shade matching",
          "Precision scan and thin preparation",
          "Final bonding & smile check",
        ],
      },
      doctor: doctors[0]!,
    },
    {
      id: "orthodontics",
      label: { ar: "تقويم الأسنان وتعديل الإطباق", en: "Orthodontics & Realignment" },
      subtitle: {
        ar: "تحسين اصطفاف الأسنان وتوازن العضة للبالغين والمراهقين",
        en: "Bite correction & alignment for adults & teens",
      },
      duration: { ar: "٦ إلى ١٨ شهراً حسب الحالة", en: "6–18 months" },
      steps: {
        ar: [
          "تقييم شامل لإطباق الفكين",
          "تركيب التقويم المناسب ومناقشة الخطة",
          "جلسات ضبط دورية شهرية بالعيادة بالهرم",
        ],
        en: [
          "Comprehensive occlusal assessment",
          "Custom appliance fitting",
          "Monthly adjustments in Al-Haram clinic",
        ],
      },
      doctor: doctors.find((d) => d.id === "sherif-fathy") || doctors[0]!,
    },
    {
      id: "pediatric-dentistry",
      label: { ar: "طب أسنان الأطفال", en: "Pediatric Dentistry" },
      subtitle: {
        ar: "رعاية هادئة دون خوف أو ألم في أجواء مريحة",
        en: "Gentle, stress-free care in a friendly environment",
      },
      duration: { ar: "جلسة واحدة (٣٠ إلى ٤٥ دقيقة)", en: "Single session (30–45 mins)" },
      steps: {
        ar: [
          "استقبال هادئ وبناء ألفة مع الطفل",
          "فحص دوري ووقاية بالفلورايد",
          "إرشاد الوالدين للعناية المنزلية",
        ],
        en: [
          "Gentle child welcome & rapport",
          "Check-up & preventive fluoride",
          "Practical home hygiene guidance",
        ],
      },
      doctor: doctors.find((d) => d.id === "omar-makhlouf") || doctors[0]!,
    },
  ];

  const [selectedId, setSelectedId] = useState(options[0]!.id);
  const current = options.find((o) => o.id === selectedId) ?? options[0]!;

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `مرحباً مركز دبي لطب الأسنان، أود الاستفسار وحجز استشارة بخصوص: ${current.label.ar}`
      : `Hello Dubai Dental Clinic, I would like to inquire about: ${current.label.en}`,
  );

  return (
    <div className="rounded-[2.5rem] border border-[#e6e4dc] bg-white p-8 md:p-14 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-[#f1efe9] pb-8">
        <div>
          <span className="eyebrow">
            {isAr ? "مساعد التخطيط العلاجي" : "INTERACTIVE TREATMENT PLANNER"}
          </span>
          <h3 className="mt-3 font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            {isAr ? "خطط لزيارتك واستكشف خطوات علاجك" : "Personalized Dental Consultation"}
          </h3>
          <p className="mt-2 text-sm text-[#52525b]">
            {isAr
              ? "اختر الإجراء الذي ترغب به للتعرف على الخطوات التقديرية، المدة، والاستشاري المشرف بالهرم."
              : "Select a specialty to explore expected visits, clinical milestones, and attending specialists in Al-Haram."}
          </p>
        </div>

        <div className="shrink-0 text-xs font-semibold text-[#8c6d46]">
          {isAr ? "مركز دبي لطب الأسنان · الهرم" : "Dubai Dental Clinic · Al-Haram"}
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedId(opt.id)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
              selectedId === opt.id
                ? "bg-[#0f172a] text-white shadow-sm"
                : "bg-[#f4f2ec] text-[#0f172a] hover:bg-[#eae6db]"
            }`}
          >
            {tr(opt.label)}
          </button>
        ))}
      </div>

      {/* Plan Details Display */}
      <div className="mt-10 grid gap-8 rounded-2xl border border-[#ece9df] bg-[#faf9f6] p-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        {/* Left Side: Milestones */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8c6d46]">
            {isAr ? "خطة الإجراء الطبي المقترحة" : "Treatment Pathway"}
          </span>
          <h4 className="mt-2 font-display text-2xl font-bold text-[#0f172a]">
            {tr(current.label)}
          </h4>
          <p className="mt-1 text-sm text-[#52525b]">{tr(current.subtitle)}</p>

          <div className="mt-6 space-y-3">
            {current.steps[lang].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0f172a] font-mono text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium text-[#0f172a]">{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#52525b]">
            <Clock className="h-4 w-4 text-[#8c6d46]" />
            <span>
              {isAr ? "المدة المقدرة:" : "Estimated Timeline:"} {tr(current.duration)}
            </span>
          </div>
        </div>

        {/* Right Side: Doctor & WhatsApp Trigger */}
        <div className="rounded-2xl border border-[#e6e4dc] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3.5 border-b border-[#f1efe9] pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f2ec] text-[#0f172a]">
              <Stethoscope className="h-5 w-5 text-[#8c6d46]" />
            </div>
            <div>
              <p className="text-xs text-[#52525b]">
                {isAr ? "الاستشاري المشرف بمركز دبي" : "Attending Specialist"}
              </p>
              <p className="font-display text-base font-bold text-[#0f172a]">
                {tr(current.doctor.name)}
              </p>
              <p className="text-xs text-[#8c6d46]">{tr(current.doctor.role)}</p>
            </div>
          </div>

          <p className="mt-4 text-xs text-[#52525b] leading-relaxed">
            {isAr
              ? "تبدأ الزيارة بفحص سريري هادئ وشرح الخيارات قبل اتخاذ أي قرار علاجي."
              : "Starts with a clear clinical consultation before committing to any treatment."}
          </p>

          <div className="mt-6 space-y-2.5">
            <a
              href={`https://wa.me/201022013314?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] py-3 text-xs font-bold text-white transition-colors hover:bg-[#1e293b]"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>{isAr ? "استفسر عبر واتساب مباشرة" : "Inquire via WhatsApp"}</span>
            </a>

            <a
              href={clinic.tel}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d5d1c5] bg-white py-2.5 text-xs font-bold text-[#0f172a] hover:bg-[#f4f2ec]"
            >
              <span>{isAr ? `اتصال بالعيادة: ${clinic.phone}` : `Call Clinic: ${clinic.phone}`}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
