import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  PhoneCall,
  Clock,
  Mail,
  ChevronDown,
  Menu,
  X,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export function DentiaHomepage10() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const headlines = [
    "Expert Care",
    "Smile Brighter",
    "Healthy Teeth",
  ];

  // Rotate headlines every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % headlines.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [headlines.length]);

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-[#ffffff] font-['Inter',sans-serif] text-[#10244b] antialiased selection:bg-[#4A7CD2] selection:text-white"
    >
      {/* Google Fonts Preconnect & Stylesheet */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Urbanist:wght@500;600;700;800;900&display=swap');
        
        .font-urbanist {
          font-family: 'Urbanist', sans-serif;
        }

        @keyframes zoomFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(12px);
            filter: blur(8px);
          }
          20% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
          85% {
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

        .animate-zoom-fade {
          animation: zoomFadeIn 3.2s ease-in-out infinite;
        }

        .btn-line-fx {
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-line-fx::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #4A7CD2;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .btn-line-fx:hover::before {
          transform: translateY(0);
        }
      `}</style>

      {/* ========================================================= */}
      {/* 1. TOP HEADER / NAVBAR (EXACT DENTIA BEHAVIOR)            */}
      {/* ========================================================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-slate-100"
            : "bg-gradient-to-b from-black/50 via-black/20 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dentia" className="relative flex items-center gap-2 group z-50">
            <img
              src={scrolled ? "/dentia/logo-black.webp" : "/dentia/logo-white.webp"}
              alt="Dentia Logo"
              className="h-9 sm:h-10 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-urbanist font-bold text-[15px]">
            <Link
              to="/dentia"
              className={`transition-colors duration-200 ${
                scrolled
                  ? "text-[#4A7CD2]"
                  : "text-white hover:text-white"
              }`}
            >
              Home
            </Link>

            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 transition-colors duration-200 ${
                  scrolled
                    ? "text-[#10244b] hover:text-[#4A7CD2]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                {[
                  "General Dentistry",
                  "Cosmetic Dentistry",
                  "Pediatric Dentistry",
                  "Restorative Dentistry",
                  "Preventive Dentistry",
                  "Orthodontics",
                ].map((s) => (
                  <a
                    key={s}
                    href="#services"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#4A7CD2] font-medium transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#dentists"
              className={`transition-colors duration-200 ${
                scrolled
                  ? "text-[#10244b] hover:text-[#4A7CD2]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Dentists
            </a>

            <a
              href="#about"
              className={`transition-colors duration-200 ${
                scrolled
                  ? "text-[#10244b] hover:text-[#4A7CD2]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Pages
            </a>

            <Link
              to="/blog"
              className={`transition-colors duration-200 ${
                scrolled
                  ? "text-[#10244b] hover:text-[#4A7CD2]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={`transition-colors duration-200 ${
                scrolled
                  ? "text-[#10244b] hover:text-[#4A7CD2]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Area: CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/book"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-md font-urbanist font-bold text-sm text-white bg-[#4A7CD2] hover:bg-[#3b6abf] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span>Book Appointment</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-[#10244b] hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-3 font-urbanist font-bold text-base text-[#10244b]">
              <Link
                to="/dentia"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#4A7CD2] border-b border-slate-100"
              >
                Home
              </Link>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#4A7CD2] border-b border-slate-100"
              >
                Services
              </a>
              <a
                href="#dentists"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#4A7CD2] border-b border-slate-100"
              >
                Dentists
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#4A7CD2] border-b border-slate-100"
              >
                Pages
              </a>
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#4A7CD2] border-b border-slate-100"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-[#4A7CD2] border-b border-slate-100"
              >
                Contact
              </Link>
              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 w-full py-3 text-center bg-[#4A7CD2] text-white rounded-md font-bold"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION WITH WORKING VIDEO & ANIMATED HEADLINE    */}
      {/* ========================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0a1529]">
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
          {/* Animated Headline with Silky Smooth Zoom & Transition */}
          <div className="h-32 sm:h-44 md:h-52 flex items-center justify-center relative w-full mb-3">
            <h1
              key={activeSlide}
              className="font-urbanist font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[140px] text-white tracking-tight leading-none drop-shadow-lg animate-zoom-fade select-none"
            >
              {headlines[activeSlide]}
            </h1>
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-3xl leading-relaxed mb-9 font-normal drop-shadow">
            We provide comprehensive dental care for patients of all ages, from
            routine checkups and preventive treatments to cosmetic and restorative
            dentistry. Our experienced team is dedicated to keeping your smile
            healthy, beautiful, and confident in a comfortable environment.
          </p>

          {/* Book Appointment Line / Ghost Button (Exact Dentia fx-slide styling) */}
          <Link
            to="/book"
            className="btn-line-fx inline-flex items-center justify-center px-9 py-3.5 rounded-md border border-white/60 text-white hover:text-white hover:border-transparent font-urbanist font-bold text-sm sm:text-base tracking-wide shadow-md transition-all duration-300"
          >
            <span className="relative z-10">Book Appointment</span>
          </Link>
        </div>

        {/* Bottom Quick-Info Bar (3 Dental Service Highlights) */}
        <div className="relative z-10 w-full border-t border-white/10 bg-black/25 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            {/* Phone Column */}
            <div className="flex items-center justify-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#4A7CD2] group-hover:bg-[#4A7CD2] group-hover:text-white transition-all duration-300 shrink-0 shadow-inner">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-urbanist font-bold text-base sm:text-lg text-white">
                  Need Dental Services?
                </h4>
                <p className="text-white/80 text-sm">Call: +1 123 456 789</p>
              </div>
            </div>

            {/* Opening Hours Column */}
            <div className="flex items-center justify-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#4A7CD2] group-hover:bg-[#4A7CD2] group-hover:text-white transition-all duration-300 shrink-0 shadow-inner">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-urbanist font-bold text-base sm:text-lg text-white">
                  Opening Hours
                </h4>
                <p className="text-white/80 text-sm">Mon to Sat 08:00 - 20:00</p>
              </div>
            </div>

            {/* Email Column */}
            <div className="flex items-center justify-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#4A7CD2] group-hover:bg-[#4A7CD2] group-hover:text-white transition-all duration-300 shrink-0 shadow-inner">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-urbanist font-bold text-base sm:text-lg text-white">
                  Email Us
                </h4>
                <p className="text-white/80 text-sm">contact@dentiaclinic.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. EXPERIENCE & STATS SECTION (FROM DENTIA HOMEPAGE 10)   */}
      {/* ========================================================= */}
      <section id="about" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-[#4A7CD2] font-urbanist font-bold text-sm tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full">
              About Us
            </span>
            <h2 className="font-urbanist font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#10244b] leading-tight">
              Experience exceptional dental care focused on your comfort.
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Brighten your smile, protect your health, and enjoy personalized
              care every visit! Our board-certified specialists utilize the
              latest 3D digital imaging and pain-free techniques.
            </p>

            {/* Badges / Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Personalized Treatment Plans",
                "Gentle Care for Kids & Adults",
                "State-of-the-Art Technology",
                "Flexible Appointments",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#4A7CD2] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-[#10244b] hover:bg-[#4A7CD2] text-white font-urbanist font-bold text-sm transition-colors duration-200 shadow-md"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-all duration-300">
              <h3 className="font-urbanist font-extrabold text-4xl lg:text-5xl text-[#4A7CD2] mb-2">
                10,000+
              </h3>
              <p className="text-slate-600 font-medium text-sm">Happy Patients</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-all duration-300">
              <h3 className="font-urbanist font-extrabold text-4xl lg:text-5xl text-[#4A7CD2] mb-2">
                2,500+
              </h3>
              <p className="text-slate-600 font-medium text-sm">Teeth Whitened</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-all duration-300">
              <h3 className="font-urbanist font-extrabold text-4xl lg:text-5xl text-[#4A7CD2] mb-2">
                800+
              </h3>
              <p className="text-slate-600 font-medium text-sm">Dental Implants</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SERVICES PREVIEW SECTION (FROM DENTIA HOMEPAGE 10)     */}
      {/* ========================================================= */}
      <section id="services" className="py-20 bg-slate-50 border-t border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#4A7CD2] font-urbanist font-bold text-sm tracking-wider uppercase">
              Our Services
            </span>
            <h2 className="font-urbanist font-extrabold text-3xl sm:text-4xl text-[#10244b] mt-2 mb-4">
              Complete Care for Every Smile
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From routine cleanings to advanced restorations, we provide
              personalized dental solutions for patients of all ages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "General Dentistry",
                desc: "Complete oral care for every smile with cleanings, exams, and preventive care.",
                icon: "01",
              },
              {
                title: "Cosmetic Dentistry",
                desc: "Enhance your smile’s natural beauty with whitening, porcelain veneers, and bonding.",
                icon: "02",
              },
              {
                title: "Pediatric Dentistry",
                desc: "Gentle and fun dental care for kids to grow healthy, happy smiles with confidence.",
                icon: "03",
              },
              {
                title: "Restorative Dentistry",
                desc: "Repair and restore your teeth with 3D implants, crowns, and bridges for lasting comfort.",
                icon: "04",
              },
            ].map((srv) => (
              <div
                key={srv.title}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-urbanist font-black text-2xl text-[#4A7CD2]/40 mb-4 block">
                    {srv.icon}
                  </span>
                  <h3 className="font-urbanist font-bold text-xl text-[#10244b] mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-urbanist font-bold text-[#4A7CD2] hover:text-[#3b6abf] transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FOOTER                                                 */}
      {/* ========================================================= */}
      <footer className="bg-[#10244b] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <img src="/dentia/logo-white.webp" alt="Dentia" className="h-8 w-auto" />
            <span className="text-xs text-slate-400">
              © {new Date().getFullYear()} Dentia Dental Clinic. All Rights Reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-300">
            <Link to="/dentia" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/book" className="hover:text-white transition-colors">
              Book Appointment
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
