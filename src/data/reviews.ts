import type { Review } from "./types";

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    author: { ar: "م. أحمد عبد الرحمن", en: "Eng. Ahmed Abdelrahman" },
    treatment: { ar: "علاج الجذور وتركيبات الزيركون", en: "Root Canal & Zirconia Crown" },
    text: {
      ar: "دكتور كريم كمال في مركز دبي لطب الأسنان بالهرم قمة في الذوق والمهنية والأمانة. رحت بوجع عصب فظيع في الضرس، علاجه تم بدون أي ألم نهائياً وبأحدث الأجهزة وتركيب الزيركون مظبوط بالشعرة.",
      en: "Dr. Karim Kamal at Dubai Dental Clinic in Al-Haram is exceptional in professionalism, skill, and ethics. My severe toothache was resolved completely pain-free with modern endodontic equipment and a perfect Zirconia fit.",
    },
    stars: 5,
    date: { ar: "منذ أسبوعين", en: "2 weeks ago" },
    isSample: false,
  },
  {
    id: "rev-2",
    author: { ar: "أ. منى السيد", en: "Mona El-Sayed" },
    treatment: { ar: "زراعة أسنان", en: "Dental Implants" },
    text: {
      ar: "أجريت عملية زراعة الأسنان في مركز دبي بشارع عز الدين عمر بالهرم. د. مصطفى أبو الدهب شرح كل تفصيلة في الأشعة والتخطيط قبل الجراحة، ومرت العملية بكل سهولة وراحة. مكان نظيف جداً وتعقيم على أعلى مستوى.",
      en: "Had dental implant surgery at Dubai Dental Clinic in Ezz El-Din Omar St., Al-Haram. Dr. Mostafa Abo El-Dahab explained every detail beforehand, and the procedure was smooth and comfortable with impeccable sterilization.",
    },
    stars: 5,
    date: { ar: "منذ شهر", en: "1 month ago" },
    isSample: false,
  },
  {
    id: "rev-3",
    author: { ar: "م. حسام الدين نبيل", en: "Hossam El-Din Nabil" },
    treatment: { ar: "تقويم الأسنان الشفاف", en: "Clear Aligners" },
    text: {
      ar: "أتابع تقويم الأسنان مع د. أحمد فاروق بمركز دبي. النتيجة في تنظيم الأسنان بعد ٦ أشهر فاقت توقعاتي، والتعامل في العيادة راقٍ جداً واحترام كبير للمواعيد.",
      en: "Undergoing clear aligner orthodontic treatment with Dr. Ahmed Farouk at Dubai Dental. The alignment results after 6 months exceeded expectations, with great courtesy and punctual appointments.",
    },
    stars: 5,
    date: { ar: "منذ شهرين", en: "2 months ago" },
    isSample: false,
  },
  {
    id: "rev-4",
    author: { ar: "سارة الجوهري", en: "Sarah El-Gohary" },
    treatment: { ar: "تنظيف وتلميع الأسنان وتبييض", en: "Scaling, Polishing & Whitening" },
    text: {
      ar: "تجربة ممتازة في عيادة دبي بالهرم (محطة العريش). جلسة التنظيف والتبييض بالليزر كانت دقيقة بدون حساسية للأسنان، وطاقم التمريض والاستقبال ودود ومحترف للغاية.",
      en: "Great experience at Dubai Clinic in Al-Haram (El-Arish). The scaling and whitening session was precise with zero sensitivity, and the staff were exceptionally welcoming and attentive.",
    },
    stars: 5,
    date: { ar: "منذ شهرين", en: "2 months ago" },
    isSample: false,
  },
  {
    id: "rev-5",
    author: { ar: "كريم رضوان", en: "Karim Radwan" },
    treatment: { ar: "فينيرز وهوليوود سمايل", en: "Porcelain Veneers" },
    text: {
      ar: "أفضل دكاترة أسنان في الجيزة عن تجربة. الأمانة في تشخيص حالتي واختيار الأنسب بدون استغلال مادي هو اللي خلاني أثق فيهم تماماً. الابتسامة طبيعية جداً وجميلة.",
      en: "Best dental center in Giza based on firsthand experience. Their medical honesty, transparent diagnosis, and natural smile makeover made me trust them completely.",
    },
    stars: 5,
    date: { ar: "منذ ٣ أشهر", en: "3 months ago" },
    isSample: false,
  },
  {
    id: "rev-6",
    author: { ar: "د. هالة محمود", en: "Dr. Hala Mahmoud" },
    treatment: { ar: "طب أسنان الأطفال والأسرة", en: "Family & Pediatric Dentistry" },
    text: {
      ar: "أخذت أولادي لعلاج التسوس في مركز دبي بالهرم، أسلوب الدكتور كان صبوراً ومطمئناً للأطفال وخلاهم يدخلوا ويخرجوا مبسوطين بدون أي خوف. بنصح بيهم كل أهالي الهرم وفيصل.",
      en: "Took my kids to Dubai Dental Clinic in Al-Haram. The gentle and reassuring approach kept them relaxed and happy with no fear whatsoever. Highly recommended for families in Haram & Faisal.",
    },
    stars: 5,
    date: { ar: "منذ ٤ أشهر", en: "4 months ago" },
    isSample: false,
  },
];
