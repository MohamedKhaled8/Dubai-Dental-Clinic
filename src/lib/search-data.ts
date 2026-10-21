import { services, doctors, clinic, type L } from "./site";

export type SearchCategory = "all" | "service" | "symptom" | "doctor" | "process" | "faq";

export interface SearchEntry {
  id: string;
  category: "service" | "symptom" | "doctor" | "process" | "faq";
  title: L;
  description: L;
  tags: string[];
  link?: string;
  actionText?: L;
  badge?: L;
  metaInfo?: {
    duration?: L;
    doctorName?: L;
    priceCategory?: L;
    painLevel?: L;
  };
}

export const searchIndex: SearchEntry[] = [
  // 1. All Services
  ...services.map((s) => ({
    id: `service-${s.slug}`,
    category: "service" as const,
    title: s.name,
    description: s.intro,
    tags: [
      s.slug,
      s.name.ar,
      s.name.en,
      s.intro.ar,
      s.intro.en,
      ...s.points.ar,
      ...s.points.en,
      "علاج",
      "عيادة",
      "دكتور",
      "treatment",
      "dentistry",
    ],
    link: `/services/${s.slug}`,
    actionText: { ar: "عرض تفاصيل الخدمة", en: "View Service Details" },
    badge: { ar: "خدمة علاجية", en: "Treatment" },
    metaInfo: {
      duration: { ar: "حسب الحالة", en: "Varies by case" },
      priceCategory: { ar: "أسعار تنافسية وخطط مرنة", en: "Transparent plans" },
      painLevel: { ar: "بدون ألم مع تخدير موضعي دقيق", en: "Painless localized care" },
    },
  })),

  // 2. Common Symptoms & Dental Complaints (Symptom Checker / Fast Finder)
  {
    id: "symptom-missing-teeth",
    category: "symptom",
    title: { ar: "فقدان سن أو ضرس (صعوبة في المضغ)", en: "Missing Tooth or Molar (Chewing Issue)" },
    description: {
      ar: "تعويض الأسنان المفقودة بجذور تيتانيوم دائمة أو جسور ثابتة في الهرم لحماية العظم ومنع ميل الأسنان.",
      en: "Permanent titanium implants or fixed bridges to restore chewing function and preserve jaw bone.",
    },
    tags: [
      "سن مفقود",
      "ضرس مخلوع",
      "خلع",
      "زراعة",
      "تعويض الأسنان",
      "missing tooth",
      "implant",
      "gap",
      "bridge",
    ],
    link: "/services/dental-implants",
    actionText: { ar: "استكشف زراعة الأسنان", en: "Explore Dental Implants" },
    badge: { ar: "عرض أو شكوى", en: "Symptom" },
    metaInfo: {
      duration: { ar: "مرحلتان (خلال ٣-٦ أشهر)", en: "2 stages (3-6 mos)" },
      painLevel: { ar: "0/10 بتخدير موضعي حاسوبي", en: "0/10 Painless" },
    },
  },
  {
    id: "symptom-severe-toothache",
    category: "symptom",
    title: { ar: "ألم ضرس حاد ونبض مستمر مع المشروبات الباردة والساخنة", en: "Severe Toothache & Throbbing Nerve Pain" },
    description: {
      ar: "يشير إلى التهاب أو وصول التسوس إلى عصب السن. الحل الأمثل هو علاج الجذور الدقيق للحفاظ على السن الطبيعي.",
      en: "Indicates deep decay or pulp nerve inflammation. Root canal micro-treatment saves the natural tooth.",
    },
    tags: [
      "ألم شديد",
      "وجع ضرس",
      "عصب",
      "صداع من السن",
      "حار وبارد",
      "حشو عصب",
      "pain",
      "toothache",
      "nerve",
      "root canal",
    ],
    link: "/services/root-canal",
    actionText: { ar: "استكشف علاج الجذور والعصب", en: "Explore Root Canal Care" },
    badge: { ar: "ألم عاجل", en: "Urgent Pain" },
    metaInfo: {
      duration: { ar: "جلسة أو جلستان", en: "1-2 sessions" },
      painLevel: { ar: "راحة فورية وتسكين كامل", en: "Immediate pain relief" },
    },
  },
  {
    id: "symptom-bleeding-gums",
    category: "symptom",
    title: { ar: "نزيف اللثة وتراكم الجير ورائحة الفم", en: "Bleeding Gums & Tartar Buildup" },
    description: {
      ar: "النزيف أثناء تنظيف الأسنان بالفرشاة علامة على التهاب اللثة وترسبات جيرية تحتاج إلى تنظيف احترافي بالموجات فوق الصوتية.",
      en: "Bleeding while brushing indicates gingivitis and tartar accumulation requiring ultrasonic scaling.",
    },
    tags: [
      "نزيف لثة",
      "دم مع الفرشاة",
      "جير",
      "رائحة الفم",
      "تورم اللثة",
      "bleeding gums",
      "scaling",
      "tartar",
      "bad breath",
    ],
    link: "/services/scaling-polishing",
    actionText: { ar: "حجز جلسة تنظيف وتلميع", en: "Book Ultrasonic Scaling" },
    badge: { ar: "صحة الفم", en: "Oral Health" },
    metaInfo: {
      duration: { ar: "جلسة واحدة (٣٠-٤٥ دقيقة)", en: "Single session (30-45m)" },
      painLevel: { ar: "جلسة لطيفة ومريحة", en: "Gentle & refreshing" },
    },
  },
  {
    id: "symptom-yellow-stained-teeth",
    category: "symptom",
    title: { ar: "اصفرار وتصبغات الأسنان وفقدان بريق الابتسامة", en: "Yellow or Stained Teeth Discoloration" },
    description: {
      ar: "حلول تجميلية تناسب حالتك: تنظيف عميق وتلميع، أو عدسات الفينيرز فائقة الرقة (E.max) لابتسامة طبيعية متناسقة.",
      en: "Aesthetic solutions matching your goals: deep polishing or ultra-thin E.max veneers for a radiant smile.",
    },
    tags: [
      "اصفرار",
      "تبييض",
      "تصبغات القهوة",
      "فينيرز",
      "ابتسامة هوليوود",
      "تجميل",
      "yellow teeth",
      "whitening",
      "veneers",
      "smile",
    ],
    link: "/services/dental-veneers",
    actionText: { ar: "استكشف الفينيرز وتجميل الابتسامة", en: "Explore Veneers & Smile Design" },
    badge: { ar: "تجميل", en: "Aesthetic" },
    metaInfo: {
      duration: { ar: "جلستان خلال أسبوع", en: "2 visits within 1 week" },
      painLevel: { ar: "بدون برد جائر للأسنان", en: "Conservative micro-prep" },
    },
  },
  {
    id: "symptom-crooked-teeth-bite",
    category: "symptom",
    title: { ar: "اعوجاج الأسنان وتزاحمها أو عدم تطابق العضة", en: "Crooked, Crowded Teeth or Misaligned Bite" },
    description: {
      ar: "تقويم الأسنان الحديث للأطفال والمراهقين والبالغين لتصحيح الاصطفاف وتوزيع قوى المضغ بشكل صحي.",
      en: "Modern orthodontic realignment for children, teens, and adults to achieve ideal bite and harmony.",
    },
    tags: [
      "اعوجاج",
      "تزاحم أسنان",
      "تقويم",
      "بروز الفك",
      "عضة غير متطابقة",
      "orthodontics",
      "braces",
      "crowding",
      "crooked",
    ],
    link: "/services/orthodontics",
    actionText: { ar: "استكشف تقويم الأسنان", en: "Explore Orthodontics" },
    badge: { ar: "تقويم", en: "Orthodontics" },
    metaInfo: {
      duration: { ar: "٦ إلى ١٨ شهراً", en: "6-18 months" },
      painLevel: { ar: "ضغط خفيف منتظم ومتابعة شهرية", en: "Gentle calibrated pressure" },
    },
  },
  {
    id: "symptom-kids-fear",
    category: "symptom",
    title: { ar: "خوف الطفل من طبيب الأسنان وتسوس أسنان الأطفال", en: "Child Dental Anxiety & Early Tooth Decay" },
    description: {
      ar: "بيئة هادئة وأسلوب استشاري مبسط يشجع الطفل ويجعل الزيارة ممتعة بدون أي توتر أو إجبار.",
      en: "Reassuring, pediatric-centered environment designed to eliminate fear and build lifelong trust.",
    },
    tags: [
      "أطفال",
      "خوف من الدكتور",
      "تسوس أطفال",
      "أسنان لبنية",
      "بنج أطفال",
      "pediatric",
      "children",
      "kids dentist",
      "fear",
    ],
    link: "/services/pediatric-dentistry",
    actionText: { ar: "استكشف طب أسنان الأطفال", en: "Explore Pediatric Dentistry" },
    badge: { ar: "رعاية أطفال", en: "Pediatric" },
    metaInfo: {
      duration: { ar: "جلسات قصيرة مريحة", en: "Short stress-free visits" },
      painLevel: { ar: "أسلوب نفسي لطيف ومحبب", en: "Gentle behavioral comfort" },
    },
  },

  // 3. Doctors & Consultants
  ...doctors.map((d) => ({
    id: `doctor-${d.id}`,
    category: "doctor" as const,
    title: d.name,
    description: d.role,
    tags: [
      d.id,
      d.name.ar,
      d.name.en,
      d.role.ar,
      d.role.en,
      ...d.services,
      "طبيب",
      "دكتور",
      "استشاري",
      "أخصائي",
      "doctor",
      "specialist",
      "consultant",
    ],
    link: "/doctors",
    actionText: { ar: "حجز موعد مع الطبيب", en: "Book Consultation" },
    badge: { ar: "نخبة الأطباء", en: "Specialist" },
    metaInfo: {
      doctorName: d.name,
      duration: { ar: "مواعيد يومية بالهرم", en: "Daily schedule in Al-Haram" },
    },
  })),

  // 4. Clinical Process & Technology
  {
    id: "process-3d-scan",
    category: "process",
    title: { ar: "المسح الرقمي ثلاثي الأبعاد والتشخيص الفوري (3D Intraoral Scan)", en: "Digital 3D Intraoral Scanning & Diagnostics" },
    description: {
      ar: "وداعاً لعجائن القياس التقليدية؛ نستخدم ماسحاً رقمياً ثلاثي الأبعاد يلتقط ملايين النقاط لأسنانك بدقة متناهية.",
      en: "No uncomfortable silicone impression pastes. State-of-the-art 3D scanners map your dentition in seconds.",
    },
    tags: [
      "مسح ثلاثي الأبعاد",
      "أشعة مقطعية",
      "كاميرا فموية",
      "قياس رقمي",
      "تكنولوجيا",
      "3d scan",
      "intraoral",
      "digital workflow",
      "cbct",
    ],
    link: "/about",
    actionText: { ar: "تعرف على التكنولوجيا الرقمية", en: "Learn Digital Workflow" },
    badge: { ar: "تقنية متقدمة", en: "3D Tech" },
    metaInfo: {
      duration: { ar: "١٥ دقيقة فقط", en: "15 mins" },
      painLevel: { ar: "0/10 بدون أي إزعاج", en: "Zero discomfort" },
    },
  },
  {
    id: "process-class-b-sterilization",
    category: "process",
    title: { ar: "بروتوكول التعقيم الجراحي المعتمد (Class B Autoclave)", en: "Hospital-Grade Class B Sterilization Protocols" },
    description: {
      ar: "أعلى درجات الأمان الطبي؛ أكياس أدوات معقمة ومغلقة بإحكام تُفتح حصرياً أمام المراجع لكل جلسة دون أي تهاون.",
      en: "Maximum patient safety. Hermetically sealed instrument pouches opened directly in your presence.",
    },
    tags: [
      "تعقيم",
      "أوتوكلاف",
      "نظافة",
      "أمان طبي",
      "حماية من العدوى",
      "sterilization",
      "autoclave",
      "class b",
      "hygiene",
      "safety",
    ],
    link: "/about",
    actionText: { ar: "اقرأ عن معايير التعقيم لدينا", en: "Read Sterilization Standards" },
    badge: { ar: "أمان طبي", en: "Hygiene Standard" },
  },
  {
    id: "process-digital-smile-design",
    category: "process",
    title: { ar: "محاكاة الابتسامة وتصميمها رقمياً قبل البدء (Digital Smile Design)", en: "Digital Smile Design (DSD) & Pre-Visualization" },
    description: {
      ar: "شاهد ابتسامتك المستقبلية وتناسقها مع ملامح وجهك على الشاشة قبل لمس أي سن لتشارك بنفسك في اتخاذ القرار.",
      en: "Visualize your final smile and facial harmony on-screen before treatment begins.",
    },
    tags: [
      "تصميم الابتسامة",
      "محاكاة",
      "ابتسامة رقمية",
      "فينيرز",
      "dsd",
      "smile design",
      "simulation",
      "preview",
    ],
    link: "/gallery",
    actionText: { ar: "مشاهدة معرض التحولات", en: "View Smile Transformations" },
    badge: { ar: "ابتسامة رقمية", en: "Smile Design" },
  },

  // 5. Frequently Asked Questions & Patient Knowledge
  {
    id: "faq-implants-pain",
    category: "faq",
    title: { ar: "هل زراعة الأسنان مؤلمة؟ وكم يستغرق الالتئام؟", en: "Is Dental Implant Surgery Painful?" },
    description: {
      ar: "تتم الزراعة تحت تخدير موضعي فعال جداً بحيث لا يشعر المراجع بأي ألم خلال الإجراء. معظم المرضى يعودون لأنشطتهم الطبيعية في اليوم التالي.",
      en: "Performed under high-precision local anesthesia with zero intraoperative pain. Most patients resume daily life next day.",
    },
    tags: [
      "ألم الزراعة",
      "بنج",
      "مدة الزراعة",
      "التئام العظم",
      "أسئلة شائعة",
      "implant pain",
      "recovery",
      "faq",
      "anesthesia",
    ],
    link: "/services/dental-implants",
    actionText: { ar: "تفاصيل زراعة الأسنان", en: "Dental Implant Info" },
    badge: { ar: "إجابة استشاري", en: "Clinical FAQ" },
  },
  {
    id: "faq-location-hours",
    category: "faq",
    title: { ar: "عنوان العيادة في الهرم ومواعيد العمل وحجز الطوارئ", en: "Clinic Location in Al-Haram & Working Hours" },
    description: {
      ar: "٢٠ شارع عز الدين عمر، متفرع من شارع الهرم (محطة العريش، برج المروة)، الطالبية، الهرم، الجيزة. نعمل يومياً من الساعة ١:٠٠ ظهراً حتى ١١:٠٠ مساءً (الجمعة بموعد مسبق).",
      en: "20 Ezz El-Din Omar St., Al-Haram (El-Arish Station, Al-Marwa Tower), Talbiya, Giza. Open daily 1:00 PM – 11:00 PM (Friday by appointment).",
    },
    tags: [
      "عنوان",
      "موقع",
      "الهرم",
      "شارع عز الدين عمر",
      "العريش",
      "مواعيد",
      "طوارئ",
      "location",
      "haram",
      "address",
      "hours",
      "working hours",
    ],
    link: "/contact",
    actionText: { ar: "افتح صفحة التواصل والخريطة", en: "View Contact & Map" },
    badge: { ar: "معلومات العيادة", en: "Clinic Info" },
  },
];

// Normalized string helper for flexible Arabic & English search
function normalizeSearchText(str: string): string {
  return str
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/[ة]/g, "ه")
    .replace(/[ى]/g, "ي")
    .replace(/[^\w\s\u0600-\u06FF]/gi, " ")
    .trim();
}

export function searchClinicDatabase(query: string, category: SearchCategory = "all"): SearchEntry[] {
  const cleanQ = normalizeSearchText(query);
  if (!cleanQ) {
    if (category === "all") return searchIndex.slice(0, 8);
    return searchIndex.filter((item) => item.category === category);
  }

  const queryTokens = cleanQ.split(/\s+/).filter(Boolean);

  const matched = searchIndex.filter((item) => {
    if (category !== "all" && item.category !== category) return false;

    const fullBlob = normalizeSearchText(
      `${item.title.ar} ${item.title.en} ${item.description.ar} ${item.description.en} ${item.tags.join(" ")}`
    );

    // Matches if all query tokens are present in full blob or substring
    return queryTokens.every((token) => fullBlob.includes(token));
  });

  return matched;
}
