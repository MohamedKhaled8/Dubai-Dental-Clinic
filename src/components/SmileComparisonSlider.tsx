import { useState, useRef, useCallback } from "react";
import { ArrowLeftRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import smileResult from "@/assets/smile-result.jpg";
import { useI18n } from "@/lib/i18n";
import { t } from "@/lib/site";

type TransformationCase = {
  id: string;
  title: { ar: string; en: string };
  category: { ar: string; en: string };
  description: { ar: string; en: string };
  shadeBefore: string;
  shadeAfter: string;
  timeline: { ar: string; en: string };
  highlights: { ar: string; en: string };
};

const cases: TransformationCase[] = [
  {
    id: "veneers",
    title: {
      ar: "تصميم الابتسامة وعدسات E.max الخزفية",
      en: "Digital Smile Design & E.max Veneers",
    },
    category: { ar: "تجميل الأسنان", en: "Aesthetic Dentistry" },
    description: {
      ar: "حالة تجميل الأسنان الأمامية بعدسات خزفية بالغة الدقة تحاكي شفافية المينا الطبيعية وحواف الأسنان.",
      en: "Restoration of anterior teeth using ultra-thin ceramic veneers matching natural light translucency.",
    },
    shadeBefore: "Vita A3.5 (Tetracycline)",
    shadeAfter: "Vita BL2 (Natural Bleached)",
    timeline: { ar: "جلستان خلال أسبوع واحد", en: "2 visits within 1 week" },
    highlights: { ar: "خامات E.max ألمانية فائقة النقاء", en: "High-translucency German E.max" },
  },
  {
    id: "ortho",
    title: {
      ar: "تقويم الأسنان وتعديل العضة وتناسق الفكين",
      en: "Orthodontic Realignment & Symmetry",
    },
    category: { ar: "تقويم الأسنان", en: "Orthodontics" },
    description: {
      ar: "إعادة تنظيم اصطفاف الأسنان وتحسين إطباق الفكين مع الحفاظ على صحة اللثة واستقرار النتيجة.",
      en: "Aligning crowded teeth and perfecting occlusal balance for functional and aesthetic stability.",
    },
    shadeBefore: "Crowding Index: Severe",
    shadeAfter: "Alignment: Class I Ideal",
    timeline: { ar: "متابعة دورية منتظمة بالهرم", en: "Structured monthly sessions" },
    highlights: {
      ar: "تقويم حديث مع أخصائي التقويم بالعيادة",
      en: "Specialist-guided biomechanics",
    },
  },
  {
    id: "implants",
    title: { ar: "زراعة الأسنان الفورية وتيجان الزيركونيا", en: "Dental Implant & Zirconia Crown" },
    category: { ar: "زراعة الأسنان", en: "Dental Implants" },
    description: {
      ar: "تعويض دائم لسن مفقود بدعامة تيتانيوم حيوية تندمج مع العظم ويعلوها تاج زيركونيا يطابق الأسنان المجاورة.",
      en: "Permanent replacement with biocompatible titanium root integrated into bone supporting a Zirconia crown.",
    },
    shadeBefore: "Tooth Gap: 12mm",
    shadeAfter: "Stability: 78 ISQ (Solid)",
    timeline: { ar: "مرحلتان مع متابعة الالتئام", en: "2 stages with guided healing" },
    highlights: {
      ar: "تيتانيوم طبي درجة 5 وتاج زيركونيا",
      en: "Grade 5 Titanium & Custom Zirconia",
    },
  },
];

export function SmileComparisonSlider() {
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = cases[activeCaseIndex] ?? cases[0]!;

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleMove(touch.clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="rounded-[2.5rem] border border-[#e6e4dc] bg-white p-6 md:p-12 shadow-sm">
      {/* Header and Case Selectors */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#f1efe9] pb-8">
        <div>
          <span className="eyebrow">
            {isAr ? "سجل الحالات والنتائج الواقعية" : "REAL SMILE TRANSFORMATIONS"}
          </span>
          <h3 className="mt-3 font-display text-3xl font-bold text-[#0f172a] md:text-4xl">
            {tr(activeCase.title)}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#52525b]">
            {tr(activeCase.description)}
          </p>
        </div>

        {/* Treatment Tabs */}
        <div className="flex flex-wrap gap-2">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(i);
                setSliderPos(50);
              }}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
                activeCaseIndex === i
                  ? "bg-[#0f172a] text-white shadow-sm"
                  : "bg-[#f4f2ec] text-[#0f172a] hover:bg-[#eae6db]"
              }`}
            >
              {tr(c.category)}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Split Studio Container */}
      <div className="relative mt-8 select-none">
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative aspect-[16/9] min-h-[380px] w-full cursor-ew-resize overflow-hidden rounded-3xl border border-[#e2ded5] shadow-sm bg-neutral-900"
        >
          {/* AFTER SIDE (Full Real Macro Dental Photograph) */}
          <div className="absolute inset-0">
            <img
              src={smileResult}
              alt={isAr ? "نتيجة تجميل الابتسامة بعد العلاج" : "Final smile restoration result"}
              className="h-full w-full object-cover object-center"
            />
            {/* Subtle Gradient vignette for badge readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

            {/* After Tag */}
            <div className="absolute top-6 end-6 rounded-full bg-black/60 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/20">
              <span className="text-emerald-400 font-black me-1">✓</span>
              {tr(t.after)}: {activeCase.shadeAfter}
            </div>

            <div className="absolute bottom-6 end-6 rounded-2xl bg-black/60 p-3 text-xs text-white backdrop-blur-md border border-white/20 hidden sm:block">
              <p className="font-bold text-amber-200">{tr(activeCase.highlights)}</p>
              <p className="text-[11px] text-white/70">{tr(activeCase.timeline)}</p>
            </div>
          </div>

          {/* BEFORE SIDE (Clipped Layer with Authentic Pre-op Tone Filter) */}
          <div
            className="absolute inset-y-0 start-0 overflow-hidden border-e-2 border-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            style={{ width: `${sliderPos}%` }}
          >
            <div
              className="absolute inset-0 h-full"
              style={{ width: containerRef.current?.clientWidth || "100%" }}
            >
              {/* Filtered realistic pre-op appearance */}
              <img
                src={smileResult}
                alt={isAr ? "حالة الأسنان قبل الإجراء" : "Pre-op dental condition"}
                className="h-full w-full object-cover object-center sepia-[0.35] brightness-[0.88] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

              {/* Before Tag */}
              <div className="absolute top-6 start-6 rounded-full bg-black/60 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/20">
                <span className="text-amber-400 me-1">●</span>
                {tr(t.before)}: {activeCase.shadeBefore}
              </div>

              <div className="absolute bottom-6 start-6 rounded-2xl bg-black/60 p-3 text-xs text-white backdrop-blur-md border border-white/20 hidden sm:block">
                <p className="font-bold text-white/90">
                  {isAr ? "الحالة الأولية قبل الإجراء" : "Initial Presentation"}
                </p>
                <p className="text-[11px] text-white/70">
                  {isAr ? "فحص سريري واستشارة بالهرم" : "Clinical consultation in Al-Haram"}
                </p>
              </div>
            </div>
          </div>

          {/* Handle */}
          <div
            className="absolute inset-y-0 z-30 flex items-center pointer-events-none"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#0f172a] text-white shadow-2xl">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
          </div>

          {/* Floating Instructions */}
          <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-1 text-[11px] font-bold text-white backdrop-blur-md">
            {isAr
              ? "اسحب المؤشر لمقارنة نتيجة الابتسامة قبل وبعد"
              : "Drag slider to compare smile results"}
          </div>
        </div>

        {/* Ethical Medical Disclaimer */}
        <p className="mt-4 text-center text-xs text-[#52525b]">{tr(t.galleryNote)}</p>
      </div>
    </div>
  );
}
