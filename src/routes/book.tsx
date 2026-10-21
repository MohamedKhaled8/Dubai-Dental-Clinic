import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Download,
  Baby,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getServices, getDoctors, createBooking } from "@/lib/repository";
import { clinicData } from "@/data/clinic";
import type { BookingRequest, ServiceItem, DoctorItem } from "@/data/types";
import { ServiceIcon } from "@/components/site";

export const Route = createFileRoute("/book")({
  component: BookingPage,
});

function BookingPage() {
  const { tr, lang } = useI18n();
  const isAr = lang === "ar";

  const { data: services = [] } = useQuery<ServiceItem[]>({
    queryKey: ["services"],
    queryFn: () => getServices(),
  });

  const { data: doctors = [] } = useQuery<DoctorItem[]>({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });

  // Wizard state: 1: Service, 2: Doctor & Time, 3: Patient Info, 4: Confirmed
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("no_preference");
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0] ?? "";
  });
  const [timeWindow, setTimeWindow] = useState<"afternoon" | "evening">("evening");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isChild, setIsChild] = useState(false);
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Bot prevention

  // Errors & submission
  const [errors, setErrors] = useState<{ services?: string; date?: string; name?: string; phone?: string; submit?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  // Service toggle
  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: "" }));
    }
  };

  // Validation
  const validateStep2 = () => {
    const errs: typeof errors = {};
    if (!selectedDate) {
      errs.date = isAr ? "يرجى تحديد التاريخ المفضل" : "Please select a preferred date";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: typeof errors = {};
    if (!patientName.trim()) {
      errs.name = isAr ? "يرجى إدخال اسم المريض" : "Please enter patient name";
    }

    const cleanPhone = phone.replace(/[\s-]/g, "");
    // Egyptian phone validation: allows 01xxxxxxxxx or +201xxxxxxxxx
    const egRegex = /^(\+?20|0)?1[0125][0-9]{8}$/;
    if (!cleanPhone) {
      errs.phone = isAr ? "يرجى إدخال رقم الهاتف" : "Please enter phone number";
    } else if (!egRegex.test(cleanPhone)) {
      errs.phone = isAr
        ? "يرجى إدخال رقم مصري صحيح (مثال: 01022013314)"
        : "Please enter a valid Egyptian phone (e.g. 01022013314)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit booking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bots
    if (!validateStep3()) return;

    setIsSubmitting(true);
    try {
      const newBooking = await createBooking({
        serviceIds: selectedServices,
        doctorId: selectedDoctor === "no_preference" ? null : selectedDoctor,
        date: selectedDate,
        timeWindow,
        patientName,
        phone,
        ...(email.trim() ? { email: email.trim() } : {}),
        isChild,
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      });

      setConfirmedBooking(newBooking);
      setStep(4);
    } catch (err) {
      console.error("Booking error:", err);
      setErrors({
        submit: isAr
          ? "حدث خطأ أثناء حفظ طلب الحجز. يمكنك مراسلتنا عبر الواتساب مباشرة."
          : "An error occurred while saving your booking request. You can message us on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // .ICS Calendar generator
  const downloadIcs = () => {
    if (!confirmedBooking) return;
    const sNames = confirmedBooking.serviceIds
      .map((sId) => {
        const s = services.find((item) => item.slug === sId);
        return s ? s.name[lang] : sId;
      })
      .join(", ");

    const startH = confirmedBooking.timeWindow === "afternoon" ? "140000" : "180000";
    const endH = confirmedBooking.timeWindow === "afternoon" ? "180000" : "220000";
    const dateFormatted = confirmedBooking.date.replace(/-/g, "");

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dubai Dental Clinic//Haram Booking//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Dubai Dental Clinic Visit - ${sNames}
DESCRIPTION:Requested dental appointment at Dubai Dental Clinic, Al-Haram, Giza.\\nPatient: ${confirmedBooking.patientName}\\nClinic Phone: +201022013314
LOCATION:20 Ezz El-Din Omar St., Al-Haram, Talbiya, Giza, Egypt
DTSTART:${dateFormatted}T${startH}
DTEND:${dateFormatted}T${endH}
STATUS:TENTATIVE
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `dubai-dental-appointment-${confirmedBooking.id.slice(-6)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp prefilled message URL
  const getWhatsAppPrefillUrl = () => {
    if (!confirmedBooking) return clinicData.whatsappUrl;
    const sNames = confirmedBooking.serviceIds
      .map((sId) => {
        const s = services.find((item) => item.slug === sId);
        return s ? s.name[lang] : sId;
      })
      .join(" + ");

    const timeLabel =
      confirmedBooking.timeWindow === "afternoon"
        ? isAr
          ? "الفترة المسائية (٢ ظهراً - ٦ مساءً)"
          : "Afternoon (2:00 PM - 6:00 PM)"
        : isAr
        ? "فترة السهرة (٦ مساءً - ١٠ مساءً)"
        : "Evening (6:00 PM - 10:00 PM)";

    const text = isAr
      ? `مرحباً مركز دبي لطب الأسنان، أود تأكيد طلب حجز موعدي:\n` +
        `• رقم الطلب: #${confirmedBooking.id.slice(-6)}\n` +
        `• الاسم: ${confirmedBooking.patientName}\n` +
        `• الخدمات المطلوبة: ${sNames || "استشارة عامة"}\n` +
        `• التاريخ المفضل: ${confirmedBooking.date}\n` +
        `• التوقيت: ${timeLabel}\n` +
        (confirmedBooking.isChild ? `• ملاحظة: المريض طفل 👶\n` : "") +
        `بانتظار تأكيد الموعد النهائي من فريقكم الكريم.`
      : `Hello Dubai Dental Clinic, I would like to confirm my booking request:\n` +
        `• Request ID: #${confirmedBooking.id.slice(-6)}\n` +
        `• Name: ${confirmedBooking.patientName}\n` +
        `• Services: ${sNames || "General Consultation"}\n` +
        `• Preferred Date: ${confirmedBooking.date}\n` +
        `• Time Window: ${timeLabel}\n` +
        (confirmedBooking.isChild ? `• Note: Patient is a child 👶\n` : "") +
        `Looking forward to confirming my appointment.`;

    return `https://wa.me/201022013314?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0E1F1C]">
      {/* Header Banner */}
      <section className="border-b border-[#C2A06A]/20 bg-[#F6F1E7] py-14 md:py-20">
        <div className="container-x max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C2A06A]/40 bg-white/60 px-4 py-1.5 text-xs font-bold text-[#16372F] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A06A]" />
            <span>{isAr ? "حجز موعد هادئ ومدروس" : "Calm & Thoughtful Visit Booking"}</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0E1F1C] md:text-5xl">
            {isAr ? "طلب حجز زيارة بمركز دبي لطب الأسنان" : "Request a Visit at Dubai Dental Clinic"}
          </h1>

          <p className="mt-4 text-sm md:text-base text-[#16372F]/80 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? "خطوات بسيطة لاختيار الخدمة والتوقيت الملائم. يقوم فريق الاستقبال بمراجعة طلبك والتواصل لتأكيد الحجز وموعد الحضور."
              : "A simple request flow to select your service and preferred window. Our team will review and confirm your visit promptly."}
          </p>

          {/* Stepper Indicator */}
          {step < 4 && (
            <div className="mt-10 flex items-center justify-center gap-2 md:gap-4 max-w-md mx-auto">
              {[
                { s: 1, label: isAr ? "الخدمات" : "Services" },
                { s: 2, label: isAr ? "الموعد والطبيب" : "Date & Doctor" },
                { s: 3, label: isAr ? "بيانات المريض" : "Patient Info" },
              ].map((item, idx) => (
                <div key={item.s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      step >= item.s
                        ? "bg-[#0E1F1C] text-[#C2A06A] shadow-sm"
                        : "bg-white/80 text-[#16372F]/40 border border-[#C2A06A]/20"
                    }`}
                  >
                    {step > item.s ? <CheckCircle2 className="w-4 h-4 text-[#C2A06A]" /> : item.s}
                  </div>
                  <span
                    className={`text-xs font-bold hidden sm:inline ${
                      step >= item.s ? "text-[#0E1F1C]" : "text-[#16372F]/40"
                    }`}
                  >
                    {item.label}
                  </span>
                  {idx < 2 && (
                    <div
                      className={`h-0.5 flex-1 transition-colors ${
                        step > item.s ? "bg-[#C2A06A]" : "bg-[#C2A06A]/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Multi-Step Form */}
      <section className="container-x max-w-4xl py-12 md:py-16">
        {/* STEP 1: Select Services */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center sm:text-start">
              <h2 className="font-display text-2xl font-bold text-[#0E1F1C]">
                {isAr ? "١. حدد الخدمات المطلوبة" : "1. Select Desired Services"}
              </h2>
              <p className="mt-1 text-xs md:text-sm text-[#16372F]/70">
                {isAr
                  ? "يمكنك اختيار أكثر من خدمة إذا كانت زيارتك تشمل فحوصات متعددة."
                  : "You can select multiple services if your visit includes multiple treatments."}
              </p>
            </div>

            {errors.services && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.services}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((s) => {
                const isSelected = selectedServices.includes(s.slug);
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => toggleService(s.slug)}
                    className={`text-start p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                      isSelected
                        ? "border-[#C2A06A] bg-white shadow-md ring-2 ring-[#C2A06A]/30"
                        : "border-[#C2A06A]/20 bg-white/70 hover:bg-white hover:border-[#C2A06A]/60"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? "bg-[#0E1F1C] text-[#C2A06A]"
                          : "bg-[#F6F1E7] text-[#16372F]"
                      }`}
                    >
                      <ServiceIcon name={s.icon ?? s.iconName} className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-[#0E1F1C]">{s.name[lang]}</h3>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[#C2A06A] border-[#C2A06A] text-[#0E1F1C]"
                              : "border-[#C2A06A]/40 bg-white"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-[#16372F]/70 line-clamp-2 leading-relaxed">
                        {(s.shortTagline ?? s.tagline)[lang]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (selectedServices.length === 0) {
                    setErrors({
                      services: isAr
                        ? "يرجى اختيار خدمة واحدة على الأقل للمتابعة"
                        : "Please select at least one service to continue",
                    });
                    return;
                  }
                  setStep(2);
                }}
                className="btn-clay flex items-center gap-2"
              >
                <span>{isAr ? "متابعة لاختيار الموعد" : "Continue to Schedule"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Doctor & Time Window */}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0E1F1C]">
                {isAr ? "٢. تحديد الطبيب والوقت المفضل" : "2. Doctor & Time Window"}
              </h2>
              <p className="mt-1 text-xs md:text-sm text-[#16372F]/70">
                {isAr
                  ? "ساعات العمل يومياً من ١:٠٠ ظهراً حتى ١١:٠٠ مساءً بالهرم."
                  : "Working hours: Daily 1:00 PM – 11:00 PM in Al-Haram, Giza."}
              </p>
            </div>

            {/* Doctor Picker */}
            <div className="rounded-2xl border border-[#C2A06A]/20 bg-white p-6 shadow-xs">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#16372F]/80 mb-3">
                {isAr ? "الطبيب المفضل (اختياري)" : "Preferred Specialist (Optional)"}
              </label>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor("no_preference")}
                  className={`p-3.5 rounded-xl border text-start transition-all text-xs font-bold flex items-center gap-3 ${
                    selectedDoctor === "no_preference"
                      ? "border-[#C2A06A] bg-[#F6F1E7] text-[#0E1F1C] ring-1 ring-[#C2A06A]"
                      : "border-border bg-white text-[#16372F]/80 hover:bg-[#FBF9F4]"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#C2A06A] shrink-0" />
                  <span>{isAr ? "لا يوجد تفضيل (أقرب متاح)" : "No preference (Next available)"}</span>
                </button>

                {doctors.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDoctor(d.name[lang])}
                    className={`p-3.5 rounded-xl border text-start transition-all text-xs font-bold flex items-center gap-3 ${
                      selectedDoctor === d.name[lang]
                        ? "border-[#C2A06A] bg-[#F6F1E7] text-[#0E1F1C] ring-1 ring-[#C2A06A]"
                        : "border-border bg-white text-[#16372F]/80 hover:bg-[#FBF9F4]"
                    }`}
                  >
                    <User className="w-4 h-4 text-[#16372F] shrink-0" />
                    <div>
                      <div>{d.name[lang]}</div>
                      <div className="text-[10px] text-[#16372F]/60 font-normal">{d.role[lang]}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Window */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#C2A06A]/20 bg-white p-6 shadow-xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#16372F]/80 mb-3">
                  {isAr ? "تاريخ الزيارة المقترح" : "Preferred Date"}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-xl border border-[#C2A06A]/30 bg-[#FBF9F4] px-4 py-3 text-sm font-bold text-[#0E1F1C] focus:border-[#C2A06A] focus:outline-none"
                  />
                </div>
                {errors.date && (
                  <p className="mt-2 text-xs font-semibold text-red-600">{errors.date}</p>
                )}
              </div>

              <div className="rounded-2xl border border-[#C2A06A]/20 bg-white p-6 shadow-xs">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#16372F]/80 mb-3">
                  {isAr ? "فترة الحضور المفضلة" : "Preferred Time Window"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimeWindow("afternoon")}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      timeWindow === "afternoon"
                        ? "border-[#C2A06A] bg-[#0E1F1C] text-[#C2A06A] font-bold shadow-xs"
                        : "border-border bg-[#FBF9F4] text-[#16372F]/70 hover:bg-white text-xs font-semibold"
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs block font-bold">
                      {isAr ? "مسائي (٢ - ٦ م)" : "Afternoon (2-6 PM)"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeWindow("evening")}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      timeWindow === "evening"
                        ? "border-[#C2A06A] bg-[#0E1F1C] text-[#C2A06A] font-bold shadow-xs"
                        : "border-border bg-[#FBF9F4] text-[#16372F]/70 hover:bg-white text-xs font-semibold"
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs block font-bold">
                      {isAr ? "سهرة (٦ - ١٠ م)" : "Evening (6-10 PM)"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline flex items-center gap-2 text-xs"
              >
                {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isAr ? "الرجوع للخدمات" : "Back to Services"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="btn-clay flex items-center gap-2"
              >
                <span>{isAr ? "متابعة لبيانات المريض" : "Continue to Patient Info"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Patient Information */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0E1F1C]">
                {isAr ? "٣. بيانات التواصل للمريض" : "3. Patient Contact Details"}
              </h2>
              <p className="mt-1 text-xs md:text-sm text-[#16372F]/70">
                {isAr
                  ? "لن يتم نشر بياناتك؛ تُستخدم فقط لتأكيد الموعد والتنسيق مع الطبيب المختص."
                  : "Your details remain private and are only used for appointment confirmation."}
              </p>
            </div>

            {/* Bot Honeypot (hidden) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="utopia_hp_check"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
              />
            </div>

            <div className="rounded-2xl border border-[#C2A06A]/20 bg-white p-6 md:p-8 space-y-6 shadow-xs">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#16372F]/80 mb-2">
                  {isAr ? "الاسم ثلاثي أو رباعي *" : "Full Patient Name *"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={isAr ? "مثال: سارة محمد الشريف" : "e.g. Sarah Mohamed El-Sherif"}
                    className="w-full rounded-xl border border-[#C2A06A]/30 bg-[#FBF9F4] px-4 py-3 text-sm font-medium text-[#0E1F1C] focus:border-[#C2A06A] focus:outline-none"
                  />
                  <User className="absolute end-4 top-3.5 w-4 h-4 text-[#16372F]/40" />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Phone with Egyptian validation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#16372F]/80 mb-2">
                  {isAr ? "رقم الهاتف / الواتساب *" : "Phone Number (Egyptian Mobile) *"}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01022013314"
                    className="w-full rounded-xl border border-[#C2A06A]/30 bg-[#FBF9F4] px-4 py-3 text-sm font-mono font-bold text-[#0E1F1C] focus:border-[#C2A06A] focus:outline-none"
                  />
                  <Phone className="absolute end-4 top-3.5 w-4 h-4 text-[#16372F]/40" />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.phone}</p>
                )}
                <p className="mt-1 text-[11px] text-[#16372F]/60">
                  {isAr
                    ? "يقبل أرقام المحمول المصرية (010, 011, 012, 015)"
                    : "Egyptian mobile numbers (010, 011, 012, 015)"}
                </p>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#16372F]/80 mb-2">
                  {isAr ? "البريد الإلكتروني (اختياري)" : "Email Address (Optional)"}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-[#C2A06A]/30 bg-[#FBF9F4] px-4 py-3 text-sm font-medium text-[#0E1F1C] focus:border-[#C2A06A] focus:outline-none"
                  />
                  <Mail className="absolute end-4 top-3.5 w-4 h-4 text-[#16372F]/40" />
                </div>
              </div>

              {/* Child Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-[#C2A06A]/20 bg-[#F6F1E7]/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white text-[#D98E73]">
                    <Baby className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0E1F1C]">
                      {isAr ? "هل الزيارة مخصصة لطفل؟" : "Is this visit for a child?"}
                    </h4>
                    <p className="text-[11px] text-[#16372F]/70">
                      {isAr
                        ? "يتم توجيه الحالة لعيادة أسنان الأطفال (د. عمر مخلوف)"
                        : "Assigned to our Pediatric Dental Specialist (Dr. Omar Makhlouf)"}
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChild}
                    onChange={(e) => setIsChild(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D98E73]"></div>
                </label>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#16372F]/80 mb-2">
                  {isAr
                    ? "ملاحظات أو أعراض ترغب بإخبارنا بها (اختياري)"
                    : "Notes or symptoms to share (Optional)"}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isAr
                      ? "مثال: ألم بالضرس السفلي منذ يومين، أو رغبة باستشارة فينير..."
                      : "e.g. Tooth sensitivity for 2 days, or interest in cosmetic veneers..."
                  }
                  className="w-full rounded-xl border border-[#C2A06A]/30 bg-[#FBF9F4] px-4 py-3 text-sm text-[#0E1F1C] focus:border-[#C2A06A] focus:outline-none"
                />
              </div>

              {/* Clinic Notice */}
              <div className="rounded-xl border border-[#C2A06A]/30 bg-[#F6F1E7]/70 p-4 text-xs text-[#16372F] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C2A06A] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {isAr
                    ? "تنبيه: هذا طلب حجز مبدئي عبر الإنترنت — سيقوم فريق مركز دبي لطب الأسنان بالتواصل هاتفياً أو عبر الواتساب لتأكيد الحضور وتحديد الساعة بدقة."
                    : "Notice: This is a preliminary booking request — Dubai Dental Clinic team will contact you via phone or WhatsApp to finalize your exact appointment hour."}
                </p>
              </div>

              {errors.submit && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.submit}</span>
                </div>
              )}
            </div>

            {/* Stepper Navigation */}
            <div className="pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-outline flex items-center gap-2 text-xs"
              >
                {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isAr ? "الرجوع للموعد" : "Back to Schedule"}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-clay flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{isAr ? "جارٍ إرسال الطلب..." : "Submitting Request..."}</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>{isAr ? "إرسال طلب الحجز الآن" : "Submit Booking Request"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success Confirmation */}
        {step === 4 && confirmedBooking && (
          <div className="rounded-3xl border border-[#C2A06A]/30 bg-white p-8 md:p-12 shadow-xl text-center space-y-8 animate-fade-in">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F1E7] border border-[#C2A06A]/30 text-xs font-mono font-bold text-[#16372F] mb-3">
                {isAr ? "رقم الطلب:" : "Request ID:"} #{confirmedBooking.id.slice(-6)}
              </div>
              <h2 className="font-display text-3xl font-bold text-[#0E1F1C]">
                {isAr ? "تم استلام طلب الحجز بنجاح" : "Booking Request Received"}
              </h2>
              <p className="mt-2 text-sm text-[#16372F]/70 max-w-lg mx-auto">
                {isAr
                  ? `شكراً لك أ/ ${confirmedBooking.patientName}. تم تسجيل بيانات طلبك وسيقوم فريق الاستقبال بالتواصل معك قريباً.`
                  : `Thank you, ${confirmedBooking.patientName}. Your request has been recorded and our team will contact you shortly.`}
              </p>
            </div>

            {/* Summary Card */}
            <div className="rounded-2xl border border-[#C2A06A]/20 bg-[#FBF9F4] p-6 text-start max-w-lg mx-auto text-xs space-y-3">
              <div className="flex justify-between border-b border-[#C2A06A]/10 pb-2">
                <span className="text-[#16372F]/60">{isAr ? "التاريخ المقترح:" : "Date:"}</span>
                <span className="font-bold text-[#0E1F1C]">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between border-b border-[#C2A06A]/10 pb-2">
                <span className="text-[#16372F]/60">{isAr ? "الفترة:" : "Time Window:"}</span>
                <span className="font-bold text-[#0E1F1C]">
                  {confirmedBooking.timeWindow === "afternoon"
                    ? isAr
                      ? "مسائي (٢:٠٠ - ٦:٠٠ م)"
                      : "Afternoon (2-6 PM)"
                    : isAr
                    ? "سهرة (٦:٠٠ - ١٠:٠٠ م)"
                    : "Evening (6-10 PM)"}
                </span>
              </div>
              {confirmedBooking.doctorId && (
                <div className="flex justify-between border-b border-[#C2A06A]/10 pb-2">
                  <span className="text-[#16372F]/60">{isAr ? "الطبيب:" : "Doctor:"}</span>
                  <span className="font-bold text-[#0E1F1C]">{confirmedBooking.doctorId}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-[#C2A06A]/10 pb-2">
                <span className="text-[#16372F]/60">{isAr ? "رقم الهاتف:" : "Phone:"}</span>
                <span className="font-mono font-bold text-[#0E1F1C]">{confirmedBooking.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#16372F]/60">{isAr ? "العيادة:" : "Clinic:"}</span>
                <span className="font-medium text-[#0E1F1C]">
                  {isAr ? "الهرم، ٢٠ شارع عز الدين عمر، محطة العريش" : "Al-Haram, 20 Ezz El-Din Omar St., El-Arish"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href={getWhatsAppPrefillUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#16372F] text-white font-bold text-xs shadow-md hover:bg-[#0E1F1C] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? "محادثة فورية لتأكيد الموعد عبر واتساب" : "Chat on WhatsApp to Confirm"}</span>
              </a>

              <button
                type="button"
                onClick={downloadIcs}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#C2A06A]/50 bg-white text-[#0E1F1C] font-bold text-xs shadow-xs hover:bg-[#F6F1E7] transition-all"
              >
                <Download className="w-4 h-4 text-[#C2A06A]" />
                <span>{isAr ? "إضافة إلى التقويم (.ics)" : "Add to Calendar (.ics)"}</span>
              </button>
            </div>

            <div className="pt-6 border-t border-[#C2A06A]/15 text-xs text-[#16372F]/70">
              <Link to="/" className="font-bold text-[#0E1F1C] hover:underline">
                {isAr ? "← العودة إلى الصفحة الرئيسية" : "← Return to Home Page"}
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
