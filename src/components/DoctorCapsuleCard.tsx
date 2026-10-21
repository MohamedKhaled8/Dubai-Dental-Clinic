import { Link } from "@tanstack/react-router";
import { Stethoscope, Calendar, ArrowRight, ChevronRight, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Doctor } from "@/data/types";

interface DoctorCapsuleCardProps {
  doctor: Doctor;
}

export function DoctorCapsuleCard({ doctor }: DoctorCapsuleCardProps) {
  const { lang, tr } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className="card-lift group relative flex flex-col justify-between overflow-hidden p-6 sm:p-7 bg-[#fbf9f4] border border-[#e0d8c7] rounded-[2.25rem]">
      <div>
        {/* Monogram Portrait Frame (Arch Capsule) */}
        <div className="relative mx-auto flex h-32 w-28 items-center justify-center rounded-t-full rounded-b-2xl border-2 border-[#c2a06a]/40 bg-gradient-to-b from-[#16372f] to-[#0e1f1c] shadow-md transition-transform duration-300 group-hover:scale-105">
          <div className="flex flex-col items-center justify-center text-center">
            <span
              className="font-serif text-2xl font-bold tracking-widest text-[#c2a06a]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {typeof doctor.initials === "object" && doctor.initials !== null
                ? isAr
                  ? doctor.initials.ar
                  : doctor.initials.en
                : String(doctor.initials || "")}
            </span>
            <span className="mt-1 flex h-1.5 w-1.5 rounded-full bg-[#c2a06a]" />
          </div>

          {/* Specialist Pin Badge */}
          <div className="absolute -bottom-2 flex h-6 items-center gap-1 rounded-full border border-[#c2a06a]/40 bg-[#fbf9f4] px-2 text-[10px] font-bold text-[#0e1f1c] shadow-xs">
            <Award className="h-3 w-3 text-[#c2a06a]" />
            <span>{isAr ? "الهرم" : "Al-Haram"}</span>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="mt-6 text-center">
          <h4 className="font-serif text-lg sm:text-xl font-bold text-[#0e1f1c]">
            {tr(doctor.name)}
          </h4>
          <p className="mt-1 text-xs font-semibold text-[#c2a06a]">{tr(doctor.role)}</p>
          <p className="mt-3 text-xs leading-relaxed text-[#505c58] line-clamp-3">
            {tr(doctor.bio)}
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-6 border-t border-[#e0d8c7] pt-4">
        <div className="flex items-center justify-between">
          <Link
            to="/doctors/$slug"
            params={{ slug: doctor.slug }}
            className="text-xs font-bold text-[#0e1f1c] hover:text-[#c2a06a] transition-colors"
          >
            {isAr ? "الملف التعريفي" : "View Profile"}
          </Link>

          <Link
            to="/book"
            search={{ doctor: doctor.slug }}
            className="flex items-center gap-1 rounded-full bg-[#0e1f1c] px-3 py-1.5 text-[11px] font-bold text-[#f6f1e7] hover:bg-[#16372f] transition-all"
          >
            <Calendar className="h-3 w-3 text-[#c2a06a]" />
            <span>{isAr ? "حجز موعد" : "Book"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
