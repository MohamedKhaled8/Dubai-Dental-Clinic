import type { Doctor } from "./types";

export const doctorsData: Doctor[] = [
  {
    id: "karim-kamal",
    slug: "dr-karim-kamal",
    name: {
      ar: "د. كريم كمال محمد",
      en: "Dr. Karim Kamal",
    },
    role: {
      ar: "مدير المركز وأخصائي علاج الجذور والأعصاب والتركيبات الثابتة",
      en: "Clinic Director & Endodontics and Fixed Prosthodontics Specialist",
    },
    specialty: {
      ar: "علاج الجذور المجهري، تجميل الأسنان، والتركيبات الثابتة",
      en: "Microscopic Endodontics, Cosmetic Dentistry & Fixed Prosthodontics",
    },
    bio: {
      ar: "يشرف د. كريم كمال على الخطط العلاجية المتكاملة داخل مركز دبي لطب الأسنان بالهرم، مع التركيز على علاج الجذور بدون ألم بأحدث أجهزة الميكروسكوب والروتاري، والتركيبات التجميلية الدقيقة من الزيركونيا والـ E-max.",
      en: "Dr. Karim Kamal oversees comprehensive treatment planning at Dubai Dental Clinic in Al-Haram, specializing in painless root canal treatments utilizing advanced rotary systems and precision cosmetic restorations.",
    },
    credentials: [
      { ar: "أخصائي علاج الجذور والأعصاب والتركيبات الثابتة", en: "Specialist in Endodontics & Fixed Prosthodontics" },
      { ar: "مدير الفريق الطبي بمركز دبي لطب الأسنان - الهرم", en: "Medical Director, Dubai Dental Clinic - Haram" },
      { ar: "خبرة سريرية متقدمة في حشو العصب المجهري وتجميل الابتسامة", en: "Advanced clinical experience in microscopic endodontics and smile makeovers" },
    ],
    services: ["root-canal", "fixed-prosthesis", "dental-fillings", "dental-veneers", "scaling-polishing"],
    photoUrl: "/src/assets/doctor-consultant.jpg",
    initials: { ar: "ك ك", en: "KK" },
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "mostafa-abo-eldahab",
    slug: "dr-mostafa-abo-eldahab",
    name: {
      ar: "د. مصطفى أبو الدهب",
      en: "Dr. Mostafa Abo El-Dahab",
    },
    role: {
      ar: "استشاري جراحة الوجه والفكين وزراعة الأسنان",
      en: "Consultant in Oral & Maxillofacial Surgery & Dental Implantology",
    },
    specialty: {
      ar: "زراعة الأسنان الفورية، زراعة العظم، وجراحات الفم المتقدمة",
      en: "Immediate Dental Implants, Bone Grafting & Advanced Oral Surgery",
    },
    bio: {
      ar: "استشاري متخصص في جراحات زراعة الأسنان التعويضية وزراعة العظام ورفع الجيب الفكي داخل مركز دبي لطب الأسنان، بالاعتماد على التخطيط الرقمي ثلاثي الأبعاد لضمان أعلى نسب نجاح وديمومة للزرعات.",
      en: "Consultant specializing in advanced implantology, guided bone regeneration, and sinus lift procedures at Dubai Dental Clinic, utilizing 3D CBCT digital planning for long-term clinical success.",
    },
    credentials: [
      { ar: "استشاري جراحة الوجه والفكين وزراعة الأسنان", en: "Consultant in Oral & Maxillofacial Surgery" },
      { ar: "عضو الجمعية الدولية لزراعة الأسنان (ITI)", en: "Member, International Team for Implantology (ITI)" },
      { ar: "خبرة واسعة في جراحات الفم المعقدة والزراعة الموجهة حاسوبياً", en: "Extensive expertise in complex oral surgeries and computer-guided implantology" },
    ],
    services: ["dental-implants", "fixed-prosthesis"],
    photoUrl: "/src/assets/doctor-consultant.jpg",
    initials: { ar: "م د", en: "MD" },
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "ahmed-farouk",
    slug: "dr-ahmed-farouk",
    name: {
      ar: "د. أحمد فاروق",
      en: "Dr. Ahmed Farouk",
    },
    role: {
      ar: "أخصائي تقويم وتجميل الأسنان",
      en: "Orthodontics & Dentofacial Orthopedics Specialist",
    },
    specialty: {
      ar: "تقويم الأسنان الشفاف، التقويم المعدني، وتعديل الإطباق الوظيفي",
      en: "Clear Aligners, Fixed Orthodontics & Functional Occlusal Correction",
    },
    bio: {
      ar: "يقود د. أحمد فاروق قسم التقويم بمركز دبي لطب الأسنان، مع خبرة واسعة في علاج حالات تراكب الأسنان والمسافات وبروز الفكين للأطفال والبالغين باستخدام أحدث تقنيات التقويم الشفاف والقوالب غير المرئية.",
      en: "Dr. Ahmed Farouk heads the orthodontics department at Dubai Dental Clinic, with deep expertise in correcting malocclusions, crowding, and jaw discrepancies for both adolescents and adults using clear aligners and fixed systems.",
    },
    credentials: [
      { ar: "أخصائي تقويم الأسنان وتعديل الفكين", en: "Specialist in Orthodontics & Dentofacial Orthopedics" },
      { ar: "معتمد في أنظمة التقويم الشفاف الحديثة (Clear Aligners)", en: "Certified Clear Aligner Provider" },
      { ar: "عضو الجمعية المصرية لتقويم الأسنان (EOS)", en: "Member, Egyptian Orthodontic Society (EOS)" },
    ],
    services: ["orthodontics", "pediatric-dentistry", "dental-veneers"],
    photoUrl: "/src/assets/doctor-female.jpg",
    initials: { ar: "أ ف", en: "AF" },
    visible: true,
    needsConfirmation: false,
  },
];
