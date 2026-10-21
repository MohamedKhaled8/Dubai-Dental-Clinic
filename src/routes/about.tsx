import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Calendar,
  Microscope,
  Award,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getDoctors, getClinic } from "@/lib/repository";
import { PageHero } from "@/components/site";
import { DoctorCapsuleCard } from "@/components/DoctorCapsuleCard";
import { ClinicalProcessWorkflow } from "@/components/ClinicalProcessWorkflow";
import type { DoctorItem } from "@/data/types";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "من نحن | مركز دبي لطب وتجميل وزراعة الأسنان بالهرم — About",
      },
      {
        name: "description",
        content:
          "تعرف على رؤية وفلسفة مركز دبي لطب الأسنان بالهرم: رعاية متخصصة، استماع واضح، وتعقيم جراحي فائق في بيئة هادئة.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const { data: clinic } = useQuery({
    queryKey: ["clinic"],
    queryFn: () => getClinic(),
  });

  const { data: doctors = [] } = useQuery<DoctorItem[]>({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });

  const pillars = [
    {
      icon: HeartHandshake,
      title: { ar: "الاستماع والشرح الشفاف", en: "Attentive Listening & Clear Plans" },
      desc: {
        ar: "لا نبدأ أي إجراء طبي قبل الاستماع لشكواك بدقة وشرح كافة الخيارات والبدائل لتتخذ قرارك باطمئنان.",
        en: "We listen attentively to your concerns and explain every treatment option clearly before starting.",
      },
    },
    {
      icon: Microscope,
      title: { ar: "دقة تشخيصية وتجهيزات حديثة", en: "Diagnostic Precision & Modern Tech" },
      desc: {
        ar: "فحص متكامل بأحدث التقنيات لتقييم صحة العظم واللثة بدقة عالية قبل الزراعة والتقويم.",
        en: "Comprehensive assessment using modern diagnostic dental tools for optimal clinical safety.",
      },
    },
    {
      icon: ShieldCheck,
      title: { ar: "تعقيم فائق وتجربة هادئة", en: "Hospital-Grade Sterilization" },
      desc: {
        ar: "بروتوكولات تعقيم صارمة وأجواء مصممة خصيصاً لتقليل أي توتر وضمان أقصى درجات الراحة.",
        en: "Rigorous infection control protocols and a calming clinic atmosphere designed for total peace of mind.",
      },
    },
  ];

  const atmosphereHighlights = [
    {
      title: { ar: "الهدوء والسكينة البصرية", en: "Serene Spatial Calm" },
      desc: {
        ar: "ألوان خشبية وترابية دافئة، وإضاءة غير مباشرة تقلل من الرهبة المعتادة في العيادات الطبية.",
        en: "Warm natural tones and indirect lighting curated to dissolve conventional clinical anxiety.",
      },
    },
    {
      title: { ar: "بيئة هادئة ومظلة بالهرم", en: "Calm Location at Al-Haram" },
      desc: {
        ar: "موقع هادئ بعيداً عن صخب الشارع، مع خصوصية تامة لكل جناح كشف وعلاج.",
        en: "Tranquil location near El-Arish station with dedicated private consultation suites.",
      },
    },
    {
      title: { ar: "أجنحة فحص خاصة ومعزولة", en: "Private Clinical Suites" },
      desc: {
        ar: "كل مريض يحظى بمساحة علاجية مستقلة ومجهزة بأحدث كراسي الأسنان الطبية المريحة.",
        en: "Individualized treatment rooms equipped with ergonomic chairs for extended comfort.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={isAr ? "عن مركز دبي لطب الأسنان" : "About Dubai Dental Clinic"}
        sub={
          isAr
            ? "بيئة رعاية سنية هادئة بالهرم تُعيد تعريف تجربة زيارة طبيب الأسنان بكل راحة وشفافية."
            : "A quiet, patient-centered dental clinic in Al-Haram redefining clinical care through honesty, sterile mastery, and human empathy."
        }
        crumb={isAr ? "من نحن" : "About"}
      />

      {/* Story & Philosophy */}
      <section className="container-x py-16">
        <div className="rounded-[2.5rem] border border-[#C2A06A]/30 bg-white p-8 md:p-14 shadow-md">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <span className="eyebrow">
                <Sparkles className="w-3.5 h-3.5 text-[#C2A06A]" />
                <span>{isAr ? "قصتنا ورؤيتنا" : "Our Story & Vision"}</span>
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-[#0E1F1C]">
                {isAr
                  ? "مركز دبي: مكانك لابتسامة مكتملة"
                  : "Dubai Dental Clinic: A Calm Sanctuary for Lasting Smiles"}
              </h2>
            </div>

            <div>
              <p className="text-base md:text-lg leading-relaxed text-[#16372F]/80">
                {isAr
                  ? "تأسس مركز دبي لطب الأسنان في حي الطالبية بالهرم برؤية واحدة: توفير مساحة علاجية راقية تحترم وقت المراجع، وتزيل الرهبة المرتبطة بطب الأسنان، وتقدم حلولاً مستدامة بأيدي استشاريين متخصصين في زراعة وتجميل وتقويم الأسنان."
                  : "Founded in the Talbiya neighborhood of Al-Haram, Giza, Dubai Dental Clinic was established with a singular vision: to offer a refined clinical space that respects your time, eliminates dental fear, and delivers durable results through specialized consultants."}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#16372F]/70">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>٢٠ شارع عز الدين عمر، محطة العريش، الهرم، الجيزة</span>
                <span>•</span>
                <span>يومياً ١:٠٠ ظ – ١١:٠٠ م</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="container-x pb-16">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="eyebrow mx-auto justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A06A]" />
            <span>{isAr ? "قيمنا الأساسية" : "Core Values"}</span>
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-[#0E1F1C]">
            {isAr ? "معايير الرعاية في مركز دبي لطب الأسنان" : "Our Standards of Clinical Excellence"}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="rounded-3xl border border-[#C2A06A]/20 bg-white p-8 shadow-xs hover:border-[#C2A06A]/50 transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0E1F1C] text-[#C2A06A] shadow-sm">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-[#0E1F1C]">
                  {p.title[lang]}
                </h3>
                <p className="mt-3 text-xs md:text-sm leading-relaxed text-[#16372F]/70">
                  {p.desc[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Atmosphere Section (Abstract Illustrated Placeholders, NOT fake photos) */}
      <section className="container-x pb-20">
        <div className="rounded-3xl border border-[#C2A06A]/20 bg-[#F6F1E7] p-8 md:p-12">
          <div className="max-w-2xl mb-8">
            <span className="eyebrow">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A06A]" />
              <span>{isAr ? "أجواء العيادة وتجربة الحضور" : "Clinic Atmosphere"}</span>
            </span>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-[#0E1F1C]">
              {isAr ? "تصميم بيئي يمنحك الطمأنينة" : "Designed for Psychological Calm"}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {atmosphereHighlights.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#C2A06A]/25 bg-white p-6 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F6F1E7] text-[#C2A06A] flex items-center justify-center font-mono font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-display text-base font-bold text-[#0E1F1C] mb-2">
                  {item.title[lang]}
                </h3>
                <p className="text-xs leading-relaxed text-[#16372F]/70">
                  {item.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Clinical Process Workflow */}
      <section className="container-x pb-20">
        <ClinicalProcessWorkflow />
      </section>

      {/* Doctors Team Preview */}
      <section className="container-x pb-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">
              <Award className="w-3.5 h-3.5 text-[#C2A06A]" />
              <span>{isAr ? "الفريق الطبي" : "Medical Team"}</span>
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#0E1F1C]">
              {isAr ? "استشاريو مركز دبي لطب الأسنان" : "Our Specialists"}
            </h2>
          </div>

          <Link to="/doctors" className="btn-outline flex items-center gap-1.5 text-xs font-bold">
            <span>{isAr ? "عرض جميع الأطباء" : "View All Doctors"}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {doctors.map((doctor) => (
            <DoctorCapsuleCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>
    </div>
  );
}
