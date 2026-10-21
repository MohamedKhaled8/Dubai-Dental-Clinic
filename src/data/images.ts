export type ImageStatus = "placeholder" | "licensed" | "clinic-approved";

export interface ImageSlot {
  src: string;
  alt: { ar: string; en: string };
  source: string;
  license: string;
  status: ImageStatus;
}

export const imagesData: Record<string, ImageSlot> = {
  heroBackground: {
    src: "/images/hero_dental_clinic.jpg",
    alt: {
      ar: "مركز أسنان حديث ومجهز في الهرم مع بيئة علاجية مريحة",
      en: "Bright modern dental clinic in Al-Haram in a calm atmosphere",
    },
    source: "Antigravity AI Medical Atmosphere Generator",
    license: "Commercial Use",
    status: "placeholder",
  },
  clinicInteriorPlaceholder: {
    src: "/images/hero_dental_clinic.jpg",
    alt: {
      ar: "تصميم داخلي معقم لغرفة علاج الأسنان",
      en: "Sterile modern dental clinic treatment operatory",
    },
    source: "Dubai Dental Clinic Interior Slot",
    license: "Clinic Proprietary",
    status: "clinic-approved",
  },
};
