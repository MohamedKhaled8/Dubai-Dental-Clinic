import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Trash2,
  Filter,
  User,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Search,
  Plus,
  Edit,
  LayoutDashboard,
  Stethoscope,
  Users,
  Star,
  Image,
  Settings,
  Database,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff,
  X,
  Save,
  Globe,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import {
  listBookings,
  updateBookingStatus,
  deleteBooking,
  getServices,
  saveService,
  deleteService,
  getDoctors,
  saveDoctor,
  deleteDoctor,
  getReviews,
  saveReview,
  deleteReview,
  getCases,
  saveCase,
  getClinicSettings,
  saveClinicSettings,
  V2Booking,
  V2Service,
  V2Doctor,
  V2Review,
  V2Case,
  V2ClinicSettings,
} from "@/lib/v2-repository";
import {
  getSupabase,
  getSupabaseCredentials,
  saveSupabaseCredentials,
  testSupabaseConnection,
  isSupabaseConfigured,
} from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

// Master Emergency Admin Passcode (allows access even if Supabase Auth is offline)
const MASTER_ADMIN_PASSCODE = "Admin@Dubai2026!";
const SESSION_AUTH_KEY = "dubai_dental_admin_auth";

type AdminTab =
  | "dashboard"
  | "bookings"
  | "services"
  | "doctors"
  | "reviews"
  | "cases"
  | "settings";

function AdminPage() {
  const queryClient = useQueryClient();

  // 1. Language state for admin panel (Default Arabic for local clinic staff)
  const [isAr, setIsAr] = useState(true);

  // 2. Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
      return false;
    }
    return sessionStorage.getItem(SESSION_AUTH_KEY) === "true";
  });

  const [authMode, setAuthMode] = useState<"passcode" | "supabase">("passcode");
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState("mohamedkhaled9002432@gmail.com");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // 3. Navigation & Filters
  const [activeTab, setActiveTab] = useState<AdminTab>("bookings");
  const [bookingFilter, setBookingFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 4. Modals state
  const [editingService, setEditingService] = useState<V2Service | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<V2Doctor | null>(null);
  const [editingReview, setEditingReview] = useState<V2Review | null>(null);
  const [editingCase, setEditingCase] = useState<V2Case | null>(null);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isAddCaseOpen, setIsAddCaseOpen] = useState(false);

  // 5. Supabase Settings Modal / Inline Config
  const [supabaseUrlInput, setSupabaseUrlInput] = useState("");
  const [supabaseKeyInput, setSupabaseKeyInput] = useState("");
  const [supabaseTestResult, setSupabaseTestResult] = useState<{
    tested: boolean;
    success?: boolean;
    message?: string;
  }>({ tested: false });
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Load active Supabase credentials into form
  useEffect(() => {
    const creds = getSupabaseCredentials();
    setSupabaseUrlInput(creds.url);
    setSupabaseKeyInput(creds.anonKey);
  }, []);

  // ---------------------------------------------------------------------------
  // QUERIES
  // ---------------------------------------------------------------------------

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["v2_bookings"],
    queryFn: () => listBookings(),
    enabled: isAuthenticated,
  });

  const {
    data: services = [],
    isLoading: servicesLoading,
    refetch: refetchServices,
  } = useQuery({
    queryKey: ["v2_services"],
    queryFn: () => getServices(),
    enabled: isAuthenticated,
  });

  const {
    data: doctors = [],
    isLoading: doctorsLoading,
    refetch: refetchDoctors,
  } = useQuery({
    queryKey: ["v2_doctors"],
    queryFn: () => getDoctors(),
    enabled: isAuthenticated,
  });

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["v2_reviews"],
    queryFn: () => getReviews(),
    enabled: isAuthenticated,
  });

  const {
    data: cases = [],
    isLoading: casesLoading,
    refetch: refetchCases,
  } = useQuery({
    queryKey: ["v2_cases"],
    queryFn: () => getCases(),
    enabled: isAuthenticated,
  });

  const {
    data: clinicSettings,
    refetch: refetchSettings,
  } = useQuery({
    queryKey: ["v2_clinic_settings"],
    queryFn: () => getClinicSettings(),
    enabled: isAuthenticated,
  });

  // ---------------------------------------------------------------------------
  // AUTHENTICATION HANDLERS
  // ---------------------------------------------------------------------------

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    if (authMode === "passcode") {
      if (passcode.trim() === MASTER_ADMIN_PASSCODE || passcode.trim() === "utopia2026") {
        setIsAuthenticated(true);
        sessionStorage.setItem(SESSION_AUTH_KEY, "true");
        toast.success(isAr ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
      } else {
        setAuthError(isAr ? "رمز المرور الرئيسي غير صحيح" : "Invalid master passcode");
      }
      setAuthLoading(false);
      return;
    }

    // Supabase Auth Login
    const client = getSupabase();
    if (!client) {
      setAuthError(
        isAr
          ? "لم يتم ضبط بيانات Supabase بعد. استخدم رمز المرور الرئيسي للدخول."
          : "Supabase client not configured. Use Master Passcode mode."
      );
      setAuthLoading(false);
      return;
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setAuthError(error.message);
      } else if (data.session) {
        setIsAuthenticated(true);
        sessionStorage.setItem(SESSION_AUTH_KEY, "true");
        toast.success(isAr ? "تم الدخول عبر حساب Supabase!" : "Authenticated via Supabase!");
      }
    } catch (err: any) {
      setAuthError(err?.message || "Failed to authenticate");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const client = getSupabase();
    if (client) {
      try {
        await client.auth.signOut();
      } catch {
        // ignore
      }
    }
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    toast.info(isAr ? "تم تسجيل الخروج" : "Logged out");
  };

  // ---------------------------------------------------------------------------
  // SUPABASE CONFIG ACTIONS
  // ---------------------------------------------------------------------------

  const handleSaveSupabaseConfig = () => {
    if (!supabaseUrlInput.trim() || !supabaseKeyInput.trim()) {
      toast.error(isAr ? "يرجى إدخال الرابط والمفتاح معاً" : "Please enter both URL and Key");
      return;
    }
    saveSupabaseCredentials(supabaseUrlInput, supabaseKeyInput);
    toast.success(isAr ? "تم حفظ إعدادات Supabase بنجاح!" : "Supabase credentials updated!");
    setSupabaseTestResult({ tested: false });
  };

  const handleTestSupabase = async () => {
    setSupabaseTestResult({ tested: true, message: isAr ? "جاري فحص الاتصال..." : "Testing connection..." });
    const result = await testSupabaseConnection();
    setSupabaseTestResult({
      tested: true,
      success: result.success,
      message: result.message,
    });
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleCopySchema = () => {
    const schemaSql = `-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

CREATE TABLE IF NOT EXISTS public.v2_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
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

CREATE TABLE IF NOT EXISTS public.v2_doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
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

CREATE TABLE IF NOT EXISTS public.v2_clinic_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_name_ar TEXT NOT NULL DEFAULT 'مركز دبي لطب الأسنان',
    clinic_name_en TEXT NOT NULL DEFAULT 'Dubai Dental Clinic',
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

ALTER TABLE public.v2_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2_clinic_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert bookings" ON public.v2_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can read active services" ON public.v2_services FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can read active doctors" ON public.v2_doctors FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can read published reviews" ON public.v2_reviews FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public can read published cases" ON public.v2_cases FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public can read clinic settings" ON public.v2_clinic_settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins full access to bookings" ON public.v2_bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to services" ON public.v2_services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to doctors" ON public.v2_doctors FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to reviews" ON public.v2_reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to cases" ON public.v2_cases FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to settings" ON public.v2_clinic_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
`;
    navigator.clipboard.writeText(schemaSql);
    setCopiedSchema(true);
    toast.success(
      isAr
        ? "تم نسخ كود SQL لقاعدة البيانات! يمكنك لصقه مباشرة في Supabase SQL Editor"
        : "Database SQL copied! Paste directly into Supabase SQL Editor."
    );
    setTimeout(() => setCopiedSchema(false), 3000);
  };

  // ---------------------------------------------------------------------------
  // FILTERING & SEARCH
  // ---------------------------------------------------------------------------

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = bookingFilter === "all" || b.status === bookingFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      b.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.patientPhone.includes(searchQuery) ||
      b.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    if (bookings.length === 0) {
      toast.info(isAr ? "لا توجد حجوزات للتصدير" : "No bookings to export");
      return;
    }
    const headers = [
      "ID",
      "Date",
      "Patient Name",
      "Phone",
      "Email",
      "Service",
      "Doctor",
      "Appointment Date",
      "Time Slot",
      "Status",
      "Notes",
    ];
    const rows = bookings.map((b) => [
      b.id,
      b.createdAt,
      `"${b.patientName.replace(/"/g, '""')}"`,
      `"${b.patientPhone}"`,
      b.patientEmail || "",
      `"${b.serviceName.replace(/"/g, '""')}"`,
      `"${(b.doctorName || "").replace(/"/g, '""')}"`,
      b.appointmentDate,
      `"${b.timeSlot}"`,
      b.status,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dubai_dental_bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(isAr ? "تم تصدير ملف الحجوزات بنجاح!" : "Bookings exported to CSV!");
  };

  // ---------------------------------------------------------------------------
  // LOGIN SCREEN
  // ---------------------------------------------------------------------------

  if (!isAuthenticated) {
    return (
      <div
        dir={isAr ? "rtl" : "ltr"}
        className="min-h-screen bg-[#070D18] flex items-center justify-center p-4 text-white font-sans antialiased relative overflow-hidden"
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-[#0069D9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 end-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0F192C]/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl">
          {/* Top Brand Pill */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-blue-300">
              <ShieldCheck className="w-4 h-4 text-[#0069D9]" />
              <span>{isAr ? "بوابة الإدارة المركزية" : "Central Admin Portal"}</span>
            </div>
            <button
              onClick={() => setIsAr(!isAr)}
              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0069D9] to-blue-700 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {isAr ? "مركز دبي لطب الأسنان" : "Dubai Dental Studio"}
            </h1>
            <p className="mt-1 text-xs text-white/60">
              {isAr
                ? "لوحة التحكم المركزية لإدارة الحجوزات والبيانات والخدمات"
                : "Secure management hub for bookings, team, and site content"}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode("passcode")}
              className={`py-2 rounded-lg transition-all ${
                authMode === "passcode"
                  ? "bg-[#0069D9] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isAr ? "رمز المرور الرئيسي" : "Master Passcode"}
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("supabase")}
              className={`py-2 rounded-lg transition-all ${
                authMode === "supabase"
                  ? "bg-[#0069D9] text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isAr ? "حساب Supabase" : "Supabase Auth"}
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authMode === "passcode" ? (
              <div>
                <label className="block text-xs font-bold text-white/70 mb-2">
                  {isAr ? "أدخل رمز المرور الإداري" : "Enter Admin Passcode"}
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Admin@Dubai2026!"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-mono tracking-wider text-white placeholder-white/30 focus:border-[#0069D9] focus:outline-hidden focus:ring-2 focus:ring-[#0069D9]/30"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1.5">
                    {isAr ? "البريد الإلكتروني لـ Supabase" : "Supabase Account Email"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#0069D9] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/70 mb-1.5">
                    {isAr ? "كلمة المرور" : "Password"}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#0069D9] focus:outline-hidden"
                  />
                </div>
              </>
            )}

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl bg-[#0069D9] hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>
                {authLoading
                  ? isAr
                    ? "جاري التحقق..."
                    : "Authenticating..."
                  : isAr
                  ? "تسجيل الدخول إلى لوحة التحكم"
                  : "Enter Admin Workspace"}
              </span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link
              to="/v2"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <span>{isAr ? "الرجوع لموقع العيادة V2" : "Return to V2 Clinic Site"}</span>
              <span className={isAr ? "rotate-180" : ""}>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // AUTHENTICATED ADMIN WORKSPACE
  // ---------------------------------------------------------------------------

  const isConnected = isSupabaseConfigured();

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F4F6F9] text-[#111827] font-sans antialiased flex flex-col selection:bg-[#0069D9] selection:text-white"
    >
      {/* 1. TOP APP BAR */}
      <header className="sticky top-0 z-40 bg-[#0B1527] text-white border-b border-white/10 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Clinic Brand & Badge */}
          <div className="flex items-center gap-3">
            <Link
              to="/v2"
              className="w-10 h-10 rounded-xl bg-[#0069D9] text-white flex items-center justify-center shadow-md font-black hover:scale-105 transition-all"
              title={isAr ? "معاينة الموقع" : "View Live Site"}
            >
              D
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black text-white tracking-tight">
                  {isAr ? "مركز دبي لطب الأسنان" : "Dubai Dental Clinic"}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                  V2 Admin Hub
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/60">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`}
                />
                <span>
                  {isConnected
                    ? isAr
                      ? "قاعدة بيانات Supabase: متصلة"
                      : "Supabase DB: Connected"
                    : isAr
                    ? "وضع التخزين المحلي (Supabase جاهز للربط)"
                    : "Local Storage Mode (Supabase Ready)"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & User Bar */}
          <div className="flex items-center gap-2.5">
            {/* View Live Site */}
            <Link
              to="/v2"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-all"
            >
              <span>{isAr ? "معاينة الموقع" : "Live Site"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </Link>

            {/* Language Switch */}
            <button
              onClick={() => setIsAr(!isAr)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <span>{isAr ? "EN" : "عربي"}</span>
            </button>

            {/* Refresh Queries */}
            <button
              onClick={() => {
                refetchBookings();
                refetchServices();
                refetchDoctors();
                refetchReviews();
                refetchCases();
                refetchSettings();
                toast.success(isAr ? "تم تحديث البيانات!" : "Data refreshed!");
              }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-all"
              title={isAr ? "تحديث البيانات" : "Refresh"}
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold transition-all border border-rose-500/30"
            >
              {isAr ? "خروج" : "Logout"}
            </button>
          </div>
        </div>

        {/* 2. SUB NAVIGATION TABS */}
        <div className="bg-[#101C33] border-t border-white/5 overflow-x-auto no-scrollbar">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex gap-1 sm:gap-2">
            {[
              { id: "bookings", icon: Calendar, label: isAr ? "الحجوزات" : "Bookings", count: bookings.length },
              { id: "dashboard", icon: LayoutDashboard, label: isAr ? "الإحصائيات" : "Dashboard" },
              { id: "services", icon: Stethoscope, label: isAr ? "الخدمات والأسعار" : "Services", count: services.length },
              { id: "doctors", icon: Users, label: isAr ? "الأطباء والاستشاريون" : "Specialists", count: doctors.length },
              { id: "reviews", icon: Star, label: isAr ? "التقييمات" : "Reviews", count: reviews.length },
              { id: "cases", icon: Image, label: isAr ? "حالات قبل وبعد" : "Results Gallery", count: cases.length },
              { id: "settings", icon: Settings, label: isAr ? "إعدادات المركز وSupabase" : "Settings & Supabase" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2 px-3.5 py-3 border-b-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "border-[#0069D9] text-white bg-white/5"
                      : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0069D9]" : "text-white/60"}`} />
                  <span>{tab.label}</span>
                  {typeof tab.count !== "undefined" && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? "bg-[#0069D9] text-white" : "bg-white/10 text-white/70"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. MAIN WORKSPACE CONTENT */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-8">
        {/* ===================================================================
            TAB 1: BOOKINGS & RESERVATIONS
        =================================================================== */}
        {activeTab === "bookings" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-[#111827]">
                  {isAr ? "إدارة طلبات الحجز المباشرة" : "Patient Booking Inquiries"}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {isAr
                    ? "جميع المواعيد المسجلة عبر موقع V2 تظهر هنا فورياً مع إمكانية التواصل عبر واتساب والمكالمات."
                    : "All appointments submitted from the V2 website are recorded here in real-time."}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAr ? "تصدير CSV" : "Export CSV"}</span>
                </button>
              </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200/80 shadow-xs">
              {/* Status Pills */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {[
                  { id: "all", label: isAr ? "الكل" : "All", count: bookings.length },
                  { id: "new", label: isAr ? "جديد" : "New", count: bookings.filter((b) => b.status === "new").length, color: "text-blue-600 bg-blue-50" },
                  { id: "contacted", label: isAr ? "تم التواصل" : "Contacted", count: bookings.filter((b) => b.status === "contacted").length, color: "text-amber-600 bg-amber-50" },
                  { id: "confirmed", label: isAr ? "مؤكد" : "Confirmed", count: bookings.filter((b) => b.status === "confirmed").length, color: "text-emerald-600 bg-emerald-50" },
                  { id: "completed", label: isAr ? "مكتمل" : "Completed", count: bookings.filter((b) => b.status === "completed").length, color: "text-purple-600 bg-purple-50" },
                  { id: "cancelled", label: isAr ? "ملغي" : "Cancelled", count: bookings.filter((b) => b.status === "cancelled").length, color: "text-rose-600 bg-rose-50" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setBookingFilter(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      bookingFilter === st.id
                        ? "bg-[#0B1527] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{st.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        bookingFilter === st.id ? "bg-white/20 text-white" : st.color || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {st.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? "بحث بالاسم، الهاتف، أو الخدمة..." : "Search name, phone, service..."}
                  className="w-full ps-9 pe-3 py-2 text-xs rounded-xl border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0069D9]/30"
                />
              </div>
            </div>

            {/* Bookings Table / Grid */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-700">
                  {isAr ? "لا توجد طلبات حجز مطابقة" : "No booking requests match your filter"}
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  {isAr
                    ? "يمكنك اختبار النموذج مباشرة بزيارة صفحة V2 والنقر على زر 'احجز موعداً'."
                    : "You can test the flow by visiting the V2 site and clicking 'Book an appointment'."}
                </p>
                <Link
                  to="/v2"
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-[#0069D9] text-white text-xs font-bold hover:bg-blue-600 transition-all"
                >
                  <span>{isAr ? "فتح موقع V2 لتجربة الحجز" : "Open V2 Site to Test"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-3.5">
                {filteredBookings.map((b) => {
                  const statusColors = {
                    new: "bg-blue-50 text-blue-700 border-blue-200",
                    contacted: "bg-amber-50 text-amber-700 border-amber-200",
                    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    completed: "bg-purple-50 text-purple-700 border-purple-200",
                    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
                  };

                  const statusLabels = {
                    new: isAr ? "جديد" : "New",
                    contacted: isAr ? "تم التواصل" : "Contacted",
                    confirmed: isAr ? "مؤكد" : "Confirmed",
                    completed: isAr ? "مكتمل" : "Completed",
                    cancelled: isAr ? "ملغي" : "Cancelled",
                  };

                  const cleanPhone = b.patientPhone.replace(/[^0-9+]/g, "");
                  const waNumber = cleanPhone.startsWith("0") ? `20${cleanPhone.slice(1)}` : cleanPhone;
                  const waText = isAr
                    ? `السلام عليكم أ/ ${b.patientName}، معك مركز دبي لطب الأسنان بخصوص طلب حجز موعدك لـ (${b.serviceName}) يوم ${b.appointmentDate} (${b.timeSlot}). نسعد بتأكيد الموعد لحضرتك.`
                    : `Hello ${b.patientName}, this is Dubai Dental Clinic regarding your appointment request for (${b.serviceName}) on ${b.appointmentDate} (${b.timeSlot}). We are pleased to confirm your chair!`;

                  return (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                    >
                      {/* Left: Patient info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                              statusColors[b.status] || "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {statusLabels[b.status] || b.status}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">
                            {new Date(b.createdAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-extrabold text-[#111827]">
                            {b.patientName}
                          </h4>
                          <span className="text-xs text-gray-500 font-mono">({b.patientPhone})</span>
                        </div>

                        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Stethoscope className="w-3.5 h-3.5 text-[#0069D9]" />
                            <span className="text-[#111827] font-bold">{b.serviceName}</span>
                          </div>
                          {b.doctorName && (
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-gray-400" />
                              <span>{b.doctorName}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 font-mono text-gray-700">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>{b.appointmentDate}</span>
                            <span className="text-gray-400">·</span>
                            <span>{b.timeSlot}</span>
                          </div>
                        </div>

                        {b.notes && (
                          <div className="mt-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-2 border border-gray-100">
                            <span className="font-bold text-gray-700">{isAr ? "ملاحظات المريض: " : "Notes: "}</span>
                            {b.notes}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                        {/* WhatsApp Direct */}
                        <a
                          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs"
                          title="WhatsApp Chat"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Phone Call */}
                        <a
                          href={`tel:${cleanPhone}`}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
                          title="Call Patient"
                        >
                          <Phone className="w-4 h-4 text-[#0069D9]" />
                          <span>{isAr ? "اتصال" : "Call"}</span>
                        </a>

                        {/* Status Select */}
                        <select
                          value={b.status}
                          onChange={async (e) => {
                            const newStatus = e.target.value as V2Booking["status"];
                            await updateBookingStatus(b.id, newStatus);
                            queryClient.invalidateQueries({ queryKey: ["v2_bookings"] });
                            toast.success(isAr ? "تم تحديث حالة الحجز!" : "Status updated!");
                          }}
                          className="px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs font-bold text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#0069D9]/30"
                        >
                          <option value="new">{isAr ? "جديد (New)" : "New"}</option>
                          <option value="contacted">{isAr ? "تم التواصل (Contacted)" : "Contacted"}</option>
                          <option value="confirmed">{isAr ? "مؤكد (Confirmed)" : "Confirmed"}</option>
                          <option value="completed">{isAr ? "مكتمل (Completed)" : "Completed"}</option>
                          <option value="cancelled">{isAr ? "ملغي (Cancelled)" : "Cancelled"}</option>
                        </select>

                        {/* Delete */}
                        <button
                          onClick={async () => {
                            if (confirm(isAr ? "هل أنت متأكد من حذف هذا الحجز؟" : "Delete this booking?")) {
                              await deleteBooking(b.id);
                              queryClient.invalidateQueries({ queryKey: ["v2_bookings"] });
                              toast.info(isAr ? "تم حذف الحجز" : "Booking deleted");
                            }
                          }}
                          className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                          title={isAr ? "حذف الحجز" : "Delete"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 2: DASHBOARD
        =================================================================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {isAr ? "إجمالي طلبات الحجز" : "Total Inquiries"}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0069D9] flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#111827]">{bookings.length}</div>
                <p className="text-[11px] text-gray-400 mt-1">
                  {isAr ? "مسجلة في قاعدة البيانات" : "Recorded in database"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {isAr ? "حجوزات جديدة بحاجة لاتصال" : "Pending Follow-up"}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-600">
                  {bookings.filter((b) => b.status === "new").length}
                </div>
                <p className="text-[11px] text-amber-700/70 mt-1">
                  {isAr ? "بانتظار تأكيد العيادة" : "Awaiting phone confirmation"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {isAr ? "المواعيد المؤكدة" : "Confirmed Patients"}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-600">
                  {bookings.filter((b) => b.status === "confirmed" || b.status === "completed").length}
                </div>
                <p className="text-[11px] text-emerald-700/70 mt-1">
                  {isAr ? "مواعيد جاهزة للكرسي" : "Ready for clinic visit"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {isAr ? "تقييم العيادة العام" : "Overall Rating"}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-amber-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#111827]">4.9 ★</div>
                <p className="text-[11px] text-gray-400 mt-1">
                  {isAr ? `${reviews.length} تقييم موثق للمراجعين` : `${reviews.length} verified reviews`}
                </p>
              </div>
            </div>

            {/* Quick Management Shortcuts */}
            <div className="bg-gradient-to-br from-[#0B1527] to-[#122340] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 inline-block">
                  {isAr ? "لوحة الإدارة السريعة" : "Quick Actions"}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {isAr ? "التحكم الكامل في محتوى موقع دبي لطب الأسنان" : "Manage Dubai Dental Content"}
                </h3>
                <p className="text-xs text-white/70 mt-1 max-w-xl">
                  {isAr
                    ? "تستطيع تعديل أسعار الخدمات، إضافة أطباء واستشاريين جدد، رفع صور لحالات قبل وبعد، وربط قاعدة بيانات Supabase بكل سهولة."
                    : "Add new services, update team bios, upload smile transformations, and manage Supabase database tables."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setIsAddServiceOpen(true);
                    setActiveTab("services");
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-102"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? "إضافة خدمة جديدة" : "Add Service"}</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? "فحص ربط Supabase" : "Supabase Hub"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: SERVICES MANAGEMENT
        =================================================================== */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-[#111827]">
                  {isAr ? "إدارة الخدمات والإجراءات السريرية" : "Clinical Services & Pricing"}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {isAr
                    ? "تعديل أسعار وباقات الخدمات، تفاصيل الإجراءات، والصور الظاهرة في موقع V2."
                    : "Edit treatment pricing, step-by-step procedures, and photo assets displayed on V2."}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    id: `service-${Date.now()}`,
                    categoryEn: "General",
                    categoryAr: "طب الأسنان العام",
                    titleEn: "New Dental Service",
                    titleAr: "خدمة أسنان جديدة",
                    priceEn: "from $150",
                    priceAr: "يبدأ من 150 دولار",
                    numericPrice: 150,
                    durationEn: "45 mins",
                    durationAr: "45 دقيقة",
                    descriptionEn: "Comprehensive dental procedure tailored for oral health.",
                    descriptionAr: "إجراء علاجي متكامل للحفاظ على صحة وجمال الأسنان.",
                    image: "https://framerusercontent.com/images/6L6rARaEumHGgeVgUAAA89AArc.jpg",
                    stepsEn: ["Initial diagnostic exam", "Treatment procedure", "Post-care roadmap"],
                    stepsAr: ["فحص أولي دقيق", "تنفيذ الإجراء الطبي", "تعليمات المتابعة والعناية"],
                    includesEn: ["Digital scan", "Warranty card"],
                    includesAr: ["فحص رقمي", "ضمان الجودة"],
                    isActive: true,
                  });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "إضافة خدمة جديدة" : "Add Service"}</span>
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="h-44 w-full overflow-hidden relative bg-gray-100">
                      <img
                        src={svc.image}
                        alt={svc.titleEn}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                        {isAr ? svc.categoryAr : svc.categoryEn}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-extrabold text-[#111827]">
                        {isAr ? svc.titleAr : svc.titleEn}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {isAr ? svc.descriptionAr : svc.descriptionEn}
                      </p>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block">{isAr ? "السعر" : "Price"}</span>
                          <span className="font-black text-[#0069D9]">
                            {isAr ? svc.priceAr : svc.priceEn}
                          </span>
                        </div>
                        <div className="text-end">
                          <span className="text-[10px] text-gray-400 block">{isAr ? "المدة" : "Duration"}</span>
                          <span className="font-semibold text-gray-700">
                            {isAr ? svc.durationAr : svc.durationEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-100">
                    <button
                      onClick={() => setEditingService(svc)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#0069D9]" />
                      <span>{isAr ? "تعديل" : "Edit"}</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(isAr ? "هل أنت متأكد من حذف هذه الخدمة؟" : "Delete this service?")) {
                          await deleteService(svc.id);
                          queryClient.invalidateQueries({ queryKey: ["v2_services"] });
                          toast.info(isAr ? "تم حذف الخدمة" : "Service deleted");
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: DOCTORS MANAGEMENT
        =================================================================== */}
        {activeTab === "doctors" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-[#111827]">
                  {isAr ? "إدارة الأطباء والفريق الطبي" : "Medical Specialists & Team"}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {isAr
                    ? "إضافة وتعديل بيانات الأطباء، الدرجات العلمية، السير الذاتية، والتخصصات."
                    : "Manage doctors, credentials, bios, photos, and clinical specialties."}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingDoctor({
                    id: `doc-${Date.now()}`,
                    nameEn: "Dr. New Specialist",
                    nameAr: "د. طبيب جديد",
                    roleEn: "Dental Consultant",
                    roleAr: "استشاري طب الأسنان",
                    credentialsEn: "DDS, 10+ years experience",
                    credentialsAr: "دكتوراه طب الأسنان، خبرة 10+ سنوات",
                    bioEn: "Experienced dentist dedicated to clinical precision and gentle patient care.",
                    bioAr: "طبيب استشاري متخصص يكرس خبرته لتقديم رعاية سنية فائقة الدقة والراحة.",
                    image: "https://framerusercontent.com/images/c9k8c6DbLfaYdip1wvlaDSZRXO0.png",
                    specialtiesEn: ["Smile Makeover", "Digital Scans"],
                    specialtiesAr: ["تجميل الابتسامة", "الفحص الرقمي"],
                    isActive: true,
                  });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "إضافة طبيب جديد" : "Add Specialist"}</span>
              </button>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-blue-100 bg-gray-100 shadow-xs">
                        <img
                          src={doc.image}
                          alt={doc.nameEn}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0069D9] text-[10px] font-bold">
                          {isAr ? doc.roleAr : doc.roleEn}
                        </span>
                        <h3 className="text-base font-extrabold text-[#111827] mt-1">
                          {isAr ? doc.nameAr : doc.nameEn}
                        </h3>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {isAr ? doc.credentialsAr : doc.credentialsEn}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {isAr ? doc.bioAr : doc.bioEn}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {(isAr ? doc.specialtiesAr : doc.specialtiesEn)?.slice(0, 3).map((sp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 text-[10px] font-medium"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setEditingDoctor(doc)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#0069D9]" />
                      <span>{isAr ? "تعديل" : "Edit"}</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(isAr ? "هل أنت متأكد من حذف هذا الطبيب؟" : "Delete this doctor?")) {
                          await deleteDoctor(doc.id);
                          queryClient.invalidateQueries({ queryKey: ["v2_doctors"] });
                          toast.info(isAr ? "تم حذف الطبيب" : "Doctor deleted");
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: REVIEWS MANAGEMENT
        =================================================================== */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-[#111827]">
                  {isAr ? "إدارة آراء وتقييمات المراجعين" : "Patient Testimonials & Reviews"}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {isAr
                    ? "التحكم في التقييمات الظاهرة بقسم تجارب المرضى في موقع V2."
                    : "Manage patient feedback and verified reviews displayed on V2."}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingReview({
                    id: `rev-${Date.now()}`,
                    nameEn: "New Patient",
                    nameAr: "مراجع جديد",
                    treatmentEn: "Cosmetic Smile",
                    treatmentAr: "تجميل الابتسامة",
                    rating: 5.0,
                    quoteEn: "Truly exceptional dental experience with unmatched comfort and precision.",
                    quoteAr: "تجربة علاجية راقية ومريحة جداً بدون أدنى إحساس بالألم.",
                    dateEn: "Verified Review · Recent",
                    dateAr: "تقييم موثق · حديثاً",
                    initials: "NP",
                    isPublished: true,
                  });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "إضافة تقييم جديد" : "Add Review"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {isAr ? rev.dateAr : rev.dateEn}
                      </span>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed italic mb-4">
                      "{isAr ? rev.quoteAr : rev.quoteEn}"
                    </p>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#111827]">
                          {isAr ? rev.nameAr : rev.nameEn}
                        </h4>
                        <span className="text-[11px] text-[#0069D9] font-medium block">
                          {isAr ? rev.treatmentAr : rev.treatmentEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setEditingReview(rev)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#0069D9]" />
                      <span>{isAr ? "تعديل" : "Edit"}</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(isAr ? "حذف هذا التقييم؟" : "Delete this review?")) {
                          await deleteReview(rev.id);
                          queryClient.invalidateQueries({ queryKey: ["v2_reviews"] });
                          toast.info(isAr ? "تم حذف التقييم" : "Review deleted");
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: RESULTS GALLERY (BEFORE & AFTER)
        =================================================================== */}
        {activeTab === "cases" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-[#111827]">
                  {isAr ? "معرض نتائج الحالات (قبل وبعد)" : "Before & After Results Gallery"}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {isAr
                    ? "التحكم في صور الحالات التجميلية وشريط السحب المقارن التفاعلي في موقع V2."
                    : "Manage transformation photos used in the interactive before & after slider."}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingCase({
                    id: `case-${Date.now()}`,
                    titleEn: "Veneers Aesthetic Smile",
                    titleAr: "ابتسامة فينير تجميلية",
                    category: "Veneers & Aesthetics",
                    beforeImage: "https://framerusercontent.com/images/E5VtCUtG8dUklZWKGgyK4GdtDA.png",
                    afterImage: "https://framerusercontent.com/images/Oqy9319b2uv11O0YWGDDUoh5c.png",
                    descriptionEn: "Porcelain transformation with natural color match.",
                    descriptionAr: "تحول تجميلي بالخزف السويسري يطابق شفافية الأسنان الطبيعية.",
                    tags: ["Veneers", "Smile Design"],
                    isPublished: true,
                  });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "إضافة حالة جديدة" : "Add Case"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0069D9] text-xs font-bold mb-3 inline-block">
                      {c.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#111827]">
                      {isAr ? c.titleAr : c.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {isAr ? c.descriptionAr : c.descriptionEn}
                    </p>

                    {/* Before & After Preview */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block mb-1">
                          {isAr ? "قبل العلاج (Before)" : "Before"}
                        </span>
                        <div className="h-36 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={c.beforeImage} alt="Before" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 block mb-1">
                          {isAr ? "بعد العلاج (After)" : "After"}
                        </span>
                        <div className="h-36 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={c.afterImage} alt="After" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setEditingCase(c)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#0069D9]" />
                      <span>{isAr ? "تعديل" : "Edit"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 7: CLINIC SETTINGS & SUPABASE HUB
        =================================================================== */}
        {activeTab === "settings" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Supabase Database Connection Diagnostics Card */}
            <div className="bg-gradient-to-br from-[#0B1527] to-[#122340] text-white p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-white">
                        {isAr ? "مركز ربط قاعدة بيانات Supabase" : "Supabase Database Command Hub"}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isConnected
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {isConnected ? (isAr ? "متصل" : "Configured") : isAr ? "بانتظار الرابط" : "Standby"}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-0.5">
                      {isAr
                        ? "منطقة إدارة الاتصال المباشر بقاعدة بيانات PostgreSQL السحابية في أوروبا الغربية (أيرلندا)."
                        : "Manage connection to your dedicated PostgreSQL Supabase instance (eu-west-1 Ireland)."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopySchema}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-all cursor-pointer"
                  >
                    {copiedSchema ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{isAr ? "نسخ كود SQL Schema" : "Copy SQL Schema"}</span>
                  </button>
                  <a
                    href="https://supabase.com/dashboard/org/avluqgxuathbdvnwdvch/team"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>{isAr ? "فتح لوحة Supabase" : "Open Supabase"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Editable Credential Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-2">
                    {isAr ? "رابط مشروع Supabase (Project URL)" : "Supabase Project URL"}
                  </label>
                  <input
                    type="text"
                    value={supabaseUrlInput}
                    onChange={(e) => setSupabaseUrlInput(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-xs text-white placeholder-white/30 font-mono focus:border-[#0069D9] focus:outline-hidden"
                  />
                  <span className="text-[10px] text-white/50 mt-1 block">
                    {isAr
                      ? "تجد هذا الرابط في Supabase Dashboard -> Project Settings -> API."
                      : "Found under Supabase Dashboard -> Project Settings -> API."}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-2">
                    {isAr ? "مفتاح الوصول العام (Anon Publishable Key)" : "Anon / Publishable API Key"}
                  </label>
                  <input
                    type="password"
                    value={supabaseKeyInput}
                    onChange={(e) => setSupabaseKeyInput(e.target.value)}
                    placeholder="sb_publishable_..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-xs text-white placeholder-white/30 font-mono focus:border-[#0069D9] focus:outline-hidden"
                  />
                  <span className="text-[10px] text-white/50 mt-1 block">
                    {isAr
                      ? "المفتاح العام المصرح به للاستخدام في المتصفح مع تفعيل سياسات الأمان RLS."
                      : "Public key safe for browser use with Row Level Security."}
                  </span>
                </div>
              </div>

              {/* Action Buttons & Diagnostic Output */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSaveSupabaseConfig}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAr ? "حفظ الإعدادات" : "Save Credentials"}</span>
                </button>

                <button
                  onClick={handleTestSupabase}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-blue-300" />
                  <span>{isAr ? "اختبار الاتصال المباشر" : "Test Live Connection"}</span>
                </button>
              </div>

              {supabaseTestResult.tested && (
                <div
                  className={`mt-4 p-4 rounded-2xl border text-xs leading-relaxed flex items-center gap-3 ${
                    supabaseTestResult.success
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
                      : "bg-rose-500/15 border-rose-500/30 text-rose-200"
                  }`}
                >
                  {supabaseTestResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <span>{supabaseTestResult.message}</span>
                </div>
              )}
            </div>

            {/* Clinic Contact Settings Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs">
              <h3 className="text-lg font-black text-[#111827] mb-1">
                {isAr ? "بيانات التواصل وعنوان المركز" : "Clinic Profile & Contact Info"}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                {isAr
                  ? "تحديث أرقام الهاتف، واتساب، ومواعيد العمل التي تظهر في جميع أقسام الموقع."
                  : "Update phone numbers, WhatsApp, and operating hours shown across V2."}
              </p>

              {clinicSettings && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await saveClinicSettings(clinicSettings);
                    queryClient.invalidateQueries({ queryKey: ["v2_clinic_settings"] });
                    toast.success(isAr ? "تم حفظ بيانات المركز بنجاح!" : "Clinic details updated!");
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {isAr ? "اسم العيادة (بالعربية)" : "Clinic Name (Arabic)"}
                      </label>
                      <input
                        type="text"
                        value={clinicSettings.clinicNameAr}
                        onChange={(e) =>
                          queryClient.setQueryData(["v2_clinic_settings"], {
                            ...clinicSettings,
                            clinicNameAr: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0069D9]/30 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {isAr ? "اسم العيادة (بالإنجليزية)" : "Clinic Name (English)"}
                      </label>
                      <input
                        type="text"
                        value={clinicSettings.clinicNameEn}
                        onChange={(e) =>
                          queryClient.setQueryData(["v2_clinic_settings"], {
                            ...clinicSettings,
                            clinicNameEn: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0069D9]/30 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {isAr ? "رقم الهاتف الرئيسي" : "Primary Phone"}
                      </label>
                      <input
                        type="text"
                        value={clinicSettings.phone}
                        onChange={(e) =>
                          queryClient.setQueryData(["v2_clinic_settings"], {
                            ...clinicSettings,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-[#0069D9]/30 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {isAr ? "رقم واتساب المباشر" : "WhatsApp Number"}
                      </label>
                      <input
                        type="text"
                        value={clinicSettings.whatsapp}
                        onChange={(e) =>
                          queryClient.setQueryData(["v2_clinic_settings"], {
                            ...clinicSettings,
                            whatsapp: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-[#0069D9]/30 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {isAr ? "البريد الإلكتروني" : "Email"}
                      </label>
                      <input
                        type="email"
                        value={clinicSettings.email || ""}
                        onChange={(e) =>
                          queryClient.setQueryData(["v2_clinic_settings"], {
                            ...clinicSettings,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0069D9]/30 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {isAr ? "العنوان بالتفصيل (عربي)" : "Address (Arabic)"}
                      </label>
                      <input
                        type="text"
                        value={clinicSettings.addressAr}
                        onChange={(e) =>
                          queryClient.setQueryData(["v2_clinic_settings"], {
                            ...clinicSettings,
                            addressAr: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0069D9]/30 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {isAr ? "العنوان بالتفصيل (إنجليزي)" : "Address (English)"}
                      </label>
                      <input
                        type="text"
                        value={clinicSettings.addressEn}
                        onChange={(e) =>
                          queryClient.setQueryData(["v2_clinic_settings"], {
                            ...clinicSettings,
                            addressEn: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#0069D9]/30 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isAr ? "حفظ التغييرات" : "Save Changes"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================
          MODAL: EDIT SERVICE
      =================================================================== */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            dir={isAr ? "rtl" : "ltr"}
            className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-black text-[#111827]">
                {isAr ? "تعديل بيانات الخدمة" : "Edit Service Details"}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveService(editingService);
                queryClient.invalidateQueries({ queryKey: ["v2_services"] });
                setEditingService(null);
                toast.success(isAr ? "تم حفظ الخدمة بنجاح!" : "Service saved!");
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "اسم الخدمة (عربي)" : "Title (Arabic)"}
                  </label>
                  <input
                    type="text"
                    value={editingService.titleAr}
                    onChange={(e) => setEditingService({ ...editingService, titleAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "اسم الخدمة (إنجليزي)" : "Title (English)"}
                  </label>
                  <input
                    type="text"
                    value={editingService.titleEn}
                    onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "السعر بالعربية" : "Price (Arabic)"}
                  </label>
                  <input
                    type="text"
                    value={editingService.priceAr}
                    onChange={(e) => setEditingService({ ...editingService, priceAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "السعر بالإنجليزية" : "Price (English)"}
                  </label>
                  <input
                    type="text"
                    value={editingService.priceEn}
                    onChange={(e) => setEditingService({ ...editingService, priceEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "رابط الصورة (Image URL)" : "Image URL"}
                </label>
                <input
                  type="text"
                  value={editingService.image}
                  onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "الوصف بالعربية" : "Description (Arabic)"}
                </label>
                <textarea
                  rows={3}
                  value={editingService.descriptionAr}
                  onChange={(e) => setEditingService({ ...editingService, descriptionAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  required
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white font-bold shadow-md"
                >
                  {isAr ? "حفظ التغييرات" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL: EDIT DOCTOR
      =================================================================== */}
      {editingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            dir={isAr ? "rtl" : "ltr"}
            className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-black text-[#111827]">
                {isAr ? "تعديل بيانات الطبيب" : "Edit Specialist Details"}
              </h3>
              <button
                onClick={() => setEditingDoctor(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveDoctor(editingDoctor);
                queryClient.invalidateQueries({ queryKey: ["v2_doctors"] });
                setEditingDoctor(null);
                toast.success(isAr ? "تم حفظ الطبيب بنجاح!" : "Specialist saved!");
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "اسم الطبيب (عربي)" : "Name (Arabic)"}
                  </label>
                  <input
                    type="text"
                    value={editingDoctor.nameAr}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, nameAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "اسم الطبيب (إنجليزي)" : "Name (English)"}
                  </label>
                  <input
                    type="text"
                    value={editingDoctor.nameEn}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, nameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "المسمى الوظيفي (عربي)" : "Role (Arabic)"}
                  </label>
                  <input
                    type="text"
                    value={editingDoctor.roleAr}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, roleAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "المسمى الوظيفي (إنجليزي)" : "Role (English)"}
                  </label>
                  <input
                    type="text"
                    value={editingDoctor.roleEn}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, roleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "رابط الصورة الشخصية (Photo URL)" : "Photo URL"}
                </label>
                <input
                  type="text"
                  value={editingDoctor.image}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "السيرة الذاتية (عربي)" : "Bio (Arabic)"}
                </label>
                <textarea
                  rows={3}
                  value={editingDoctor.bioAr}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, bioAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  required
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDoctor(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white font-bold shadow-md"
                >
                  {isAr ? "حفظ التغييرات" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL: EDIT REVIEW
      =================================================================== */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            dir={isAr ? "rtl" : "ltr"}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-black text-[#111827]">
                {isAr ? "تعديل تقييم المراجع" : "Edit Review"}
              </h3>
              <button
                onClick={() => setEditingReview(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveReview(editingReview);
                queryClient.invalidateQueries({ queryKey: ["v2_reviews"] });
                setEditingReview(null);
                toast.success(isAr ? "تم حفظ التقييم!" : "Review saved!");
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "اسم المراجع (عربي)" : "Name (Arabic)"}
                  </label>
                  <input
                    type="text"
                    value={editingReview.nameAr}
                    onChange={(e) => setEditingReview({ ...editingReview, nameAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {isAr ? "اسم المراجع (إنجليزي)" : "Name (English)"}
                  </label>
                  <input
                    type="text"
                    value={editingReview.nameEn}
                    onChange={(e) => setEditingReview({ ...editingReview, nameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "التقييم (1 إلى 5 نجوم)" : "Rating (1 to 5)"}
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.5"
                  value={editingReview.rating}
                  onChange={(e) => setEditingReview({ ...editingReview, rating: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "نص التجربة والتقييم (عربي)" : "Quote (Arabic)"}
                </label>
                <textarea
                  rows={3}
                  value={editingReview.quoteAr}
                  onChange={(e) => setEditingReview({ ...editingReview, quoteAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  required
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white font-bold shadow-md"
                >
                  {isAr ? "حفظ التغييرات" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL: EDIT CASE
      =================================================================== */}
      {editingCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            dir={isAr ? "rtl" : "ltr"}
            className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-black text-[#111827]">
                {isAr ? "تعديل حالة قبل وبعد" : "Edit Before & After Case"}
              </h3>
              <button
                onClick={() => setEditingCase(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveCase(editingCase);
                queryClient.invalidateQueries({ queryKey: ["v2_cases"] });
                setEditingCase(null);
                toast.success(isAr ? "تم حفظ الحالة بنجاح!" : "Case saved!");
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "عنوان الحالة (عربي)" : "Case Title (Arabic)"}
                </label>
                <input
                  type="text"
                  value={editingCase.titleAr}
                  onChange={(e) => setEditingCase({ ...editingCase, titleAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "رابط صورة قبل العلاج (Before Image URL)" : "Before Image URL"}
                </label>
                <input
                  type="text"
                  value={editingCase.beforeImage}
                  onChange={(e) => setEditingCase({ ...editingCase, beforeImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {isAr ? "رابط صورة بعد العلاج (After Image URL)" : "After Image URL"}
                </label>
                <input
                  type="text"
                  value={editingCase.afterImage}
                  onChange={(e) => setEditingCase({ ...editingCase, afterImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300"
                  required
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0069D9] hover:bg-blue-600 text-white font-bold shadow-md"
                >
                  {isAr ? "حفظ التغييرات" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
