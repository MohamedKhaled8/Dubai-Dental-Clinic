import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MessageCircle, Star, ShieldCheck, MapPin } from "lucide-react";
import { OrisTeethCanvas } from "./OrisTeethCanvas";
import { OrisHeader, OrisPreloader } from "./OrisHeaderAndLoader";
import { OrisStatCounter } from "./OrisRollingCounter";
import { OrisCareCards } from "./OrisCareCards";
import { OrisTreatmentsStack } from "./OrisTreatmentsStack";
import { UtopiaVerifiedReviews } from "./UtopiaVerifiedReviews";
import { OrisPassionMeetPurpose } from "./OrisPassionMeetPurpose";
import { OrisAppointmentForm } from "./OrisAppointmentForm";
import { OrisFooter } from "./OrisFooter";
import { UtopiaQuickBookModal, UtopiaFloatingQuickBook } from "./UtopiaQuickBookModal";
import { clinicData } from "@/data/clinic";

gsap.registerPlugin(ScrollTrigger);

const TEAM_INITIALS = [
  { name: "Dr. Ahmed Karam", role: "Clinic Director", initials: "AK" },
  { name: "Dr. Amr Adel", role: "Implants Specialist", initials: "AA" },
  { name: "Dr. Sherif Fathy", role: "Orthodontics", initials: "SF" },
  { name: "Dr. Omar Makhlouf", role: "Pediatric Care", initials: "OM" },
  { name: "Dr. Nouran Ahmed", role: "Aesthetic Veneers", initials: "NA" },
];

export function OrisDentalTemplate() {
  const heroCardRef = useRef<HTMLDivElement>(null);
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Lenis Smooth Scrolling setup (Fast & Buttery Smooth 60FPS)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  // 2. Hero Floating Card Entrance animation
  useEffect(() => {
    const card = heroCardRef.current;
    if (!card) return;

    const avs = avatarRefs.current.filter(Boolean);
    gsap.set(card, { autoAlpha: 0, y: 25, scale: 0.96 });
    if (avs.length > 0) {
      gsap.set(avs, { scale: 0, autoAlpha: 0 });
    }

    let entered = false;
    const triggerCard = () => {
      if (entered) return;
      entered = true;
      gsap.to(card, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      });
      if (avs.length > 0) {
        gsap.to(avs, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.7,
          ease: "back.out(1.5)",
        });
      }
    };

    if ((window as any).__orisLoaderFinished) {
      triggerCard();
    } else {
      window.addEventListener("oris-loader-finished", triggerCard, { once: true });
      setTimeout(triggerCard, 1200);
    }

    return () => {
      window.removeEventListener("oris-loader-finished", triggerCard);
    };
  }, []);

  // Set document dir and lang for Oris Dental
  useEffect(() => {
    const prevDir = document.documentElement.dir;
    const prevLang = document.documentElement.lang;
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
    return () => {
      document.documentElement.dir = prevDir || "rtl";
      document.documentElement.lang = prevLang || "ar";
    };
  }, []);

  return (
    <div dir="ltr" className="oris-font min-h-screen bg-white text-oris-secondary select-text overflow-x-hidden">
      {/* 1. Fullscreen Wipe Preloader */}
      <OrisPreloader />

      {/* 2. Fixed Top Header */}
      <OrisHeader />

      {/* Quick Booking Modal & Floating Fast Action */}
      <UtopiaQuickBookModal />
      <UtopiaFloatingQuickBook />

      <main id="main" className="bg-white oris-dental-main">
        {/* 3. Hero Section with 3D Teeth Visualizer */}
        <section
          id="oris-hero"
          className="h-dvh sticky top-0 z-0 bg-[linear-gradient(to_top,#3365E2_0%,#3365E2_20%,#4a78e7_40%,#789ef1_60%,#b9d0fb_80%,#ffffff_100%)] overflow-hidden w-full max-[1025px]:h-dvh max-md:h-dvh"
        >
          <div className="h-full w-full relative flex flex-col justify-between">
            {/* Interactive 3D Canvas */}
            <OrisTeethCanvas />

            {/* Hero Overlay Content */}
            <div className="w-full oris-paddx flex items-center justify-between h-full max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:justify-start max-[1025px]:gap-6 max-md:gap-4 max-[1025px]:pt-28 max-[1025px]:pb-8 max-md:pt-24 max-md:pb-6 z-10 pointer-events-none *:pointer-events-auto">
              {/* Left Column */}
              <div className="w-1/2 max-[1025px]:w-full gap-4 max-[1025px]:gap-3 flex items-start justify-center flex-col text-white">
                {/* High Contrast, Crystal-Clear Location Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white text-[#0B1B3A] text-xs font-bold shadow-lg shadow-black/15 border border-white/90">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="tracking-wide">Al-Haram, Giza · 20 Ezz El-Din Omar St.</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12] max-w-xl">
                  Brighten your smile with calm, specialist dental care
                </h1>

                <p className="max-w-md text-white/95 text-sm sm:text-base leading-relaxed font-normal">
                  Under the supervision of certified consultants, we provide
                  gentle, personalized dental treatments with 3D CBCT digital planning.
                </p>

                {/* Instant Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-quick-book"))}
                    className="h-11 sm:h-12 px-6 rounded-full bg-white text-[#0B1B3A] font-semibold text-xs sm:text-sm shadow-xl hover:bg-blue-50 transition-all hover:scale-103 cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#3365e2]" />
                    <span>Book 3D Consultation</span>
                  </button>

                  <a
                    href={clinicData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 sm:h-12 px-5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-1/2 mt-auto max-[1025px]:mt-0 max-[1025px]:w-full flex gap-4 items-end max-[1025px]:items-start justify-end pb-8 max-[1025px]:pb-0 flex-col">
                <p className="max-w-md text-white/95 text-xs sm:text-sm leading-relaxed font-light">
                  Our clinical treatments in Al-Haram are designed around complete
                  pain prevention: from routine ultrasonic cleanings to computer-guided
                  titanium implants and bespoke cosmetic restorations.
                </p>

                {/* Floating Member Stats Card */}
                <div
                  ref={heroCardRef}
                  className="w-full max-w-md rounded-2xl bg-white p-6 flex flex-col justify-between border border-white/80 relative z-10 shadow-2xl max-[1025px]:hidden"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold mb-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>4.5 / 5.0 · 1,200+ Google Reviews</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B1B3A] tracking-tight">
                      Join 5000+
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      Satisfied patients in Al-Haram & Giza
                    </p>
                  </div>

                  <div className="flex items-center justify-between w-full pt-3 border-t border-slate-100">
                    {/* Specialist Badges Stack */}
                    <div className="flex items-center space-x-[-8px]">
                      {TEAM_INITIALS.map((item, idx) => (
                        <div
                          key={idx}
                          ref={(el) => {
                            avatarRefs.current[idx] = el;
                          }}
                          className="relative group/avatar z-10 hover:z-30 will-change-transform"
                        >
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3365e2] to-[#0B1B3A] text-white flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm select-none cursor-pointer group-hover/avatar:scale-115 transition-transform duration-200">
                            {item.initials}
                          </div>
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 translate-y-1 group-hover/avatar:opacity-100 group-hover/avatar:translate-y-0 pointer-events-none transition-all duration-200 ease-out z-40 whitespace-nowrap bg-[#0B1B3A] text-white text-xs font-medium py-1 px-2.5 rounded-md shadow-lg flex flex-col items-center">
                            <span>{item.name}</span>
                            <span className="text-[10px] text-blue-200">{item.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-slate-500 text-xs font-medium leading-tight text-right">
                      Supervised by 8+
                      <br /> Dental Specialists
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. White Body Wrapper */}
        <div className="z-10 text-oris-secondary relative bg-white">
          {/* About Utopia Clinic Section (Redesigned Editorial Grid) */}
          <section
            id="about-oris"
            className="w-full relative z-10 bg-white oris-paddx py-16 md:py-24 border-b border-slate-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3365e2] text-xs font-bold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3365e2]" />
                  <span>Who We Are · من نحن</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B1B3A] leading-[1.18]">
                  Calm, Artful Dental Care in the Heart of Al-Haram
                </h2>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  A specialist practice dedicated to gentle hands, advanced 3D technology, and patient peace of mind.
                </p>
              </div>

              <div className="lg:col-span-7 lg:pl-6 space-y-4">
                <p className="text-slate-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
                  At Dubai Dental Clinic, under the clinical leadership of <strong className="font-semibold text-[#0B1B3A]">Dr. Karim Kamal</strong> and our multidisciplinary team of specialized consultants, we believe everyone deserves a healthy, confident smile without dental anxiety.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Located at 20 Ezz El-Din Omar St., Al-Haram (El-Arish Station), we integrate in-house 3D CBCT digital imaging, computer-guided implant surgery, hospital-grade sterilization, and personalized treatment schedules crafted around your comfort and budget.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-medium text-slate-700">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">✓ In-House 3D CBCT Scans</span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">✓ 100% Sterile Hospital Protocols</span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">✓ Certified Consultants</span>
                </div>
              </div>
            </div>

            {/* Rolling Stat Ticker */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
              <OrisStatCounter
                value="15+"
                label="Years of Clinical Excellence"
                delay={0}
              />
              <OrisStatCounter
                value="10+"
                label="Board-Certified Dental Specialists"
                delay={0.15}
              />
              <OrisStatCounter
                value="4.5"
                label="Google Star Rating (1,200+ Reviews)"
                delay={0.3}
              />
              <OrisStatCounter
                value="99%"
                label="Patient Satisfaction in Al-Haram"
                delay={0.45}
              />
            </div>
          </section>

          {/* 5. Care Designed for Your Lasting Comfort (Luxury Double-Bezel Cards) */}
          <OrisCareCards />

          {/* 6. Stacking Treatment Deck (Tightly Pinned, Zero Gap) */}
          <OrisTreatmentsStack />

          {/* 7. Parallax Banner */}
          <section
            id="parallax"
            className="h-[45vh] w-full flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full will-change-transform">
              <img
                alt="Dubai Dental Clinic Al-Haram interior"
                src="/oris/parallax.webp"
                className="w-full h-full object-cover brightness-85"
              />
              <div className="absolute inset-0 bg-[#0B1B3A]/65 backdrop-blur-[1px]" />
            </div>
            <div className="relative z-10 text-center max-w-3xl oris-paddx">
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-200 block mb-2">
                Al-Haram Specialist Care · Ezz El-Din Omar
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white leading-relaxed drop-shadow-md">
                Gentle, personalized care designed to preserve your natural smile
                for decades to come.
              </h2>
            </div>
          </section>

          {/* 8. Verified Patient Reviews */}
          <UtopiaVerifiedReviews />

          {/* 9. Where Passion Meets Purpose */}
          <OrisPassionMeetPurpose />

          {/* 10. Book Appointment Form */}
          <OrisAppointmentForm />

          {/* 11. Footer with UTOPIA DENTAL branding */}
          <OrisFooter />
        </div>
      </main>
    </div>
  );
}
