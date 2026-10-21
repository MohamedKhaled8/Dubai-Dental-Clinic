/**
 * ==============================================================================
 * DUBAI DENTAL CLINIC — DATA REPOSITORY LAYER
 * ==============================================================================
 * This repository layer abstracts all data access across the application.
 *
 * TODAY:
 * - Reads from typed in-memory seed data files (/src/data/*)
 * - Persists booking requests to browser `localStorage`
 *
 * TOMORROW (SUPABASE INTEGRATION):
 * 1. Initialize your Supabase client in `/src/lib/supabase.ts`:
 *    `import { createClient } from '@supabase/supabase-js'`
 * 2. In this file, replace the in-memory returns with `supabase.from('...').select()`
 * 3. Replace `createBooking` with `supabase.from('bookings').insert(...)`
 *
 * RECOMMENDED SUPABASE TABLE SCHEMA:
 * - `clinic` (id uuid, name_ar text, name_en text, phone text, address_ar text, ...)
 * - `doctors` (id uuid, slug text, name_ar text, name_en text, specialty_ar text, ...)
 * - `services` (id uuid, slug text, name_ar text, name_en text, overview_ar jsonb, ...)
 * - `reviews` (id uuid, author_ar text, text_ar text, stars int, is_sample boolean, ...)
 * - `gallery_cases` (id uuid, category text, title_ar text, is_sample boolean, ...)
 * - `posts` (id uuid, slug text, title_ar text, content_ar jsonb, ...)
 * - `faqs` (id uuid, question_ar text, answer_ar text, category text, ...)
 * - `bookings` (id uuid primary key, created_at timestamptz, service_slugs text[],
 *              patient_name text, phone text, time_window text, status text)
 * ==============================================================================
 */

import { clinicData } from "@/data/clinic";
import { doctorsData } from "@/data/doctors";
import { servicesData } from "@/data/services";
import { reviewsData } from "@/data/reviews";
import { galleryData } from "@/data/gallery";
import { postsData } from "@/data/posts";
import { faqsData } from "@/data/faqs";
import { processStepsData } from "@/data/process";
import type {
  ClinicData,
  Doctor,
  Service,
  Review,
  GalleryCase,
  BlogPost,
  FaqItem,
  ProcessStep,
  BookingRequest,
} from "@/data/types";

const LOCAL_STORAGE_BOOKINGS_KEY = "utopia_clinic_bookings_v1";

// 1. Clinic Info
export async function getClinic(): Promise<ClinicData> {
  return clinicData;
}

// 2. Doctors
export async function getDoctors(includeHidden = false): Promise<Doctor[]> {
  if (includeHidden) return doctorsData;
  return doctorsData.filter((d) => d.visible);
}

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  const doc = doctorsData.find((d) => d.slug === slug || d.id === slug);
  return doc ?? null;
}

// 3. Services
export async function getServices(includeHidden = false): Promise<Service[]> {
  if (includeHidden) return servicesData;
  return servicesData.filter((s) => s.visible);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const service = servicesData.find((s) => s.slug === slug || s.id === slug);
  return service ?? null;
}

// 4. Reviews
export async function getReviews(): Promise<Review[]> {
  return reviewsData;
}

// 5. Gallery Cases
export async function getGalleryCases(): Promise<GalleryCase[]> {
  return galleryData;
}

// 6. Blog Posts
export async function getPosts(): Promise<BlogPost[]> {
  return postsData;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = postsData.find((p) => p.slug === slug || p.id === slug);
  return post ?? null;
}

// 7. FAQs & Process Steps
export async function getFaqs(): Promise<FaqItem[]> {
  return faqsData;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return processStepsData;
}

// 8. Bookings (Front-End Persistence Layer -> Swappable to Supabase)
export async function createBooking(
  input: Omit<BookingRequest, "id" | "createdAt" | "status">
): Promise<BookingRequest> {
  const newBooking: BookingRequest = {
    ...input,
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      const existingRaw = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      const bookings: BookingRequest[] = existingRaw ? JSON.parse(existingRaw) : [];
      bookings.unshift(newBooking);
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }
  }

  return newBooking;
}

export async function listBookings(): Promise<BookingRequest[]> {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Could not read from localStorage:", err);
    return [];
  }
}

export async function updateBookingStatus(
  id: string,
  status: BookingRequest["status"]
): Promise<boolean> {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return false;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
    if (!raw) return false;
    const bookings: BookingRequest[] = JSON.parse(raw);
    const target = bookings.find((b) => b.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Could not update status in localStorage:", err);
    return false;
  }
}

export async function deleteBooking(id: string): Promise<boolean> {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return false;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
    if (!raw) return false;
    const bookings: BookingRequest[] = JSON.parse(raw);
    const filtered = bookings.filter((b) => b.id !== id);
    localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.warn("Could not delete from localStorage:", err);
    return false;
  }
}
