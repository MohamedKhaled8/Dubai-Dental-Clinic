import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { clinicData } from "@/data/clinic";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
      style={{ backgroundColor: "rgba(194, 160, 106, 0.15)" }}
    >
      <div
        className="h-full bg-gradient-to-r from-[#C2A06A] via-[#D98E73] to-[#C2A06A] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="#25D366"/>
      <path
        d="M23.5 8.5A9.93 9.93 0 0 0 16 5.5C10.75 5.5 6.5 9.75 6.5 15c0 1.64.43 3.24 1.25 4.65L6.5 25.5l6.05-1.59A9.94 9.94 0 0 0 16 24.5c5.25 0 9.5-4.25 9.5-9.5 0-2.54-.99-4.93-2.78-6.73l-.22-.27ZM16 22.9c-1.42 0-2.81-.38-4.02-1.1l-.29-.17-2.97.78.79-2.9-.19-.3A7.87 7.87 0 0 1 8.1 15c0-4.36 3.54-7.9 7.9-7.9 2.11 0 4.09.82 5.58 2.32a7.84 7.84 0 0 1 2.32 5.6c0 4.35-3.54 7.88-7.9 7.88Zm4.33-5.91c-.24-.12-1.4-.69-1.61-.77-.21-.08-.37-.12-.52.12-.16.24-.6.77-.74.92-.14.16-.27.17-.5.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.17-1.4-1.31-1.64-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.52-1.26-.72-1.72-.19-.45-.38-.39-.52-.4h-.45c-.16 0-.41.06-.63.3-.22.24-.83.81-.83 1.97s.85 2.28.97 2.44c.12.16 1.67 2.55 4.04 3.58.56.24 1 .39 1.34.5.56.18 1.07.15 1.48.09.45-.07 1.4-.57 1.6-1.13.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z"
        fill="white"
      />
    </svg>
  );
}

export function DesktopFloatingWhatsApp() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <aside
      aria-label={isAr ? "محادثة فورية عبر واتساب" : "WhatsApp Quick Chat"}
      className="hidden md:flex fixed bottom-8 end-8 z-40 items-center group"
    >
      <a
        href={clinicData.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isAr ? "تواصل معنا مباشرة عبر واتساب" : "Chat on WhatsApp"}
        className="relative flex items-center gap-3 bg-[#075e54] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-green-900/40 hover:bg-[#128c7e] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10"
      >
        {/* Pulse ring */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
        </span>
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-bold tracking-wide">
          {isAr ? "واتساب" : "WhatsApp"}
        </span>
      </a>
    </aside>
  );
}

export function MobileBottomBar() {
  const { tr, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <nav
      aria-label={isAr ? "خيارات الاتصال والحجز السريعة" : "Quick Actions"}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1F1C]/95 backdrop-blur-md border-t border-[#C2A06A]/30 py-2.5 px-3 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
    >
      {/* Call */}
      <a
        href={clinicData.tel || clinicData.phoneTel}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Phone className="w-4 h-4 text-[#C2A06A] mb-0.5" />
        <span className="text-[10px] font-bold tracking-tight">
          {isAr ? "اتصال" : "Call"}
        </span>
      </a>

      {/* WhatsApp */}
      <a
        href={clinicData.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <WhatsAppIcon className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] font-bold tracking-tight">
          {isAr ? "واتساب" : "WhatsApp"}
        </span>
      </a>

      {/* Book Button (Clay Accent) */}
      <Link
        to="/book"
        className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#D98E73] to-[#C2A06A] text-[#0E1F1C] font-bold text-xs shadow-md active:scale-95 transition-transform"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>{isAr ? "طلب حجز" : "Book Visit"}</span>
      </Link>
    </nav>
  );
}

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only enable on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest(".interactive"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="hidden md:block pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <div
        className={`rounded-full border border-[#C2A06A] transition-all duration-200 ${
          isHovered
            ? "w-10 h-10 bg-[#C2A06A]/15 scale-125 border-[#D98E73]"
            : "w-5 h-5 bg-transparent"
        }`}
      />
    </div>
  );
}
