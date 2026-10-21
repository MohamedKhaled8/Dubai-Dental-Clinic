import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Globe } from "lucide-react";

interface EviaNavbarProps {
  isAr: boolean;
  onToggleLang: () => void;
  onOpenBooking: () => void;
  onScrollTo: (selector: string) => void;
}

export function EviaNavbar({
  isAr,
  onToggleLang,
  onOpenBooking,
  onScrollTo,
}: EviaNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItemsEn = [
    { label: "About", target: "#about" },
    { label: "Services", target: "#services" },
    { label: "Facilities", target: "#facilities" },
    { label: "Team", target: "#team" },
    { label: "Reviews", target: "#reviews" },
    { label: "Contact", target: "#contact" },
  ];

  const navItemsAr = [
    { label: "عن المركز", target: "#about" },
    { label: "الخدمات", target: "#services" },
    { label: "أجنحة العيادة", target: "#facilities" },
    { label: "الفريق الطبي", target: "#team" },
    { label: "التقييمات", target: "#reviews" },
    { label: "تواصل معنا", target: "#contact" },
  ];

  const navItems = isAr ? navItemsAr : navItemsEn;

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    onScrollTo(target);
  };

  return (
    <>
      {/* Floating Dark Pill Header - Exact Framer Original Replica */}
      <header className="fixed top-5 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300">
        <div className="pointer-events-auto bg-[#242b36]/80 hover:bg-[#242b36]/90 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full px-2 sm:px-2.5 py-1.5 flex items-center gap-1.5 sm:gap-3 transition-all duration-300">
          {/* Logo Pill matching Framer: rounded-full bg-[#313946] */}
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#313946] hover:bg-[#3d4757] text-white px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 group shadow-inner"
          >
            {/* Tooth SVG Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform"
            >
              <path d="M12 2C8 2 6 5 6 9c0 3 1.5 6.5 2.5 10 .5 2 1.5 3 3.5 3s3-1 3.5-3c1-3.5 2.5-7 2.5-10 0-4-2-7-6-7z" />
              <path d="M9 12c1.5 1 4.5 1 6 0" />
            </svg>
            <span className="font-semibold text-xs sm:text-sm tracking-tight text-white whitespace-nowrap">
              {isAr ? "مركز دبي لطب الأسنان" : "Dubai Dental Clinic"}
            </span>
          </Link>

          {/* Desktop Nav Items matching Framer */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 px-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.target)}
                className="text-white/80 hover:text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Subtle Language Switcher Pill */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium transition-all cursor-pointer"
            title="Toggle Arabic / English"
          >
            <Globe className="w-3 h-3 text-blue-300" />
            <span>{isAr ? "EN" : "عربي"}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-4 top-20 z-50 bg-[#1c2331]/95 backdrop-blur-2xl rounded-[28px] border border-white/15 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 md:hidden text-white"
          data-lenis-prevent
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.target)}
                className="text-start py-2.5 px-3 rounded-xl hover:bg-white/10 text-sm font-semibold text-white/90 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-white/15 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onToggleLang();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2 rounded-full bg-white/10 text-xs font-semibold text-white"
              >
                <Globe className="w-3.5 h-3.5 text-blue-300" />
                <span>{isAr ? "Switch to English" : "التحويل للغة العربية"}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-white text-[#111827] text-xs font-bold shadow-md hover:bg-blue-50"
              >
                {isAr ? "احجز موعد كشف الآن" : "Book an appointment"} ↗
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
