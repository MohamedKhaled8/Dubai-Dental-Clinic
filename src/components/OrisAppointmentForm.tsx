import { useState } from "react";
import { toast } from "sonner";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { clinicData } from "@/data/clinic";

export function OrisAppointmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [countryFlag, setCountryFlag] = useState("🇪🇬");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [topic, setTopic] = useState("Dental Implants");
  const [showTopicPicker, setShowTopicPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const COUNTRIES = [
    { name: "Egypt", code: "+20", flag: "🇪🇬" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { name: "UAE", code: "+971", flag: "🇦🇪" },
    { name: "Kuwait", code: "+965", flag: "🇰🇼" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  ];

  const TOPICS = [
    "Dental Implants (زراعة الأسنان)",
    "Clear Aligners & Ortho (تقويم الأسنان)",
    "Veneers & Smile Design (ابتسامة هوليوود)",
    "Teeth Whitening (تبييض الأسنان بالليزر)",
    "Ultrasonic Scaling (تنظيف وتلميع الجير)",
    "Pediatric Dentistry (طب أسنان الأطفال)",
    "Root Canal Treatment (علاج الجذور والعصب)",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !topic) {
      toast.error("Please fill in your name, phone number, and treatment");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the privacy policy");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(
        "Request confirmed! Dr. Karim Kamal & Dubai Dental Clinic team will contact you shortly."
      );
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 800);
  };

  return (
    <section id="oris-form" className="w-full bg-white pt-[6vw] max-[1025px]:pt-12">
      <div className="relative w-full rounded-t-[2.2vw] max-[1025px]:rounded-t-3xl overflow-hidden min-h-[80vh] max-[1025px]:min-h-0 flex items-start justify-between oris-paddx py-[5.6vw] max-[1025px]:p-8 max-md:p-6 max-[1025px]:py-16! max-[1025px]:flex-col max-[1025px]:gap-10">
        {/* Background Image */}
        <img
          alt="Dubai Dental Clinic background"
          src="/oris/animated-form-bg.webp"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />
        <div className="absolute inset-0 bg-[#0B1B3A]/75 z-0" />

        {/* Left Side Content */}
        <div className="z-10 text-white flex pt-[1vw] max-[1025px]:pt-0 flex-col justify-center max-[1025px]:max-w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-4 w-fit border border-white/10">
            <span>Direct Clinic Consultation · حجز مباشر</span>
          </div>

          <h2 className="max-[1025px]:text-[6vw] max-md:text-[7.5vw] text-[4.2vw] max-w-[34vw] max-[1025px]:max-w-full font-normal leading-[1.15]">
            The first step to the smile you deserve
          </h2>
          <p className="oris-text22 max-w-[36vw] max-[1025px]:max-w-xl mt-[2vw] max-[1025px]:mt-4 font-light text-white/90 leading-relaxed">
            Leave a request or chat with our care coordinator directly. We are
            located at 20 Ezz El-Din Omar St., Al-Haram, Giza.
          </p>

          {/* Quick Direct Actions Box */}
          <div className="mt-8 flex flex-col gap-3.5 max-w-sm">
            <a
              href={clinicData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Instant WhatsApp Chat</p>
                <p className="text-[11px] text-white/85">Reply in under 5 minutes</p>
              </div>
            </a>

            <a
              href={clinicData.phoneTel}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all border border-white/15"
            >
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">Call Reception: {clinicData.phoneDisplay}</p>
                <p className="text-[11px] text-white/70">Daily from 1:00 PM – 11:00 PM</p>
              </div>
            </a>

            <div className="flex items-center gap-2 text-xs text-white/70 pt-2">
              <MapPin className="w-4 h-4 text-blue-300 shrink-0" />
              <span>20 Ezz El-Din Omar St., Al-Haram, Giza</span>
            </div>
          </div>
        </div>

        {/* Right Side Form Card */}
        <div className="z-10 bg-white rounded-3xl p-6 sm:p-8 w-[45vw] max-[1025px]:w-full shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-[#13314a]">
                Request a Callback
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Fill in your details and our doctor team will follow up.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#3365e2] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                id="oris-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full border rounded-xl bg-white h-12 px-4 text-sm text-gray-800 outline-none transition-all border-gray-200 focus:border-[#3365e2] focus:ring-2 focus:ring-[#3365e2]/15"
              />
            </div>

            {/* Phone + Country Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number (WhatsApp) *
              </label>
              <div className="w-full flex border rounded-xl bg-white h-12 overflow-hidden border-gray-200 focus-within:border-[#3365e2] focus-within:ring-2 focus-within:ring-[#3365e2]/15 transition-all">
                <button
                  type="button"
                  onClick={() => setShowCountryPicker(!showCountryPicker)}
                  className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span>{countryFlag}</span>
                  <span>{countryCode}</span>
                </button>
                <input
                  id="oris-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0111 765 5583"
                  className="flex-1 px-4 text-sm text-gray-800 outline-none"
                />
              </div>

              {showCountryPicker && (
                <div className="absolute mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setCountryCode(c.code);
                        setCountryFlag(c.flag);
                        setShowCountryPicker(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-blue-50 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="font-mono text-gray-400">{c.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Treatment Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Treatment Required *
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border rounded-xl bg-white h-12 px-4 text-sm text-gray-800 outline-none border-gray-200 focus:border-[#3365e2] focus:ring-2 focus:ring-[#3365e2]/15"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes / Message */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any specific symptoms, questions, or preferred day..."
                className="w-full border rounded-xl bg-white p-3 text-sm text-gray-800 outline-none border-gray-200 focus:border-[#3365e2] focus:ring-2 focus:ring-[#3365e2]/15 resize-none"
              />
            </div>

            {/* Agreement */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                id="oris-agree"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded text-[#3365e2] border-gray-300 focus:ring-[#3365e2]"
              />
              <label htmlFor="oris-agree" className="text-xs text-gray-600 cursor-pointer">
                I agree to be contacted via WhatsApp/Phone for consultation scheduling.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full h-12 rounded-xl bg-[#3365e2] hover:bg-[#2552d0] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-70"
            >
              <span>{submitting ? "Sending..." : "Submit Consultation Request"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
