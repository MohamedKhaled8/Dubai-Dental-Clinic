-- ==============================================================================
-- DUBAI DENTAL CLINIC / EVIA V2 - PRODUCTION SUPABASE POSTGRESQL SCHEMA
-- ==============================================================================
-- Architecture:
-- - Relational architecture with UUID primary keys
-- - Row Level Security (RLS) enabled on all tables
-- - High-performance indexing on slugs, status, and sort orders
-- - Automated triggers for updated_at timestamps
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TRIGGER FUNCTION FOR UPDATED_AT
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. TABLE: v2_clinic_settings (Single-row configuration for clinic metadata)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.v2_clinic_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    clinic_name_ar TEXT NOT NULL DEFAULT 'مركز دبي لطب الأسنان',
    clinic_name_en TEXT NOT NULL DEFAULT 'Dubai Dental Clinic',
    tagline_ar TEXT NOT NULL DEFAULT 'صرح طبي متكامل يجمع بين الدقة والراحة',
    tagline_en TEXT NOT NULL DEFAULT 'Modern, Thoughtful Dentistry | Boutique Dental Studio',
    phone TEXT NOT NULL DEFAULT '01022013314',
    secondary_phone TEXT DEFAULT '0235824555',
    whatsapp TEXT NOT NULL DEFAULT '201022013314',
    email TEXT DEFAULT 'info@dubaidentalclinic.com',
    address_ar TEXT NOT NULL DEFAULT '20 شارع عز الدين عمر، الهرم، محافظة الجيزة، مصر',
    address_en TEXT NOT NULL DEFAULT '20 Ezz El-Din Omar St., Al-Haram, Giza Governorate, Egypt',
    google_maps_url TEXT NOT NULL DEFAULT 'https://maps.app.goo.gl/1gT1YVbbhyr8GPvf9',
    opening_hours_ar TEXT NOT NULL DEFAULT 'السبت - الخميس: 10:00 صباحاً - 10:00 مساءً | الجمعة: 2:00 ظهراً - 9:00 مساءً',
    opening_hours_en TEXT NOT NULL DEFAULT 'Sat - Thu: 10:00 AM - 10:00 PM | Fri: 02:00 PM - 09:00 PM',
    hero_title_ar TEXT NOT NULL DEFAULT 'طب أسنان يمنحك راحة كنقاء ضوء النهار',
    hero_title_en TEXT NOT NULL DEFAULT 'Dentistry that feels like daylight',
    hero_subtitle_ar TEXT NOT NULL DEFAULT 'صرح طبي متكامل في الهرم والجيزة يجمع بين الحرفية الطبية الدقيقة، أحدث التقنيات الرقمية، وتجربة علاجية مريحة بلا أي ألم.',
    hero_subtitle_en TEXT NOT NULL DEFAULT 'A premier dental center in Giza combining clinical excellence, advanced 3D technology, and a calm, painless patient journey.',
    hero_image TEXT NOT NULL DEFAULT 'https://framerusercontent.com/images/Lvb4MdoHeC9h7FdsuKxuIuJLje8.png'
);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_v2_clinic_settings_updated ON public.v2_clinic_settings;
CREATE TRIGGER trigger_v2_clinic_settings_updated
    BEFORE UPDATE ON public.v2_clinic_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 4. TABLE: v2_services (Dental treatments & pricing)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.v2_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    slug TEXT NOT NULL UNIQUE,
    category_en TEXT NOT NULL,
    category_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    price_en TEXT NOT NULL,
    price_ar TEXT NOT NULL,
    numeric_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    duration_en TEXT NOT NULL,
    duration_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    image_url TEXT NOT NULL,
    steps_en JSONB NOT NULL DEFAULT '[]'::jsonb,
    steps_ar JSONB NOT NULL DEFAULT '[]'::jsonb,
    includes_en JSONB NOT NULL DEFAULT '[]'::jsonb,
    includes_ar JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_v2_services_order ON public.v2_services(sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_v2_services_active ON public.v2_services(is_active);

DROP TRIGGER IF EXISTS trigger_v2_services_updated ON public.v2_services;
CREATE TRIGGER trigger_v2_services_updated
    BEFORE UPDATE ON public.v2_services
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 5. TABLE: v2_doctors (Specialists & clinical team)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.v2_doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    slug TEXT NOT NULL UNIQUE,
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    role_en TEXT NOT NULL,
    role_ar TEXT NOT NULL,
    credentials_en TEXT NOT NULL,
    credentials_ar TEXT NOT NULL,
    bio_en TEXT NOT NULL,
    bio_ar TEXT NOT NULL,
    image_url TEXT NOT NULL,
    specialties_en JSONB NOT NULL DEFAULT '[]'::jsonb,
    specialties_ar JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_v2_doctors_order ON public.v2_doctors(sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_v2_doctors_active ON public.v2_doctors(is_active);

DROP TRIGGER IF EXISTS trigger_v2_doctors_updated ON public.v2_doctors;
CREATE TRIGGER trigger_v2_doctors_updated
    BEFORE UPDATE ON public.v2_doctors
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 6. TABLE: v2_bookings (Patient appointment requests)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.v2_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    service_name TEXT NOT NULL,
    doctor_name TEXT,
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'completed', 'cancelled')),
    source TEXT NOT NULL DEFAULT 'v2_website',
    admin_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_v2_bookings_status ON public.v2_bookings(status);
CREATE INDEX IF NOT EXISTS idx_v2_bookings_date ON public.v2_bookings(appointment_date DESC);
CREATE INDEX IF NOT EXISTS idx_v2_bookings_created ON public.v2_bookings(created_at DESC);

DROP TRIGGER IF EXISTS trigger_v2_bookings_updated ON public.v2_bookings;
CREATE TRIGGER trigger_v2_bookings_updated
    BEFORE UPDATE ON public.v2_bookings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 7. TABLE: v2_reviews (Patient testimonials & ratings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.v2_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    treatment_en TEXT NOT NULL,
    treatment_ar TEXT NOT NULL,
    rating NUMERIC(2,1) NOT NULL DEFAULT 5.0,
    quote_en TEXT NOT NULL,
    quote_ar TEXT NOT NULL,
    date_en TEXT,
    date_ar TEXT,
    initials TEXT,
    accent_color TEXT DEFAULT 'from-blue-600 to-indigo-700',
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_v2_reviews_published ON public.v2_reviews(is_published);
CREATE INDEX IF NOT EXISTS idx_v2_reviews_order ON public.v2_reviews(sort_order ASC);

-- ==============================================================================
-- 8. TABLE: v2_cases (Before & After Results)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.v2_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    category TEXT NOT NULL,
    before_image TEXT NOT NULL,
    after_image TEXT NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_v2_cases_published ON public.v2_cases(is_published);

-- ==============================================================================
-- 9. TABLE: v2_faqs (Frequently Asked Questions)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.v2_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    question_en TEXT NOT NULL,
    question_ar TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    answer_ar TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_v2_faqs_published ON public.v2_faqs(is_published);
CREATE INDEX IF NOT EXISTS idx_v2_faqs_order ON public.v2_faqs(sort_order ASC);

-- ==============================================================================
-- 10. TABLE: v2_blog_posts (Clinical education & news)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.v2_blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    slug TEXT NOT NULL UNIQUE,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    category_en TEXT NOT NULL,
    category_ar TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    excerpt_ar TEXT NOT NULL,
    content_en TEXT,
    content_ar TEXT,
    image_url TEXT NOT NULL,
    read_time_en TEXT NOT NULL,
    read_time_ar TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_v2_blog_published ON public.v2_blog_posts(is_published);

DROP TRIGGER IF EXISTS trigger_v2_blog_updated ON public.v2_blog_posts;
CREATE TRIGGER trigger_v2_blog_updated
    BEFORE UPDATE ON public.v2_blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.v2_clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop any conflicting existing policies
DROP POLICY IF EXISTS "Public can read clinic settings" ON public.v2_clinic_settings;
DROP POLICY IF EXISTS "Public can read active services" ON public.v2_services;
DROP POLICY IF EXISTS "Public can read active doctors" ON public.v2_doctors;
DROP POLICY IF EXISTS "Public can insert bookings" ON public.v2_bookings;
DROP POLICY IF EXISTS "Public can read published reviews" ON public.v2_reviews;
DROP POLICY IF EXISTS "Public can read published cases" ON public.v2_cases;
DROP POLICY IF EXISTS "Public can read published faqs" ON public.v2_faqs;
DROP POLICY IF EXISTS "Public can read published blog" ON public.v2_blog_posts;

DROP POLICY IF EXISTS "Admins full access to settings" ON public.v2_clinic_settings;
DROP POLICY IF EXISTS "Admins full access to services" ON public.v2_services;
DROP POLICY IF EXISTS "Admins full access to doctors" ON public.v2_doctors;
DROP POLICY IF EXISTS "Admins full access to bookings" ON public.v2_bookings;
DROP POLICY IF EXISTS "Admins full access to reviews" ON public.v2_reviews;
DROP POLICY IF EXISTS "Admins full access to cases" ON public.v2_cases;
DROP POLICY IF EXISTS "Admins full access to faqs" ON public.v2_faqs;
DROP POLICY IF EXISTS "Admins full access to blog" ON public.v2_blog_posts;

-- Public READ policies
CREATE POLICY "Public can read clinic settings" ON public.v2_clinic_settings
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public can read active services" ON public.v2_services
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can read active doctors" ON public.v2_doctors
    FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Public can read published reviews" ON public.v2_reviews
    FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Public can read published cases" ON public.v2_cases
    FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Public can read published faqs" ON public.v2_faqs
    FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Public can read published blog" ON public.v2_blog_posts
    FOR SELECT TO anon, authenticated USING (is_published = true);

-- Public INSERT for bookings
CREATE POLICY "Public can insert bookings" ON public.v2_bookings
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Authenticated Admin FULL CRUD policies
CREATE POLICY "Admins full access to settings" ON public.v2_clinic_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access to services" ON public.v2_services
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access to doctors" ON public.v2_doctors
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access to bookings" ON public.v2_bookings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access to reviews" ON public.v2_reviews
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access to cases" ON public.v2_cases
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access to faqs" ON public.v2_faqs
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins full access to blog" ON public.v2_blog_posts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Also allow service role bypass
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
