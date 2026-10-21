import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { clinicData } from "@/data/clinic";

export function OrisFooter() {
  const FOOTER_SECTIONS = [
    {
      title: "Specialized Treatments",
      links: [
        { label: "Dental Implants (زراعة)", href: "#dental-treatments" },
        { label: "Clear Aligners (تقويم)", href: "#dental-treatments" },
        { label: "Veneers & Aesthetics (تجميل)", href: "#dental-treatments" },
        { label: "Ultrasonic Scaling (تنظيف)", href: "#dental-treatments" },
        { label: "Pediatric Dentistry (أطفال)", href: "#dental-treatments" },
      ],
    },
    {
      title: "Clinic Information",
      links: [
        { label: "Al-Haram Medical Team", href: "#passion-meet-purpose" },
        { label: "3D CBCT Technology", href: "#about-oris" },
        { label: `Verified Reviews (${clinicData.googleRating.score} ★)`, href: "#reviews" },
        { label: "Hospital Sterilization", href: "#passion-meet-purpose" },
      ],
    },
    {
      title: "Quick Contact",
      links: [
        { label: `Call: ${clinicData.phoneDisplay}`, href: clinicData.phoneTel },
        { label: "WhatsApp Direct", href: clinicData.whatsappUrl },
        { label: "Google Maps Location", href: clinicData.googleMapsUrl },
        { label: `Email: ${clinicData.email}`, href: `mailto:${clinicData.email}` },
      ],
    },
    {
      title: "Hours & Location",
      links: [
        { label: "20 Ezz El-Din Omar St.", href: clinicData.googleMapsUrl },
        { label: "Al-Haram, Giza, Egypt", href: clinicData.googleMapsUrl },
        { label: "Daily: 1:00 PM – 11:00 PM", href: "#oris-form" },
        { label: "Friday: By Appointment", href: "#oris-form" },
      ],
    },
  ];

  return (
    <footer
      id="oris-footer"
      className="w-full bg-gradient-to-b from-[#3365e2] via-[#1d4ed8] to-[#0B1B3A] text-white overflow-hidden oris-paddx pt-10 pb-4 sm:pt-12 sm:pb-5 flex flex-col justify-between relative border-t border-blue-900/30"
    >
      {/* Top Heading & Immediate Booking Button */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 max-w-full pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-200 block mb-1">
            Dubai Dental Clinic
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white max-w-2xl leading-tight">
            Brighten your smile with calm, specialist care.
          </h2>
        </div>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-quick-book"))}
          className="self-start lg:self-center px-6 py-3 rounded-full bg-white text-[#0B1B3A] font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-xl hover:scale-102 cursor-pointer shrink-0"
        >
          Book Consultation Now
        </button>
      </div>

      {/* Nav Columns */}
      <nav
        aria-label="Footer"
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 my-6"
      >
        {FOOTER_SECTIONS.map((col, idx) => (
          <div key={idx} className="footer-col flex flex-col gap-2">
            <p className="text-white text-sm font-semibold whitespace-nowrap border-b border-white/10 pb-1">
              {col.title}
            </p>
            <ul className="flex flex-col gap-1.5">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center no-underline text-white/80 hover:text-white transition-colors text-xs relative w-fit py-0.5"
                  >
                    <span>{link.label}</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Copyright */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/10 text-white/70 text-xs gap-2">
        <p>© 2026 Dubai Dental Clinic (عيادة دبي لطب الأسنان). All Rights Reserved.</p>
        <p className="text-white/60 mt-1 sm:mt-0 tracking-wide text-[11px]">
          Specialist Dentistry · Implants · Orthodontics · Veneers
        </p>
      </div>

      {/* Architectural Wordmark: DUBAI DENTAL */}
      <div className="relative z-10 w-full flex justify-center items-end select-none pointer-events-none mt-3 pt-1 overflow-hidden">
        <div className="w-full text-center tracking-[-0.03em] font-extrabold text-[5vw] sm:text-[6vw] leading-none text-white/15 uppercase select-none drop-shadow-sm font-sans">
          DUBAI DENTAL
        </div>
      </div>
    </footer>
  );
}
