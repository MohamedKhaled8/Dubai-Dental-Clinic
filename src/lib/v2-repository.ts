/**
 * ==============================================================================
 * DUBAI DENTAL CLINIC / EVIA V2 - CENTRALIZED DATA REPOSITORY
 * ==============================================================================
 * A unified, resilient data layer that bridges Supabase PostgreSQL with
 * responsive local storage caching.
 * ==============================================================================
 */

import { getSupabase } from "./supabase";
import {
  DoctorProfile,
  DentalService,
  PatientReview,
  FaqItem,
  BlogPost,
  EVIA_DOCTORS,
  EVIA_SERVICES,
  EVIA_REVIEWS,
  EVIA_FAQS,
  EVIA_BLOG,
} from "@/components/v2/evia-data";

// -----------------------------------------------------------------------------
// 1. DATA MODELS & TYPES
// -----------------------------------------------------------------------------

export interface V2Booking {
  id: string;
  createdAt: string;
  updatedAt?: string | undefined;
  patientName: string;
  patientPhone: string;
  patientEmail?: string | undefined;
  serviceName: string;
  doctorName?: string | undefined;
  appointmentDate: string;
  timeSlot: string;
  notes?: string | undefined;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  source?: string | undefined;
  adminNotes?: string | undefined;
}

export interface V2Service extends DentalService {
  slug?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface V2Doctor extends DoctorProfile {
  slug?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface V2Review extends PatientReview {
  sortOrder?: number;
  isPublished?: boolean;
}

export interface V2Case {
  id: string;
  titleEn: string;
  titleAr: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  descriptionEn?: string;
  descriptionAr?: string;
  tags?: string[];
  sortOrder?: number;
  isPublished?: boolean;
}

export interface V2ClinicSettings {
  id?: string;
  clinicNameAr: string;
  clinicNameEn: string;
  taglineAr?: string;
  taglineEn?: string;
  phone: string;
  secondaryPhone?: string;
  whatsapp: string;
  email?: string;
  addressAr: string;
  addressEn: string;
  googleMapsUrl: string;
  openingHoursAr: string;
  openingHoursEn: string;
  heroTitleAr: string;
  heroTitleEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  heroImage: string;
}

// -----------------------------------------------------------------------------
// 2. LOCAL CACHE KEYS & DEFAULT INITIALIZERS
// -----------------------------------------------------------------------------

const STORAGE_KEYS = {
  BOOKINGS: "v2_cache_bookings",
  SERVICES: "v2_cache_services",
  DOCTORS: "v2_cache_doctors",
  REVIEWS: "v2_cache_reviews",
  CASES: "v2_cache_cases",
  FAQS: "v2_cache_faqs",
  BLOG: "v2_cache_blog",
  SETTINGS: "v2_cache_settings",
};

const DEFAULT_SETTINGS: V2ClinicSettings = {
  clinicNameAr: "مركز دبي لطب الأسنان",
  clinicNameEn: "Dubai Dental Clinic",
  taglineAr: "صرح طبي متكامل يجمع بين الدقة والراحة",
  taglineEn: "Modern, Thoughtful Dentistry | Boutique Dental Studio",
  phone: "01022013314",
  secondaryPhone: "0235824555",
  whatsapp: "201022013314",
  email: "info@dubaidentalclinic.com",
  addressAr: "20 شارع عز الدين عمر، الهرم، محافظة الجيزة، مصر",
  addressEn: "20 Ezz El-Din Omar St., Al-Haram, Giza Governorate, Egypt",
  googleMapsUrl: "https://maps.app.goo.gl/1gT1YVbbhyr8GPvf9",
  openingHoursAr: "السبت - الخميس: 10:00 صباحاً - 10:00 مساءً | الجمعة: 2:00 ظهراً - 9:00 مساءً",
  openingHoursEn: "Sat - Thu: 10:00 AM - 10:00 PM | Fri: 02:00 PM - 09:00 PM",
  heroTitleAr: "طب أسنان يمنحك راحة كنقاء ضوء النهار",
  heroTitleEn: "Dentistry that feels like daylight",
  heroSubtitleAr:
    "مركز دبي لطب الأسنان — صرح طبي متكامل في الهرم والجيزة يجمع بين الحرفية الطبية الدقيقة، أحدث التقنيات الرقمية، وتجربة علاجية مريحة بلا أي ألم.",
  heroSubtitleEn:
    "Dubai Dental Clinic — a premier dental center in Giza combining clinical excellence, advanced 3D technology, and a calm, painless patient journey.",
  heroImage: "https://framerusercontent.com/images/Lvb4MdoHeC9h7FdsuKxuIuJLje8.png",
};

const DEFAULT_CASES: V2Case[] = [
  {
    id: "case-veneers-01",
    titleEn: "Porcelain Veneers Transformation",
    titleAr: "تجميل الأسنان بعدسات الفينير السويسرية",
    category: "Veneers & Aesthetics",
    beforeImage: "https://framerusercontent.com/images/E5VtCUtG8dUklZWKGgyK4GdtDA.png",
    afterImage: "https://framerusercontent.com/images/Oqy9319b2uv11O0YWGDDUoh5c.png",
    descriptionEn: "Complete upper arch aesthetic restoration with minimal preparation and high translucency ceramics.",
    descriptionAr: "إعادة تأهيل تجميلي متكامل للفك العلوي باستخدام عدسات فائقة النحافة تحافظ على بنية الأسنان الطبيعية.",
    tags: ["Veneers", "Smile Design", "Whitening"],
    sortOrder: 1,
    isPublished: true,
  },
];

// Helper to safely get from localStorage
function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Helper to safely set in localStorage
function setLocal<T>(key: string, value: T): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to cache ${key}:`, err);
  }
}

// -----------------------------------------------------------------------------
// 3. BOOKINGS API
// -----------------------------------------------------------------------------

export async function listBookings(): Promise<V2Booking[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("v2_bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const mapped: V2Booking[] = data.map((row: any) => ({
          id: row.id,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          patientName: row.patient_name,
          patientPhone: row.patient_phone,
          patientEmail: row.patient_email,
          serviceName: row.service_name,
          doctorName: row.doctor_name,
          appointmentDate: row.appointment_date,
          timeSlot: row.time_slot,
          notes: row.notes,
          status: row.status,
          source: row.source,
          adminNotes: row.admin_notes,
        }));
        setLocal(STORAGE_KEYS.BOOKINGS, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase bookings fetch failed, falling back to cache:", err);
    }
  }

  return getLocal<V2Booking[]>(STORAGE_KEYS.BOOKINGS, []);
}

export async function createBooking(
  input: Omit<V2Booking, "id" | "createdAt" | "status">
): Promise<V2Booking> {
  const now = new Date().toISOString();
  const fallbackBooking: V2Booking = {
    ...input,
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: now,
    status: "new",
  };

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase
        .from("v2_bookings")
        .insert({
          patient_name: input.patientName,
          patient_phone: input.patientPhone,
          patient_email: input.patientEmail || null,
          service_name: input.serviceName,
          doctor_name: input.doctorName || null,
          appointment_date: input.appointmentDate,
          time_slot: input.timeSlot,
          notes: input.notes || null,
          status: "new",
          source: input.source || "v2_website",
        });

      if (!error) {
        // Prepend to local cache
        const cached = getLocal<V2Booking[]>(STORAGE_KEYS.BOOKINGS, []);
        setLocal(STORAGE_KEYS.BOOKINGS, [fallbackBooking, ...cached]);
        return fallbackBooking;
      } else {
        console.warn("Supabase booking insert returned error:", error);
      }
    } catch (err) {
      console.warn("Supabase booking insert failed, saving to local cache:", err);
    }
  }

  // Fallback to local storage
  const cached = getLocal<V2Booking[]>(STORAGE_KEYS.BOOKINGS, []);
  setLocal(STORAGE_KEYS.BOOKINGS, [fallbackBooking, ...cached]);
  return fallbackBooking;
}

export async function updateBookingStatus(
  id: string,
  status: V2Booking["status"],
  adminNotes?: string
): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const updatePayload: Record<string, any> = { status };
      if (typeof adminNotes !== "undefined") {
        updatePayload["admin_notes"] = adminNotes;
      }

      const { error } = await supabase
        .from("v2_bookings")
        .update(updatePayload)
        .eq("id", id);

      if (!error) {
        // Sync local cache
        const cached = getLocal<V2Booking[]>(STORAGE_KEYS.BOOKINGS, []);
        const target = cached.find((b) => b.id === id);
        if (target) {
          target.status = status;
          if (typeof adminNotes !== "undefined") target.adminNotes = adminNotes;
          setLocal(STORAGE_KEYS.BOOKINGS, cached);
        }
        return true;
      }
    } catch (err) {
      console.warn("Supabase update booking failed, falling back to cache:", err);
    }
  }

  const cached = getLocal<V2Booking[]>(STORAGE_KEYS.BOOKINGS, []);
  const target = cached.find((b) => b.id === id);
  if (target) {
    target.status = status;
    if (typeof adminNotes !== "undefined") target.adminNotes = adminNotes;
    setLocal(STORAGE_KEYS.BOOKINGS, cached);
    return true;
  }
  return false;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { error } = await supabase.from("v2_bookings").delete().eq("id", id);
      if (!error) {
        const cached = getLocal<V2Booking[]>(STORAGE_KEYS.BOOKINGS, []);
        setLocal(
          STORAGE_KEYS.BOOKINGS,
          cached.filter((b) => b.id !== id)
        );
        return true;
      }
    } catch (err) {
      console.warn("Supabase delete booking failed:", err);
    }
  }

  const cached = getLocal<V2Booking[]>(STORAGE_KEYS.BOOKINGS, []);
  setLocal(
    STORAGE_KEYS.BOOKINGS,
    cached.filter((b) => b.id !== id)
  );
  return true;
}

// -----------------------------------------------------------------------------
// 4. SERVICES API
// -----------------------------------------------------------------------------

export async function getServices(): Promise<V2Service[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("v2_services")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: V2Service[] = data.map((row: any) => ({
          id: row.slug || row.id,
          slug: row.slug,
          categoryEn: row.category_en,
          categoryAr: row.category_ar,
          titleEn: row.title_en,
          titleAr: row.title_ar,
          priceEn: row.price_en,
          priceAr: row.price_ar,
          numericPrice: Number(row.numeric_price) || 0,
          durationEn: row.duration_en,
          durationAr: row.duration_ar,
          descriptionEn: row.description_en,
          descriptionAr: row.description_ar,
          image: row.image_url,
          stepsEn: Array.isArray(row.steps_en) ? row.steps_en : [],
          stepsAr: Array.isArray(row.steps_ar) ? row.steps_ar : [],
          includesEn: Array.isArray(row.includes_en) ? row.includes_en : [],
          includesAr: Array.isArray(row.includes_ar) ? row.includes_ar : [],
          sortOrder: row.sort_order,
          isActive: row.is_active,
        }));
        setLocal(STORAGE_KEYS.SERVICES, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase services fetch failed, falling back to cache:", err);
    }
  }

  return getLocal<V2Service[]>(STORAGE_KEYS.SERVICES, EVIA_SERVICES);
}

export async function saveService(service: V2Service): Promise<V2Service> {
  const supabase = getSupabase();
  const slug = service.slug || service.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  if (supabase) {
    try {
      const payload = {
        slug,
        category_en: service.categoryEn,
        category_ar: service.categoryAr,
        title_en: service.titleEn,
        title_ar: service.titleAr,
        price_en: service.priceEn,
        price_ar: service.priceAr,
        numeric_price: service.numericPrice,
        duration_en: service.durationEn,
        duration_ar: service.durationAr,
        description_en: service.descriptionEn,
        description_ar: service.descriptionAr,
        image_url: service.image,
        steps_en: service.stepsEn,
        steps_ar: service.stepsAr,
        includes_en: service.includesEn,
        includes_ar: service.includesAr,
        sort_order: service.sortOrder ?? 0,
        is_active: service.isActive ?? true,
      };

      const { data, error } = await supabase
        .from("v2_services")
        .upsert(payload, { onConflict: "slug" })
        .select()
        .single();

      if (!error && data) {
        service.id = data.slug || data.id;
      }
    } catch (err) {
      console.warn("Supabase save service failed:", err);
    }
  }

  const cached = getLocal<V2Service[]>(STORAGE_KEYS.SERVICES, EVIA_SERVICES);
  const existingIdx = cached.findIndex((s) => s.id === service.id || (s.slug && s.slug === slug));
  if (existingIdx >= 0) {
    cached[existingIdx] = service;
  } else {
    cached.push(service);
  }
  setLocal(STORAGE_KEYS.SERVICES, cached);
  return service;
}

export async function deleteService(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from("v2_services").delete().or(`id.eq.${id},slug.eq.${id}`);
    } catch (err) {
      console.warn("Supabase delete service failed:", err);
    }
  }
  const cached = getLocal<V2Service[]>(STORAGE_KEYS.SERVICES, EVIA_SERVICES);
  setLocal(
    STORAGE_KEYS.SERVICES,
    cached.filter((s) => s.id !== id && s.slug !== id)
  );
  return true;
}

// -----------------------------------------------------------------------------
// 5. DOCTORS API
// -----------------------------------------------------------------------------

export async function getDoctors(): Promise<V2Doctor[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("v2_doctors")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: V2Doctor[] = data.map((row: any) => ({
          id: row.slug || row.id,
          slug: row.slug,
          nameEn: row.name_en,
          nameAr: row.name_ar,
          roleEn: row.role_en,
          roleAr: row.role_ar,
          credentialsEn: row.credentials_en,
          credentialsAr: row.credentials_ar,
          bioEn: row.bio_en,
          bioAr: row.bio_ar,
          image: row.image_url,
          specialtiesEn: Array.isArray(row.specialties_en) ? row.specialties_en : [],
          specialtiesAr: Array.isArray(row.specialties_ar) ? row.specialties_ar : [],
          sortOrder: row.sort_order,
          isActive: row.is_active,
        }));
        setLocal(STORAGE_KEYS.DOCTORS, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase doctors fetch failed, falling back to cache:", err);
    }
  }

  return getLocal<V2Doctor[]>(STORAGE_KEYS.DOCTORS, EVIA_DOCTORS);
}

export async function saveDoctor(doctor: V2Doctor): Promise<V2Doctor> {
  const supabase = getSupabase();
  const slug = doctor.slug || doctor.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  if (supabase) {
    try {
      const payload = {
        slug,
        name_en: doctor.nameEn,
        name_ar: doctor.nameAr,
        role_en: doctor.roleEn,
        role_ar: doctor.roleAr,
        credentials_en: doctor.credentialsEn,
        credentials_ar: doctor.credentialsAr,
        bio_en: doctor.bioEn,
        bio_ar: doctor.bioAr,
        image_url: doctor.image,
        specialties_en: doctor.specialtiesEn,
        specialties_ar: doctor.specialtiesAr,
        sort_order: doctor.sortOrder ?? 0,
        is_active: doctor.isActive ?? true,
      };

      const { data, error } = await supabase
        .from("v2_doctors")
        .upsert(payload, { onConflict: "slug" })
        .select()
        .single();

      if (!error && data) {
        doctor.id = data.slug || data.id;
      }
    } catch (err) {
      console.warn("Supabase save doctor failed:", err);
    }
  }

  const cached = getLocal<V2Doctor[]>(STORAGE_KEYS.DOCTORS, EVIA_DOCTORS);
  const existingIdx = cached.findIndex((d) => d.id === doctor.id || (d.slug && d.slug === slug));
  if (existingIdx >= 0) {
    cached[existingIdx] = doctor;
  } else {
    cached.push(doctor);
  }
  setLocal(STORAGE_KEYS.DOCTORS, cached);
  return doctor;
}

export async function deleteDoctor(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from("v2_doctors").delete().or(`id.eq.${id},slug.eq.${id}`);
    } catch (err) {
      console.warn("Supabase delete doctor failed:", err);
    }
  }
  const cached = getLocal<V2Doctor[]>(STORAGE_KEYS.DOCTORS, EVIA_DOCTORS);
  setLocal(
    STORAGE_KEYS.DOCTORS,
    cached.filter((d) => d.id !== id && d.slug !== id)
  );
  return true;
}

// -----------------------------------------------------------------------------
// 6. REVIEWS API
// -----------------------------------------------------------------------------

export async function getReviews(): Promise<V2Review[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("v2_reviews")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: V2Review[] = data.map((row: any) => ({
          id: row.id,
          nameEn: row.name_en,
          nameAr: row.name_ar,
          treatmentEn: row.treatment_en,
          treatmentAr: row.treatment_ar,
          rating: Number(row.rating) || 5.0,
          quoteEn: row.quote_en,
          quoteAr: row.quote_ar,
          dateEn: row.date_en,
          dateAr: row.date_ar,
          initials: row.initials,
          accentColor: row.accent_color,
          sortOrder: row.sort_order,
          isPublished: row.is_published,
        }));
        setLocal(STORAGE_KEYS.REVIEWS, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase reviews fetch failed, falling back to cache:", err);
    }
  }

  return getLocal<V2Review[]>(STORAGE_KEYS.REVIEWS, EVIA_REVIEWS);
}

export async function saveReview(review: V2Review): Promise<V2Review> {
  const supabase = getSupabase();
  const id = review.id || `rev-${Date.now()}`;

  if (supabase) {
    try {
      const payload = {
        name_en: review.nameEn,
        name_ar: review.nameAr,
        treatment_en: review.treatmentEn,
        treatment_ar: review.treatmentAr,
        rating: review.rating,
        quote_en: review.quoteEn,
        quote_ar: review.quoteAr,
        date_en: review.dateEn,
        date_ar: review.dateAr,
        initials: review.initials,
        accent_color: review.accentColor,
        is_published: review.isPublished ?? true,
        sort_order: review.sortOrder ?? 0,
      };

      await supabase.from("v2_reviews").upsert(payload);
    } catch (err) {
      console.warn("Supabase save review failed:", err);
    }
  }

  const cached = getLocal<V2Review[]>(STORAGE_KEYS.REVIEWS, EVIA_REVIEWS);
  const existingIdx = cached.findIndex((r) => r.id === id);
  if (existingIdx >= 0) {
    cached[existingIdx] = { ...review, id };
  } else {
    cached.unshift({ ...review, id });
  }
  setLocal(STORAGE_KEYS.REVIEWS, cached);
  return { ...review, id };
}

export async function deleteReview(id: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from("v2_reviews").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete review failed:", err);
    }
  }
  const cached = getLocal<V2Review[]>(STORAGE_KEYS.REVIEWS, EVIA_REVIEWS);
  setLocal(
    STORAGE_KEYS.REVIEWS,
    cached.filter((r) => r.id !== id)
  );
  return true;
}

// -----------------------------------------------------------------------------
// 7. SMILE CASES (BEFORE & AFTER) API
// -----------------------------------------------------------------------------

export async function getCases(): Promise<V2Case[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("v2_cases")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: V2Case[] = data.map((row: any) => ({
          id: row.id,
          titleEn: row.title_en,
          titleAr: row.title_ar,
          category: row.category,
          beforeImage: row.before_image,
          afterImage: row.after_image,
          descriptionEn: row.description_en,
          descriptionAr: row.description_ar,
          tags: Array.isArray(row.tags) ? row.tags : [],
          sortOrder: row.sort_order,
          isPublished: row.is_published,
        }));
        setLocal(STORAGE_KEYS.CASES, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase cases fetch failed, falling back to cache:", err);
    }
  }

  return getLocal<V2Case[]>(STORAGE_KEYS.CASES, DEFAULT_CASES);
}

export async function saveCase(caseItem: V2Case): Promise<V2Case> {
  const supabase = getSupabase();
  const id = caseItem.id || `case-${Date.now()}`;

  if (supabase) {
    try {
      const payload = {
        title_en: caseItem.titleEn,
        title_ar: caseItem.titleAr,
        category: caseItem.category,
        before_image: caseItem.beforeImage,
        after_image: caseItem.afterImage,
        description_en: caseItem.descriptionEn,
        description_ar: caseItem.descriptionAr,
        tags: caseItem.tags || [],
        is_published: caseItem.isPublished ?? true,
        sort_order: caseItem.sortOrder ?? 0,
      };

      await supabase.from("v2_cases").upsert(payload);
    } catch (err) {
      console.warn("Supabase save case failed:", err);
    }
  }

  const cached = getLocal<V2Case[]>(STORAGE_KEYS.CASES, DEFAULT_CASES);
  const existingIdx = cached.findIndex((c) => c.id === id);
  if (existingIdx >= 0) {
    cached[existingIdx] = { ...caseItem, id };
  } else {
    cached.unshift({ ...caseItem, id });
  }
  setLocal(STORAGE_KEYS.CASES, cached);
  return { ...caseItem, id };
}

// -----------------------------------------------------------------------------
// 8. FAQS & BLOG API
// -----------------------------------------------------------------------------

export async function getFaqs(): Promise<FaqItem[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("v2_faqs")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: FaqItem[] = data.map((r: any) => ({
          id: r.id,
          questionEn: r.question_en,
          questionAr: r.question_ar,
          answerEn: r.answer_en,
          answerAr: r.answer_ar,
        }));
        setLocal(STORAGE_KEYS.FAQS, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase FAQs fetch failed:", err);
    }
  }
  return getLocal<FaqItem[]>(STORAGE_KEYS.FAQS, EVIA_FAQS);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("v2_blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: BlogPost[] = data.map((r: any) => ({
          id: r.slug || r.id,
          titleEn: r.title_en,
          titleAr: r.title_ar,
          categoryEn: r.category_en,
          categoryAr: r.category_ar,
          excerptEn: r.excerpt_en,
          excerptAr: r.excerpt_ar,
          image: r.image_url,
          readTimeEn: r.read_time_en,
          readTimeAr: r.read_time_ar,
        }));
        setLocal(STORAGE_KEYS.BLOG, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase blog posts fetch failed:", err);
    }
  }
  return getLocal<BlogPost[]>(STORAGE_KEYS.BLOG, EVIA_BLOG);
}

// -----------------------------------------------------------------------------
// 9. CLINIC SETTINGS API
// -----------------------------------------------------------------------------

export async function getClinicSettings(): Promise<V2ClinicSettings> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("v2_clinic_settings")
        .select("*")
        .limit(1)
        .single();

      if (!error && data) {
        const mapped: V2ClinicSettings = {
          id: data.id,
          clinicNameAr: data.clinic_name_ar,
          clinicNameEn: data.clinic_name_en,
          taglineAr: data.tagline_ar,
          taglineEn: data.tagline_en,
          phone: data.phone,
          secondaryPhone: data.secondary_phone,
          whatsapp: data.whatsapp,
          email: data.email,
          addressAr: data.address_ar,
          addressEn: data.address_en,
          googleMapsUrl: data.google_maps_url,
          openingHoursAr: data.opening_hours_ar,
          openingHoursEn: data.opening_hours_en,
          heroTitleAr: data.hero_title_ar,
          heroTitleEn: data.hero_title_en,
          heroSubtitleAr: data.hero_subtitle_ar,
          heroSubtitleEn: data.hero_subtitle_en,
          heroImage: data.hero_image,
        };
        setLocal(STORAGE_KEYS.SETTINGS, mapped);
        return mapped;
      }
    } catch (err) {
      console.warn("Supabase settings fetch failed:", err);
    }
  }
  return getLocal<V2ClinicSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export async function saveClinicSettings(
  settings: V2ClinicSettings
): Promise<V2ClinicSettings> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const payload = {
        clinic_name_ar: settings.clinicNameAr,
        clinic_name_en: settings.clinicNameEn,
        tagline_ar: settings.taglineAr,
        tagline_en: settings.taglineEn,
        phone: settings.phone,
        secondary_phone: settings.secondaryPhone,
        whatsapp: settings.whatsapp,
        email: settings.email,
        address_ar: settings.addressAr,
        address_en: settings.addressEn,
        google_maps_url: settings.googleMapsUrl,
        opening_hours_ar: settings.openingHoursAr,
        opening_hours_en: settings.openingHoursEn,
        hero_title_ar: settings.heroTitleAr,
        hero_title_en: settings.heroTitleEn,
        hero_subtitle_ar: settings.heroSubtitleAr,
        hero_subtitle_en: settings.heroSubtitleEn,
        hero_image: settings.heroImage,
      };

      await supabase.from("v2_clinic_settings").upsert(payload);
    } catch (err) {
      console.warn("Supabase save settings failed:", err);
    }
  }

  setLocal(STORAGE_KEYS.SETTINGS, settings);
  return settings;
}
