import { useState, useEffect } from "react";
import {
  X,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { clinicData } from "@/data/clinic";

export function UtopiaQuickBookModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Dental Implants");
  const [preferredTime, setPreferredTime] = useState("Afternoon (2 PM - 6 PM)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-quick-book", handleOpen);
    return () => window.removeEventListener("open-quick-book", handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      toast.success(
        "Thank you! Our Dubai Dental Clinic care coordinator will contact you shortly."
      );
      setName("");
      setPhone("");
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient bar */}
        <div className="bg-gradient-to-r from-[#13314a] via-[#3365e2] to-[#13314a] p-6 text-white relative">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-200 block mb-1">
            Dubai Dental Clinic · Al-Haram
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            The First Step to Your Smile
          </h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Book your consultation directly or message our coordinator on WhatsApp.
          </p>
        </div>

        {/* Quick Instant Actions: WhatsApp & Call */}
        <div className="p-6 pb-2 grid grid-cols-2 gap-3">
          <a
            href={clinicData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </a>

          <a
            href={clinicData.phoneTel}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#13314a] font-medium text-xs sm:text-sm transition-all"
          >
            <Phone className="w-4 h-4 text-[#3365e2]" />
            <span>Call Clinic</span>
          </a>
        </div>

        <div className="px-6 py-2 flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400 font-medium">Or leave a callback request</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Ahmed Mohamed"
              className="w-full h-11 px-3.5 rounded-xl border border-gray-200 focus:border-[#3365e2] focus:ring-2 focus:ring-[#3365e2]/20 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Phone Number (WhatsApp) *
            </label>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#3365e2] focus-within:ring-2 focus-within:ring-[#3365e2]/20">
              <span className="bg-gray-50 text-gray-500 text-xs font-semibold px-3 flex items-center border-r border-gray-200">
                🇪🇬 +20
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0111 765 5583"
                className="w-full h-11 px-3.5 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Treatment of Interest
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm bg-white outline-none focus:border-[#3365e2]"
              >
                <option value="Dental Implants">Dental Implants (زراعة)</option>
                <option value="Orthodontics">Aligners / Ortho (تقويم)</option>
                <option value="Scaling & Cleaning">Scaling & Hygiene (تنظيف)</option>
                <option value="Veneers & Aesthetics">Veneers (فينيرز وتجميل)</option>
                <option value="Pediatric Dentistry">Pediatric Care (أطفال)</option>
                <option value="Root Canal">Root Canal (علاج عصب)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Preferred Time
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 text-xs sm:text-sm bg-white outline-none focus:border-[#3365e2]"
              >
                <option value="Afternoon (2 PM - 6 PM)">Afternoon (2 PM - 6 PM)</option>
                <option value="Evening (6 PM - 10 PM)">Evening (6 PM - 10 PM)</option>
                <option value="Anytime today">Anytime today</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#3365e2] hover:bg-[#2552d0] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-70"
            >
              <Calendar className="w-4 h-4" />
              <span>{isSubmitting ? "Sending..." : "Request Free 3D Consultation"}</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>Daily 1 PM - 11 PM</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>Al-Haram, 20 Ezz El-Din Omar</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export function UtopiaFloatingQuickBook() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-300">
      {/* WhatsApp Quick Link */}
      <a
        href={clinicData.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-108 transition-all duration-200"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Book Appointment Trigger */}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("open-quick-book"))}
        className="h-12 px-5 rounded-full bg-[#13314a] hover:bg-[#3365e2] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-103 transition-all duration-200 cursor-pointer border border-white/20"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Book Consultation</span>
      </button>
    </div>
  );
}
