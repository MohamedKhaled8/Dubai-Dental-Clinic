import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle2,
  HelpCircle,
  FileText,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { clinicData } from "@/data/clinic";
import { faqsData } from "@/data/faqs";
import { processStepsData } from "@/data/process";
import { PageHero } from "@/components/site";

export const Route = createFileRoute("/patients")({
  head: () => ({
    meta: [
      {
        title: "دليل المراجع والزيارة الأولى | مركز دبي لطب الأسنان بالهرم",
      },
      {
        name: "description",
        content:
          "دليل إرشادي شامل لمراجعي مركز دبي لطب الأسنان بالهرم: خطوات الزيارة الأولى، المستندات المطلوبة، والأسئلة الشائعة.",
      },
    ],
  }),
  component: PatientsPage,
});

function PatientsPage() {
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const whatToBring = [
    {
      ar: "بطاقة الهوية الشخصية أو جواز السفر لفتح الملف الطبي",
      en: "National ID or passport for patient registration",
    },
    {
      ar: "أي أشعات سابقة (بانوراما أو CBCT) إن وجدت لتقييم التطور الزمني",
      en: "Any previous dental X-rays or CBCT scans if available",
    },
    {
      ar: "قائمة الأدوية المزمنة الحالية أو الحساسيات الدوائية (مثل البنسلين)",
      en: "List of current chronic medications or known drug allergies",
    },
    {
      ar: "تقارير طبية سابقة لأصحاب الأمراض المزمنة (سكر، ضغط، سيولة)",
      en: "Medical clearance reports if managing systemic health conditions",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1B3A]">
      <PageHero
        title={isAr ? "دليل مراجعي مركز دبي لطب الأسنان" : "Patient Care & Visit Guide"}
        sub={
          isAr
            ? "كل ما يهمك معرفته لتحويل زيارتك الأولى إلى تجربة علاجية هادئة ومريحة بالهرم."
            : "Everything you need to know for a calm, comfortable first dental visit in Al-Haram."
        }
        crumb={isAr ? "دليل المراجع" : "Patients"}
      />

      {/* 1. What To Bring On Your First Visit */}
      <section className="container-x py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow">
              {isAr ? "الاستعداد للزيارة" : "PREPARATION"}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#0B1B3A]">
              {isAr ? "ماذا تحضر معك في موعدك الأول؟" : "What to Bring to Your Appointment"}
            </h2>
            <p className="mt-2 text-sm text-[#5B6B84]">
              {isAr
                ? "خطوات بسيطة تضمن فتح ملفك الطبي وبدء الفحص السريري دون أي تأخير."
                : "Simple checklist to ensure swift medical intake and seamless clinical evaluation."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whatToBring.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-5 rounded-xl border border-[#E3EAF3] bg-[#EEF4FB]/50 hover:bg-[#EEF4FB] transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B4FC7] text-white">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-[#0B1B3A] leading-relaxed">
                  {isAr ? item.ar : item.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Step-by-Step Visit Journey */}
      <section className="py-16 bg-[#EEF4FB]">
        <div className="container-x max-w-5xl">
          <div className="text-center mb-12">
            <span className="eyebrow">
              {isAr ? "مسار العلاج" : "CLINICAL PATHWAY"}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#0B1B3A]">
              {isAr ? "مراحل رحلتك العلاجية بالعيادة" : "Your 5-Step Clinical Journey"}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {processStepsData.map((st) => (
              <div
                key={st.step}
                className="flex flex-col justify-between rounded-xl border border-[#E3EAF3] bg-white p-5 shadow-xs"
              >
                <div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B4FC7] font-bold text-white text-xs">
                    0{st.step}
                  </span>
                  <h3 className="mt-4 font-bold text-sm text-[#0B1B3A]">
                    {tr(st.title)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5B6B84]">
                    {tr(st.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Patients FAQ */}
      <section className="container-x py-16 max-w-4xl">
        <div className="text-center mb-12">
          <span className="eyebrow">
            {isAr ? "الأسئلة الشائعة" : "PATIENT FAQS"}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-[#0B1B3A]">
            {isAr ? "استفسارات تهم كل مراجع" : "Frequently Asked Questions"}
          </h2>
        </div>

        <div className="space-y-3">
          {faqsData.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all ${
                  isOpen ? "border-[#0B4FC7] bg-[#EEF4FB]/30" : "border-[#E3EAF3] bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between p-5 text-start font-bold text-sm text-[#0B1B3A]"
                >
                  <span>{tr(faq.question)}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#0B4FC7] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#5B6B84] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-[#5B6B84] border-t border-[#E3EAF3] pt-3">
                    {tr(faq.answer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="mt-14 rounded-2xl bg-[#0B1B3A] p-8 text-center text-white">
          <h3 className="text-xl font-bold">
            {isAr ? "جاهز لبدء استشارتك مع نخبة أطباء مركز دبي؟" : "Ready for Your Consultation in Al-Haram?"}
          </h3>
          <p className="mt-2 text-xs text-white/70 max-w-md mx-auto">
            {isAr
              ? "فريقنا الطبي يرحب بك يومياً من ١:٠٠ ظهراً حتى ١١:٠٠ مساءً بالهرم."
              : "Our clinical team welcomes you daily from 1:00 PM to 11:00 PM in Al-Haram."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B4FC7] px-6 py-3 text-xs font-bold text-white hover:bg-[#083B99] transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>{isAr ? "طلب حجز موعد الآن" : "Book an Appointment"}</span>
            </Link>
            <a
              href="https://wa.me/201022013314"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>{isAr ? "استفسار عبر واتساب" : "WhatsApp Inquiry"}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
