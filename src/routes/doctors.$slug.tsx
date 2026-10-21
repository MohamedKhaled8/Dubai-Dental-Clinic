import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import {
  Calendar,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  ShieldCheck,
  Clock,
  Sparkles,
  Stethoscope,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getDoctorBySlug, getServices } from "@/lib/repository";
import { clinicData } from "@/data/clinic";
import { doctorsData } from "@/data/doctors";
import { servicesData } from "@/data/services";
import { PageHero } from "@/components/site";
import type { DoctorItem, ServiceItem } from "@/data/types";

export const Route = createFileRoute("/doctors/$slug")({
  head: () => ({
    meta: [
      {
        title: "الملف السريري للطبيب | مركز دبي لطب وجراحة وتجميل الأسنان بالهرم",
      },
      {
        name: "description",
        content:
          "تعرف على الخبرات السريرية والمؤهلات الأكاديمية والتخصصات المعتمدة لأطباء مركز دبي لطب الأسنان بالهرم.",
      },
    ],
  }),
  component: DoctorDetailPage,
});

function DoctorDetailPage() {
  const { slug } = Route.useParams();
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";

  const fallbackDoctor = doctorsData.find((d) => d.slug === slug || d.id === slug) ?? null;

  const { data: doctor = fallbackDoctor, isLoading } = useQuery<DoctorItem | null>({
    queryKey: ["doctor", slug],
    queryFn: () => getDoctorBySlug(slug),
    initialData: fallbackDoctor,
  });

  const { data: allServices = servicesData } = useQuery<ServiceItem[]>({
    queryKey: ["services"],
    queryFn: () => getServices(),
    initialData: servicesData,
  });

  if (isLoading && !doctor) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#FBF9F4]">
        <div className="w-10 h-10 rounded-full border-2 border-[#C2A06A] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FBF9F4] px-4">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-3xl font-bold text-[#0E1F1C]">
            {isAr ? "لم يتم العثور على الطبيب" : "Doctor Not Found"}
          </h1>
          <p className="mt-3 text-sm text-[#16372F]/70">
            {isAr
              ? "لم نتمكن من العثور على الملف التعريفي المطلوب. يمكنك مراجعة قائمة الفريق الطبي الكاملة."
              : "The requested doctor profile could not be found. Please check our complete directory of specialists."}
          </p>
          <div className="mt-6">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 rounded-full bg-[#0E1F1C] px-6 py-3 text-xs font-bold text-[#C2A06A] shadow-md hover:bg-[#16372F] transition-all"
            >
              <span>{isAr ? "العودة لقائمة الأطباء" : "Back to Doctors Directory"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const initials =
    typeof doctor.initials === "object" && doctor.initials !== null
      ? isAr
        ? doctor.initials.ar
        : doctor.initials.en
      : String(doctor.initials || "");

  const relatedServices = allServices.filter(
    (s) => doctor.services?.includes(s.slug) || doctor.services?.includes(s.id)
  );

  const whatsappInquiryUrl = `https://wa.me/201022013314?text=${encodeURIComponent(
    isAr
      ? `مرحباً مركز دبي لطب الأسنان، أود الاستفسار وحجز موعد مع: ${tr(doctor.name)} (${tr(doctor.role)})`
      : `Hello Dubai Dental Clinic, I would like to inquire about booking an appointment with: ${tr(doctor.name)}`
  )}`;

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      <PageHero
        title={tr(doctor.name)}
        sub={tr(doctor.role)}
        crumb={tr(doctor.name)}
      />

      <section className="container-x py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.75fr] items-start">
          {/* Monogram Portrait Frame & Booking Action */}
          <div className="rounded-[2.5rem] border border-[#C2A06A]/30 bg-white p-8 shadow-md text-center lg:sticky lg:top-28">
            <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-3xl bg-gradient-to-b from-[#16372F] to-[#0E1F1C] text-white shadow-xl border-2 border-[#C2A06A]/50">
              <span
                className="font-serif text-3xl font-bold tracking-widest text-[#C2A06A]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {initials}
              </span>
              <div className="absolute -bottom-3 rounded-full bg-[#0E1F1C] px-3.5 py-1 text-[10px] font-bold text-[#C2A06A] border border-[#C2A06A]/40 shadow-xs">
                {isAr ? "استشاري معتمد بالمركز" : "Certified Specialist"}
              </div>
            </div>

            <h2 className="mt-7 font-serif text-2xl font-bold text-[#0E1F1C]">
              {tr(doctor.name)}
            </h2>
            <p className="mt-1 text-xs font-semibold text-[#C2A06A]">{tr(doctor.role)}</p>
            <p className="mt-1 text-xs text-[#16372F]/70">{tr(doctor.specialty)}</p>

            <div className="mt-6 pt-6 border-t border-[#C2A06A]/20 space-y-3 text-xs text-[#16372F]/80 text-start">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C2A06A] shrink-0" />
                <span>{isAr ? "المواعيد: يومياً ٢:٠٠ ظهراً – ١٠:٠٠ مساءً" : "Hours: Daily 2:00 PM – 10:00 PM"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C2A06A] shrink-0" />
                <span>{isAr ? "تعقيم جراحي معتمد European Class B" : "European Class B Sterilization"}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                to="/book"
                search={{ doctor: doctor.slug }}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-[#0E1F1C] px-6 py-3.5 text-xs font-bold text-[#F6F1E7] shadow-md hover:bg-[#16372F] active:scale-98 transition-all"
              >
                <Calendar className="w-4 h-4 text-[#C2A06A]" />
                <span>{isAr ? "طلب حجز موعد مع الطبيب" : "Request Appointment"}</span>
              </Link>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full border border-[#C2A06A]/40 bg-white px-6 py-3 text-xs font-bold text-[#0E1F1C] hover:bg-[#F6F1E7] active:scale-98 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? "استفسار مباشر عبر واتساب" : "Direct WhatsApp Inquiry"}</span>
              </a>
            </div>
          </div>

          {/* Bio, Credentials, and Related Services */}
          <div className="space-y-8">
            {/* Bio Card */}
            <div className="rounded-[2.5rem] border border-[#C2A06A]/25 bg-white p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A06A]">
                <Stethoscope className="w-4 h-4 text-[#C2A06A]" />
                <span>{isAr ? "المسار السريري والخبرة" : "Clinical Profile"}</span>
              </div>

              <h3 className="mt-3 font-serif text-2xl font-bold text-[#0E1F1C]">
                {isAr ? "نبذة عن الطبيب والتخصص" : "About & Clinical Focus"}
              </h3>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-[#16372F]/85">
                {tr(doctor.bio)}
              </p>
            </div>

            {/* Credentials Card */}
            {Array.isArray(doctor.credentials) && doctor.credentials.length > 0 && (
              <div className="rounded-[2.5rem] border border-[#C2A06A]/25 bg-white p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A06A]">
                  <GraduationCap className="w-4 h-4 text-[#C2A06A]" />
                  <span>{isAr ? "المؤهلات والعضويات الأكاديمية" : "Credentials & Memberships"}</span>
                </div>

                <h3 className="mt-3 font-serif text-xl font-bold text-[#0E1F1C] mb-6">
                  {isAr ? "الاعتمادات الطبية" : "Professional Qualifications"}
                </h3>

                <div className="space-y-3">
                  {doctor.credentials.map((cred, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl border border-[#C2A06A]/20 bg-[#FBF9F4] shadow-2xs"
                    >
                      <Award className="w-5 h-5 text-[#C2A06A] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-[#0E1F1C]">
                        {tr(cred)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="rounded-[2.5rem] border border-[#C2A06A]/25 bg-white p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A06A]">
                  <Sparkles className="w-4 h-4 text-[#C2A06A]" />
                  <span>{isAr ? "الإجراءات الطبية المعتمدة" : "Clinical Procedures"}</span>
                </div>

                <h3 className="mt-3 font-serif text-xl font-bold text-[#0E1F1C] mb-6">
                  {isAr ? "الخدمات التي يشرف عليها الطبيب" : "Services Under Doctor's Care"}
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedServices.map((s) => {
                    const iconKey = s.iconName || "Sparkles";
                    const IconComp =
                      (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconKey] ||
                      Icons.Sparkles;

                    return (
                      <Link
                        key={s.slug}
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="group flex items-start gap-3.5 p-4 rounded-2xl border border-[#C2A06A]/20 bg-[#FBF9F4] hover:border-[#C2A06A] hover:bg-[#F6F1E7]/50 transition-all shadow-2xs"
                      >
                        <div className="p-2.5 rounded-xl bg-[#0E1F1C] text-[#C2A06A] group-hover:scale-105 transition-transform shrink-0">
                          <IconComp className="w-5 h-5 text-[#C2A06A]" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#0E1F1C] group-hover:text-[#C2A06A] transition-colors">
                            {tr(s.name)}
                          </h4>
                          <p className="text-xs text-[#16372F]/70 line-clamp-2 mt-1">
                            {tr(s.tagline)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reassuring Clinical Note */}
            <div className="rounded-2xl border border-[#C2A06A]/40 bg-[#F6F1E7] p-5 text-xs text-[#16372F]/85 leading-relaxed flex items-start gap-3 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-[#C2A06A] shrink-0 mt-0.5" />
              <p>
                <span className="font-bold text-[#0E1F1C]">
                  {isAr ? "ملاحظة طبية هامة: " : "Clinical Notice: "}
                </span>
                {isAr
                  ? "يتم تحديد الخطة العلاجية والبدائل المناسبة لكل مراجع بناءً على الفحص السريري الدقيق والأشعة التشخيصية داخل مركز دبي لطب الأسنان بالهرم."
                  : "Treatment plans and appropriate options are determined after thorough clinical examination and diagnostic imaging at Dubai Dental Clinic Al-Haram."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
