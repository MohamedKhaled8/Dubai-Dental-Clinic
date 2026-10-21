import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  Info,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getGalleryCases } from "@/lib/repository";
import { PageHero } from "@/components/site";
import { SmileComparisonSlider } from "@/components/SmileComparisonSlider";
import type { GalleryCase as GalleryCaseItem } from "@/data/types";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title: "معرض الابتسامات والنتائج السريرية | Smile Gallery — Dubai Dental Clinic",
      },
      {
        name: "description",
        content:
          "معرض حالات ونتائج تجميل وزراعة وتقويم الأسنان في عيادة دبي لطب الأسنان. نماذج سريرية لخيارات الفينيرز والزيركونيا وتصميم الابتسامة.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: cases = [] } = useQuery<GalleryCaseItem[]>({
    queryKey: ["gallery_cases"],
    queryFn: () => getGalleryCases(),
  });

  const categories = [
    { id: "all", label: { ar: "جميع الحالات", en: "All Cases" } },
    { id: "veneers", label: { ar: "عدسات الفينيرز", en: "Porcelain Veneers" } },
    { id: "implants", label: { ar: "زراعة الأسنان", en: "Dental Implants" } },
    { id: "orthodontics", label: { ar: "تقويم الأسنان", en: "Orthodontics" } },
    { id: "crowns", label: { ar: "التركيبات والزيركونيا", en: "Zirconia Crowns" } },
  ];

  const filteredCases = cases.filter((c) => {
    if (activeCategory === "all") return true;
    return c.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={isAr ? "معرض الابتسامات والنتائج السريرية" : "Smile Transformation Gallery"}
        sub={
          isAr
            ? "استعراض لخيارات التجميل والزراعة والتقويم التخصصي بمركز دبي لطب الأسنان بالهرم."
            : "Explore aesthetic, implant, and orthodontic possibilities tailored to natural tooth symmetry and shades at Al-Haram."
        }
        crumb={isAr ? "معرض الحالات" : "Gallery"}
      />

      {/* Prominent Sample Data Flag Banner */}
      <section className="container-x py-8">
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">
              {isAr
                ? "تنويه توثيقي — نماذج محاكاة توضيحية (Sample): "
                : "Clinical Notice — Illustrative Demonstration Samples: "}
            </span>
            {isAr
              ? "البيانات والصور المعروضة في هذا المعرض نماذج تجريبية للمعاينة (Sample Cases)، وسيتم استبدالها لاحقاً بالحالات الفعلية الموثقة لمرضى مركز دبي لطب الأسنان بعد الحصول على موافقتهم الخطية المسبقة."
              : "Cases displayed in this demonstration gallery are sample references and will be replaced with clinic-approved patient outcomes following written clinical consent."}
          </div>
        </div>
      </section>

      {/* Featured Interactive Before / After Slider */}
      <section className="container-x py-10">
        <div className="mb-8">
          <span className="eyebrow">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A06A]" />
            <span>{isAr ? "المقارنة التفاعلية" : "Interactive Slider"}</span>
          </span>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-[#0E1F1C]">
            {isAr ? "مقارنة تفاعلية قبل وبعد الإجراء" : "Before & After Precision"}
          </h2>
        </div>

        <SmileComparisonSlider />
      </section>

      {/* Cases Masonry Grid with Category Filters */}
      <section className="container-x py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C2A06A]/20 pb-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#0E1F1C] text-[#C2A06A] shadow-md"
                    : "bg-[#F6F1E7] text-[#16372F]/70 hover:bg-white hover:text-[#0E1F1C] border border-[#C2A06A]/20"
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-[#16372F]/60">
            {isAr ? "عرض" : "Showing"}{" "}
            <span className="font-mono text-[#0E1F1C]">{filteredCases.length}</span>{" "}
            {isAr ? "حالات" : "cases"}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((c) => (
            <article
              key={c.id}
              className="rounded-3xl border border-[#C2A06A]/20 bg-white p-7 shadow-xs hover:border-[#C2A06A]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#F6F1E7] border border-[#C2A06A]/30 px-3 py-1 text-[11px] font-bold text-[#16372F]">
                    {c.category}
                  </span>

                  {c.isSample && (
                    <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[10px] font-mono font-bold">
                      {isAr ? "نموذج توضيحي" : "Sample"}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-[#0E1F1C] mb-2">
                  {c.title[lang]}
                </h3>

                <p className="text-xs leading-relaxed text-[#16372F]/70 mb-6">
                  {c.description[lang]}
                </p>

                <div className="rounded-2xl border border-[#C2A06A]/15 bg-[#FBF9F4] p-4 text-xs space-y-2 mb-6">
                  <div className="flex justify-between border-b border-[#C2A06A]/10 pb-1.5">
                    <span className="text-[#16372F]/60">{isAr ? "قبل:" : "Before:"}</span>
                    <span className="font-bold text-[#0E1F1C]">{c.beforeLabel[lang]}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#C2A06A]/10 pb-1.5">
                    <span className="text-[#16372F]/60">{isAr ? "بعد:" : "After:"}</span>
                    <span className="font-bold text-[#16372F]">{c.afterLabel[lang]}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#16372F]/60">{isAr ? "المدة المقدرة:" : "Duration:"}</span>
                    <span className="font-semibold text-[#0E1F1C]">{c.duration[lang]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C2A06A]/15 flex items-center justify-between">
                <span className="text-[11px] text-[#16372F]/60 font-medium">
                  {c.material[lang]}
                </span>
                <Link
                  to="/book"
                  className="text-xs font-bold text-[#0E1F1C] hover:text-[#C2A06A] transition-colors"
                >
                  {isAr ? "حجز استشارة ←" : "Book check-up →"}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-16 text-center text-xs text-[#16372F]/60">
          {isAr
            ? "* تختلف نتائج الإجراءات الطبية وفقاً للتشخيص الفردي وبنية الأسنان والعظام لكل مريض."
            : "* Clinical outcomes vary depending on individual anatomy, oral health, and diagnosis."}
        </div>
      </section>
    </div>
  );
}
