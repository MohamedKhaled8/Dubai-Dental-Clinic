import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";
import {
  Calendar,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Phone,
  Layers,
  Award,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getServiceBySlug, getServices, getDoctors } from "@/lib/repository";
import { clinicData } from "@/data/clinic";
import { servicesData } from "@/data/services";
import { doctorsData } from "@/data/doctors";
import { PageHero } from "@/components/site";
import { RealDental3DViewer } from "@/components/RealDental3DViewer";
import type { ServiceItem, DoctorItem } from "@/data/types";

export const Route = createFileRoute("/services/$slug")({
  head: () => ({
    meta: [
      {
        title: "تفاصيل الإجراء العلاجي | مركز دبي لطب وتجميل وزراعة الأسنان بالهرم",
      },
      {
        name: "description",
        content:
          "شرح سريري مفصل ومراحل العلاج والأسئلة الشائعة بمركز دبي لطب الأسنان بالهرم تحت إشراف نخبة من الاستشاريين.",
      },
    ],
  }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";

  const fallbackService = servicesData.find((s) => s.slug === slug || s.id === slug) ?? null;

  const { data: service = fallbackService, isLoading } = useQuery<ServiceItem | null>({
    queryKey: ["service", slug],
    queryFn: () => getServiceBySlug(slug),
    initialData: fallbackService,
  });

  const { data: allServices = servicesData } = useQuery<ServiceItem[]>({
    queryKey: ["services"],
    queryFn: () => getServices(),
    initialData: servicesData,
  });

  const { data: allDoctors = doctorsData } = useQuery<DoctorItem[]>({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
    initialData: doctorsData,
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (isLoading && !service) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#FBF9F4]">
        <div className="w-10 h-10 rounded-full border-2 border-[#C2A06A] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FBF9F4] px-4">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-3xl font-bold text-[#0E1F1C]">
            {isAr ? "الخدمة غير موجودة" : "Service Not Found"}
          </h1>
          <p className="mt-3 text-sm text-[#16372F]/70">
            {isAr
              ? "لم نتمكن من العثور على الإجراء الطبي المطلوب. يمكنك استعراض قائمة الخدمات المتاحة بالعيادة."
              : "The requested dental procedure could not be found. Please browse our comprehensive list of clinical services."}
          </p>
          <div className="mt-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-[#0E1F1C] px-6 py-3 text-xs font-bold text-[#C2A06A] shadow-md hover:bg-[#16372F] transition-all"
            >
              <span>{isAr ? "العودة لقائمة الخدمات" : "Back to All Services"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Resolve dynamic icon
  const iconKey = service.iconName || "Sparkles";
  const IconComponent =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconKey] ||
    Icons.Sparkles;

  // Filter attending specialists
  const relatedDoctors = allDoctors.filter(
    (d) =>
      service.relatedDoctorIds?.includes(d.id) ||
      service.relatedDoctorIds?.includes(d.slug) ||
      d.services?.includes(service.slug)
  );

  // Other services for navigation
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 4);

  const whatsappInquiryUrl = `https://wa.me/201022013314?text=${encodeURIComponent(
    isAr
      ? `مرحباً مركز دبي لطب الأسنان، أود الاستفسار وحجز استشارة بخصوص: ${tr(service.name)}`
      : `Hello Dubai Dental Clinic, I would like to inquire about and book a consultation for: ${tr(service.name)}`
  )}`;

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      {/* Editorial Page Hero */}
      <PageHero
        title={tr(service.name)}
        sub={tr(service.tagline)}
        crumb={tr(service.name)}
      />

      <section className="container-x py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] items-start">
          {/* Main Content Column */}
          <div className="space-y-10">
            {/* 1. Clinical Overview Card */}
            <div className="rounded-[2.5rem] border border-[#C2A06A]/25 bg-white p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A06A]">
                <Sparkles className="w-4 h-4 text-[#C2A06A]" />
                <span>{isAr ? "نظرة سريرية عامة" : "Clinical Overview"}</span>
              </div>

              <h2 className="mt-3 font-serif text-2xl md:text-3xl font-bold text-[#0E1F1C]">
                {tr(service.name)}
              </h2>

              <p className="mt-2 text-sm md:text-base font-medium text-[#C2A06A]">
                {tr(service.tagline)}
              </p>

              {/* Multi-paragraph Medical Overview */}
              <div className="mt-6 space-y-4 text-sm md:text-base leading-relaxed text-[#16372F]/85">
                {Array.isArray(service.overview) &&
                  service.overview.map((para, i) => (
                    <p key={i} className="leading-relaxed">
                      {tr(para)}
                    </p>
                  ))}
              </div>

              {/* 2. Who It Is For (Checklist) */}
              {Array.isArray(service.whoItIsFor) && service.whoItIsFor.length > 0 && (
                <div className="mt-10 rounded-3xl border border-[#C2A06A]/30 bg-[#F6F1E7]/70 p-6 md:p-8">
                  <h3 className="font-serif text-lg font-bold text-[#0E1F1C] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C2A06A]" />
                    <span>{isAr ? "لمن يناسب هذا الإجراء العلاجي؟" : "Who Is This Treatment For?"}</span>
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.whoItIsFor.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white/80 border border-[#C2A06A]/20 shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C2A06A] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-[#16372F]/90 leading-relaxed">
                          {tr(item)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. What To Expect (Step-by-Step Clinical Timeline) */}
            {Array.isArray(service.whatToExpect) && service.whatToExpect.length > 0 && (
              <div className="rounded-[2.5rem] border border-[#C2A06A]/25 bg-white p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A06A]">
                  <Clock className="w-4 h-4 text-[#C2A06A]" />
                  <span>{isAr ? "مراحل العلاج والزيارة" : "What To Expect"}</span>
                </div>

                <h2 className="mt-3 font-serif text-2xl font-bold text-[#0E1F1C]">
                  {isAr ? "خطوات الزيارة والإجراء السريري" : "Step-by-Step Treatment Journey"}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#16372F]/70">
                  {isAr
                    ? "نوضح لك كل خطوة مقبلة بمنتهى الشفافية والهدوء لضمان راحتك التامة."
                    : "Transparent, step-by-step guidance so you remain informed and relaxed."}
                </p>

                <div className="mt-8 space-y-4">
                  {service.whatToExpect.map((st, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-4 p-5 rounded-2xl border border-[#C2A06A]/20 bg-[#FBF9F4] hover:border-[#C2A06A]/50 hover:bg-[#F6F1E7]/50 transition-all shadow-2xs"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0E1F1C] text-[#C2A06A] font-serif text-sm font-bold shadow-xs group-hover:scale-105 transition-transform">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm md:text-base text-[#0E1F1C]">
                          {tr(st.title)}
                        </h4>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#16372F]/75 leading-relaxed">
                          {tr(st.desc)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Interactive 3D Anatomy Viewer for Implants / Prosthetics */}
            {(service.slug === "dental-implants" ||
              service.slug === "fixed-prosthesis" ||
              service.slug === "dental-veneers") && (
              <div className="rounded-[2.5rem] border border-[#C2A06A]/25 bg-white p-4 sm:p-6 shadow-sm overflow-hidden">
                <RealDental3DViewer />
              </div>
            )}

            {/* 5. Service-Specific FAQs */}
            {Array.isArray(service.faqs) && service.faqs.length > 0 && (
              <div className="rounded-[2.5rem] border border-[#C2A06A]/25 bg-white p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2A06A]">
                  <HelpCircle className="w-4 h-4 text-[#C2A06A]" />
                  <span>{isAr ? "أسئلة سريرية شائعة" : "Procedure FAQs"}</span>
                </div>

                <h2 className="mt-3 font-serif text-2xl font-bold text-[#0E1F1C] mb-6">
                  {isAr ? "إجابات أطباء واستشاريي مركز دبي لطب الأسنان" : "Specialist Clinical Answers"}
                </h2>

                <div className="space-y-3.5">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all ${
                          isOpen
                            ? "border-[#C2A06A] bg-[#F6F1E7]/50 shadow-xs"
                            : "border-[#C2A06A]/20 bg-[#FBF9F4] hover:border-[#C2A06A]/40"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0E1F1C]"
                        >
                          <span>{tr(faq.q)}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#C2A06A] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#16372F]/50 shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm leading-relaxed text-[#16372F]/80 border-t border-[#C2A06A]/10 pt-3">
                            {tr(faq.a)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. Mandatory Clinical Footnote */}
            <div className="rounded-2xl border border-[#C2A06A]/40 bg-[#F6F1E7] p-5 text-xs text-[#16372F] flex items-start gap-3 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-[#C2A06A] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-bold text-[#0E1F1C]">
                  {isAr ? "تنويه طبي هام: " : "Clinical Notice: "}
                </span>
                {isAr
                  ? "تُحدد الخطط العلاجية والتكاليف ومدد العلاج بدقة فقط بعد الفحص السريري والأشعة التشخيصية ثلاثية الأبعاد (CBCT) من قِبل الطبيب المختص داخل مركز دبي لطب الأسنان بالهرم."
                  : "Treatment plans, durations, and costs are determined strictly after clinical examination and diagnostic 3D imaging (CBCT) by the attending specialist at Dubai Dental Clinic Al-Haram."}
              </p>
            </div>
          </div>

          {/* Sidebar Column: Service Emblem, Booking CTAs, Specialists, Other Services */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Service Emblem Card */}
            <div className="rounded-[2.5rem] border border-[#C2A06A]/30 bg-white p-8 text-center shadow-md">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0E1F1C] text-[#C2A06A] mx-auto shadow-md">
                <IconComponent className="w-10 h-10 text-[#C2A06A]" />
              </div>

              <h3 className="mt-5 font-serif text-xl font-bold text-[#0E1F1C]">
                {tr(service.name)}
              </h3>
              <p className="mt-1.5 text-xs text-[#16372F]/70 leading-relaxed">
                {tr(service.tagline)}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-[#F6F1E7] px-3 py-1 text-[11px] font-bold text-[#16372F] border border-[#C2A06A]/20">
                  <ShieldCheck className="w-3.5 h-3.5 inline text-[#C2A06A] me-1" />
                  {isAr ? "تعقيم جراحي Class B" : "Sterile Standard"}
                </span>
                <span className="rounded-full bg-[#F6F1E7] px-3 py-1 text-[11px] font-bold text-[#16372F] border border-[#C2A06A]/20">
                  <Clock className="w-3.5 h-3.5 inline text-[#C2A06A] me-1" />
                  {isAr ? "يومياً ٢ - ١٠ م" : "Daily 2-10 PM"}
                </span>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  to="/book"
                  search={{ service: service.slug }}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#0E1F1C] px-6 py-3.5 text-xs font-bold text-[#F6F1E7] shadow-md hover:bg-[#16372F] active:scale-98 transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#C2A06A]" />
                  <span>{isAr ? "طلب حجز موعد لهذه الخدمة" : "Book This Service"}</span>
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

            {/* Attending Specialists Card */}
            {relatedDoctors.length > 0 && (
              <div className="rounded-[2.25rem] border border-[#C2A06A]/25 bg-white p-6 shadow-xs">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#16372F]/70 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C2A06A]" />
                  <span>{isAr ? "الأطباء المشرفون على الإجراء" : "Attending Specialists"}</span>
                </h4>

                <div className="space-y-3">
                  {relatedDoctors.map((doc) => {
                    const initials =
                      typeof doc.initials === "object" && doc.initials !== null
                        ? isAr
                          ? doc.initials.ar
                          : doc.initials.en
                        : String(doc.initials || "");

                    return (
                      <Link
                        key={doc.id}
                        to="/doctors/$slug"
                        params={{ slug: doc.slug }}
                        className="group flex items-center justify-between p-3.5 rounded-2xl border border-[#C2A06A]/20 bg-[#FBF9F4] hover:border-[#C2A06A] hover:bg-[#F6F1E7]/60 transition-all shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-[#0E1F1C] text-[#C2A06A] flex items-center justify-center font-serif text-xs font-bold shadow-xs group-hover:scale-105 transition-transform">
                            {initials}
                          </div>
                          <div>
                            <p className="font-serif font-bold text-xs sm:text-sm text-[#0E1F1C] group-hover:text-[#C2A06A] transition-colors">
                              {tr(doc.name)}
                            </p>
                            <p className="text-[11px] text-[#16372F]/65 mt-0.5">{tr(doc.role)}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C2A06A] rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Other Services Navigation Card */}
            {otherServices.length > 0 && (
              <div className="rounded-[2.25rem] border border-[#C2A06A]/25 bg-white p-6 shadow-xs">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#16372F]/70 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C2A06A]" />
                  <span>{isAr ? "خدمات طبية أخرى بالعيادة" : "Other Clinical Services"}</span>
                </h4>

                <div className="space-y-2 text-xs">
                  {otherServices.map((os) => (
                    <Link
                      key={os.slug}
                      to="/services/$slug"
                      params={{ slug: os.slug }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F6F1E7] text-[#0E1F1C] font-semibold transition-colors"
                    >
                      <span>• {tr(os.name)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C2A06A] rtl:-scale-x-100 opacity-60" />
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[#C2A06A]/15 text-center">
                  <Link
                    to="/services"
                    className="text-xs font-bold text-[#C2A06A] hover:underline"
                  >
                    {isAr ? "استعراض جميع الخدمات العشرة ←" : "Explore All 10 Services →"}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 start-0 end-0 z-40 border-t border-[#C2A06A]/30 bg-white/95 px-4 py-3 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2">
          <Link
            to="/book"
            search={{ service: service.slug }}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#0E1F1C] py-3 text-xs font-bold text-[#F6F1E7] shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C2A06A]" />
            <span>{isAr ? "طلب حجز موعد" : "Book Service"}</span>
          </Link>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
