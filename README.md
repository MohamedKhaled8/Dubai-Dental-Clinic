# Dubai Dental Clinic — Modern Web Platform (Al-Haram, Giza)

A bilingual (Arabic RTL default + English LTR) high-performance web platform for **Dubai Dental Clinic** (مركز دبي لطب الأسنان), 20 Ezz El-Din Omar St., Al-Haram, Giza, Egypt.

### Clinic Details
- **Name**: مركز دبي لطب الأسنان / Dubai Dental Clinic
- **Address**: ٢٠ شارع عز الدين عمر، متفرع من شارع الهرم (محطة العريش، برج المروة)، الطالبية، الهرم، الجيزة
- **Phones**: 01022013314 / 01028665801
- **WhatsApp**: [wa.me/201022013314](https://wa.me/201022013314)
- **Hours**: Daily 1:00 PM – 11:00 PM (Friday by appointment)
- **Rating**: 4.5 ★ (1,200+ Google Reviews)
- **Medical Director**: د. كريم كمال محمد (Consultant Endodontics & Esthetics)

---

## 1. Quick Start

```bash
bun install  # or npm install
bun run dev  # or npm run dev
```

---

## 2. Swappable Data Architecture (`/src/data/` & `/src/lib/repository.ts`)

All content is cleanly decoupled from UI components:
- `clinic.ts`: Clinic metadata (Al-Haram address, phone `01022013314`, hours, Google rating 4.5 / 1,200+ reviews).
- `doctors.ts`: Confirmed medical team (Dr. Karim Kamal, Dr. Mostafa Abo El-Dahab, Dr. Ahmed Farouk).
- `services.ts`: Specialized dental services with educational overviews, what to expect, and FAQs.
- `reviews.ts`: Authentic patient reviews linking to Google Maps.
- `gallery.ts`: Demonstration cases for the before/after slider.
- `posts.ts`: Educational clinical blog articles.
- `faqs.ts`: General patient FAQs.
- `process.ts`: 5-step visit experience workflow.

All UI components query data exclusively via `@/lib/repository.ts`.

---

## 3. How to Connect Supabase

Currently, `repository.ts` reads from the typed data files and persists booking requests to browser `localStorage`. When you are ready to connect your Supabase database:

1. Install Supabase client:
   ```bash
   bun add @supabase/supabase-js
   ```

2. Add environment variables to `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Initialize client in `src/lib/supabase.ts`:
   ```ts
   import { createClient } from "@supabase/supabase-js";
   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   );
   ```

4. Create the required tables in Supabase:
   - `clinic`
   - `doctors`
   - `services`
   - `reviews`
   - `gallery_cases`
   - `posts`
   - `faqs`
   - `bookings` (with columns: `id`, `created_at`, `service_ids`, `doctor_id`, `date`, `time_window`, `patient_name`, `phone`, `email`, `is_child`, `notes`, `status`)

5. In `src/lib/repository.ts`, uncomment the Supabase query lines inside each function (e.g. `supabase.from('services').select('*')` and `supabase.from('bookings').insert(...)`).

6. Protect the `/admin` portal with Supabase Auth & Row Level Security (RLS) instead of the temporary preview passcode (`utopia2026`).

---

## 4. Key Pages & Features

- **Home (`/`)**: 12 complete sections including 3D Pearl Crown, 10-service horizontal showcase, 5-step visit journey, 3D Smile Journey, doctors monogram directory, before/after slider, Google review highlights, pediatric spotlight, and booking CTA.
- **Services (`/services`, `/services/:slug`)**: All 10 specialized clinical services with complete educational overviews, steps, and FAQs.
- **Doctors (`/doctors`, `/doctors/:slug`)**: Clinical profiles with monogram initials and related services.
- **Gallery (`/gallery`)**: Category-filtered before/after transformation slider with sample data flags.
- **Reviews (`/reviews`)**: Dokki patient themes, 4.9 rating summary, and link to Google Maps.
- **Blog (`/blog`, `/blog/:slug`)**: 4 educational oral health guides.
- **Book (`/book`)**: Multi-step booking request with Egyptian phone validation, `.ics` calendar export, and WhatsApp prefill.
- **Admin (`/admin`)**: Passcode-gated bookings dashboard (`utopia2026`) for managing request statuses.
- **Contact (`/contact`)**: Dokki clinic details, working hours, and embedded Google Map.
- **Terms & Privacy (`/terms`, `/privacy`)**: Clinical disclaimers and patient confidentiality notices.
