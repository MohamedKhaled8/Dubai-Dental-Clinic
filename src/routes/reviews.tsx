import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Info,
  Calendar,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getReviews, getClinic } from "@/lib/repository";
import { PageHero } from "@/components/site";
import type { ReviewItem } from "@/data/types";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      {
        title: "آراء وتقييمات مراجعي عيادة دبي لطب الأسنان | Patient Reviews",
      },
      {
        name: "description",
        content:
          "اطلع على تجارب مراجعي عيادة دبي لطب وتجميل وزراعة الأسنان: رعاية فائقة، تعقيم معتمد، وشرح شفاف لخطة العلاج.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const { data: clinic } = useQuery({
    queryKey: ["clinic"],
    queryFn: () => getClinic(),
  });

  const { data: reviews = [] } = useQuery<ReviewItem[]>({
    queryKey: ["reviews"],
    queryFn: () => getReviews(),
  });

  const reviewThemes = [
    {
      title: { ar: "احترام المواعيد والوقت", en: "Respect for Appointments" },
      desc: {
        ar: "تنظيم دقيق للاستقبال دون انتظار مفرط، والتزام تام بجدول الجلسات.",
        en: "Strict scheduling punctuality with zero unnecessary waiting times.",
      },
    },
    {
      title: { ar: "النظافة والتعقيم الفائق", en: "Clinical Hygiene & Sterilization" },
      desc: {
        ar: "بروتوكول تعقيم أوروبي Class B ومعدات مغلفة تفتح أمام المريض مباشرة.",
        en: "Class B hospital-grade autoclaves with sealed pouches opened in front of patients.",
      },
    },
    {
      title: { ar: "الشرح الطبي الواضح والأمين", en: "Transparent Diagnosis" },
      desc: {
        ar: "توضيح خيارات العلاج والبدائل دون فرض أي إجراء تجميلي غير ضروري.",
        en: "Clear discussion of diagnostic imaging and honest alternatives without hard selling.",
      },
    },
    {
      title: { ar: "اللطف والصبر مع الأطفال", en: "Kindness with Children" },
      desc: {
        ar: "بيئة مريحة تهيئ الطفل نفسياً وتبدد خوفه من كرسي طبيب الأسنان.",
        en: "Gentle psychological pacing for pediatric visits ensuring fearless smiles.",
      },
    },
  ];

  const ratingValue = clinic?.googleRating.score ?? 4.9;
  const reviewCount = clinic?.googleRating.reviewCount ?? 1200;
  const lastUpdated =
    typeof clinic?.googleRating.lastUpdated === "object"
      ? clinic?.googleRating.lastUpdated[lang]
      : "October 2026";
  const mapsUrl = clinic?.googleMapsUrl ?? clinic?.mapsUrl ?? "https://maps.app.goo.gl/uvr71SPw8w17bNsC6";

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={isAr ? "آراء وانطباعات مراجعينا" : "Patient Trust & Reviews"}
        sub={
          isAr
            ? "نعتز بثقة كل مراجع اختار مركز دبي لطب الأسنان بالهرم لابتسامته وابتسامة عائلته."
            : "Reflections from individuals and families who trusted Dubai Dental Clinic in Al-Haram with their oral health."
        }
        crumb={isAr ? "التقييمات" : "Reviews"}
      />

      {/* Google Rating Summary Card */}
      <section className="container-x py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#C2A06A]/30 bg-white p-8 md:p-14 text-center shadow-md">
          <div className="flex justify-center gap-1.5 text-[#C2A06A]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-7 w-7 fill-current" />
            ))}
          </div>

          <p className="mt-4 font-display text-4xl sm:text-5xl font-extrabold text-[#0E1F1C]">
            {ratingValue} / 5.0
          </p>

          <p className="mt-2 text-sm font-semibold text-[#16372F]/80">
            {isAr
              ? `متوسط التقييم استناداً إلى ${reviewCount} مراجعة موثقة على خرائط جوجل`
              : `Based on ${reviewCount} verified patient reviews on Google Maps`}
          </p>

          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#F6F1E7] px-3 py-1 font-mono text-[11px] text-[#16372F]/70">
            <Info className="w-3.5 h-3.5 text-[#C2A06A]" />
            <span>
              {isAr ? `آخر تحديث: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clay flex items-center gap-2 text-xs shadow-md"
            >
              <span>{isAr ? "قراءة التقييمات الموثقة على خرائط جوجل" : "Read Verified Reviews on Google"}</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <Link to="/book" className="btn-primary flex items-center gap-2 text-xs">
              <Calendar className="h-4 w-4" />
              <span>{isAr ? "طلب حجز استشارة" : "Book a Visit"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Clinic Review Themes */}
      <section className="container-x pb-16">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="eyebrow mx-auto justify-center">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C2A06A]" />
            <span>{isAr ? "محاور التجربة في مركز دبي لطب الأسنان" : "Common Experience Themes"}</span>
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-[#0E1F1C]">
            {isAr ? "قيم يلمسها المرضى في كل زيارة" : "What Patients Appreciate Most"}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviewThemes.map((theme, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#C2A06A]/20 bg-white p-6 shadow-xs hover:border-[#C2A06A]/50 transition-all"
            >
              <h3 className="font-display text-base font-bold text-[#0E1F1C] mb-2">
                {theme.title[lang]}
              </h3>
              <p className="text-xs leading-relaxed text-[#16372F]/70">{theme.desc[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Review Cards Grid with Sample Flags */}
      <section className="container-x pb-24">
        <div className="mb-8 flex items-center justify-between border-b border-[#C2A06A]/20 pb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-[#0E1F1C]">
              {isAr ? "مقتطفات من تجارب المراجعين" : "Patient Testimonial Highlights"}
            </h3>
            <p className="text-xs text-[#16372F]/60 mt-0.5">
              {isAr
                ? "ملاحظة: النماذج أدناه توضيحية مستوحاة من محاور آراء المراجعين الحقيقية بالعيادة."
                : "Note: Cards below are demonstration samples reflecting real patient themes."}
            </p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#C2A06A] hover:underline flex items-center gap-1"
          >
            <span>{isAr ? "خرائط جوجل" : "Google Maps"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-3xl border border-[#C2A06A]/20 bg-white p-7 shadow-xs flex flex-col justify-between hover:border-[#C2A06A]/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-[#C2A06A]">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {r.isSample && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-800">
                      {isAr ? "نموذج توضيحي (Sample)" : "Sample"}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-[#0E1F1C] italic mb-6">"{r.text[lang]}"</p>
              </div>

              <div className="pt-4 border-t border-[#C2A06A]/15 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#0E1F1C]">{r.author[lang]}</h4>
                  <p className="text-[11px] text-[#C2A06A] font-medium">{r.treatment[lang]}</p>
                </div>
                <span className="text-[11px] text-[#16372F]/40">
                  {typeof r.date === "object" ? r.date[lang] : r.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
