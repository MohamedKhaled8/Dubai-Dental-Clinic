import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  Stethoscope,
  ChevronRight,
  MessageCircle,
  FileText
} from "lucide-react";
import { DoctorProfile, DentalService, EVIA_DOCTORS, EVIA_SERVICES } from "./evia-data";
import { createBooking } from "@/lib/v2-repository";
import { toast } from "sonner";

interface DoctorModalProps {
  doctor: DoctorProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onBookDoctor: (doctorName: string) => void;
  isAr: boolean;
}

export function EviaDoctorModal({
  doctor,
  isOpen,
  onClose,
  onBookDoctor,
  isAr,
}: DoctorModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-[#E5E5E5] animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        data-lenis-prevent
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#111827] shadow-md flex items-center justify-center border border-[#E5E5E5] transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8" data-lenis-prevent>
          {/* Top Profile Banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-[22px] overflow-hidden shrink-0 border-2 border-[#0069D9]/20 shadow-md">
              <img
                src={doctor.image}
                alt={doctor.nameEn}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="text-center sm:text-start flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>{isAr ? doctor.roleAr : doctor.roleEn}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                {isAr ? doctor.nameAr : doctor.nameEn}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#0069D9] mt-1">
                {isAr ? doctor.credentialsAr : doctor.credentialsEn}
              </p>
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-xs text-[#6B7280]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? "طبيب استشاري معتمد" : "Board Certified Specialist"}</span>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-2">
              {isAr ? "نبذة عن التخصص والخدمات" : "Clinical Specialty Overview"}
            </h4>
            <p className="text-sm text-[#4B5563] leading-relaxed font-normal">
              {isAr ? doctor.bioAr : doctor.bioEn}
            </p>
          </div>

          {/* Specialties */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-3">
              {isAr ? "المجالات والتخصصات الدقيقة" : "Clinical Specialties"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(isAr ? doctor.specialtiesAr : doctor.specialtiesEn).map((sp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3F4F6] text-[#1F2937] text-xs font-semibold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0069D9]" />
                  <span>{sp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-5 border-t border-[#F0F0F0] flex items-center justify-between">
            <span className="text-xs text-[#6B7280]">
              {isAr ? "مواعيد الكشف متاحة هذا الأسبوع" : "Consultation slots open this week"}
            </span>
            <button
              onClick={() => {
                onClose();
                onBookDoctor(isAr ? doctor.nameAr : doctor.nameEn);
              }}
              className="px-6 py-2.5 rounded-full bg-[#0069D9] hover:bg-[#0055b3] text-white text-xs font-bold transition-all shadow-md hover:scale-102 active:scale-98"
            >
              <span>{isAr ? `احجز موعداً مع ${doctor.nameAr}` : `Book with ${doctor.nameEn}`}</span>
              <span className={isAr ? "rotate-180" : ""}> ↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServiceModalProps {
  service: DentalService | null;
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
  isAr: boolean;
}

export function EviaServiceModal({
  service,
  isOpen,
  onClose,
  onBookService,
  isAr,
}: ServiceModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-[#E5E5E5] animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        data-lenis-prevent
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#111827] shadow-md flex items-center justify-center border border-[#E5E5E5] transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto" data-lenis-prevent>
          {/* Service Banner Image */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black">
            <img
              src={service.image}
              alt={service.titleEn}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-5 inset-x-6 text-white">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider mb-2 inline-block">
                {isAr ? service.categoryAr : service.categoryEn}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold">{isAr ? service.titleAr : service.titleEn}</h3>
              <div className="flex items-center gap-3 text-xs text-white/80 mt-1">
                <span>{isAr ? service.priceAr : service.priceEn}</span>
                <span>•</span>
                <span>{isAr ? service.durationAr : service.durationEn}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-2">
                {isAr ? "نظرة عامة على الإجراء" : "Procedure Overview"}
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {isAr ? service.descriptionAr : service.descriptionEn}
              </p>
            </div>

            {/* Treatment Roadmap Steps */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-3">
                {isAr ? "مراحل وخطوات الجلسة" : "Clinical Roadmap"}
              </h4>
              <div className="space-y-2.5">
                {(isAr ? service.stepsAr : service.stepsEn).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-[16px] bg-[#F9FAFB] border border-[#F0F0F0]">
                    <span className="w-6 h-6 rounded-full bg-[#0069D9] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-medium text-[#374151] mt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-3">
                {isAr ? "ما تشمله الخدمة" : "What is included"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(isAr ? service.includesAr : service.includesEn).map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#1F2937]">
                    <CheckCircle2 className="w-4 h-4 text-[#0069D9] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-5 border-t border-[#F0F0F0] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#6B7280] block">
                  {isAr ? "السعر الشامل" : "Starting Investment"}
                </span>
                <span className="text-lg font-black text-[#111827]">
                  {isAr ? service.priceAr : service.priceEn}
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBookService(isAr ? service.titleAr : service.titleEn);
                }}
                className="px-6 py-2.5 rounded-full bg-[#0069D9] hover:bg-[#0055b3] text-white text-xs font-bold transition-all shadow-md hover:scale-102 active:scale-98"
              >
                <span>{isAr ? "احجز هذه الخدمة" : "Book this treatment"}</span>
                <span className={isAr ? "rotate-180" : ""}> ↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDoctor?: string;
  isAr: boolean;
}

export function EviaBookingModal({
  isOpen,
  onClose,
  initialService = "",
  initialDoctor = "",
  isAr,
}: BookingModalProps) {
  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialDoctor) setSelectedDoctor(initialDoctor);
  }, [initialService, initialDoctor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createBooking({
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        patientEmail: patientEmail.trim() || undefined,
        serviceName: selectedService || (isAr ? "كشف واستشارة" : "Consultation"),
        doctorName: selectedDoctor || (isAr ? "أي استشاري متاح" : "First Available Specialist"),
        appointmentDate: date || (new Date().toISOString().split("T")[0] as string),
        timeSlot: timeSlot || "10:00 AM",
        notes: notes.trim() || undefined,
        source: "v2_website_modal",
      });
      setIsSubmitted(true);
      toast.success(
        isAr ? "تم تسجيل طلب موعدك بنجاح في قاعدة البيانات!" : "Appointment request saved to database!"
      );
    } catch (err) {
      console.error("Booking error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const message = isAr
      ? `السلام عليكم، أود حجز موعد في مركز دبي لطب الأسنان:\n- الخدمة: ${selectedService || "كشف واستشارة"}\n- الطبيب المفضل: ${selectedDoctor || "أول استشاري متاح"}\n- الموعد: ${date || "أقرب وقت"} (${timeSlot})\n- الاسم: ${patientName || "مراجع جديد"}\n- الهاتف: ${patientPhone}`
      : `Hello, I'd like to book an appointment at Dubai Dental Clinic:\n- Service: ${selectedService || "Consultation"}\n- Preferred Doctor: ${selectedDoctor || "First Available Specialist"}\n- Date: ${date || "Next available"} (${timeSlot})\n- Name: ${patientName || "New Patient"}\n- Phone: ${patientPhone}`;
    window.open(`https://wa.me/201022013314?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-[#E5E5E5] animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        data-lenis-prevent
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#111827] shadow-md flex items-center justify-center border border-[#E5E5E5] transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8" data-lenis-prevent>
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#111827]">
                {isAr ? "تم تسجيل طلب موعدك بنجاح!" : "Appointment Request Received!"}
              </h3>
              <p className="text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                {isAr
                  ? `شكراً لك ${patientName || "عزيزي المراجع"}. تم حجز طلبك لخدمة ${selectedService || "الكشف والاستشارة"}. سيتواصل معك فريق الاستقبال لتأكيد الموعد النهائي.`
                  : `Thank you ${patientName || "valued patient"}. Your visit request for ${selectedService || "Consultation"} is registered. Our front desk will confirm your slot shortly.`}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "تأكيد فوري عبر واتساب" : "Confirm via WhatsApp"}</span>
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1F2937] text-xs font-bold transition-all"
                >
                  {isAr ? "إغلاق النافذة" : "Close Window"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isAr ? "حجز موعد جديد" : "Schedule Your Visit"}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                  {isAr ? "خطوتك الأولى نحو ابتسامة صحية" : "Book your appointment"}
                </h3>
                <p className="text-xs text-[#6B7280] mt-1">
                  {isAr
                    ? "اختر الخدمة والوقت المناسب وسيتم تأكيد الموعد فورياً."
                    : "Fill out the details below and our concierge team will reserve your chair."}
                </p>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">
                  {isAr ? "الخدمة أو الإجراء المطلوب" : "Select Treatment"}
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] text-xs text-[#111827] focus:ring-2 focus:ring-[#0069D9] focus:outline-hidden"
                  required
                >
                  <option value="">{isAr ? "اختر الخدمة..." : "Choose a service..."}</option>
                  {EVIA_SERVICES.map((s) => (
                    <option key={s.id} value={isAr ? s.titleAr : s.titleEn}>
                      {isAr ? s.titleAr : s.titleEn} ({isAr ? s.priceAr : s.priceEn})
                    </option>
                  ))}
                  <option value={isAr ? "طوارئ وألم عاجل" : "Emergency Dental Visit"}>
                    {isAr ? "طوارئ وألم عاجل (Same-Day Emergency)" : "Emergency Dental Visit (Same-Day)"}
                  </option>
                  <option value={isAr ? "استشارة عامة وكشف" : "General Consultation"}>
                    {isAr ? "استشارة عامة وكشف أولي" : "General Consultation"}
                  </option>
                </select>
              </div>

              {/* Doctor Preference */}
              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">
                  {isAr ? "الطبيب المفضل (اختياري)" : "Preferred Doctor (Optional)"}
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] text-xs text-[#111827] focus:ring-2 focus:ring-[#0069D9] focus:outline-hidden"
                >
                  <option value="">{isAr ? "أي استشاري متاح" : "First Available Specialist"}</option>
                  {EVIA_DOCTORS.map((d) => (
                    <option key={d.id} value={isAr ? d.nameAr : d.nameEn}>
                      {isAr ? d.nameAr : d.nameEn} — {isAr ? d.roleAr : d.roleEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    {isAr ? "التاريخ المفضل" : "Preferred Date"}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] text-xs text-[#111827] focus:ring-2 focus:ring-[#0069D9] focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    {isAr ? "الفترة الزمنية" : "Time Window"}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] text-xs text-[#111827] focus:ring-2 focus:ring-[#0069D9] focus:outline-hidden"
                  >
                    <option value="9:00 AM - 12:00 PM">09:00 AM – 12:00 PM ({isAr ? "صباحاً" : "Morning"})</option>
                    <option value="12:00 PM - 3:00 PM">12:00 PM – 03:00 PM ({isAr ? "ظهراً" : "Midday"})</option>
                    <option value="3:00 PM - 6:00 PM">03:00 PM – 06:00 PM ({isAr ? "مساءً" : "Evening"})</option>
                  </select>
                </div>
              </div>

              {/* Patient Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    {isAr ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={isAr ? "مثال: أحمد محمد" : "e.g. Jane Doe"}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] text-xs text-[#111827] focus:ring-2 focus:ring-[#0069D9] focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    {isAr ? "رقم الهاتف / واتساب" : "Phone / Mobile"}
                  </label>
                  <input
                    type="tel"
                    placeholder={isAr ? "01XXXXXXXXX" : "+1 (555) 000-0000"}
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] text-xs text-[#111827] focus:ring-2 focus:ring-[#0069D9] focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 rounded-full bg-[#0069D9] hover:bg-[#0055b3] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? isAr
                        ? "جاري تسجيل الحجز..."
                        : "Submitting Request..."
                      : isAr
                      ? "تأكيد طلب الموعد"
                      : "Request Appointment"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
