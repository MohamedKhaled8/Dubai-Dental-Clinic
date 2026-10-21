import React from "react";
import { Users, ArrowUpRight, Award, ShieldCheck } from "lucide-react";
import { EVIA_DOCTORS, DoctorProfile } from "./evia-data";

interface EviaTeamProps {
  isAr: boolean;
  onSelectDoctor: (doctor: DoctorProfile) => void;
  doctorsList?: DoctorProfile[];
}

export function EviaTeam({ isAr, onSelectDoctor, doctorsList }: EviaTeamProps) {
  const activeDoctors = doctorsList && doctorsList.length > 0 ? doctorsList : EVIA_DOCTORS;

  return (
    <section id="team" className="px-4 sm:px-6 py-16 sm:py-24 bg-[#F7F7F7]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 evia-reveal-item">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>{isAr ? "التخصصات الاستشارية" : "Specialist Departments"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              {isAr ? (
                <>
                  رعاية استشارية متكاملة{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    لابتسامة واثقة
                  </span>
                </>
              ) : (
                <>
                  Consultant-led care{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    for your smile
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "نخبة من الأطباء والاستشاريين في علاج الجذور وجراحة الفم وزراعة وتقويم وتجميل الأسنان بمركز دبي بالهرم، مع أعلى درجات الدقة والتعقيم الطبي."
              : "Comprehensive specialist dentistry covering painless endodontics, guided implants, clear aligners, and aesthetic veneers at Dubai Dental Clinic in Al-Haram."}
          </p>
        </div>

        {/* Specialist Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeDoctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => onSelectDoctor(doctor)}
              className="group bg-white rounded-[28px] border border-[#E5E5E5] overflow-hidden p-3 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Doctor Portrait Image */}
                <div className="relative h-[290px] sm:h-[320px] rounded-[22px] overflow-hidden bg-[#F3F4F6] mb-5">
                  <img
                    src={doctor.image}
                    alt={doctor.nameEn}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Subtle Gradient & Role Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0069D9] text-[11px] font-bold tracking-tight shadow-xs">
                      {isAr ? doctor.roleAr : doctor.roleEn}
                    </span>
                  </div>
                </div>

                {/* Name & Credentials */}
                <div className="px-3 text-center sm:text-start">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight group-hover:text-[#0069D9] transition-colors mb-1">
                    {isAr ? doctor.nameAr : doctor.nameEn}
                  </h3>
                  <p className="text-xs text-[#6B7280] font-semibold mb-3">
                    {isAr ? doctor.credentialsAr : doctor.credentialsEn}
                  </p>
                </div>
              </div>

              {/* View Details Action */}
              <div className="px-3 pt-4 border-t border-[#F0F0F0] flex items-center justify-between text-xs font-bold text-[#0069D9]">
                <span className="text-[11px] text-[#9CA3AF] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isAr ? "استشاري متخصص" : "Board Certified"}</span>
                </span>
                <div className="flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{isAr ? "تفاصيل التخصص" : "View details"}</span>
                  <span className={isAr ? "rotate-180" : ""}>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
