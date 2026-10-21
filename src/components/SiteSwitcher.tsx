import { useState, useEffect } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Sparkles, Stethoscope, ChevronDown, ChevronUp, Layers, Check } from "lucide-react";

export function SiteSwitcher() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isV2 = pathname.startsWith("/v2");

  // Keep track of user's active preference in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("preferred_design_version", isV2 ? "v2" : "v1");
    } catch {
      // ignore
    }
  }, [isV2]);

  return (
    <aside
      aria-label="مبدل تصاميم الموقع"
      className="fixed bottom-6 left-6 z-[9999] font-sans antialiased text-xs select-none"
      dir="rtl"
    >
      <div className="relative flex flex-col items-start gap-1.5">
        {/* Main Floating Capsule */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#0B1714]/95 hover:bg-[#0B1714] text-white rounded-full shadow-2xl border border-white/15 backdrop-blur-2xl transition-all duration-300">
          {/* Header / Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-neutral-300 hover:text-white transition-colors"
            title={isCollapsed ? "إظهار مبدل التصاميم" : "تصغير"}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-extrabold text-[11px] tracking-wide text-neutral-200">
              معاينة التصاميم
            </span>
            {isCollapsed ? (
              <ChevronUp className="w-3 h-3 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            )}
          </button>

          {/* Site Buttons (when not collapsed) */}
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 pr-1.5 border-r border-white/20">
              {/* Site 1 */}
              <Link
                to="/v1"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all duration-200 ${
                  pathname === "/v1" || pathname === "/oris"
                    ? "bg-white/15 text-white border border-white/30 shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-blue-400" />
                <span>النمط الكلاسيكي</span>
                {(pathname === "/v1" || pathname === "/oris") && <Check className="w-3 h-3 text-blue-400" />}
              </Link>

              {/* Site 2: V2 Dubai Dental Clinic Modern */}
              <Link
                to="/v2"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-200 ${
                  isV2
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-400/50 shadow-md shadow-blue-900/50"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
                <span>مركز دبي V2 الحديثة ✨</span>
                {isV2 && <Check className="w-3 h-3 text-emerald-200" />}
              </Link>

              {/* Site 3: Dentia Video & Animation Hero */}
              <Link
                to="/dentia"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-200 ${
                  pathname === "/dentia"
                    ? "bg-[#4A7CD2] text-white border border-blue-300 shadow-md shadow-blue-600/40"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Dentia 10 (فيديو وأنميشن) 🎬</span>
                {pathname === "/dentia" && <Check className="w-3 h-3 text-white" />}
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
