export type Lang = "ar" | "en";
export type L = { ar: string; en: string };

export interface ClinicData {
  name: L;
  short: L;
  tagline: L;
  address: L;
  phone: string;
  phoneIntl: string;
  tel: string;
  phoneTel?: string;
  whatsapp: string;
  whatsappUrl: string;
  email: string;
  hours: L;
  hoursNeedsConfirmation: boolean;
  googleRating: {
    score: number;
    reviewCount: number;
    lastUpdated: L;
    needsConfirmation: boolean;
  };
  mapsUrl: string;
  googleMapsUrl?: string;
  referenceWebsite: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: L;
  role: L;
  specialty: L;
  bio: L;
  credentials: L[];
  services: string[]; // service slugs
  photoUrl: string | null;
  initials: { ar: string; en: string };
  visible: boolean;
  needsConfirmation: boolean;
}

export interface ServiceStep {
  title: L;
  desc: L;
}

export interface ServiceFaq {
  q: L;
  a: L;
}

export interface Service {
  id: string;
  slug: string;
  name: L;
  tagline: L;
  shortTagline?: L;
  iconName: string;
  icon?: string;
  overview: L[];
  whoItIsFor: L[];
  whatToExpect: ServiceStep[];
  faqs: ServiceFaq[];
  relatedDoctorIds: string[];
  visible: boolean;
  needsConfirmation: boolean;
}

export interface Review {
  id: string;
  author: L;
  treatment: L;
  text: L;
  stars: number;
  date: L;
  isSample: boolean;
}

export interface GalleryCase {
  id: string;
  category: string;
  title: L;
  description: L;
  beforeLabel: L;
  afterLabel: L;
  duration: L;
  material: L;
  isSample: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: L;
  excerpt: L;
  category: L;
  readTime: L;
  publishedAt: L;
  content: L[];
}

export interface FaqItem {
  id: string;
  question: L;
  answer: L;
  category: "general" | "booking" | "safety" | "services";
}

export interface ProcessStep {
  step: number;
  title: L;
  desc: L;
  detail: L;
}

export interface BookingRequest {
  id: string;
  createdAt: string;
  /** @deprecated use serviceIds */
  serviceSlugs?: string[];
  serviceIds: string[];
  /** @deprecated use doctorId */
  doctorSlug?: string | null;
  doctorId: string | null;
  /** @deprecated use date */
  preferredDate?: string;
  date: string;
  timeWindow: "afternoon" | "evening";
  patientName: string;
  phone: string;
  email?: string;
  /** @deprecated use isChild */
  isForChild?: boolean;
  isChild: boolean;
  notes?: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
}

export type ServiceItem = Service;
export type DoctorItem = Doctor;
export type ReviewItem = Review;
export type PostItem = BlogPost;
