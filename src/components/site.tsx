import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import {
  Menu,
  X,
  Search,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { clinicData } from "@/data/clinic";
import { UniversalSearchModal } from "./UniversalSearchModal";
import { UtopiaLogo } from "./UtopiaLogo";
import type { L } from "@/data/types";

export const navItems = [
  { to: "/", k: "home", ar: "الرئيسية", en: "HOME" },
  { to: "/about", k: "about", ar: "من نحن", en: "ABOUT US" },
  { to: "/services", k: "services", ar: "الخدمات", en: "SERVICES" },
  { to: "/doctors", k: "doctors", ar: "الأطباء", en: "DOCTORS" },
  { to: "/patients", k: "patients", ar: "دليل المراجع", en: "PATIENTS" },
  { to: "/gallery", k: "gallery", ar: "قبل وبعد", en: "GALLERY" },
  { to: "/contact", k: "contact", ar: "تواصل معنا", en: "CONTACT" },
] as const;

export function TopInfoBar() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="w-full bg-[#0B4FC7] text-white text-xs py-2 px-4 sm:px-8 border-b border-white/10 select-none">
      <div className="container-x flex items-center justify-between">
        {/* Left / Start Info Items */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
          <span className="hidden md:inline-flex items-center gap-1.5 opacity-90">
            <MapPin className="h-3.5 w-3.5" />
            <span>
              {isAr
                ? "٢٠ شارع عز الدين عمر، متفرع من شارع الهرم، الطالبية، الهرم، الجيزة"
                : "20 Ezz El-Din Omar St., Al-Haram, Talbiya, Giza"}
            </span>
          </span>

          <a
            href="tel:+201022013314"
            className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" />
            <span dir="ltr">010 2201 3314</span>
          </a>

          <a
            href={`mailto:${clinicData.email}`}
            className="hidden lg:inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>{clinicData.email}</span>
          </a>

          <span className="inline-flex items-center gap-1.5 opacity-90">
            <Clock className="h-3.5 w-3.5" />
            <span>{isAr ? "يومياً ١:٠٠ م – ١١:٠٠ م" : "Daily 1:00 PM – 11:00 PM"}</span>
          </span>
        </div>

        {/* Right / End Social Icons */}
        <div className="hidden sm:flex items-center gap-3.5 text-white/80">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="YouTube"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      className="flex items-center gap-1 rounded-md border border-[#E3EAF3] bg-white px-2.5 py-1.5 text-xs font-bold text-[#0B1B3A] transition-all hover:bg-[#EEF4FB] hover:border-[#0B4FC7] active:scale-95"
      aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      <span className="text-[11px] font-semibold text-[#0B4FC7]">
        {lang === "ar" ? "English" : "العربية"}
      </span>
    </button>
  );
}

export function Header() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isAr = lang === "ar";

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E3EAF3] shadow-xs">
        <div className="container-x flex h-20 items-center justify-between gap-4">
          {/* Logo left */}
          <Link to="/" className="shrink-0 flex items-center" aria-label="Dubai Dental Clinic">
            <UtopiaLogo size="md" />
          </Link>

          {/* Centered Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-[13px] tracking-wider text-[#0B1B3A]"
            aria-label="Main"
          >
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="py-2 transition-colors hover:text-[#0B4FC7] relative"
                activeProps={{
                  className:
                    "text-[#0B4FC7] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B4FC7]",
                }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {isAr ? n.ar : n.en}
              </Link>
            ))}
          </nav>

          {/* Right Action: Clean Lang Switch + Solid Blue BOOK APPOINTMENT */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <LangSwitch />

            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B4FC7] px-4 sm:px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#083B99] active:scale-98 transition-all uppercase tracking-wider"
            >
              <Calendar className="h-4 w-4" />
              <span>{isAr ? "احجز موعداً" : "BOOK APPOINTMENT"}</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E3EAF3] bg-white text-[#0B1B3A] lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen / Drawer Nav */}
        {open && (
          <div className="border-t border-[#E3EAF3] bg-white px-5 py-6 shadow-xl lg:hidden">
            <nav className="grid gap-2" aria-label="Mobile">
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-bold text-[#0B1B3A] transition-colors hover:bg-[#EEF4FB] hover:text-[#0B4FC7]"
                >
                  <span>{isAr ? n.ar : n.en}</span>
                  <ChevronRight className="h-4 w-4 text-[#5B6B84] rtl:-scale-x-100" />
                </Link>
              ))}

              <div className="mt-4 pt-4 border-t border-[#E3EAF3] space-y-3">
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#0B4FC7] py-3 text-sm font-bold text-white shadow-sm"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{isAr ? "احجز موعداً" : "BOOK APPOINTMENT"}</span>
                </Link>

                <a
                  href="tel:+201022013314"
                  className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#0B4FC7] py-2.5 text-xs font-bold text-[#0B4FC7] hover:bg-[#EEF4FB]"
                >
                  <Phone className="h-4 w-4" />
                  <span>{isAr ? "اتصل بنا: 01022013314" : "Call Us: 010 2201 3314"}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Universal Search Modal */}
      <UniversalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function Footer() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <footer className="w-full bg-[#0B1B3A] text-white py-6 border-t border-white/10 select-none">
      <div className="container-x flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/70">
        {/* Left: Small white logo */}
        <Link to="/" className="flex items-center" aria-label="Dubai Dental Clinic">
          <UtopiaLogo inverted compact size="sm" />
        </Link>

        {/* Center: Copyright */}
        <p className="text-center font-normal">
          {isAr
            ? "© ٢٠٢٦ مركز دبي لطب الأسنان بالهرم. جميع الحقوق محفوظة."
            : "© 2026 Dubai Dental Clinic. All Rights Reserved."}
        </p>

        {/* Right: Policy links */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link to="/privacy" className="hover:text-white transition-colors">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </Link>
          <span className="text-white/40">|</span>
          <Link to="/terms" className="hover:text-white transition-colors">
            {isAr ? "الشروط والأحكام" : "Terms of Service"}
          </Link>
          <span className="text-white/40">|</span>
          <Link to="/admin" className="hover:text-blue-300 transition-colors text-white/60">
            {isAr ? "بوابة الإدارة" : "Admin"}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  title,
  sub,
  crumb,
}: {
  title: string;
  sub?: string;
  crumb?: string;
}) {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <section className="bg-[#EEF4FB] py-12 md:py-16 border-b border-[#E3EAF3]">
      <div className="container-x">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0B4FC7] mb-3">
          <Link to="/" className="hover:underline">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-[#5B6B84]">{crumb || title}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1B3A] tracking-tight">
          {title}
        </h1>

        {sub && (
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#5B6B84] leading-relaxed">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const I = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkles;
  return <I className={className} />;
}

export function ContactList() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <ul className="space-y-4 text-xs">
      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0E1F1C] text-[#C2A06A]">
          <Phone className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] text-[#16372F]/60 font-semibold">{isAr ? "رقم الهاتف" : "Phone"}</p>
          <a href={`tel:${clinicData.phone}`} dir="ltr" className="font-bold text-[#0E1F1C] hover:text-[#C2A06A]">
            {clinicData.phone}
          </a>
        </div>
      </li>
      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0E1F1C] text-[#C2A06A]">
          <Mail className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] text-[#16372F]/60 font-semibold">{isAr ? "البريد الإلكتروني" : "Email"}</p>
          <a href={`mailto:${clinicData.email}`} className="font-bold text-[#0E1F1C] hover:text-[#C2A06A]">
            {clinicData.email}
          </a>
        </div>
      </li>
      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0E1F1C] text-[#C2A06A]">
          <Clock className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] text-[#16372F]/60 font-semibold">{isAr ? "مواعيد العمل" : "Working Hours"}</p>
          <p className="font-bold text-[#0E1F1C]">{clinicData.hours[lang]}</p>
        </div>
      </li>
    </ul>
  );
}

