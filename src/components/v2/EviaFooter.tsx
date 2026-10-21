import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink, Calendar, Sparkles } from "lucide-react";

interface EviaFooterProps {
  isAr: boolean;
  onScrollTo: (selector: string) => void;
  onOpenBooking?: () => void;
}

export function EviaFooter({ isAr, onScrollTo, onOpenBooking }: EviaFooterProps) {
  const FOOTER_SECTIONS = [
    {
      title: isAr ? "الخدمات التخصصية" : "Specialized Treatments",
      links: [
        { label: isAr ? "زراعة الأسنان وجراحة الفكين" : "Dental Implants & Surgery", href: "#services" },
        { label: isAr ? "ابتسامة هوليوود وفينير" : "Veneers & Aesthetics", href: "#services" },
        { label: isAr ? "تقويم الأسنان الشفاف والمعدني" : "Clear Aligners & Ortho", href: "#services" },
        { label: isAr ? "تنظيف وتلميع وتبييض الأسنان" : "Scaling & Whitening", href: "#services" },
        { label: isAr ? "علاج وحشو الجذور المجهري" : "Endodontics & Root Canal", href: "#services" },
      ],
    },
    {
      title: isAr ? "عن المركز والاعتماد" : "Clinic Highlights",
      links: [
        { label: isAr ? "فريق أطباء مركز دبي" : "Dubai Dental Specialists", href: "#team" },
        { label: isAr ? "أشعة ديجيتال وميكروسكوب جذور" : "Digital X-Ray & Microscope", href: "#facilities" },
        { label: isAr ? "تقييمات مراجعينا (+1,200 ★)" : "Verified Reviews (4.5 ★)", href: "#reviews" },
        { label: isAr ? "نتائج قبل وبعد العلاج" : "Before & After Results", href: "#results" },
        { label: isAr ? "أعلى معايير التعقيم الطبي" : "Class B Hospital Sterilization", href: "#why-us" },
      ],
    },
    {
      title: isAr ? "التواصل المباشر" : "Quick Contact",
      links: [
        {
          label: isAr ? "هاتف: 01022013314" : "Call: 01022013314",
          href: "tel:+201022013314",
          isExternal: true,
        },
        {
          label: isAr ? "هاتف إضافي: 01028665801" : "Call: 01028665801",
          href: "tel:+201028665801",
          isExternal: true,
        },
        {
          label: isAr ? "واتساب المركز المباشر" : "WhatsApp Direct Chat",
          href: "https://wa.me/201022013314",
          isExternal: true,
        },
        {
          label: isAr ? "موقعنا على خرائط Google" : "Google Maps Location",
          href: "https://maps.app.goo.gl/uvr71SPw8w17bNsC6",
          isExternal: true,
        },
      ],
    },
    {
      title: isAr ? "العنوان ومواعيد العمل" : "Hours & Location",
      links: [
        {
          label: isAr ? "٢٠ شارع عز الدين عمر، محطة العريش" : "20 Ezz El-Din Omar St., El-Arish",
          href: "https://maps.app.goo.gl/uvr71SPw8w17bNsC6",
          isExternal: true,
        },
        {
          label: isAr ? "الهرم، محافظة الجيزة، مصر" : "Al-Haram, Giza, Egypt",
          href: "https://maps.app.goo.gl/uvr71SPw8w17bNsC6",
          isExternal: true,
        },
        {
          label: isAr ? "يومياً: ١:٠٠ ظهراً – ١١:٠٠ مساءً" : "Daily: 1:00 PM – 11:00 PM",
          href: "#contact",
        },
        {
          label: isAr ? "الجمعة بموعد مسبق" : "Friday by Appointment",
          href: "#contact",
        },
      ],
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal) return; // allow external navigation
    e.preventDefault();
    onScrollTo(href);
  };

  return (
    <footer
      id="oris-footer"
      className="w-full bg-gradient-to-b from-[#1e40af] via-[#173cb6] to-[#071329] text-white overflow-hidden px-4 sm:px-8 lg:px-12 pt-8 pb-3 sm:pt-9 sm:pb-4 flex flex-col justify-between relative border-t border-blue-900/30"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Heading & Immediate Booking Button */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 max-w-full pb-4 border-b border-white/10">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-200 block mb-0.5">
            {isAr ? "مركز دبي لطب وتجميل وزراعة الأسنان · الهرم، الجيزة" : "Dubai Dental Clinic · Al-Haram, Giza"}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white max-w-xl leading-snug tracking-tight">
            {isAr
              ? "ابتسامتك المشرقة تبدأ برعاية طبية متخصصة وأمينة."
              : "Brighten your smile with calm, specialist care."}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="tel:+201022013314"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-all cursor-pointer shrink-0"
          >
            {isAr ? "اتصل: 01022013314" : "Call: 01022013314"}
          </a>

          <button
            type="button"
            onClick={() => {
              if (onOpenBooking) onOpenBooking();
              else onScrollTo("#contact");
            }}
            className="px-5 py-2 rounded-full bg-white text-[#071329] font-extrabold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-md hover:scale-102 active:scale-98 cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <span>{isAr ? "احجز استشارتك الآن" : "Book Consultation Now"}</span>
            <span className={isAr ? "rotate-180" : ""}>↗</span>
          </button>
        </div>
      </div>

      {/* 4 Nav Columns */}
      <nav
        aria-label="Footer"
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-4"
      >
        {FOOTER_SECTIONS.map((col, idx) => (
          <div key={idx} className="footer-col flex flex-col gap-1.5">
            <p className="text-white text-xs sm:text-sm font-bold whitespace-nowrap border-b border-white/10 pb-1">
              {col.title}
            </p>
            <ul className="flex flex-col gap-1">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noreferrer" : undefined}
                    onClick={(e) => handleLinkClick(e, link.href, link.isExternal)}
                    className="group inline-flex items-center no-underline text-white/80 hover:text-white transition-colors text-xs relative w-fit py-0.5 cursor-pointer"
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

      {/* Copyright Strip */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-white/10 text-white/70 text-[11px] sm:text-xs gap-1.5">
        <p>
          {isAr
            ? "© 2026 مركز دبي لطب وجراحة وتجميل الأسنان (الهرم، محافظة الجيزة). جميع الحقوق محفوظة."
            : "© 2026 Dubai Dental Clinic (Al-Haram, Giza Governorate). All Rights Reserved."}
        </p>
        <p className="text-white/60 tracking-wide text-[10px] sm:text-[11px]">
          {isAr
            ? "زراعة الأسنان · علاج الجذور والأعصاب · تقويم الأسنان · تركيبات الزيركون والفينيرز"
            : "Dental Implants · Endodontics & Root Canal · Orthodontics · Cosmetic Veneers"}
        </p>
      </div>

      {/* Architectural Wordmark: DUBAI DENTAL CLINIC */}
      <div className="relative z-10 w-full flex justify-center items-end select-none pointer-events-none mt-2 overflow-hidden">
        <div className="w-full text-center tracking-[-0.03em] font-extrabold text-[5vw] sm:text-[5.5vw] leading-none text-white/10 uppercase select-none drop-shadow-sm font-sans py-0.5">
          DUBAI DENTAL CLINIC
        </div>
      </div>
    </footer>
  );
}
