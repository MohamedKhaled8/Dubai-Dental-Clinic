import { useEffect, useState } from "react";
import gsap from "gsap";

export function OrisPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        (window as any).__orisLoaderFinished = true;
        window.dispatchEvent(new CustomEvent("oris-loader-finished"));
        setTimeout(() => setVisible(false), 700);
      },
    });

    // Wipe animation on clip-path
    tl.to(".loader-wipe", {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power2.inOut",
      delay: 0.2,
    });

    // Fade out preloader screen
    tl.to(".loader-screen", {
      opacity: 0,
      duration: 0.7,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Loading"
      className="loader-screen fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-b from-[#3365e2] to-[#0f2b82] text-white transition-all duration-700 pointer-events-auto"
    >
      <div className="absolute w-[20vw] h-[20vw] rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center select-none px-6">
        <div className="relative text-center">
          {/* Base Dimmed */}
          <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white/20 uppercase font-sans">
            DUBAI DENTAL
          </div>
          {/* Animated Revealed */}
          <div
            className="loader-wipe absolute inset-0 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase font-sans overflow-hidden"
            style={{
              clipPath: "inset(0 100% 0 0)",
              willChange: "clip-path",
            }}
          >
            DUBAI DENTAL
          </div>
        </div>
        <span className="text-xs tracking-widest text-blue-200 uppercase mt-3 font-semibold">
          Dubai Dental Clinic · Specialist Care
        </span>
      </div>
    </aside>
  );
}

export function OrisHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`text-oris-primary fixed top-0 left-0 z-50 flex items-center w-full justify-between oris-paddx py-[1.5vw] max-[1025px]:py-[4vw] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-gray-100/60"
          : "bg-transparent"
      }`}
    >
      <a href="#oris-hero" className="no-underline flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#13314a] text-white flex items-center justify-center font-bold text-sm shadow-xs">
          D
        </div>
        <div>
          <p className="text-lg sm:text-xl font-bold tracking-tight text-oris-secondary cursor-pointer leading-tight">
            Dubai Dental Clinic
          </p>
          <span className="text-[10px] text-gray-500 font-medium block">
            عيادة دبي لطب وزراعة الأسنان
          </span>
        </div>
      </a>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Phone Call Pill */}
        <a
          href="tel:01022013314"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 bg-white/70 backdrop-blur-xs text-xs font-semibold text-[#13314a] hover:bg-white hover:border-[#3365e2] transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span dir="ltr">010 2201 3314</span>
        </a>

        {/* Book Appointment Instant Trigger */}
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-quick-book"));
          }}
          className="group relative flex items-center justify-center gap-2 h-10 sm:h-12 px-5 sm:px-6 rounded-full overflow-hidden whitespace-nowrap font-medium text-xs sm:text-sm transition-all duration-300 border border-[#3365e2] bg-[#3365e2] text-white shadow-md hover:bg-[#2552d0] hover:scale-102 active:scale-98 cursor-pointer"
        >
          <span
            aria-hidden="true"
            className="relative z-10 flex shrink-0 items-center justify-center w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform duration-300"
          />
          <span className="relative z-10 font-medium tracking-wide">
            Book Appointment
          </span>
        </button>
      </div>
    </header>
  );
}
