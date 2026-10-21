import React from "react";
import { BookOpen, ArrowUpRight, Clock } from "lucide-react";
import { EVIA_BLOG, BlogPost } from "./evia-data";

interface EviaBlogProps {
  isAr: boolean;
}

export function EviaBlog({ isAr }: EviaBlogProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 bg-[#F7F7F7]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 evia-reveal-item">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? "المقالات والتثقيف الصحي" : "Blog"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              {isAr ? (
                <>
                  رعاية أفضل تبدأ من{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    معرفة طبية دقيقة
                  </span>
                </>
              ) : (
                <>
                  Better care starts with{" "}
                  <span className="italic font-serif font-normal text-[#0069D9]">
                    better information.
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "نصائح وإرشادات سريرية من أطبائنا للحفاظ على صحة وجمال أسنانك ولثتك مدى الحياة."
              : "Helpful insights, treatment comparisons, and oral wellness guides written directly by our clinical team."}
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EVIA_BLOG.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-[28px] border border-[#E5E5E5] overflow-hidden p-3 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative h-[220px] sm:h-[240px] rounded-[22px] overflow-hidden bg-[#F3F4F6] mb-5">
                  <img
                    src={post.image}
                    alt={post.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#111827] text-[11px] font-bold tracking-wider uppercase shadow-xs">
                      {isAr ? post.categoryAr : post.categoryEn}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#111827] tracking-tight group-hover:text-[#0069D9] transition-colors mb-2.5 line-clamp-2">
                    {isAr ? post.titleAr : post.titleEn}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed font-normal line-clamp-2 mb-4">
                    {isAr ? post.excerptAr : post.excerptEn}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-3 pt-4 border-t border-[#F0F0F0] flex items-center justify-between text-xs font-bold text-[#0069D9]">
                <div className="flex items-center gap-1.5 text-[#9CA3AF] font-medium text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
                </div>
                <div className="flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{isAr ? "اقرأ المقال" : "Read article"}</span>
                  <span className={isAr ? "rotate-180" : ""}>↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
