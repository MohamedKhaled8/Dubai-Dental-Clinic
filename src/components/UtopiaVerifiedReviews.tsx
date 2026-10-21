import { Star, ShieldCheck, Quote, CheckCircle2 } from "lucide-react";
import { clinicData } from "@/data/clinic";
import { reviewsData } from "@/data/reviews";

export function UtopiaVerifiedReviews() {
  return (
    <section
      id="reviews"
      className="w-full bg-[#fbfbfd] text-oris-secondary py-[8vw] max-md:py-16 relative z-10 border-t border-b border-gray-100"
    >
      <div className="oris-paddx">
        {/* Top Header & Google Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-[5vw] max-md:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-[#3365e2] text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-[#3365e2]" />
              <span>Verified Clinical Excellence · تقييمات موثقة</span>
            </div>
            <h2 className="text-[3.8vw] max-[1025px]:text-[5.5vw] max-md:text-[7.5vw] font-normal leading-[1.18] text-oris-secondary tracking-tight">
              Trusted by Patients Across{" "}
              <span className="block font-medium text-[#13314a]">
                Al-Haram & Greater Cairo
              </span>
            </h2>
            <p className="oris-text22 text-gray-600 mt-3 max-w-2xl leading-relaxed">
              Real clinical experiences from patients who chose Dubai Dental
              Clinic for gentle implants, pediatric care, and restorative
              dentistry.
            </p>
          </div>

          {/* Google Rating Overview Box */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-7 shadow-sm flex items-center gap-6 shrink-0">
            <div className="flex flex-col items-center justify-center pr-6 border-r border-gray-100">
              <span className="text-4xl sm:text-5xl font-bold text-[#13314a]">
                {clinicData.googleRating.score}
              </span>
              <div className="flex items-center gap-1 mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Google Reviews</span>
              </div>
              <p className="text-sm font-medium text-gray-900">
                Over {clinicData.googleRating.reviewCount} Happy Smiles
              </p>
              <p className="text-xs text-gray-500">
                Al-Haram Clinic · 20 Ezz El-Din Omar St.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="group bg-white rounded-2xl p-7 border border-gray-200/70 shadow-xs hover:shadow-lg hover:border-[#3365e2]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-gray-300 group-hover:text-[#3365e2]/40 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  "{rev.text.en}"
                </p>
              </div>

              {/* Author & Treatment Info */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar Badge */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3365e2] to-[#13314a] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {rev.author.en
                      .split(" ")
                      .map((n) => n[0])
                      .slice(-2)
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#13314a]">
                      {rev.author.en}
                    </h4>
                    <p className="text-xs text-[#3365e2] font-medium">
                      {rev.treatment.en}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-gray-400">
                  {rev.date.en}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
