import { useState } from "react";
import {
  Scan,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Activity,
  ArrowRight,
  ChevronRight,
  Stethoscope,
  Microscope,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { clinic } from "@/lib/site";

interface ProcessStep {
  id: number;
  badge: { ar: string; en: string };
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  duration: { ar: string; en: string };
  painLevel: { ar: string; en: string };
  technology: { ar: string; en: string };
  doctorRole: { ar: string; en: string };
  details: { ar: string[]; en: string[] };
  quote: { ar: string; en: string };
}

const steps: ProcessStep[] = [
  {
    id: 1,
    badge: { ar: "المرحلة الأولى: التشخيص الرقمي", en: "Stage 1: 3D Digital Intake" },
    title: {
      ar: "المسح الفموي ثلاثي الأبعاد والأشعة المقطعية CBCT",
      en: "3D Intraoral Scanning & High-Definition CBCT Tomography",
    },
    subtitle: {
      ar: "وداعاً لعجائن القياس التقليدية؛ قياسات رقمية دقيقة لملايين النقاط في دقائق دون أي إزعاج.",
      en: "Eliminating silicone impression pastes with microscopic digital scans mapping your jaws in minutes.",
    },
    duration: { ar: "١٥ إلى ٢٠ دقيقة", en: "15–20 minutes" },
    painLevel: { ar: "0/10 (إجراء رقمي بدون ألم إطلاقاً)", en: "0/10 (Completely non-invasive)" },
    technology: { ar: "ماسح ثلاثي الأبعاد + أشعة مقطعية ثلاثية الأبعاد", en: "HD Intraoral 3D Scanner + 3D CBCT" },
    doctorRole: { ar: "فريق التشخيص والاستشاري المختص", en: "Diagnostic Imaging Specialist" },
    details: {
      ar: [
        "فحص شامل لحالة اللثة والأسنان وعظام الفكين",
        "التقاط صور رقمية ثلاثية الأبعاد تُعرض على الشاشة أمامك فوراً",
        "تحديد سُمك العظم ومسار الأعصاب لتفادي أي مضاعفات",
      ],
      en: [
        "Comprehensive screening of gums, teeth, and bone architecture",
        "Instant 3D model visualized on-screen with patient participation",
        "Precise measurement of bone volume and nerve canal mapping",
      ],
    },
    quote: {
      ar: "«نبدأ دائماً بالاستماع لك ورؤية خريطة فمك الرقمية كاملة قبل أي تدخل.»",
      en: "“We always begin by listening and reviewing your full digital dentition map together.”",
    },
  },
  {
    id: 2,
    badge: { ar: "المرحلة الثانية: الخطة المخصصة", en: "Stage 2: Smile Simulation & Mapping" },
    title: {
      ar: "محاكاة الابتسامة DSD وخطة العلاج الشفافة",
      en: "Digital Smile Design (DSD) & Clear Financial Roadmap",
    },
    subtitle: {
      ar: "شاهد النتيجة المتوقعة لابتسامتك وتناسقها مع ملامحك قبل البدء، مع شرح واضح للتكلفة والجدول الزمني.",
      en: "Preview your anticipated smile contours aligned with facial aesthetics alongside transparent costs.",
    },
    duration: { ar: "٢٠ إلى ٣٠ دقيقة استشارة", en: "20–30 mins consultation" },
    painLevel: { ar: "0/10 (حوار طبي واستشاري هادئ)", en: "0/10 (Informative & consultative)" },
    technology: { ar: "برمجيات تصميم الابتسامة الرقمي DSD", en: "Digital Smile Design CAD Software" },
    doctorRole: { ar: "استشاري تجميل وزراعة الأسنان", en: "Prosthodontist & Implantologist" },
    details: {
      ar: [
        "تصميم رقمي لشكل وطول ولون الأسنان المتناسق مع الشفاه والوجه",
        "مناقشة جميع الخيارات المتاحة ومميزات كل بديل علاجي",
        "تحديد جدول المواعيد والتكلفة بدقة تامة دون أي مصاريف خفية",
      ],
      en: [
        "Custom digital design of tooth proportions harmonized with lip dynamics",
        "Collaborative review of clinical options and material grades",
        "Definitive visit schedule and all-inclusive transparent quote",
      ],
    },
    quote: {
      ar: "«أنت شريك في اتخاذ القرار، ولا نبدأ حتى تكون مقتنعاً ومرتاحاً تماماً.»",
      en: "“You are an equal partner in decision-making; we never start until you are 100% confident.”",
    },
  },
  {
    id: 3,
    badge: { ar: "المرحلة الثالثة: الإجراء الدقيق", en: "Stage 3: Guided Precision & Sterilization" },
    title: {
      ar: "الإجراء الموجه بالحاسوب وأعلى معايير التعقيم الطبي",
      en: "Computer-Guided Micro-Surgery & Class B Sterilization",
    },
    subtitle: {
      ar: "توجيه جراحي بدقة أجزاء من المليمتر وتخدير موضعي بدون ألم مع أدوات معقمة بأعلى معايير المستشفيات.",
      en: "Surgical precision guided to sub-millimeter tolerances under gentle anesthesia and sealed sterile packs.",
    },
    duration: { ar: "٣٠ إلى ٦٠ دقيقة للجلسة", en: "30–60 mins per session" },
    painLevel: { ar: "0/10 (تخدير موضعي لطيف وتسكين فائق)", en: "0/10 (Gentle computer-assisted anesthesia)" },
    technology: { ar: "دليل جراحي موجه + أوتوكلاف Class B الطبي", en: "Surgical Guide Stent + Hospital Class B Autoclave" },
    doctorRole: { ar: "أخصائي جراحة الفم والزراعة / التقويم", en: "Consultant Oral Surgeon / Specialist" },
    details: {
      ar: [
        "فتح مغلف الأدوات الجراحية المعقمة مسبقاً أمام المريض لضمان الأمان 100%",
        "تثبيت دعامات التيتانيوم أو برد وتجهيز العدسات بأقل تدخل مجهري ممكن",
        "تطبيق بروتوكول الراحة التامة دون أي شعور بالألم أو الانزعاج",
      ],
      en: [
        "Sealed sterile surgical cassettes opened directly in patient presence",
        "Micro-invasive placement preserving maximum healthy bone and tissue",
        "Comprehensive comfort protocol ensuring zero intra-operative pain",
      ],
    },
    quote: {
      ar: "«الأمان البيولوجي والراحة النفسية هما الأولوية القصوى في كل خطوة.»",
      en: "“Biological safety and patient peace of mind are non-negotiable at every second.”",
    },
  },
  {
    id: 4,
    badge: { ar: "المرحلة الرابعة: الابتسامة الدائمة", en: "Stage 4: Custom Milling & Lifetime Care" },
    title: {
      ar: "التركيبات الخزفية الألمانية وضمان الجودة والمتابعة",
      en: "German E.max & Zirconia Final Placement & Warranty",
    },
    subtitle: {
      ar: "تثبيت التركيبات النهائية المصنعة بدقة CAD/CAM مع فحص الإطباق وتقديم وثيقة المتابعة الدورية.",
      en: "Precision CAD/CAM milling of German Katana Zirconia / E.max, bite balance tuning, and long-term care.",
    },
    duration: { ar: "جلسة التثبيت النهائي والمراجعة", en: "Final placement & bite check" },
    painLevel: { ar: "0/10 (إحساس طبيعي متطابق مع أسنانك)", en: "0/10 (Instant natural sensation)" },
    technology: { ar: "مخارط رقمية ألمانية CAD/CAM + فحص الإطباق", en: "German CAD/CAM Milling & Occlusal Articulation" },
    doctorRole: { ar: "الاستشاري المشرف وفريق العيادة", en: "Supervising Specialist Team" },
    details: {
      ar: [
        "اختبار اللون والشفافية وتطابقها مع ملامح الوجه والابتسامة",
        "تثبيت نهائي متين باستخدام لواصق طبية معتمدة دولياً",
        "جدول متابعة دورية بالهرم وإرشادات العناية للحفاظ على النتيجة لسنوات طويلة",
      ],
      en: [
        "Verification of shade translucency against real daylight and smile dynamics",
        "Permanent bonding using internationally certified biocompatible cements",
        "Structured maintenance visits in Al-Haram with home-care guidelines",
      ],
    },
    quote: {
      ar: "«ابتسامتك الجديدة ليست مجرد علاج، بل استثمار طويل الأمد في ثقتك وصحتك.»",
      en: "“Your restored smile is a lifelong investment in your health and self-assurance.”",
    },
  },
];

export function ClinicalProcessWorkflow() {
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";
  const [activeStepId, setActiveStepId] = useState(1);

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0]!;

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-[#e6e4dc] bg-white p-6 shadow-sm lg:p-12">
      {/* Section Eyebrow & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f1efe9] pb-8">
        <div>
          <span className="eyebrow">
            <Scan className="h-3.5 w-3.5 text-[#8c6d46]" />
            {isAr ? "رحلة المراجع في مركز دبي لطب الأسنان" : "PRECISION PATIENT JOURNEY"}
          </span>

          <h2 className="mt-4 font-display text-2xl font-bold text-[#0f172a] sm:text-3xl md:text-4xl">
            {isAr
              ? "مسار علاجي رقمي مدروس من الاستشارة الأولى حتى الابتسامة النهائية"
              : "A Structured 4-Stage Clinical Process Built for Comfort"}
          </h2>

          <p className="mt-2 text-xs md:text-sm text-[#52525b] max-w-2xl leading-relaxed">
            {isAr
              ? "نؤمن بأن الوضوح يزيل القلق؛ صممنا مسار رعايتك في مركز دبي لطب الأسنان بالهرم ليكون شفافاً وخالياً من المفاجآت، بأحدث الأجهزة الرقمية والتعقيم الجراحي المعتمد."
              : "Calm care starts with complete transparency. Every step is clearly planned, digitally executed, and hospital-grade sterile."}
          </p>
        </div>

        <a
          href={clinic.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline self-start md:self-auto text-xs shrink-0"
        >
          <MessageCircle className="h-4 w-4 text-emerald-600" />
          <span>{isAr ? "استشرنا حول خطتك" : "Discuss Your Case"}</span>
        </a>
      </div>

      {/* Step Indicator Tabs Navigation */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {steps.map((step) => {
          const isActive = step.id === activeStepId;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`group flex flex-col items-start rounded-2xl p-4 text-start transition-all border ${
                isActive
                  ? "border-[#0f172a] bg-[#0f172a] text-white shadow-md scale-[1.02]"
                  : "border-[#e6e4dc] bg-[#faf9f6] text-[#0f172a] hover:bg-white hover:border-[#d5d1c5]"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-bold ${
                    isActive ? "bg-[#b39062] text-white" : "bg-[#f4f2ec] text-[#0f172a]"
                  }`}
                >
                  0{step.id}
                </span>

                <span
                  className={`text-[10px] font-bold ${
                    isActive ? "text-[#b39062]" : "text-[#52525b]"
                  }`}
                >
                  {isAr ? `المرحلة ${step.id}` : `Step ${step.id}`}
                </span>
              </div>

              <p
                className={`mt-3 font-display text-xs md:text-sm font-bold line-clamp-1 ${
                  isActive ? "text-white" : "text-[#0f172a]"
                }`}
              >
                {isAr ? step.title.ar.split(" ")[0] + " " + (step.title.ar.split(" ")[1] || "") : step.title.en.split("&")[0]}
              </p>

              <p
                className={`mt-1 text-[11px] line-clamp-1 ${
                  isActive ? "text-white/70" : "text-[#52525b]"
                }`}
              >
                {isAr ? step.duration.ar : step.duration.en}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Showcase Panel */}
      <div className="mt-8 rounded-3xl border border-[#e6e4dc] bg-[#faf9f6] p-6 sm:p-8 lg:p-10 transition-all">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
          {/* Left Details */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white border border-[#e6e4dc] px-3 py-1 text-xs font-bold text-[#8c6d46]">
                {isAr ? activeStep.badge.ar : activeStep.badge.en}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                {isAr ? activeStep.painLevel.ar : activeStep.painLevel.en}
              </span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-[#0f172a] sm:text-3xl">
              {isAr ? activeStep.title.ar : activeStep.title.en}
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-[#52525b] leading-relaxed">
              {isAr ? activeStep.subtitle.ar : activeStep.subtitle.en}
            </p>

            {/* Checklist */}
            <div className="mt-6 space-y-3">
              {(isAr ? activeStep.details.ar : activeStep.details.en).map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#0f172a] leading-relaxed">
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Specialist Quote */}
            <blockquote className="mt-8 rounded-2xl border-s-4 border-[#b39062] bg-white p-4 text-xs font-medium italic text-[#52525b] shadow-sm">
              {isAr ? activeStep.quote.ar : activeStep.quote.en}
            </blockquote>
          </div>

          {/* Right Clinical Specs Card */}
          <div className="rounded-2xl border border-[#e6e4dc] bg-white p-6 shadow-sm space-y-4">
            <div className="border-b border-[#f1efe9] pb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c6d46]">
                {isAr ? "مدة المرحلة" : "Session Duration"}
              </p>
              <div className="mt-1 flex items-center gap-2 text-sm font-bold text-[#0f172a]">
                <Clock className="h-4 w-4 text-[#8c6d46]" />
                <span>{isAr ? activeStep.duration.ar : activeStep.duration.en}</span>
              </div>
            </div>

            <div className="border-b border-[#f1efe9] pb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c6d46]">
                {isAr ? "الأجهزة والتقنيات المستخدمة" : "Clinical Technology"}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs font-bold text-[#0f172a]">
                <Microscope className="h-4 w-4 text-[#8c6d46]" />
                <span>{isAr ? activeStep.technology.ar : activeStep.technology.en}</span>
              </div>
            </div>

            <div className="border-b border-[#f1efe9] pb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8c6d46]">
                {isAr ? "المسؤول عن الإجراء" : "Medical Supervision"}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs font-bold text-[#0f172a]">
                <Stethoscope className="h-4 w-4 text-[#8c6d46]" />
                <span>{isAr ? activeStep.doctorRole.ar : activeStep.doctorRole.en}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={clinic.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-xs py-3"
              >
                <Calendar className="h-4 w-4" />
                <span>{isAr ? "حجز استشارة لهذه المرحلة" : "Book This Stage"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Stage Switcher Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-[#e6e4dc] pt-5">
          <button
            onClick={() => setActiveStepId((prev) => (prev > 1 ? prev - 1 : 4))}
            className="flex items-center gap-1.5 text-xs font-bold text-[#52525b] hover:text-[#0f172a] transition-colors"
          >
            <ChevronRight className="h-4 w-4 -scale-x-100 rtl:scale-x-100" />
            <span>{isAr ? "المرحلة السابقة" : "Previous Stage"}</span>
          </button>

          <div className="flex gap-1.5">
            {steps.map((s) => (
              <span
                key={s.id}
                className={`h-2 rounded-full transition-all ${
                  s.id === activeStepId ? "w-6 bg-[#0f172a]" : "w-2 bg-[#d5d1c5]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveStepId((prev) => (prev < 4 ? prev + 1 : 1))}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0f172a] hover:text-[#8c6d46] transition-colors"
          >
            <span>{isAr ? "المرحلة التالية" : "Next Stage"}</span>
            <ChevronRight className="h-4 w-4 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
