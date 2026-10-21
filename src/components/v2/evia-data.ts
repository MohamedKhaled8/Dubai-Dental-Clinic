export interface DoctorProfile {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  credentialsEn: string;
  credentialsAr: string;
  image: string;
  bioEn: string;
  bioAr: string;
  specialtiesEn: string[];
  specialtiesAr: string[];
}

export interface DentalService {
  id: string;
  categoryEn: string;
  categoryAr: string;
  titleEn: string;
  titleAr: string;
  priceEn: string;
  priceAr: string;
  numericPrice: number;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  durationEn: string;
  durationAr: string;
  stepsEn: string[];
  stepsAr: string[];
  includesEn: string[];
  includesAr: string[];
}

export interface PatientReview {
  id: string;
  nameEn: string;
  nameAr: string;
  treatmentEn: string;
  treatmentAr: string;
  rating: number;
  quoteEn: string;
  quoteAr: string;
  dateEn?: string;
  dateAr?: string;
  initials?: string;
  accentColor?: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface BlogPost {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  excerptEn: string;
  excerptAr: string;
  image: string;
  readTimeEn: string;
  readTimeAr: string;
}

export const EVIA_DOCTORS: DoctorProfile[] = [
  {
    id: "karim-kamal",
    nameEn: "Dr. Karim Kamal — Endodontics & Smile Architecture",
    nameAr: "د. كريم كمال محمد — علاج الجذور وتجميل الأسنان",
    roleEn: "Clinic Director & Endodontics Specialist",
    roleAr: "مدير المركز وأخصائي علاج الجذور والتركيبات الثابتة",
    credentialsEn: "Specialist in Endodontics & Fixed Prosthodontics, 15+ years experience",
    credentialsAr: "أخصائي علاج الجذور والأعصاب والتركيبات الثابتة وتجميل الأسنان",
    image: "/oris/treatment1.webp",
    bioEn:
      "Advanced painless microscopic root canal treatment, ceramic veneers, and precision restorative dentistry at Dubai Dental Clinic in Al-Haram, Giza.",
    bioAr:
      "علاج الجذور والأعصاب بدون ألم بأحدث أجهزة الميكروسكوب والروتاري، مع تصميم الابتسامة والتركيبات الثابتة الدقيقة من الزيركونيا والـ E-max بمركز دبي لطب الأسنان بالهرم.",
    specialtiesEn: ["Painless Root Canal", "Digital Smile Design", "Fixed Prosthodontics"],
    specialtiesAr: ["علاج الجذور المجهري", "تصميم الابتسامة الرقمي", "تركيبات الزيركون والـ E-max"]
  },
  {
    id: "mostafa-abo-eldahab",
    nameEn: "Dr. Mostafa Abo El-Dahab — Maxillofacial & Implants",
    nameAr: "د. مصطفى أبو الدهب — جراحة الوجه والفكين والزراعة",
    roleEn: "Oral & Maxillofacial Surgery Consultant",
    roleAr: "استشاري جراحة الوجه والفكين وزراعة الأسنان",
    credentialsEn: "Consultant in Oral & Maxillofacial Surgery, Member of ITI",
    credentialsAr: "استشاري جراحة الفم والفكين وعضو الجمعية الدولية لزراعة الأسنان",
    image: "/oris/treatment2.webp",
    bioEn:
      "Advanced 3D CBCT computer-guided titanium dental implants, sinus augmentation, and surgical extractions with rapid recovery protocols at Dubai Dental Clinic.",
    bioAr:
      "زراعة الأسنان الرقمية الفورية والموجهة بالكمبيوتر بدقة مجهرية، مع تقنيات تطعيم العظام والتعافي السريع في مركز دبي لطب الأسنان بالهرم.",
    specialtiesEn: ["3D Guided Implants", "Sinus Elevation", "Bone Regeneration"],
    specialtiesAr: ["زراعة الأسنان الفورية", "رفع الجيوب الأنفية", "إعادة بناء عظام الفك"]
  },
  {
    id: "ahmed-farouk",
    nameEn: "Dr. Ahmed Farouk — Orthodontics & Clear Aligners",
    nameAr: "د. أحمد فاروق — تقويم الأسنان والتقويم الشفاف",
    roleEn: "Orthodontics & Dentofacial Orthopedics Specialist",
    roleAr: "أخصائي تقويم وتنسيق إطباق الأسنان والفكين",
    credentialsEn: "Specialist in Orthodontics, Certified Clear Aligner Provider",
    credentialsAr: "أخصائي تقويم الأسنان وتعديل الفكين، معتمد في التقويم الشفاف",
    image: "/oris/treatment3.webp",
    bioEn:
      "Certified invisible clear aligners and comprehensive occlusion alignment for teenagers and adults using zero-impression 3D intraoral scans at Dubai Dental Clinic.",
    bioAr:
      "خطط علاجية بالتقويم الشفاف غير المرئي ومسح رقمي فوري، لتعديل وتنسيق إطباق الأسنان للأطفال والبالغين في مركز دبي لطب الأسنان بالهرم.",
    specialtiesEn: ["Invisible Clear Aligners", "Skeletal Occlusion", "Adult Orthodontics"],
    specialtiesAr: ["التقويم الشفاف غير المرئي", "تعديل الإطباق الوظيفي", "تقويم الأسنان التجميلي"]
  },
  {
    id: "nouran-ahmed",
    nameEn: "Restorative Dentistry & Precision Crowns",
    nameAr: "التركيبات الثابتة والترميمات الرقمية",
    roleEn: "Advanced Restorations & Zirconia Crowns",
    roleAr: "استشاري التركيبات الثابتة وتيجان الزركونيا",
    credentialsEn: "MSc in Restorative Dentistry, European Board Member",
    credentialsAr: "ماجستير التركيبات والترميمات، عضو البورد الأوروبي",
    image: "/oris/parallax.webp",
    bioEn:
      "Long-lasting functional restorations, monolithic zirconia crowns, and precision inlays that restore masticatory balance with natural translucency.",
    bioAr:
      "ترميمات تجميلية ووظيفية تدوم طويلاً، مع تيجان الزركونيا المجهزة رقمياً بأعلى درجات المتانة ومطابقة الأسنان الطبيعية.",
    specialtiesEn: ["Zirconia Crowns", "Ceramic Inlays", "Tooth Longevity"],
    specialtiesAr: ["تيجان الزركونيا الرقمية", "حشوات البورسلين المجهرية", "الترميمات الوظيفية"]
  },
  {
    id: "omar-makhlouf",
    nameEn: "Pediatric & Family Dental Care",
    nameAr: "طب أسنان الأطفال والأسرة بدون ألم",
    roleEn: "Pediatric Care & Habit Interception",
    roleAr: "استشاري طب أسنان الأطفال والرعاية الوقائية",
    credentialsEn: "MSc in Pediatric Dentistry, Cairo University",
    credentialsAr: "ماجستير طب أسنان الأطفال، جامعة القاهرة",
    image: "/images/hero_dental_clinic.jpg",
    bioEn:
      "Dedicated to fear-free pediatric dentistry, behavior guidance, and early dental health in a calming, welcoming environment.",
    bioAr:
      "رعاية أسنان ودودة ومرحة للأطفال تزيل أي رهاب أو خوف، مع التركيز على حماية الأسنان اللبنية والمتابعة الوقائية لنمو الفكين.",
    specialtiesEn: ["Fear-Free Pediatric Care", "Fluoride Prevention", "Early Interceptive Care"],
    specialtiesAr: ["علاج الأطفال بدون خوف", "جلسات الفلورايد الوقائي", "المتابعة المبكرة لنمو الأسنان"]
  }
];

export const EVIA_SERVICES: DentalService[] = [
  {
    id: "routine-checkup",
    categoryEn: "General",
    categoryAr: "طب الأسنان العام",
    titleEn: "Routine Checkup & Cleaning",
    titleAr: "الفحص الدوري والتنظيف الاحترافي",
    priceEn: "from $99",
    priceAr: "يبدأ من 99 دولار",
    numericPrice: 99,
    descriptionEn:
      "A thorough exam, polish, and health check so small issues get caught long before they become big ones.",
    descriptionAr:
      "فحص شامل بالميكروسكوب الرقمي، وإزالة الجير بالموجات فوق الصوتية، وتلميع المينا لمنع أي مضاعفات قبل حدوثها.",
    image: "https://framerusercontent.com/images/6L6rARaEumHGgeVgUAAA89AArc.jpg",
    durationEn: "45 minutes",
    durationAr: "45 دقيقة",
    stepsEn: [
      "Ultra-high definition 3D intraoral diagnostic imaging",
      "Ultrasonic tartar & biofilm scaling with warm saline irrigation",
      "Air-flow stain polishing and enamel fluoride re-mineralization",
      "Comprehensive consultation & personalized oral health roadmap"
    ],
    stepsAr: [
      "تصوير بانورامي وفحص رقمي ثلاثي الأبعاد فائق الدقة",
      "تنظيف الجير والتكلسات بجهاز الموجات فوق الصوتية الملطف",
      "تلميع الأسنان بتقنية Air-Flow وإزالة التصبغات الدقيقة",
      "تقرير طبي مفصل وخطة عناية وقائية منزلية مخصصة"
    ],
    includesEn: [
      "3D Digital Bite Scan",
      "Oral Cancer & Gum Screening",
      "Custom Treatment Roadmap",
      "Zero Sensitivity Guarantee"
    ],
    includesAr: [
      "مسح رقمي ثلاثي الأبعاد للإطباق",
      "فحص شامل لصحة اللثة والأنسجة الفموية",
      "خطة وقائية مفصلة لكافة الأسنان",
      "جلسة خالية من التحسس أو الألم"
    ]
  },
  {
    id: "smile-makeover",
    categoryEn: "Cosmetic",
    categoryAr: "تجميل الأسنان والابتسامة",
    titleEn: "Complete Smile Makeover",
    titleAr: "تصميم الابتسامة الشامل (فينير)",
    priceEn: "from $2,500",
    priceAr: "يبدأ من 2,500 دولار",
    numericPrice: 2500,
    descriptionEn:
      "A tailored combination of treatments designed to completely transform your smile, from alignment to whitening to contouring.",
    descriptionAr:
      "باقة متكاملة تجمع بين عدسات الفينير فائقة النحافة، وتنسيق خط اللثة، وتبييض الليزر لابتسامة ساحرة وطبيعية.",
    image: "https://framerusercontent.com/images/low6g1dPrrjNXHssKWSuVOvGJlo.png",
    durationEn: "2 to 3 visits",
    durationAr: "2 إلى 3 زيارات",
    stepsEn: [
      "Digital Smile Design (DSD) live mock-up simulation on your face",
      "Minimal surface preparation with microscopic preservation",
      "Handcrafted European ceramic fabrication with natural translucency",
      "Permanent precision bonding with 10-year aesthetic guarantee"
    ],
    stepsAr: [
      "معاينة حية لشكل الابتسامة على ملامح وجهك قبل البدء (DSD)",
      "تحضير ميكروسكوبي طفيف دون الإضرار ببنية السن الطبيعية",
      "تصنيع يدوي فائق الدقة في أرقى معامل الخزف السويسرية",
      "تثبيت نهائي متين مع ضمان جمالي ووظيفي لمدة 10 سنوات"
    ],
    includesEn: [
      "Live 3D Digital Simulation",
      "Custom Shade Matching",
      "Bespoke Porcelain Veneers",
      "Night Guard & Maintenance Kit"
    ],
    includesAr: [
      "محاكاة رقمية ثلاثية الأبعاد لشكل الابتسامة",
      "تطابق مثالي لدرجة بياض وشفافية الأسنان الطبيعية",
      "عدسات بورسلين مخصصة يدوياً لكل سن",
      "واقي ليلي مجاني ومجموعة العناية المتقدمة"
    ]
  },
  {
    id: "crowns-bridge",
    categoryEn: "Restorative",
    categoryAr: "التركيبات والترميم",
    titleEn: "Crowns & Bridge Repair",
    titleAr: "تيجان وجسور الأسنان التعويضية",
    priceEn: "from $180",
    priceAr: "يبدأ من 180 دولار",
    numericPrice: 180,
    descriptionEn:
      "Durable, natural-looking repairs that restore strength and bite, often finished comfortably in a single visit.",
    descriptionAr:
      "ترميمات متينة من الزيركونيا والإيماكس تستعيد قوة المضغ والشكل الطبيعي للسن في زيارة واحدة بتقنية CAD/CAM.",
    image: "https://framerusercontent.com/images/5lcMiI0nFXglYbDBiP7kBLuZi8A.png",
    durationEn: "Single visit (60-90 mins)",
    durationAr: "زيارة واحدة (60 - 90 دقيقة)",
    stepsEn: [
      "Digital scan of the broken or decayed tooth (no messy putties)",
      "In-house 3D CAD/CAM robotic milling while you relax",
      "Custom shade glazing and furnace crystallization",
      "Immediate permanent bonding and bite pressure balancing"
    ],
    stepsAr: [
      "مسح ضوئي رقمي بدون مقاسات أو معجون تقليدي مزعج",
      "خرط آلي مباشر بتقنية CAD/CAM داخل المركز وأنت مسترخٍ",
      "تلوين وتزجيج حراري مطابق للأسنان المجاورة في الفرن الخاص",
      "تثبيت فوري متين وضبط دقيق لقوى الإطباق"
    ],
    includesEn: [
      "Zero Impression Trays",
      "Same-Day Final Fit",
      "High-Strength German Zirconia",
      "5-Year Structural Warranty"
    ],
    includesAr: [
      "بدون قوالب معجون مزعجة نهائياً",
      "تركيب نهائي متكامل في نفس اليوم",
      "خامات زيركون ألمانية فائقة الصلابة والمتانة",
      "ضمان كتابي لمدة 5 سنوات ضد الكسر"
    ]
  }
];

export const EVIA_REVIEWS: PatientReview[] = [
  {
    id: "sara-mohamed",
    nameEn: "Sara Mohamed",
    nameAr: "سارة محمد",
    treatmentEn: "Cosmetic Smile & Consultation",
    treatmentAr: "تجميل الأسنان واستشارة شاملة",
    rating: 5.0,
    quoteEn:
      "One of the best dental clinics I have ever visited! The reception team was very polite, and the doctor was patient, explaining every detail. I felt genuine care and comfort. Thank you so much!",
    quoteAr:
      "من أفضل العيادات اللي اتعاملت معاها، الاستقبال محترم جداً والدكتور كان صبور وشرحلي كل حاجة بالتفصيل. حسيت باهتمام حقيقي وراحة تامة.. شكراً ليكم جداً على النتيجة الرائعة.",
    dateEn: "Verified Review · 1 month ago",
    dateAr: "تقييم موثق · منذ شهر",
    initials: "SM",
    accentColor: "from-blue-600 to-indigo-700"
  },
  {
    id: "mahmoud-abdelhamid",
    nameEn: "Mahmoud Abdel-Hamid",
    nameAr: "محمود عبد الحميد",
    treatmentEn: "9 Fillings & Zirconia Crown",
    treatmentAr: "9 حشوات تجميلية وطربوش زيركون",
    rating: 5.0,
    quoteEn:
      "A fantastic clinic with an extraordinarily skilled doctor. I had about 9 fillings and a zirconia crown done—the precision and result are top-tier. Extremely respectful staff and wonderful treatment.",
    quoteAr:
      "المكان كويس جداً والدكتور شاطر ومحترف.. عملت حوالي 9 حشوات وطربوش زيركون وبسم الله ما شاء الله النتيجة ممتازة جداً، وبنات العيادة والاستقبال محترمين والمعاملة راقية للغاية.",
    dateEn: "Verified Review · 2 months ago",
    dateAr: "تقييم موثق · منذ شهرين",
    initials: "MA",
    accentColor: "from-teal-600 to-emerald-700"
  },
  {
    id: "m7md-3z",
    nameEn: "Mohamed Ezz",
    nameAr: "محمد عز",
    treatmentEn: "Root Canal & Painless Restoration",
    treatmentAr: "علاج جذور وترميم بدون ألم",
    rating: 5.0,
    quoteEn:
      "The doctor's hands are pure gold! Absolutely gentle and zero pain throughout. The reception team is wonderful and welcoming. We are truly thrilled with our experience and the flawless work.",
    quoteAr:
      "الدكتور بسم الله ما شاء الله إيده تتلف في حرير، والسكرتارية تبارك الرحمن في الذوق والتعاون. تجربة ممتازة جداً والشغل متقن لأبعد حد وبدون أي إحساس بالألم.",
    dateEn: "Verified Review · 3 months ago",
    dateAr: "تقييم موثق · منذ 3 أشهر",
    initials: "ME",
    accentColor: "from-sky-600 to-blue-700"
  },
  {
    id: "faisal-alisaie",
    nameEn: "Faisal Al-Isaie",
    nameAr: "أ. فيصل العيسائي",
    treatmentEn: "Dental Surgery & Implants",
    treatmentAr: "جراحة وزراعة الأسنان",
    rating: 5.0,
    quoteEn:
      "An outstanding experience and high-end medical service in dentistry. Exceptional punctuality, doctors with the highest standards of professionalism and attentiveness, and caring follow-up.",
    quoteAr:
      "تجربة ممتازة وخدمة طبية راقية جداً في طب وجراحة الأسنان، دقة عالية في المواعيد وأطباء على أعلى مستوى من الاحترافية والاهتمام ومتابعة الحالة بعد الزيارة.",
    dateEn: "Verified Review · 4 months ago",
    dateAr: "تقييم موثق · منذ 4 أشهر",
    initials: "FA",
    accentColor: "from-indigo-600 to-purple-700"
  },
  {
    id: "nourhan-ali",
    nameEn: "Nourhan Ali",
    nameAr: "نورهان علي",
    treatmentEn: "Implant & Laser Whitening",
    treatmentAr: "زراعة وتبييض الأسنان بالليزر",
    rating: 5.0,
    quoteEn:
      "Spotless clinic with 10/10 sterilization standards. Had dental implants and whitening done—the results look completely natural with zero post-procedure pain. Thank you Dubai Dental Clinic!",
    quoteAr:
      "عيادة ممتازة ونظيفة جداً وأعلى معايير تعقيم شفتها، عملت تبييض وزراعة والنتيجة طبيعية جداً والتعامل راقي ومريح نفسياً، شكراً لمركز دبي لطب الأسنان.",
    dateEn: "Verified Review · 5 months ago",
    dateAr: "تقييم موثق · منذ 5 أشهر",
    initials: "NA",
    accentColor: "from-rose-600 to-pink-700"
  },
  {
    id: "ahmed-samir",
    nameEn: "Ahmed Samir",
    nameAr: "أحمد سمير",
    treatmentEn: "Comprehensive Checkup & Hygiene",
    treatmentAr: "فحص دوري وتنظيف بالموجات",
    rating: 5.0,
    quoteEn:
      "The best dental center in Haram and Giza without exaggeration. Absolute medical integrity, fair pricing, and state-of-the-art equipment. Highly recommended to everyone.",
    quoteAr:
      "أفضل مركز أسنان في الهرم والجيزة بدون مبالغة، أمانة وضمير وأسعار مناسبة جداً مقارنة بالجودة العالية والأجهزة الحديثة المستخدمة. أنصح بالتعامل معهم بشدة.",
    dateEn: "Verified Review · 6 months ago",
    dateAr: "تقييم موثق · منذ 6 أشهر",
    initials: "AS",
    accentColor: "from-amber-600 to-orange-700"
  }
];

export const EVIA_FAQS: FaqItem[] = [
  {
    id: "services-offered",
    questionEn: "What dental services do you offer?",
    questionAr: "ما هي الخدمات والتخصصات المتاحة لديكم؟",
    answerEn:
      "We provide comprehensive general, cosmetic, and restorative dental care — from routine checkups, cleanings, and 3D digital scans to porcelain veneers, crowns, bridges, Invisalign clear aligners, and dental implants.",
    answerAr:
      "نقدم رعاية سنية متكاملة تشمل الفحص الدوري، تنظيف وتلميع الأسنان، الأشعة ثلاثية الأبعاد، عدسات الفينير، تيجان وجسور الزيركون في نفس اليوم، زراعة الأسنان الرقمية، والتقويم الشفاف."
  },
  {
    id: "visit-frequency",
    questionEn: "How often should I visit the dentist?",
    questionAr: "كم مرة يجب أن أزور طبيب الأسنان؟",
    answerEn:
      "For most healthy adults and children, we recommend visiting every 6 months for a routine examination and professional cleaning. Patients with active periodontal treatment or complex restorations may benefit from more frequent checkups.",
    answerAr:
      "نوصي بزيارة الفحص الدوري والتنظيف الوقائي كل 6 أشهر لضمان سلامة اللثة والأسنان. قد يُنصح بزيارات أقرب للمرضى الذين يخضعون لعلاج تقويمي أو عناية خاصة باللثة."
  },
  {
    id: "whitening-safety",
    questionEn: "Is teeth whitening safe?",
    questionAr: "هل جلسات تبييض الأسنان آمنة للمينا؟",
    answerEn:
      "Yes. Professional teeth whitening overseen by our clinicians is thoroughly tested, pH-balanced, and protects your enamel while gently lifting deep stains. We also use specialized desensitizing protocols to ensure maximum comfort.",
    answerAr:
      "نعم، تبييض الأسنان الاحترافي تحت إشراف أطبائنا آمن تماماً على مينا الأسنان ومتوازن كيميائياً. نستخدم محاليل مهدئة تمنع أي تحسس بعد الجلسة."
  },
  {
    id: "emergencies",
    questionEn: "Do you treat dental emergencies?",
    questionAr: "هل تستقبلون حالات طوارئ الأسنان العاجلة؟",
    answerEn:
      "Yes, we reserve daily appointments specifically for urgent needs, including severe toothaches, cracked teeth, lost crowns, or accidental trauma. Please call our clinic directly at +20 102 201 3314 for immediate assistance.",
    answerAr:
      "نعم، نخصص يومياً فترات مسبقة لحالات الطوارئ السنية الحرجة مثل الألم الشديد، كسر الأسنان، وسقوط التركيبات. اتصل بنا فوراً على 01022013314 لتنسيق التدخل السريع."
  },
  {
    id: "new-patients",
    questionEn: "Do you accept new patients?",
    questionAr: "هل تقبلون مرضى ومراجعين جدد حالياً؟",
    answerEn:
      "Yes! We are currently welcoming new patients of all ages. Your first visit includes a comprehensive 3D scan, consultation with our lead clinicians, and a completely transparent treatment plan tailored to your lifestyle.",
    answerAr:
      "نعم بكل ترحيب! نستقبل مراجعين جدد يومياً. تشمل زيارتك الأولى فحصاً ثلاثي الأبعاد شاملاً واستشارة استشارية متعمقة وخطة علاج واضحة بدون أي مفاجآت."
  },
  {
    id: "book-appointment",
    questionEn: "How can I book an appointment?",
    questionAr: "كيف يمكنني حجز موعد كشف أو استشارة؟",
    answerEn:
      "You can book instantly online using the 'Book an appointment' button on this site, call our front desk directly at +20 102 201 3314, or message our team via WhatsApp for immediate coordination.",
    answerAr:
      "يمكنك الحجز مباشرة عبر زر 'احجز موعداً' في الموقع، أو الاتصال بهاتف 01022013314، أو إرسال رسالة مباشرة عبر الواتساب لتأكيد الموعد في الوقت الأنسب لك."
  }
];

export const EVIA_BLOG: BlogPost[] = [
  {
    id: "checkup-frequency",
    titleEn: "How Often Should You Visit the Dentist for a Routine Checkup?",
    titleAr: "كم مرة يجب أن تزور طبيب الأسنان للفحص الدوري؟",
    categoryEn: "Preventive Care",
    categoryAr: "العناية الوقائية",
    excerptEn:
      "Regular dental visits can help catch small problems early and keep your teeth and gums healthy for a lifetime.",
    excerptAr:
      "الفحوصات الدورية تكشف التسوس المجهري ومشاكل اللثة في مراحلها الأولى قبل أن تتطلب تدخلات جراحية معقدة.",
    image: "https://framerusercontent.com/images/KO814I1YQcAj9YfinA3VuG8aor8.png",
    readTimeEn: "4 min read",
    readTimeAr: "قراءة 4 دقائق"
  },
  {
    id: "teeth-whitening-guide",
    titleEn: "What to Know Before Choosing Teeth Whitening",
    titleAr: "كل ما تحتاج لمعرفته قبل اختيار تبييض الأسنان الاحترافي",
    categoryEn: "Cosmetic Dentistry",
    categoryAr: "تجميل الأسنان",
    excerptEn:
      "Learn how professional teeth whitening works, how long results last, and what you should consider before treatment.",
    excerptAr:
      "تعرف على الفرق بين التبييض المنزلي وتبييض الليزر العيادي، وكيف تحافظ على بياض ناصع بدون أدنى حساسية.",
    image: "https://framerusercontent.com/images/9zrwnt31fkUBxEgckLOryLPCyYE.jpg",
    readTimeEn: "5 min read",
    readTimeAr: "قراءة 5 دقائق"
  },
  {
    id: "dental-crown-protection",
    titleEn: "When Does a Tooth Really Need a Dental Crown for Protection?",
    titleAr: "متى يحتاج السن فعلياً إلى تاج لحمايته من الكسر؟",
    categoryEn: "Restorative Dentistry",
    categoryAr: "الاستعاضة والتركيبات",
    excerptEn:
      "Dental crowns can restore damaged teeth and help protect them from further fractures and oral health problems.",
    excerptAr:
      "اكتشف الحالات التي تتطلب دعماً بتاج من الزيركون، خصوصاً بعد علاج الجذور أو في حالات الشروخ الكبيرة.",
    image: "https://framerusercontent.com/images/6n1gkMuG5X91BXKv584ffW0o.png",
    readTimeEn: "6 min read",
    readTimeAr: "قراءة 6 دقائق"
  }
];
