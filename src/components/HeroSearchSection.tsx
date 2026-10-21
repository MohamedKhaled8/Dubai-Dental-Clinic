import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Activity,
  Layers,
  ChevronRight,
  HelpCircle,
  Stethoscope,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { searchClinicDatabase, type SearchEntry } from "@/lib/search-data";

interface HeroSearchSectionProps {
  onOpenGlobalSearch?: () => void;
}

const symptomQuickChips = [
  { ar: "زراعة أسنان فورية", en: "Dental Implants", query: "زراعة" },
  { ar: "عدسات الفينيرز (E.max)", en: "Veneers & Smile", query: "فينيرز" },
  { ar: "ألم ضرس وعلاج عصب", en: "Nerve Pain", query: "عصب" },
  { ar: "تنظيف جير وتبييض", en: "Tartar Cleaning", query: "تنظيف" },
  { ar: "تقويم الأسنان وتعديل العضة", en: "Orthodontics", query: "تقويم" },
  { ar: "أسنان أطفال بدون خوف", en: "Pediatric Care", query: "أطفال" },
];

export function HeroSearchSection({ onOpenGlobalSearch }: HeroSearchSectionProps) {
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";
  const [searchTerm, setSearchTerm] = useState("");

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return searchClinicDatabase(searchTerm, "all").slice(0, 4);
  }, [searchTerm]);

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Search Input Box with Luxury Border & Shadow */}
      <div className="relative rounded-3xl border border-[#d5d1c5] bg-white p-2.5 shadow-xl transition-all focus-within:border-[#0f172a] focus-within:ring-2 focus-within:ring-[#0f172a]/10">
        <div className="flex items-center gap-3 px-3 py-1.5">
          <Search className="h-5 w-5 text-[#8c6d46] shrink-0" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isAr
                ? "ابحث عن علاج، دكتور، عرض، تقنية، أو ألم تشعر به..."
                : "Search treatments, specialists, symptoms, or prices..."
            }
            className="w-full bg-transparent text-sm md:text-base font-medium text-[#0f172a] placeholder:text-[#8d8b82] outline-none"
          />

          {/* Shortcut / Trigger Button */}
          <button
            onClick={onOpenGlobalSearch}
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#e6e4dc] bg-[#faf9f6] px-3 py-1.5 text-xs font-bold text-[#52525b] hover:bg-[#f4f2ec] hover:text-[#0f172a] transition-colors shrink-0"
            title={isAr ? "افتح البحث الشامل" : "Open full search"}
          >
            <span>{isAr ? "بحث مفصل" : "Advanced"}</span>
            <kbd className="rounded bg-white px-1.5 py-0.5 text-[10px] font-mono shadow-xs border border-[#d5d1c5]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Inline Quick Matches Dropdown */}
        {results.length > 0 && (
          <div className="mt-2 border-t border-[#f1efe9] pt-2 px-1 divide-y divide-[#f4f2ec]">
            {results.map((item) => (
              <Link
                key={item.id}
                to={item.link || "/services"}
                className="flex items-center justify-between rounded-xl p-3 hover:bg-[#faf9f6] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f2ec] text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white transition-colors">
                    {item.category === "service" && <Layers className="h-4 w-4" />}
                    {item.category === "symptom" && <Activity className="h-4 w-4" />}
                    {item.category === "doctor" && <Stethoscope className="h-4 w-4" />}
                    {item.category === "process" && <ShieldCheck className="h-4 w-4" />}
                    {item.category === "faq" && <HelpCircle className="h-4 w-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display text-xs md:text-sm font-bold text-[#0f172a]">
                        {isAr ? item.title.ar : item.title.en}
                      </p>
                      {item.badge && (
                        <span className="rounded-full bg-[#f4f2ec] px-2 py-0.5 text-[10px] font-bold text-[#52525b]">
                          {isAr ? item.badge.ar : item.badge.en}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#52525b] line-clamp-1">
                      {isAr ? item.description.ar : item.description.en}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#8c6d46] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{isAr ? "عرض" : "View"}</span>
                  <ChevronRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                </div>
              </Link>
            ))}

            <div className="pt-2 pb-1 text-center">
              <button
                onClick={onOpenGlobalSearch}
                className="text-xs font-bold text-[#0f172a] hover:text-[#8c6d46] transition-colors"
              >
                {isAr ? "عرض جميع النتائج المطابقة في البحث الشامل ←" : "View all matches in full search →"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popular Symptom Tags */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
        <span className="font-bold text-[#8c6d46] text-[11px] me-1">
          {isAr ? "الأكثر طلباً بالهرم:" : "Popular in Al-Haram:"}
        </span>

        {symptomQuickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => setSearchTerm(chip.query)}
            className="rounded-full border border-[#e6e4dc] bg-white px-3 py-1 text-[11px] font-medium text-[#0f172a] hover:border-[#b39062] hover:bg-[#faf9f6] hover:text-[#8c6d46] transition-all shadow-xs active:scale-95"
          >
            {isAr ? chip.ar : chip.en}
          </button>
        ))}
      </div>
    </div>
  );
}
