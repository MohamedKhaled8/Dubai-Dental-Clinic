import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Lock, FileText, CheckCircle2, Mail, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { clinicData } from "@/data/clinic";
import { PageHero } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      {
        title: "إشعار الخصوصية وسرية البيانات | Privacy Notice — Dubai Dental Clinic",
      },
      {
        name: "description",
        content:
          "إشعار الخصوصية وحماية البيانات وسرية السجلات الطبية في مركز دبي لطب وجراحة وتجميل الأسنان في الهرم.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={isAr ? "سياسة الخصوصية وسرية البيانات" : "Privacy & Confidentiality Notice"}
        sub={
          isAr
            ? "نلتزم بأعلى معايير السرية والأمان المهني في التعامل مع بيانات وسجلات مراجعينا."
            : "Committed to rigorous confidentiality, ethical medical data standards, and patient privacy."
        }
        crumb={isAr ? "الخصوصية" : "Privacy"}
      />

      <section className="container-x py-16 max-w-4xl">
        <div className="rounded-3xl border border-[#C2A06A]/20 bg-white p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex items-center gap-4 border-b border-[#C2A06A]/15 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0E1F1C] text-[#C2A06A]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-[#0E1F1C]">
                {isAr ? "مبادئ الخصوصية وحماية بيانات المرضى" : "Data Protection & Ethics"}
              </h2>
              <p className="text-xs text-[#16372F]/60">
                {clinicData.name[lang]} · Al-Haram, Giza
              </p>
            </div>
          </div>

          <div className="space-y-6 text-xs md:text-sm leading-relaxed text-[#16372F]/80">
            <p className="text-sm md:text-base font-semibold text-[#0E1F1C]">
              {isAr
                ? "يضع مركز دبي لطب الأسنان خصوصية وسرية التاريخ المرضي لكل مراجع في مقدمة أولوياته الأخلاقية والمهنية."
                : "Dubai Dental Clinic places patient confidentiality, diagnostic history, and personal contact privacy at the highest professional standard."}
            </p>

            <div className="rounded-2xl border border-[#C2A06A]/20 bg-[#F6F1E7]/60 p-6 space-y-3">
              <h3 className="font-display text-base font-bold text-[#0E1F1C]">
                {isAr ? "التزاماتنا الصارمة لحماية خصوصيتك:" : "Our Core Privacy Commitments:"}
              </h3>
              <ul className="grid gap-2.5 text-xs text-[#16372F]/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    {isAr
                      ? "لا يتم بيع أو مشاركة بيانات الاتصال أو المواعيد مع أي جهات تسويقية أو أطراف ثالثة."
                      : "Contact and appointment records are never sold or shared with third-party advertisers."}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    {isAr
                      ? "الصور التشخيصية ونتائج العلاج لا تُنشر إلا بعد الحصول على موافقة خطية صريحة من المريض."
                      : "Clinical imaging and before/after cases are published exclusively after explicit patient consent."}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    {isAr
                      ? "جميع الاتصالات عبر واتساب أو الهاتف تتم من خلال القنوات الرسمية المعتمدة للعيادة فقط."
                      : "All appointment coordination is conducted through official clinic phone and WhatsApp channels."}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#C2A06A]/15 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-[#16372F]/60">
                {isAr
                  ? "لأي استفسارات بخصوص الخصوصية: "
                  : "For privacy inquiries: "}
                <a
                  href={`mailto:${clinicData.email}`}
                  className="font-bold text-[#0E1F1C] hover:underline"
                >
                  {clinicData.email}
                </a>
              </p>

              <Link to="/terms" className="text-xs font-bold text-[#C2A06A] hover:underline">
                {isAr ? "الشروط والأحكام الطبية ←" : "Medical Terms & Disclaimers →"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
