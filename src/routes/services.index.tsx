import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Info, ArrowRight, ArrowLeft, Calendar, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getServices } from "@/lib/repository";
import { PageHero } from "@/components/site";
import { ServiceArchCard } from "@/components/ServiceArchCard";
import type { ServiceItem } from "@/data/types";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      {
        title: "خدمات طب وتجميل وزراعة الأسنان بالهرم | Dental Services — Dubai Dental Clinic",
      },
      {
        name: "description",
        content:
          "تعرف على خدمات مركز دبي لطب الأسنان: زراعة الأسنان، تقويم الأسنان، طب الأسنان التجميلي، الفينيرز، علاج الجذور، علاج اللثة، والتركيبات الثابتة بالهرم.",
      },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [filter, setFilter] = useState<string>("all");

  const { data: services = [], isLoading } = useQuery<ServiceItem[]>({
    queryKey: ["services"],
    queryFn: () => getServices(),
  });

  const categories = [
    { id: "all", label: { ar: "جميع الخدمات (١٠)", en: "All Services (10)" } },
    {
      id: "implants-surgery",
      label: { ar: "الزراعة والجراحة", en: "Implants & Surgery" },
      slugs: ["dental-implants", "general-anesthesia"],
    },
    {
      id: "cosmetics",
      label: { ar: "التجميل والتركيبات", en: "Cosmetics & Crowns" },
      slugs: ["dental-veneers", "fixed-prosthesis", "scaling-polishing", "orthodontics"],
    },
    {
      id: "family",
      label: { ar: "العلاج التحفظي والأطفال", en: "Preventive & Family" },
      slugs: ["pediatric-dentistry", "gum-treatment", "root-canal", "dental-fillings"],
    },
  ];

  const filteredServices =
    filter === "all"
      ? services
      : services.filter((s) => {
          const cat = categories.find((c) => c.id === filter);
          return cat?.slugs?.includes(s.slug);
        });

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={isAr ? "خدمات طب وتجميل وزراعة الأسنان" : "Clinical & Aesthetic Services"}
        sub={
          isAr
            ? "منظومة علاجية متكاملة تحت إشراف نخبة من الاستشاريين بمركز دبي لطب الأسنان بالهرم، وفق أعلى معايير التعقيم والجودة."
            : "A comprehensive clinical suite delivered by certified specialists in Al-Haram under strict sterilization protocols."
        }
        crumb={isAr ? "الخدمات" : "Services"}
      />

      <section className="container-x py-16">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C2A06A]/20 pb-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
                  filter === c.id
                    ? "bg-[#0E1F1C] text-[#C2A06A] shadow-md"
                    : "bg-[#F6F1E7] text-[#16372F]/70 hover:bg-white hover:text-[#0E1F1C] border border-[#C2A06A]/20"
                }`}
              >
                {c.label[lang]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#16372F]/70">
            <Info className="w-4 h-4 text-[#C2A06A]" />
            <span>
              {isAr
                ? "تُحدد خطة العلاج بعد الفحص السريري"
                : "Treatment plans decided after clinical check"}
            </span>
          </div>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filteredServices.map((s, idx) => (
            <ServiceArchCard key={s.id} service={s} index={idx} />
          ))}
        </div>

        {/* Reassurance Callout Box */}
        <div className="mt-20 rounded-3xl border border-[#C2A06A]/30 bg-[#F6F1E7] p-8 md:p-12 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">
                <Sparkles className="w-3.5 h-3.5 text-[#C2A06A]" />
                <span>{isAr ? "استشارة مخصصة" : "Personalized Consultation"}</span>
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-[#0E1F1C]">
                {isAr
                  ? "لست متأكداً من الإجراء الأنسب لأسنانك؟"
                  : "Unsure Which Treatment Fits Your Smile?"}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-[#16372F]/80 leading-relaxed">
                {isAr
                  ? "يبدأ فريقنا الطبي بفحص سريري هادئ وشامل لتشخيص الحالة وشرح كل خطوة بوضوح وأمانة تامة."
                  : "Our specialized doctors begin with a calm, thorough clinical diagnosis and imaging to map out your exact options."}
              </p>
            </div>

            <Link to="/book" className="btn-clay shrink-0 flex items-center gap-2 text-xs">
              <Calendar className="w-4 h-4" />
              <span>{isAr ? "طلب حجز استشارة" : "Request Consultation"}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
