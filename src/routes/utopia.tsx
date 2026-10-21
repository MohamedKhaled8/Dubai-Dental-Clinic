import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  ExternalLink,
  User,
  HeartHandshake,
  Award,
  Layers,
  ArrowRight,
  Smile,
  Check,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import {
  getClinic,
  getDoctors,
  getServices,
  getReviews,
  getGalleryCases,
  createBooking,
} from "@/lib/repository";
import { clinicData } from "@/data/clinic";
import { doctorsData } from "@/data/doctors";
import { servicesData } from "@/data/services";
import { reviewsData } from "@/data/reviews";
import { galleryData } from "@/data/gallery";
import type { ServiceItem, DoctorItem, ReviewItem, GalleryCase } from "@/data/types";

export const Route = createFileRoute("/utopia")({
  head: () => ({
    meta: [
      {
        title: "مركز دبي لطب وتجميل وزراعة الأسنان بالهرم | Dubai Dental Clinic",
      },
      {
        name: "description",
        content:
          "مركز دبي لطب وتجميل وزراعة الأسنان في الهرم، الجيزة (محطة العريش، برج المروة). تجربة علاجية مريحة وفائقة التعقيم تحت إشراف نخبة من الاستشاريين. احجز استشارتك الآن.",
      },
      {
        property: "og:title",
        content: "مركز دبي لطب الأسنان بالهرم | Dubai Dental Clinic",
      },
      {
        property: "og:description",
        content: "Specialist Dental Care & Implantology in Al-Haram, Giza.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";

  // Data queries with initialData for instant SSR rendering
  const { data: clinic = clinicData } = useQuery({
    queryKey: ["clinic"],
    queryFn: () => getClinic(),
    initialData: clinicData,
  });

  const { data: services = servicesData } = useQuery<ServiceItem[]>({
    queryKey: ["services"],
    queryFn: () => getServices(),
    initialData: servicesData,
  });

  const { data: doctors = doctorsData } = useQuery<DoctorItem[]>({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
    initialData: doctorsData,
  });

  const { data: reviews = reviewsData } = useQuery<ReviewItem[]>({
    queryKey: ["reviews"],
    queryFn: () => getReviews(),
    initialData: reviewsData,
  });

  const { data: gallery = galleryData } = useQuery<GalleryCase[]>({
    queryKey: ["gallery"],
    queryFn: () => getGalleryCases(),
    initialData: galleryData,
  });

  // Hero Quick Booking Form State
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formService, setFormService] = useState("dental-implants");
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState<"afternoon" | "evening">("afternoon");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Testimonials Carousel State
  const [reviewIdx, setReviewIdx] = useState(0);

  const handleHeroBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    setFormSubmitting(true);
    try {
      await createBooking({
        patientName: formName.trim(),
        phone: formPhone.trim(),
        ...(formEmail.trim() ? { email: formEmail.trim() } : {}),
        serviceIds: [formService],
        doctorId: null,
        date: formDate ? formDate : (new Date().toISOString().split("T")[0] ?? ""),
        timeWindow: formTime,
        isChild: formService === "pediatric-dentistry",
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // 5 Homepage Core Services per reference spec:
  // 1. Dental Implants, 2. Root Canal Treatment, 3. Orthodontics, 4. Dental Veneers, 5. Pediatric Dentistry
  const homeServicesSlugs = [
    "dental-implants",
    "root-canal",
    "orthodontics",
    "dental-veneers",
    "pediatric-dentistry",
  ];
  const featuredServices = homeServicesSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as ServiceItem[];

  // 5 Confirmed Doctors
  const confirmedDoctors = doctors.slice(0, 5);

  // Testimonials Carousel Controls
  const totalReviews = reviews.length;
  const nextReview = () => setReviewIdx((prev) => (prev + 1) % totalReviews);
  const prevReview = () => setReviewIdx((prev) => (prev - 1 + totalReviews) % totalReviews);

  const visibleReviews = [
    reviews[reviewIdx],
    reviews[(reviewIdx + 1) % totalReviews],
    reviews[(reviewIdx + 2) % totalReviews],
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white text-[#0B1B3A] selection:bg-[#0B4FC7] selection:text-white">
      {/* =========================================================================
          SECTION 3: HERO (Pixel-Faithful Reproduction of Reference Image)
          ========================================================================= */}
      <section className="relative overflow-hidden bg-white min-h-[620px] lg:min-h-[680px] flex items-center border-b border-[#E3EAF3]">
        {/* Full-width Photo Background: smiling patient & male dentist in navy scrubs */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right_15%] rtl:bg-[center_left_15%]"
          style={{ backgroundImage: "url('/images/hero_dental_clinic.jpg')" }}
        />

        {/* Soft directional white gradient: ensures 100% readable text on the text side while keeping patient & doctor bright and visible */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-white/90 to-transparent lg:w-3/5 rtl:bg-gradient-to-l rtl:from-white rtl:via-white/90 rtl:to-transparent" />

        <div className="container-x relative z-10 py-10 lg:py-14 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
            {/* Left Column: Eyebrow, H1 (navy + blue), Paragraph, 2 Buttons, 3 Trust Badges */}
            <div className="w-full lg:max-w-[480px] xl:max-w-[520px] shrink-0">
              <span className="inline-block text-[#0B4FC7] font-bold text-xs uppercase tracking-wider mb-3">
                {isAr
                  ? "رعاية أسنان موثوقة لجميع أفراد العائلة"
                  : "Trusted Dental Care for the Whole Family"}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12]">
                <span className="block text-[#0B1B3A]">
                  {isAr ? "ابتسامة صحية،" : "Healthy Smile,"}
                </span>
                <span className="block text-[#0B4FC7]">
                  {isAr ? "حياة سعيدة" : "Happy Life"}
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#5B6B84] leading-relaxed max-w-lg">
                {isAr
                  ? "نجمع بين أحدث التقنيات الطبية المتطورة والرعاية الطبية الفائقة لنمنحك الابتسامة المشرقة التي تستحقها في مركز دبي لطب الأسنان بالهرم."
                  : "We combine advanced technology with compassionate care to give you the smile you deserve."}
              </p>

              {/* Action Buttons: Solid Blue + Outline */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B4FC7] px-6 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#083B99] active:scale-98 transition-all uppercase tracking-wider"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{isAr ? "احجز موعداً" : "BOOK APPOINTMENT"}</span>
                </Link>

                <a
                  href="tel:+201022013314"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#0B4FC7] bg-white px-6 py-3.5 text-xs font-bold text-[#0B4FC7] hover:bg-[#EEF4FB] active:scale-98 transition-all uppercase tracking-wider"
                >
                  <Phone className="h-4 w-4" />
                  <span>{isAr ? "اتصل بنا" : "CALL US"}</span>
                </a>
              </div>

              {/* Three Trust Items with Outline Icons */}
              <div className="mt-8 pt-6 border-t border-[#E3EAF3] grid grid-cols-3 gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0B4FC7]/30 bg-[#EEF4FB] text-[#0B4FC7]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B1B3A] leading-tight">
                      {isAr ? "تقنيات متقدمة" : "Advanced Technology"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0B4FC7]/30 bg-[#EEF4FB] text-[#0B4FC7]">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B1B3A] leading-tight">
                      {isAr ? "أطباء استشاريون" : "Experienced Dentists"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0B4FC7]/30 bg-[#EEF4FB] text-[#0B4FC7]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B1B3A] leading-tight">
                      {isAr ? "بيئة مريحة وهادئة" : "Comfortable Environment"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Card "Book an Appointment" (Compact & Pixel-Faithful) */}
            <div className="w-full lg:w-[350px] xl:w-[370px] shrink-0">
              <div className="rounded-xl border border-[#E3EAF3] bg-white p-5 sm:p-6 shadow-xl">
                <h3 className="text-lg font-bold text-[#0B1B3A]">
                  {isAr ? "طلب حجز موعد" : "Book an Appointment"}
                </h3>

                {formSubmitted ? (
                  <div className="mt-4 rounded-lg bg-[#EEF4FB] p-4 text-center">
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#0B4FC7] text-white">
                      <Check className="h-4 w-4" />
                    </div>
                    <h4 className="mt-2 font-bold text-xs text-[#0B1B3A]">
                      {isAr ? "تم إرسال طلب الحجز بنجاح" : "Booking Request Received"}
                    </h4>
                    <p className="mt-1 text-[11px] text-[#5B6B84]">
                      {isAr
                        ? "شكراً لتواصلك مع مركز دبي لطب الأسنان. سيتصل بك فريق الاستقبال لتأكيد الوقت."
                        : "Thank you. Our team will call you promptly to confirm your visit."}
                    </p>

                    <div className="mt-3 space-y-1.5">
                      <a
                        href={`https://wa.me/201022013314?text=${encodeURIComponent(
                          isAr
                            ? `مرحباً مركز دبي لطب الأسنان، قمت بطلب حجز موعد باسم ${formName} لخدمة ${formService}`
                            : `Hello Dubai Dental Clinic, I submitted a booking request under name ${formName} for ${formService}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full rounded-md bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                      >
                        <span>{isAr ? "متابعة فورية عبر واتساب" : "Chat on WhatsApp"}</span>
                      </a>

                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormName("");
                          setFormPhone("");
                          setFormEmail("");
                        }}
                        className="w-full text-center text-[11px] text-[#0B4FC7] hover:underline pt-1"
                      >
                        {isAr ? "طلب موعد جديد" : "Submit another request"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleHeroBookingSubmit} className="mt-3.5 space-y-2.5">
                    {/* Your Name */}
                    <div>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={isAr ? "الاسم الكريم *" : "Your Name"}
                        className="w-full rounded-md border border-[#E3EAF3] px-3 py-2 text-xs text-[#0B1B3A] placeholder:text-gray-400 focus:border-[#0B4FC7] focus:outline-none"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder={isAr ? "رقم الهاتف المحمول *" : "Phone Number"}
                        className="w-full rounded-md border border-[#E3EAF3] px-3 py-2 text-xs text-[#0B1B3A] placeholder:text-gray-400 focus:border-[#0B4FC7] focus:outline-none text-start"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <input
                        type="email"
                        dir="ltr"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder={isAr ? "البريد الإلكتروني" : "Email Address"}
                        className="w-full rounded-md border border-[#E3EAF3] px-3 py-2 text-xs text-[#0B1B3A] placeholder:text-gray-400 focus:border-[#0B4FC7] focus:outline-none text-start"
                      />
                    </div>

                    {/* Select Service */}
                    <div>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full rounded-md border border-[#E3EAF3] px-3 py-2 text-xs text-[#0B1B3A] bg-white focus:border-[#0B4FC7] focus:outline-none"
                      >
                        <option value="" disabled>{isAr ? "اختر الخدمة المطلوبة" : "Select Service"}</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.slug}>
                            {tr(s.name)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date & Time Window */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full rounded-md border border-[#E3EAF3] px-2.5 py-1.5 text-xs text-[#0B1B3A] bg-white focus:border-[#0B4FC7] focus:outline-none"
                        />
                      </div>

                      <div>
                        <select
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value as "afternoon" | "evening")}
                          className="w-full rounded-md border border-[#E3EAF3] px-2.5 py-1.5 text-xs text-[#0B1B3A] bg-white focus:border-[#0B4FC7] focus:outline-none"
                        >
                          <option value="afternoon">{isAr ? "ظهراً ٢-٦ م" : "Afternoon 2-6 PM"}</option>
                          <option value="evening">{isAr ? "مساءً ٦-١٠ م" : "Evening 6-10 PM"}</option>
                        </select>
                      </div>
                    </div>

                    {/* Full-width solid blue "BOOK NOW" */}
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full rounded-md bg-[#0B4FC7] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#083B99] active:scale-98 transition-all disabled:opacity-50 uppercase tracking-wider"
                    >
                      {formSubmitting
                        ? isAr
                          ? "جاري الإرسال..."
                          : "Submitting..."
                        : isAr
                        ? "احجز الآن"
                        : "BOOK NOW"}
                    </button>

                    {/* Below: "Or call us 010 2201 3314" */}
                    <p className="text-center text-[11px] text-[#5B6B84] pt-0.5">
                      {isAr ? "أو اتصل بنا مباشرة: " : "Or call us "}
                      <a
                        href="tel:+201022013314"
                        className="font-bold text-[#0B4FC7] hover:underline"
                        dir="ltr"
                      >
                        010 2201 3314
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SERVICES (Centered eyebrow, 5 white cards in one row)
          ========================================================================= */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#0B4FC7] font-bold text-xs uppercase tracking-wider">
              {isAr ? "خدماتنا العلاجية" : "OUR SERVICES"}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] tracking-tight">
              {isAr ? "رعاية أسنان متكاملة" : "Comprehensive Dental Care"}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#5B6B84] leading-relaxed">
              {isAr
                ? "عشر خدمات تخصصية في مكان واحد بالهرم بأحدث الأجهزة وتقنيات التعقيم الأوروبية."
                : "Ten specialized clinical departments under one roof in Al-Haram with modern digital diagnostics."}
            </p>
          </div>

          {/* 5 Equal Cards in One Row (Desktop) / Clean Vertical on Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* 1. Dental Implants */}
            <Link
              to="/services/$slug"
              params={{ slug: "dental-implants" }}
              className="group flex flex-col items-center text-center rounded-xl border border-[#E3EAF3] bg-white p-6 shadow-xs hover:border-[#0B4FC7] hover:shadow-md transition-all"
            >
              <div className="flex h-14 w-14 items-center justify-center text-[#0B4FC7] group-hover:scale-105 transition-transform">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3C5.5 3 4 4.5 4 6.5C4 9.5 6 11 8 11.5V13H16V11.5C18 11.0 20 9.5 20 6.5C20 4.5 18.5 3 17 3C14.5 3 13.5 4.5 12 4.5C10.5 4.5 9.5 3 7 3Z" />
                  <path d="M9 13V20C9 20.6 9.4 21 10 21H14C14.6 21 15 20.6 15 20V13" />
                  <line x1="8" y1="15" x2="16" y2="15" />
                  <line x1="8" y1="17.5" x2="16" y2="17.5" />
                </svg>
              </div>
              <h3 className="mt-4 font-bold text-base text-[#0B1B3A] group-hover:text-[#0B4FC7] transition-colors">
                {isAr ? "زراعة الأسنان" : "Dental Implants"}
              </h3>
              <p className="mt-2 text-xs text-[#5B6B84] leading-relaxed">
                {isAr
                  ? "حلول دائمة لتعويض الأسنان المفقودة بمظهر طبيعي ووظيفة متكاملة."
                  : "Permanent solutions for missing teeth that look and feel natural."}
              </p>
            </Link>

            {/* 2. Root Canal Treatment */}
            <Link
              to="/services/$slug"
              params={{ slug: "root-canal" }}
              className="group flex flex-col items-center text-center rounded-xl border border-[#E3EAF3] bg-white p-6 shadow-xs hover:border-[#0B4FC7] hover:shadow-md transition-all"
            >
              <div className="flex h-14 w-14 items-center justify-center text-[#0B4FC7] group-hover:scale-105 transition-transform">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3C5 3 3.5 4.5 3.5 6.5C3.5 10 6 12 7 16C7.5 18 8 21 9.5 21C10.5 21 11 19 11 16V13C11 11.5 13 11.5 13 13V16C13 19 13.5 21 14.5 21C16 21 16.5 18 17 16C18 12 20.5 10 20.5 6.5C20.5 4.5 19 3 17 3C14.5 3 13.5 4.5 12 4.5C10.5 4.5 9.5 3 7 3Z" />
                  <path d="M9 10V15" strokeDasharray="1.5 1.5" />
                  <path d="M15 10V15" strokeDasharray="1.5 1.5" />
                </svg>
              </div>
              <h3 className="mt-4 font-bold text-base text-[#0B1B3A] group-hover:text-[#0B4FC7] transition-colors">
                {isAr ? "علاج الجذور" : "Root Canal Treatment"}
              </h3>
              <p className="mt-2 text-xs text-[#5B6B84] leading-relaxed">
                {isAr
                  ? "تخفيف الألم وإنقاذ الأسنان الطبيعية برعاية فائقة وتقنيات دقيقة."
                  : "Relieve pain and save your natural teeth with gentle care."}
              </p>
            </Link>

            {/* 3. Teeth Whitening / Veneers */}
            <Link
              to="/services/$slug"
              params={{ slug: "dental-veneers" }}
              className="group flex flex-col items-center text-center rounded-xl border border-[#E3EAF3] bg-white p-6 shadow-xs hover:border-[#0B4FC7] hover:shadow-md transition-all"
            >
              <div className="flex h-14 w-14 items-center justify-center text-[#0B4FC7] group-hover:scale-105 transition-transform">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 4C5.5 4 4 5.5 4 7.5C4 11 6.5 13 7.5 17C8 19 8.5 21 10 21C11.5 21 12 18 12 15C12 18 12.5 21 14 21C15.5 21 16 19 16.5 17C17.5 13 20 11 20 7.5C20 5.5 18.5 4 17 4C14.5 4 13.5 5.5 12 5.5C10.5 5.5 9.5 4 7 4Z" />
                  <path d="M19 2L19.8 3.8L21.6 4.6L19.8 5.4L19 7.2L18.2 5.4L16.4 4.6L18.2 3.8L19 2Z" fill="currentColor" stroke="none" />
                  <path d="M5 2L5.6 3.4L7 4L5.6 4.6L5 6L4.4 4.6L3 4L4.4 3.4L5 2Z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h3 className="mt-4 font-bold text-base text-[#0B1B3A] group-hover:text-[#0B4FC7] transition-colors">
                {isAr ? "تبييض وفينير الأسنان" : "Teeth Whitening"}
              </h3>
              <p className="mt-2 text-xs text-[#5B6B84] leading-relaxed">
                {isAr
                  ? "تبييض آمن وفعال وفينير تجميلي لابتسامة ناصعة ومشرقة."
                  : "Safe and effective whitening for a brighter, confident smile."}
              </p>
            </Link>

            {/* 4. Orthodontics */}
            <Link
              to="/services/$slug"
              params={{ slug: "orthodontics" }}
              className="group flex flex-col items-center text-center rounded-xl border border-[#E3EAF3] bg-white p-6 shadow-xs hover:border-[#0B4FC7] hover:shadow-md transition-all"
            >
              <div className="flex h-14 w-14 items-center justify-center text-[#0B4FC7] group-hover:scale-105 transition-transform">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6C3 6 4 9 4 12C4 15 3 18 3 18H21C21 18 20 15 20 12C20 9 21 6 21 6H3Z" />
                  <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2" />
                  <rect x="4.5" y="9.5" width="3" height="5" rx="0.5" fill="currentColor" />
                  <rect x="10.5" y="9.5" width="3" height="5" rx="0.5" fill="currentColor" />
                  <rect x="16.5" y="9.5" width="3" height="5" rx="0.5" fill="currentColor" />
                </svg>
              </div>
              <h3 className="mt-4 font-bold text-base text-[#0B1B3A] group-hover:text-[#0B4FC7] transition-colors">
                {isAr ? "تقويم الأسنان" : "Orthodontics"}
              </h3>
              <p className="mt-2 text-xs text-[#5B6B84] leading-relaxed">
                {isAr
                  ? "تعديل اصطفاف الأسنان وتحسين الإطباق بأحدث تقنيات التقويم."
                  : "Straighten your teeth and improve your bite with modern orthodontic solutions."}
              </p>
            </Link>

            {/* 5. Smile Makeover / Pediatric Dentistry */}
            <Link
              to="/services/$slug"
              params={{ slug: "pediatric-dentistry" }}
              className="group flex flex-col items-center text-center rounded-xl border border-[#E3EAF3] bg-white p-6 shadow-xs hover:border-[#0B4FC7] hover:shadow-md transition-all"
            >
              <div className="flex h-14 w-14 items-center justify-center text-[#0B4FC7] group-hover:scale-105 transition-transform">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10C2 10 5.5 15.5 12 15.5C18.5 15.5 22 10 22 10" />
                  <path d="M4 11C6.5 13.5 9 14.5 12 14.5C15 14.5 17.5 13.5 20 11" />
                  <path d="M2 10C5 9 8 8 12 8C16 8 19 9 22 10" />
                </svg>
              </div>
              <h3 className="mt-4 font-bold text-base text-[#0B1B3A] group-hover:text-[#0B4FC7] transition-colors">
                {isAr ? "تجميل الابتسامة وطب الأطفال" : "Smile Makeover"}
              </h3>
              <p className="mt-2 text-xs text-[#5B6B84] leading-relaxed">
                {isAr
                  ? "تحويل مظهر ابتسامتك ورعاية لطيفة للأطفال في بيئة هادئة."
                  : "Transform your smile with personalized cosmetic and gentle pediatric treatments."}
              </p>
            </Link>
          </div>

          {/* Below: Outline button "VIEW ALL SERVICES" */}
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0B4FC7] bg-white px-8 py-3 text-xs font-bold text-[#0B4FC7] hover:bg-[#EEF4FB] transition-colors uppercase tracking-wider"
            >
              <span>{isAr ? "استعراض جميع الخدمات" : "VIEW ALL SERVICES"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DOCTORS (Full-width tint band, 5 confirmed doctors)
          ========================================================================= */}
      <section className="py-16 lg:py-20 bg-[#EEF4FB]">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#0B4FC7] font-bold text-xs uppercase tracking-wider">
              {isAr ? "فريقنا الطبي" : "MEET OUR DOCTORS"}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] tracking-tight">
              {isAr ? "خبرة سريرية. رعاية مخلصة." : "Experienced. Caring. Dedicated."}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#5B6B84]">
              {isAr
                ? "أطباء واستشاريون معتمدون يشرفون على خطتك العلاجية في مركز دبي لطب الأسنان بالهرم."
                : "Certified specialists and consultants supervising multidisciplinary dental care in Al-Haram."}
            </p>
          </div>

          {/* Row of 5 Doctor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {confirmedDoctors.map((doc) => {
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
                  className="group flex flex-col rounded-xl border border-[#E3EAF3] bg-white overflow-hidden p-5 text-center shadow-xs hover:border-[#0B4FC7] hover:shadow-md transition-all"
                >
                  {/* Monogram Portrait Frame on Soft-Blue Gradient */}
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-b from-[#EEF4FB] to-[#DCE8F7] border border-[#CBDDF2] text-[#0B4FC7] shadow-inner group-hover:scale-105 transition-transform">
                    <span className="font-bold text-2xl tracking-widest">
                      {initials}
                    </span>
                  </div>

                  <h3 className="mt-4 font-bold text-sm sm:text-base text-[#0B1B3A] group-hover:text-[#0B4FC7] transition-colors leading-snug">
                    {tr(doc.name)}
                  </h3>

                  <p className="mt-1 text-xs text-[#5B6B84] line-clamp-2 leading-relaxed">
                    {tr(doc.role)}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Below: Solid blue button "VIEW ALL DOCTORS" */}
          <div className="mt-12 text-center">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B4FC7] px-8 py-3 text-xs font-bold text-white hover:bg-[#083B99] transition-colors shadow-sm"
            >
              <span>{isAr ? "استعراض كافة الأطباء" : "VIEW ALL DOCTORS"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TESTIMONIALS (Carousel of 3 cards, 5 gold stars, sample badge)
          ========================================================================= */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#0B4FC7] font-bold text-xs uppercase tracking-wider">
              {isAr ? "آراء المرضى" : "PATIENT TESTIMONIALS"}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] tracking-tight">
              {isAr ? "تجارب مراجعينا في مركز دبي لطب الأسنان" : "What Our Patients Say"}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#5B6B84]">
              {isAr
                ? "تقييم 4.5 من 5 بناءً على أكثر من 1,200 مراجعة معتمدة على خرائط جوجل."
                : "Rated 4.5 / 5 from 1,200+ patient reviews on Google Maps."}
            </p>
          </div>

          {/* Carousel Cards (3 visible) */}
          <div className="grid gap-6 md:grid-cols-3">
            {visibleReviews.filter(Boolean).map((rev) => rev && (
              <div
                key={rev.id}
                className="flex flex-col justify-between rounded-xl border border-[#E3EAF3] bg-white p-6 shadow-xs hover:shadow-md transition-all"
              >
                <div>
                  {/* 5 Gold Stars & Sample Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {[...Array(rev.stars || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500">
                      {isAr ? "تجربة توضيحية" : "Sample"}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-xs sm:text-sm text-[#0B1B3A] leading-relaxed italic">
                    "{tr(rev.text)}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[#E3EAF3]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FB] text-[#0B4FC7] font-bold text-xs">
                    {tr(rev.author).charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0B1B3A]">{tr(rev.author)}</h4>
                    <p className="text-[11px] text-[#5B6B84]">{tr(rev.treatment)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows & Pagination Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prevReview}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3EAF3] bg-white text-[#0B1B3A] hover:bg-[#EEF4FB] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>

            <div className="flex items-center gap-1.5">
              {[...Array(Math.min(totalReviews, 5))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    reviewIdx === i ? "w-6 bg-[#0B4FC7]" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3EAF3] bg-white text-[#0B1B3A] hover:bg-[#EEF4FB] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>

          {/* Google Verified Link */}
          <div className="mt-6 text-center">
            <a
              href={clinicData.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4FC7] hover:underline"
            >
              <span>{isAr ? "قراءة التقييمات المعتمدة على جوجل مابس" : "Read verified reviews on Google"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: BEFORE & AFTER (Three side-by-side pairs, sample caption)
          ========================================================================= */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#E3EAF3]">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#0B4FC7] font-bold text-xs uppercase tracking-wider">
              {isAr ? "قبل وبعد" : "BEFORE & AFTER"}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] tracking-tight">
              {isAr ? "نتائج حقيقية.. ابتسامات واثقة" : "Real Results, Real Smiles"}
            </h2>
            <p className="mt-2 text-xs text-[#5B6B84]">
              {isAr
                ? "نماذج توضيحية — ستُعرض هنا صور حالات حقيقية بعد موافقة المرضى المكتوبة."
                : "Sample images — replace with approved patient cases upon consent."}
            </p>
          </div>

          {/* Three Side-by-Side Before/After Photo Pairs */}
          <div className="grid gap-6 md:grid-cols-3">
            {gallery.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-xl border border-[#E3EAF3] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                {/* Visual Before / After Split Showcase */}
                <div className="relative aspect-[16/10] bg-[#EEF4FB] overflow-hidden flex items-center justify-center">
                  <div className="grid grid-cols-2 w-full h-full divide-x divide-[#CBDDF2]">
                    {/* Before Half */}
                    <div className="relative flex flex-col items-center justify-center p-4 bg-[#F8FAFC]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xs text-[#5B6B84]">
                        <Smile className="h-6 w-6 stroke-[1.5]" />
                      </div>
                      <span className="absolute bottom-2.5 start-2.5 rounded bg-gray-900/80 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        {isAr ? "قبل" : "BEFORE"}
                      </span>
                    </div>

                    {/* After Half */}
                    <div className="relative flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-[#EEF4FB] to-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B4FC7] shadow-sm text-white">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <span className="absolute bottom-2.5 end-2.5 rounded bg-[#0B4FC7] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                        {isAr ? "بعد" : "AFTER"}
                      </span>
                    </div>
                  </div>

                  {/* Sample Tag */}
                  <div className="absolute top-2.5 end-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-gray-500 shadow-2xs">
                    {isAr ? "عينة توضيحية" : "Sample Case"}
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-5">
                  <h3 className="font-bold text-sm text-[#0B1B3A]">{tr(item.title)}</h3>
                  <p className="mt-1 text-xs text-[#5B6B84] line-clamp-2">{tr(item.description)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Below: Solid blue button "VIEW MORE RESULTS" */}
          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B4FC7] px-8 py-3 text-xs font-bold text-white hover:bg-[#083B99] transition-colors shadow-sm uppercase tracking-wider"
            >
              <span>{isAr ? "استعراض المزيد من النتائج" : "VIEW MORE RESULTS"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CONTACT (Tint band, Left details, Right embedded map with card)
          ========================================================================= */}
      <section className="py-16 lg:py-20 bg-[#EEF4FB] border-t border-[#E3EAF3]">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column: Eyebrow, Title, Rows with icons */}
            <div>
              <span className="text-[#0B4FC7] font-bold text-xs uppercase tracking-wider">
                {isAr ? "تواصل معنا" : "GET IN TOUCH"}
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0B1B3A] tracking-tight">
                {isAr ? "نحن هنا لمساعدتك" : "We're Here to Help"}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#5B6B84] leading-relaxed max-w-md">
                {isAr
                  ? "يسعدنا الرد على جميع استفساراتكم وحجز المواعيد طوال أيام الأسبوع في موقعنا المتميز بالهرم."
                  : "We welcome all your inquiries and appointment requests throughout the week at our central Al-Haram location."}
              </p>

              {/* Rows with Icons */}
              <div className="mt-8 space-y-4 text-xs sm:text-sm">
                {/* Phone */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3EAF3] text-[#0B4FC7]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#5B6B84] uppercase">
                      {isAr ? "الهاتف والمحادثات" : "Phone & WhatsApp"}
                    </p>
                    <a
                      href="tel:+201022013314"
                      className="font-bold text-[#0B1B3A] hover:text-[#0B4FC7]"
                      dir="ltr"
                    >
                      01022013314 / 01028665801
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3EAF3] text-[#0B4FC7]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#5B6B84] uppercase">
                      {isAr ? "البريد الإلكتروني" : "Email Address"}
                    </p>
                    <a
                      href={`mailto:${clinicData.email}`}
                      className="font-bold text-[#0B1B3A] hover:text-[#0B4FC7]"
                    >
                      {clinicData.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3EAF3] text-[#0B4FC7]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#5B6B84] uppercase">
                      {isAr ? "العنوان بالهرم" : "Clinic Address"}
                    </p>
                    <p className="font-bold text-[#0B1B3A]">
                      {isAr
                        ? "٢٠ شارع عز الدين عمر، متفرع من شارع الهرم (محطة العريش، برج المروة)، الطالبية، الهرم، الجيزة"
                        : "20 Ezz El-Din Omar St., Al-Haram (El-Arish Station, Al-Marwa Tower), Talbiya, Giza"}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3EAF3] text-[#0B4FC7]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#5B6B84] uppercase">
                      {isAr ? "مواعيد العمل" : "Working Hours"}
                    </p>
                    <p className="font-bold text-[#0B1B3A]">
                      {isAr ? "يومياً من ١:٠٠ ظهراً حتى ١١:٠٠ مساءً (الجمعة بموعد مسبق)" : "Daily 1:00 PM – 11:00 PM (Friday by appointment)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Google Map with Overlay White Card */}
            <div className="relative h-[380px] sm:h-[420px] rounded-xl overflow-hidden border border-[#E3EAF3] shadow-sm">
              {/* Google Map iframe */}
              <iframe
                title="Dubai Dental Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.8967912444585!2d31.1619623!3d29.9919106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145845dd10a6f81d%3A0x6fb462b016f4d972!2sDubai%20dental%20center!5e0!3m2!1sen!2seg!4v1716000000000!5m2!1sen!2seg"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Overlay White Card */}
              <div className="absolute bottom-4 start-4 end-4 sm:end-auto sm:max-w-xs rounded-lg border border-[#E3EAF3] bg-white p-4 shadow-md">
                <h4 className="font-bold text-xs sm:text-sm text-[#0B1B3A]">
                  {isAr ? "مركز دبي لطب الأسنان" : "Dubai Dental Clinic"}
                </h4>
                <p className="mt-1 text-[11px] text-[#5B6B84] leading-relaxed">
                  {isAr
                    ? "٢٠ شارع عز الدين عمر، متفرع من شارع الهرم، الطالبية، الهرم"
                    : "20 Ezz El-Din Omar St., Al-Haram, Talbiya, Giza"}
                </p>

                <a
                  href={clinicData.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center gap-1.5 w-full rounded-md bg-[#0B4FC7] py-2 text-[11px] font-bold text-white hover:bg-[#083B99] transition-colors"
                >
                  <span>{isAr ? "الاتجاهات على الخريطة" : "DIRECTIONS"}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

