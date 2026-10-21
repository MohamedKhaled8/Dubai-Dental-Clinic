import React from "react";

interface EviaTechProps {
  isAr: boolean;
  onOpenBooking?: (service?: string) => void;
}

export function EviaTech({ isAr }: EviaTechProps) {
  return (
    <section id="technology" className="px-4 sm:px-6 py-16 sm:py-24 bg-[#F2F4F7]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header matching Framer original */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 evia-reveal-item">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              {isAr ? "أدوات أفضل، لرعاية أفضل." : "Better tools, better care."}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "نستخدم التكنولوجيا الحديثة لجعل التشخيص والعلاج أكثر دقة وكفاءة وراحة تامة."
              : "We use modern technology to make diagnosis and treatment more precise, efficient, and comfortable."}
          </p>
        </div>

        {/* 3-Row Alternating Bento Grid matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Row 1 - Left: 3D Dental Scan Visual (Clean, Floating Model) */}
          <div className="bg-white rounded-[28px] border border-black/[0.04] p-8 sm:p-12 flex items-center justify-center min-h-[320px] shadow-xs hover:shadow-lg transition-all duration-300 group">
            <img
              src="https://framerusercontent.com/images/xeDd1v9NxyDsVWFLKm0LbFzzg.png"
              alt="Digital 3D dental scan model"
              className="max-h-[220px] sm:max-h-[250px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Row 1 - Right: Digital Scanning Text Card */}
          <div className="bg-white rounded-[28px] border border-black/[0.04] p-8 sm:p-12 flex flex-col justify-center min-h-[320px] shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold w-fit mb-4">
              <span>{isAr ? "المسح الرقمي" : "Digital Scanning"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-4">
              {isAr ? "شاهد إطباق أسنانك قبل أن نلمسها" : "See your bite before we ever touch it"}
            </h3>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              {isAr
                ? "يستبدل المسح الرقمي ثلاثي الأبعاد قوالب المعجون التقليدية غير المريحة، ليرسم خريطة إطباق أسنانك في دقائق معدودة."
                : "3D intraoral scans replace uncomfortable impressions, mapping your bite in minutes."}
            </p>
          </div>

          {/* Row 2 - Left: 3D Imaging Text Card */}
          <div className="bg-white rounded-[28px] border border-black/[0.04] p-8 sm:p-12 flex flex-col justify-center min-h-[320px] shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold w-fit mb-4">
              <span>{isAr ? "التصوير ثلاثي الأبعاد" : "3D Imaging"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-4">
              {isAr ? "صورة كاملة قبل بدء أي إجراء" : "A full picture before any procedure begins"}
            </h3>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              {isAr
                ? "تحدد الأشعة المقطعية المخروطية الجذور والأعصاب وبنية العظام التي يحتاجها فريقنا لرؤيتها بوضوح تام."
                : "Cone-beam imaging maps roots, nerves, and bone structure our team needs to see clearly."}
            </p>
          </div>

          {/* Row 2 - Right: Panoramic Dental X-Ray Image Card */}
          <div className="bg-white rounded-[28px] border border-black/[0.04] p-3 sm:p-4 min-h-[320px] shadow-xs hover:shadow-lg transition-all duration-300 group flex items-center justify-center overflow-hidden">
            <div className="w-full h-full min-h-[280px] rounded-[22px] overflow-hidden bg-black flex items-center justify-center">
              <img
                src="https://framerusercontent.com/images/BFMg926faq8GOIMIR9DfUouE.png"
                alt="Panoramic Dental CBCT X-Ray Scan"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
              />
            </div>
          </div>

          {/* Row 3 - Left: Doctor & Patient Photo Card */}
          <div className="bg-white rounded-[28px] border border-black/[0.04] p-3 sm:p-4 min-h-[320px] shadow-xs hover:shadow-lg transition-all duration-300 group flex items-center justify-center overflow-hidden">
            <div className="w-full h-full min-h-[280px] rounded-[22px] overflow-hidden bg-[#e5e7eb] flex items-center justify-center">
              <img
                src="https://framerusercontent.com/images/aysp4Xwhb5gq7gNjynBgrLVHWE.png"
                alt="Doctor consulting with smiling patient"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
              />
            </div>
          </div>

          {/* Row 3 - Right: Same-Day Dentistry Text Card */}
          <div className="bg-white rounded-[28px] border border-black/[0.04] p-8 sm:p-12 flex flex-col justify-center min-h-[320px] shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold w-fit mb-4">
              <span>{isAr ? "طب أسنان اليوم الواحد" : "Same-Day Dentistry"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-4">
              {isAr ? "تيجان، ترميمات، وإنفزلاين في زيارة واحدة" : "Crowns, repairs, and Invisalign, in one visit"}
            </h3>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              {isAr
                ? "يتم تصميمها وتصنيعها وتركيبها أثناء انتظارك، بحيث تحتاج أغلب الترميمات إلى زيارة واحدة فقط."
                : "Designed, milled, and fitted while you wait, so most repairs need just one trip in."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
