import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/site";
import { clinicData } from "@/data/clinic";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={isAr ? "الشروط والأحكام الطبية" : "Terms & Medical Disclaimers"}
        sub={
          isAr
            ? "سياسات الاستخدام والشفافية الطبية لمركز دبي لطب وتجميل الأسنان بالهرم."
            : "Usage policies and medical disclosures for Dubai Dental Clinic in Al-Haram, Giza."
        }
        crumb={isAr ? "الشروط والأحكام" : "Terms"}
      />

      <section className="container-x py-16 max-w-4xl">
        <div className="space-y-8 rounded-3xl border border-[#C2A06A]/20 bg-white p-8 md:p-12 shadow-sm text-sm leading-relaxed text-[#16372F]/90">
          {/* Medical Disclaimer Banner */}
          <div className="rounded-2xl border border-[#C2A06A]/40 bg-[#F6F1E7] p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#C2A06A] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-base text-[#0E1F1C]">
                {isAr ? "إخلاء مسؤولية طبي هام" : "Important Clinical Disclaimer"}
              </h2>
              <p className="mt-1 text-xs md:text-sm text-[#16372F]/80 leading-relaxed">
                {isAr
                  ? "تُحدد الخطط العلاجية والتكاليف بدقة فقط بعد الفحص السريري والأشعة التشخيصية من قِبل الطبيب المختص داخل العيادة. المعلومات المنشورة على هذا الموقع تعليمية وإرشادية، ولا تغني عن الاستشارة السريرية المباشرة."
                  : "Treatment plans and procedures are determined exclusively after in-person clinical examination and diagnostic imaging by the specialized doctor at the clinic. Content published on this website is educational and does not substitute for a clinical consultation."}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-[#0E1F1C] mb-3">
              {isAr ? "١. طلبات الحجز المبدئية عبر الإنترنت" : "1. Online Booking Requests"}
            </h3>
            <p>
              {isAr
                ? "يُعد نموذج الحجز المتوفر عبر الموقع الإلكتروني طلب حجز مبدئي لتحديد التفضيلات، ولا يعتبر حجزاً نهائياً أو ملزماً حتى يتم تأكيده من قِبل قسم الاستقبال والتنسيق بالعيادة عبر مكالمة هاتفية أو رسالة واتساب رسمية."
                : "The online booking form serves as a preliminary scheduling request. It is not final or binding until officially confirmed by our reception desk via phone call or WhatsApp message."}
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-[#0E1F1C] mb-3">
              {isAr ? "٢. الخصوصية وسرية بيانات المرضى" : "2. Privacy & Patient Confidentiality"}
            </h3>
            <p>
              {isAr
                ? "يلتزم مركز دبي لطب الأسنان بالحفاظ التام على سرية السجلات والبيانات الطبية لجميع مراجعيه، ولا يتم مشاركة أي بيانات اتصال أو معلومات علاجية مع أي طرف ثالث تجاري أو تسويقي."
                : "Dubai Dental Clinic strictly adheres to patient confidentiality and medical ethics. Contact details and clinical notes are never shared with third-party advertisers."}
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-[#0E1F1C] mb-3">
              {isAr ? "٣. معايير التعقيم والسلامة" : "3. Sterilization & Safety Protocols"}
            </h3>
            <p>
              {isAr
                ? "يعتمد مركز دبي لطب الأسنان بروتوكول تعقيم أوروبي متقدم (Class B Autoclave) مع فحص كيميائي وحراري دوري لكل دورة تعقيم لضمان أعلى مستويات الأمان البيولوجي للمرضى والفريق الطبي."
                : "The clinic adheres to hospital-grade Class B European sterilization standards, with routine biological and chemical indicators for each cycle to guarantee maximum clinical safety."}
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-[#0E1F1C] mb-3">
              {isAr ? "٤. حقوق الملكية الفكرية" : "4. Intellectual Property"}
            </h3>
            <p>
              {isAr
                ? "جميع النصوص والمحتويات التحريرية والتصاميم والشعارات المنشورة على هذا الموقع محمية ومملوكة حصرياً لمركز دبي لطب وجراحة وتجميل الأسنان."
                : "All editorial content, design assets, trademarks, and visual materials on this website are protected and proprietary to Dubai Dental Clinic."}
            </p>
          </div>

          <div className="pt-6 border-t border-[#C2A06A]/20 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-[#16372F]/60">
              {isAr ? "آخر تحديث: أكتوبر ٢٠٢٦" : "Last updated: October 2026"}
            </span>

            <div className="flex gap-4">
              <Link to="/privacy" className="font-bold text-[#0E1F1C] hover:underline">
                {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
              <Link to="/contact" className="font-bold text-[#0E1F1C] hover:underline">
                {isAr ? "تواصل معنا" : "Contact Clinic"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
