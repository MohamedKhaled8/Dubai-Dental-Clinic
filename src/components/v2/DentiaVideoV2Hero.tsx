import React, { useState, useEffect } from "react";
import { PhoneCall, Clock, Mail, ChevronDown, Menu, X, ArrowRight, Globe } from "lucide-react";

interface DentiaVideoV2HeroProps {
  isAr: boolean;
  onToggleLang?: () => void;
  onOpenBooking: () => void;
  onScrollTo: (selector: string) => void;
}

export function DentiaVideoV2Hero({
  isAr,
  onToggleLang,
  onOpenBooking,
  onScrollTo,
}: DentiaVideoV2HeroProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const headlinesEn = ["Expert Care", "Smile Brighter", "Healthy Teeth"];
  const headlinesAr = ["رعاية تخصصية", "ابتسامة ناصعة", "أسنان صحية"];
  const headlines = isAr ? headlinesAr : headlinesEn;

  // Auto rotate headline every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % headlines.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [headlines.length]);

  // Navbar scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = isAr
    ? [
        { label: "الرئيسية", target: "#top" },
        { label: "الخدمات", target: "#services" },
        { label: "لماذا مركز دبي", target: "#why-us" },
        { label: "أجنحة العيادة", target: "#facilities" },
        { label: "النتائج", target: "#results" },
        { label: "التقييمات", target: "#testimonials" },
        { label: "تواصل معنا", target: "#contact" },
      ]
    : [
        { label: "Home", target: "#top" },
        { label: "Services", target: "#services" },
        { label: "Why Us", target: "#why-us" },
        { label: "Facilities", target: "#facilities" },
        { label: "Results", target: "#results" },
        { label: "Reviews", target: "#testimonials" },
        { label: "Contact", target: "#contact" },
      ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    if (target === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onScrollTo(target);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Urbanist:wght@500;600;700;800;900&display=swap');

        .font-urbanist {
          font-family: 'Urbanist', sans-serif;
        }

        @keyframes dentiaZoomFade {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(10px);
            filter: blur(8px);
          }
          18% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
          84% {
            opacity: 1;
            transform: scale(1.02) translateY(0);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: scale(1.06) translateY(-8px);
            filter: blur(6px);
          }
        }

        .dentia-animate-headline {
          animation: dentiaZoomFade 3.2s ease-in-out infinite;
        }

        .dentia-btn-line {
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dentia-btn-line::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #4A7CD2;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .dentia-btn-line:hover::before {
          transform: translateY(0);
        }
      `}</style>

      {/* ========================================================= */}
      {/* 1. TOP HEADER / NAVBAR (EXACT DENTIA STYLE)               */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-slate-100"
            : "bg-gradient-to-b from-black/50 via-black/20 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Utopia Dental Clinics Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#top")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#4A7CD2] to-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 2C8 2 6 5 6 9c0 3 1.5 6.5 2.5 10 .5 2 1.5 3 3.5 3s3-1 3.5-3c1-3.5 2.5-7 2.5-10 0-4-2-7-6-7z" />
                <path d="M9 12c1.5 1 4.5 1 6 0" />
              </svg>
            </div>
            <div className="flex flex-col text-start leading-tight">
              <span
                className={`font-urbanist font-extrabold text-base sm:text-lg tracking-tight transition-colors ${
                  scrolled ? "text-[#10244b]" : "text-white"
                }`}
              >
                {isAr ? "مركز دبي لطب الأسنان" : "Dubai Dental Clinic"}
              </span>
              <span
                className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                  scrolled ? "text-[#4A7CD2]" : "text-blue-200"
                }`}
              >
                {isAr ? "الهرم · الجيزة" : "Al-Haram · Giza"}
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 font-urbanist font-bold text-[15px]">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleNavClick(item.target)}
                className={`transition-colors duration-200 cursor-pointer ${
                  scrolled
                    ? "text-[#10244b] hover:text-[#4A7CD2]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Language Switcher + Book Button */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            {onToggleLang && (
              <button
                type="button"
                onClick={onToggleLang}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  scrolled
                    ? "bg-slate-100 hover:bg-slate-200 text-[#10244b]"
                    : "bg-white/15 hover:bg-white/25 text-white"
                }`}
                title="Toggle Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#4A7CD2]" />
                <span>{isAr ? "English" : "عربي"}</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-md font-urbanist font-bold text-xs sm:text-sm text-white bg-[#4A7CD2] hover:bg-[#3b6abf] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>{isAr ? "احجز موعدك" : "Book Appointment"}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-[#10244b] hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-3 font-urbanist font-bold text-base text-[#10244b]">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleNavClick(item.target)}
                  className="py-2.5 text-start hover:text-[#4A7CD2] border-b border-slate-100"
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="mt-3 w-full py-3 text-center bg-[#4A7CD2] text-white rounded-md font-bold cursor-pointer"
              >
                {isAr ? "احجز موعدك الآن" : "Book Appointment"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION WITH WORKING VIDEO & ANIMATED HEADLINE    */}
      {/* ========================================================= */}
      <section
        id="top"
        className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0a1529]"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-85"
          src="/dentia/1.mp4"
        />

        {/* Dentia Medical Blue/Navy Gradient Overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(16, 36, 75, 0.72) 0%, rgba(74, 124, 210, 0.32) 45%, rgba(16, 36, 75, 0.82) 100%)",
          }}
        />

        {/* Central Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 max-w-5xl mx-auto">
          {/* Animated Headline with Smooth Zoom & Transition */}
          <div className="h-32 sm:h-44 md:h-52 flex items-center justify-center relative w-full mb-3">
            <h1
              key={activeSlide}
              className="font-urbanist font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[140px] text-white tracking-tight leading-none drop-shadow-lg dentia-animate-headline select-none"
            >
              {headlines[activeSlide]}
            </h1>
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-3xl leading-relaxed mb-9 font-normal drop-shadow">
            {isAr
              ? "نقدم رعاية تخصصية شاملة لطب وتجميل وزراعة الأسنان في الهرم لجميع الأعمار، من علاج الجذور والتقويم إلى تجميل الابتسامة والتركيبات الثابتة في بيئة هادئة ومريحة."
              : "We provide comprehensive dental care for patients of all ages in Al-Haram, Giza, from root canal treatments and orthodontics to smile makeovers and fixed prosthetics in a comfortable environment."}
          </p>

          {/* Book Appointment Line / Ghost Button (Exact Dentia fx-slide styling) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="dentia-btn-line inline-flex items-center justify-center px-9 py-3.5 rounded-md border border-white/60 text-white hover:text-white hover:border-transparent font-urbanist font-bold text-sm sm:text-base tracking-wide shadow-md transition-all duration-300 cursor-pointer"
            >
              <span className="relative z-10">{isAr ? "احجز موعدك" : "Book Appointment"}</span>
            </button>

            <a
              href="tel:+201022013314"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-black/40 hover:bg-black/60 border border-white/20 text-white font-urbanist font-bold text-sm sm:text-base tracking-wide backdrop-blur-md transition-all"
            >
              <span dir="ltr">01022013314</span>
            </a>
          </div>
        </div>

        {/* Bottom Quick-Info Bar (3 Dental Service Highlights) */}
        <div className="relative z-10 w-full border-t border-white/10 bg-black/25 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            {/* Phone Column */}
            <a
              href="tel:+201022013314"
              className="flex items-center justify-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#4A7CD2] group-hover:bg-[#4A7CD2] group-hover:text-white transition-all duration-300 shrink-0 shadow-inner">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div className="text-start">
                <h4 className="font-urbanist font-bold text-base sm:text-lg text-white">
                  {isAr ? "تحتاج استشارة أو خدمة؟" : "Need Dental Services?"}
                </h4>
                <p className="text-white/80 text-sm" dir="ltr">
                  Call: 01022013314
                </p>
              </div>
            </a>

            {/* Opening Hours Column */}
            <div className="flex items-center justify-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#4A7CD2] group-hover:bg-[#4A7CD2] group-hover:text-white transition-all duration-300 shrink-0 shadow-inner">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-start">
                <h4 className="font-urbanist font-bold text-base sm:text-lg text-white">
                  {isAr ? "مواعيد العمل" : "Opening Hours"}
                </h4>
                <p className="text-white/80 text-sm">
                  {isAr ? "يومياً: ١:٠٠ م - ١١:٠٠ م" : "Daily: 1:00 PM – 11:00 PM"}
                </p>
              </div>
            </div>

            {/* Email Column */}
            <a
              href="mailto:info@dubaidentalclinic.com"
              className="flex items-center justify-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#4A7CD2] group-hover:bg-[#4A7CD2] group-hover:text-white transition-all duration-300 shrink-0 shadow-inner">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-start">
                <h4 className="font-urbanist font-bold text-base sm:text-lg text-white">
                  {isAr ? "راسلنا عبر البريد" : "Email Us"}
                </h4>
                <p className="text-white/80 text-sm">info@dubaidentalclinic.com</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
