import React from "react";
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink } from "lucide-react";

interface EviaLocationProps {
  isAr: boolean;
}

export function EviaLocation({ isAr }: EviaLocationProps) {
  return (
    <section id="contact" className="px-4 sm:px-6 py-16 sm:py-24 bg-[#F7F7F7]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 evia-reveal-item">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FF] text-[#0069D9] text-xs font-bold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? "موقع العيادة" : "Visit Us"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              {isAr ? "زيارتك القادمة تبدأ من هنا." : "Your next visit starts here."}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-md leading-relaxed font-normal">
            {isAr
              ? "تعرف على موقع مركز دبي لطب الأسنان بالهرم، واطلع على ساعات العمل اليومية، أو تواصل معنا مباشرة لتنظيم زيارتك القادمة."
              : "Find Dubai Dental Clinic in Al-Haram, check daily opening hours, or get in touch with our team to plan your visit."}
          </p>
        </div>

        {/* Map & Location Box */}
        <div className="bg-white rounded-[28px] border border-[#E5E5E5] overflow-hidden p-4 sm:p-6 shadow-xs mb-8">
          {/* Interactive Styled Map Embed Container */}
          <div className="relative h-[340px] sm:h-[450px] rounded-[22px] overflow-hidden bg-[#E2E8F0] shadow-inner">
            <iframe
              title="Dubai Dental Clinic Google Map"
              src="https://maps.google.com/maps?q=29.99191,31.161962+(Dubai+Dental+Clinic+Haram)&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 contrast-105 opacity-95 transition-all duration-300"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Clinic Card Pin */}
            <div className="absolute top-4 start-4 z-10 max-w-xs bg-white/95 backdrop-blur-md rounded-[20px] p-4 shadow-xl border border-[#E5E5E5]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-[#111827]">
                  {isAr ? "مركز دبي لطب الأسنان (الهرم)" : "Dubai Dental Clinic (Al-Haram)"}
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-snug mb-3">
                {isAr
                  ? "٢٠ شارع عز الدين عمر، متفرع من شارع الهرم (محطة العريش، برج المروة، بجوار حلواني بشبش وخلف بنك مصر)، الطالبية، الهرم، الجيزة."
                  : "20 Ezz El-Din Omar St., Al-Haram (El-Arish Station, Al-Marwa Tower, next to Beshbesh Pastry & behind Banque Misr), Talbiya, Giza."}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://maps.app.goo.gl/uvr71SPw8w17bNsC6"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0069D9] hover:underline"
                >
                  <span>{isAr ? "الاتجاهات على خرائط Google" : "Directions on Google Maps"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Address */}
          <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EBF4FF] text-[#0069D9] flex items-center justify-center mb-4">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                {isAr ? "العنوان الدقيق" : "Address"}
              </h4>
              <p className="text-sm font-semibold text-[#111827] leading-relaxed">
                {isAr
                  ? "٢٠ شارع عز الدين عمر، متفرع من شارع الهرم (محطة العريش، برج المروة)، الطالبية، الهرم، الجيزة، مصر."
                  : "20 Ezz El-Din Omar St., Al-Haram (El-Arish Station, Al-Marwa Tower), Talbiya, Giza, Egypt."}
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/uvr71SPw8w17bNsC6"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0069D9] hover:underline"
            >
              <span>{isAr ? "فتح الخريطة" : "Open Map"}</span>
              <span className={isAr ? "rotate-180" : ""}>↗</span>
            </a>
          </div>

          {/* 2. Opening Hours */}
          <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EBF4FF] text-[#0069D9] flex items-center justify-center mb-4">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                {isAr ? "مواعيد العمل" : "Opening hours"}
              </h4>
              <p className="text-xs font-semibold text-[#111827] leading-relaxed">
                {isAr ? "يومياً: ١:٠٠ ظهراً – ١١:٠٠ مساءً" : "Daily: 1:00 PM – 11:00 PM"}
                <br />
                {isAr ? "(الجمعة بموعد مسبق)" : "(Friday by advance appointment)"}
              </p>
            </div>
            <div className="mt-4 text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isAr ? "استقبال الحالات متاح اليوم" : "Slots Available Today"}</span>
            </div>
          </div>

          {/* 3. Phone */}
          <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EBF4FF] text-[#0069D9] flex items-center justify-center mb-4">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                {isAr ? "الهاتف المباشر" : "Direct Phone"}
              </h4>
              <a
                href="tel:+201022013314"
                className="text-sm font-bold text-[#0069D9] hover:underline block"
                dir="ltr"
              >
                01022013314 ↗
              </a>
              <p className="text-[11px] text-[#6B7280] mt-1">
                {isAr ? "متاح للاتصال المباشر وتنسيق الحجوزات" : "Available for calls & consultation booking"}
              </p>
            </div>
          </div>

          {/* 4. WhatsApp & Fast Booking */}
          <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EBF4FF] text-[#0069D9] flex items-center justify-center mb-4">
                <Navigation className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-1">
                {isAr ? "واتساب المركز" : "WhatsApp Desk"}
              </h4>
              <a
                href="https://wa.me/201022013314"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-emerald-600 hover:underline block"
                dir="ltr"
              >
                +20 102 201 3314 ↗
              </a>
              <p className="text-[11px] text-[#6B7280] mt-1">
                {isAr ? "رد فوري وتأكيد مواعيد الزيارة" : "Instant chat & appointment confirmation"}
              </p>
            </div>
            <a
              href="https://wa.me/201022013314"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
            >
              <span>{isAr ? "محادثة فورية" : "Chat on WhatsApp"}</span>
              <span className={isAr ? "rotate-180" : ""}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
