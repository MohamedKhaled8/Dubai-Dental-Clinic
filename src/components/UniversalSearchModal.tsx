import { useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Stethoscope,
  ShieldCheck,
  Clock,
  ChevronRight,
  HelpCircle,
  Activity,
  Layers,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import {
  searchClinicDatabase,
  type SearchCategory,
  type SearchEntry,
} from "@/lib/search-data";
import { clinic } from "@/lib/site";

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickQueries = [
  { ar: "زراعة الأسنان", en: "Dental Implants" },
  { ar: "عدسات الفينيرز", en: "Veneers" },
  { ar: "ألم ضرس حاد", en: "Severe Toothache" },
  { ar: "تنظيف الجير", en: "Scaling" },
  { ar: "تقويم الأسنان", en: "Orthodontics" },
  { ar: "طب أسنان الأطفال", en: "Kids Dentistry" },
  { ar: "د. عمرو عادل", en: "Dr. Amr Adel" },
  { ar: "تعقيم Class B", en: "Sterilization" },
];

export function UniversalSearchModal({ isOpen, onClose }: UniversalSearchModalProps) {
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut (Escape to close, Arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        e.preventDefault();
        handleSelectEntry(filteredResults[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const filteredResults = useMemo(() => {
    return searchClinicDatabase(query, activeCategory);
  }, [query, activeCategory]);

  const handleSelectEntry = (entry: SearchEntry) => {
    onClose();
    if (entry.link) {
      navigate({ to: entry.link });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24 backdrop-blur-md bg-black/60 transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#e6e4dc] bg-[#ffffff] shadow-2xl transition-all zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#e6e4dc] px-5 py-4 bg-[#faf9f6]">
          <Search className="h-5 w-5 text-[#8c6d46] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              isAr
                ? "ابحث عن علاج، دكتور، عرض، تقنية، أو استفسار طبي..."
                : "Search treatments, specialists, symptoms, or clinical guides..."
            }
            className="w-full bg-transparent px-3 text-sm md:text-base font-medium text-[#0f172a] placeholder:text-[#8d8b82] outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-full p-1 text-[#52525b] hover:bg-[#f4f2ec] hover:text-[#0f172a]"
              aria-label={isAr ? "مسح النص" : "Clear search"}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-[#d5d1c5] bg-white px-2 py-0.5 text-[10px] font-bold text-[#52525b]">
            ESC
          </kbd>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#f1efe9] px-4 py-2.5 bg-white scrollbar-none text-xs">
          {[
            { id: "all", label: { ar: "الكل", en: "All" } },
            { id: "service", label: { ar: "الخدمات العلاجية", en: "Treatments" } },
            { id: "symptom", label: { ar: "الأعراض والاستشارات", en: "Symptoms" } },
            { id: "doctor", label: { ar: "الأطباء", en: "Specialists" } },
            { id: "process", label: { ar: "التكنولوجيا والتعقيم", en: "Process & Tech" } },
            { id: "faq", label: { ar: "الأسئلة الشائعة", en: "FAQs" } },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as SearchCategory);
                  setSelectedIndex(0);
                }}
                className={`whitespace-nowrap rounded-full px-3 py-1 font-semibold transition-all ${
                  isSelected
                    ? "bg-[#0f172a] text-white shadow-sm"
                    : "text-[#52525b] hover:bg-[#f4f2ec] hover:text-[#0f172a]"
                }`}
              >
                {isAr ? cat.label.ar : cat.label.en}
              </button>
            );
          })}
        </div>

        {/* Quick Query Pills */}
        {!query && (
          <div className="border-b border-[#f1efe9] bg-[#faf9f6]/80 px-4 py-2.5">
            <div className="flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
              <span className="font-bold text-[#8c6d46] shrink-0">
                {isAr ? "بحث شائع:" : "Popular:"}
              </span>
              {quickQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(isAr ? item.ar : item.en)}
                  className="rounded-full border border-[#e6e4dc] bg-white px-2.5 py-0.5 font-medium text-[#0f172a] hover:border-[#b39062] hover:text-[#8c6d46] transition-colors shrink-0"
                >
                  {isAr ? item.ar : item.en}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Scroll Area */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-300"
        >
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center">
              <HelpCircle className="mx-auto h-8 w-8 text-[#8c6d46] opacity-70" />
              <p className="mt-3 font-display text-base font-bold text-[#0f172a]">
                {isAr ? "لم نجد نتائج مطابقة لبحثك" : "No matching dental results"}
              </p>
              <p className="mt-1 text-xs text-[#52525b]">
                {isAr
                  ? "يمكنك التواصل مباشرة مع فريق العيادة بالهرم عبر واتساب لأي استفسار مخصص."
                  : "Contact our clinic concierge directly on WhatsApp for tailored medical guidance."}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <a
                  href={clinic.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2 px-4 text-xs"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>{isAr ? "استشارة واتساب فورية" : "WhatsApp Concierge"}</span>
                </a>
              </div>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectEntry(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`group flex items-start justify-between gap-3 rounded-2xl p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0f172a] text-white shadow-md"
                      : "hover:bg-[#faf9f6] text-[#0f172a]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Category Icon */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? "bg-white/10 text-[#b39062]"
                          : "bg-[#f4f2ec] text-[#0f172a]"
                      }`}
                    >
                      {item.category === "service" && <Layers className="h-4 w-4 text-[#8c6d46]" />}
                      {item.category === "symptom" && <Activity className="h-4 w-4 text-rose-500" />}
                      {item.category === "doctor" && <Stethoscope className="h-4 w-4 text-sky-600" />}
                      {item.category === "process" && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
                      {item.category === "faq" && <HelpCircle className="h-4 w-4 text-amber-500" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-sm font-bold">
                          {isAr ? item.title.ar : item.title.en}
                        </span>

                        {item.badge && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-[#f4f2ec] text-[#52525b]"
                            }`}
                          >
                            {isAr ? item.badge.ar : item.badge.en}
                          </span>
                        )}
                      </div>

                      <p
                        className={`mt-1 text-xs line-clamp-2 leading-relaxed ${
                          isSelected ? "text-white/80" : "text-[#52525b]"
                        }`}
                      >
                        {isAr ? item.description.ar : item.description.en}
                      </p>

                      {/* Meta badges if any */}
                      {item.metaInfo && (
                        <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
                          {item.metaInfo.duration && (
                            <span
                              className={`flex items-center gap-1 rounded-md px-2 py-0.5 ${
                                isSelected ? "bg-white/10 text-white/90" : "bg-[#f1efe9] text-[#52525b]"
                              }`}
                            >
                              <Clock className="h-3 w-3" />
                              {isAr ? item.metaInfo.duration.ar : item.metaInfo.duration.en}
                            </span>
                          )}
                          {item.metaInfo.painLevel && (
                            <span
                              className={`flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold ${
                                isSelected ? "bg-emerald-900/60 text-emerald-200" : "bg-emerald-50 text-emerald-800"
                              }`}
                            >
                              <ShieldCheck className="h-3 w-3 text-emerald-600" />
                              {isAr ? item.metaInfo.painLevel.ar : item.metaInfo.painLevel.en}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Link Arrow */}
                  <div className="shrink-0 self-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${
                        isSelected
                          ? "bg-[#b39062] text-white"
                          : "border border-[#e6e4dc] bg-white text-[#0f172a]"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4 rtl:-scale-x-100" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between border-t border-[#e6e4dc] bg-[#faf9f6] px-5 py-3 text-xs text-[#52525b]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-[#d5d1c5] bg-white px-1.5 py-0.5 text-[10px] font-bold">
                ↑↓
              </kbd>
              {isAr ? "للتنقل" : "Navigate"}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-[#d5d1c5] bg-white px-1.5 py-0.5 text-[10px] font-bold">
                ENTER
              </kbd>
              {isAr ? "للاختيار" : "Select"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#0f172a]">
              {isAr ? "الهرم — شارع عز الدين عمر" : "Al-Haram Clinic Lounge"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
