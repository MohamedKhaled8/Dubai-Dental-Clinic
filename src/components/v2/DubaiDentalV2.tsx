import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useQuery } from "@tanstack/react-query";
import { getServices, getDoctors, getReviews, getCases } from "@/lib/v2-repository";
import { DoctorProfile, DentalService } from "./evia-data";
import { EviaNavbar } from "./EviaNavbar";
import { EviaHero } from "./EviaHero";
import { DentiaVideoV2Hero } from "./DentiaVideoV2Hero";
import { EviaStats } from "./EviaStats";
import { EviaServices } from "./EviaServices";
import { EviaWhyUs } from "./EviaWhyUs";
import { EviaClinicFacilities } from "./EviaClinicFacilities";
import { EviaResultsSlider } from "./EviaResultsSlider";
import { EviaTestimonials } from "./EviaTestimonials";
import { EviaTech } from "./EviaTech";
import { EviaLocation } from "./EviaLocation";
import { EviaBlog } from "./EviaBlog";
import { EviaCtaBanner } from "./EviaCtaBanner";
import { EviaFooter } from "./EviaFooter";
import { EviaDoctorModal, EviaServiceModal, EviaBookingModal } from "./EviaModals";

export function DubaiDentalV2() {
  // 1. Language state: default English (matching Evia Dental), can toggle to Arabic!
  const [isAr, setIsAr] = useState(false);
  // 2. Hero style: "dentia" (New Video Design) or "daylight" (Original Evia Design)
  const [heroStyle, setHeroStyle] = useState<"dentia" | "daylight">("dentia");

  // Dynamic Data Subscriptions from Supabase / Unified Repository
  const { data: services = [] } = useQuery({
    queryKey: ["v2_services"],
    queryFn: () => getServices(),
  });
  const { data: doctors = [] } = useQuery({
    queryKey: ["v2_doctors"],
    queryFn: () => getDoctors(),
  });
  const { data: reviews = [] } = useQuery({
    queryKey: ["v2_reviews"],
    queryFn: () => getReviews(),
  });
  const { data: cases = [] } = useQuery({
    queryKey: ["v2_cases"],
    queryFn: () => getCases(),
  });

  // 2. Modals state
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [selectedService, setSelectedService] = useState<DentalService | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState("");
  const [bookingInitialDoctor, setBookingInitialDoctor] = useState("");

  // 3. Ultra-smooth Lenis Scrolling Engine synchronized with GSAP
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Force manual browser scroll restoration & immediately jump to 0,0
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    // Immediately enforce Lenis at top 0
    lenis.scrollTo(0, { immediate: true });

    // Sync Lenis scroll directly to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize GSAP ticker with Lenis raf
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(500, 33);

    // Guard against any delayed browser scroll restorations
    const scrollGuardTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }, 120);

    // Entrance animations across the entire page
    const ctx = gsap.context(() => {
      // 1. Floating Header Dropdown
      gsap.fromTo(
        "header",
        { y: -25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.1,
        }
      );

      // 2. Hero Elements Staggered Fade Up
      gsap.fromTo(
        ".evia-hero-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.15,
        }
      );

      // 3. Section Headers Staggered Reveal on Scroll
      const sectionHeaders = document.querySelectorAll(
        "section:not(#about) .evia-reveal-item"
      );
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // 4. Section Card Grids Reveal on Scroll
      const cardGrids = document.querySelectorAll(
        "#team .grid, #technology .grid, #blog .grid, #contact .grid"
      );
      cardGrids.forEach((grid) => {
        const cards = Array.from(grid.children);
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: grid,
                start: "top 84%",
                once: true,
              },
            }
          );
        }
      });
    });

    return () => {
      clearTimeout(scrollGuardTimer);
      gsap.ticker.remove(tickerCb);
      ctx.revert();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Recalculate ScrollTrigger offsets whenever dynamic data loads from Supabase
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, [services.length, doctors.length, reviews.length, cases.length]);

  // Modal scroll locking
  const isAnyModalOpen = !!selectedDoctor || !!selectedService || bookingOpen;
  useEffect(() => {
    if (isAnyModalOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isAnyModalOpen]);

  // Smooth scroll helper
  const handleScrollTo = (selector: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(selector, {
        offset: -80,
        duration: 1.3,
        immediate: false,
      });
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Booking handlers
  const handleOpenBooking = (serviceTitle?: string, doctorName?: string) => {
    setBookingInitialService(serviceTitle || "");
    setBookingInitialDoctor(doctorName || "");
    setBookingOpen(true);
  };

  const handleBookDoctor = (doctorName: string) => {
    setSelectedDoctor(null);
    handleOpenBooking(undefined, doctorName);
  };

  const handleBookService = (serviceTitle: string) => {
    setSelectedService(null);
    handleOpenBooking(serviceTitle, undefined);
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F7F7F7] text-[#111827] font-sans antialiased selection:bg-[#0069D9] selection:text-white"
    >
      {/* 1 & 2. Top Header & Hero: Utopia Dental Modern Video & Animation Hero */}
      <DentiaVideoV2Hero
        isAr={isAr}
        onToggleLang={() => setIsAr(!isAr)}
        onOpenBooking={() => handleOpenBooking()}
        onScrollTo={handleScrollTo}
      />

      {/* 3. Metric Value Proposition Statement & Stats Cards */}
      <EviaStats isAr={isAr} />

      {/* 4. Our Services / Treatments */}
      <EviaServices
        isAr={isAr}
        onSelectService={(s) => setSelectedService(s)}
        onOpenBooking={handleOpenBooking}
        servicesList={services}
      />

      {/* 5. Why Choose Us (Architectural 2-Column Split) */}
      <EviaWhyUs isAr={isAr} />

      {/* 5b. Inside Dubai Dental Clinic (Real Clinic Rooms & Physical Standards) */}
      <EviaClinicFacilities isAr={isAr} onOpenBooking={() => handleOpenBooking("3D Guided Titanium Dental Implants")} />

      {/* 6. Real Results (Interactive Before & After Slider) */}
      <EviaResultsSlider
        isAr={isAr}
        onOpenBooking={handleOpenBooking}
        caseData={cases[0]}
      />

      {/* 7. Patient Experience (Featured Testimonial & Review Switcher) */}
      <EviaTestimonials isAr={isAr} reviewsList={reviews} />

      {/* 9. Technology / Modern Dentistry (Digital 3D Scan Simulator) */}
      <EviaTech
        isAr={isAr}
        onOpenBooking={handleOpenBooking}
      />

      {/* 10. Visit Us & Location (Google Map Interactive Embed) */}
      <EviaLocation isAr={isAr} />


      {/* 13. Blog & Clinical Education */}
      <EviaBlog isAr={isAr} />

      {/* 14. Bottom CTA Conversion Banner ("Your smile awaits") */}
      <EviaCtaBanner
        isAr={isAr}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 15. Footer (V1 Oris Style with Dubai Dental Data) */}
      <EviaFooter isAr={isAr} onScrollTo={handleScrollTo} onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Modals */}
      <EviaDoctorModal
        doctor={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookDoctor={handleBookDoctor}
        isAr={isAr}
      />

      <EviaServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={handleBookService}
        isAr={isAr}
      />

      <EviaBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={bookingInitialService}
        initialDoctor={bookingInitialDoctor}
        isAr={isAr}
      />
    </div>
  );
}
