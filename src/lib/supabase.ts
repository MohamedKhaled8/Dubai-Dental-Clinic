import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Storage keys for dynamic config override from the Admin Panel
const STORAGE_URL_KEY = "v2_supabase_url";
const STORAGE_KEY_KEY = "v2_supabase_anon_key";

/**
 * Returns active Supabase credentials from environment or localStorage overrides.
 */
export function getSupabaseCredentials(): { url: string; anonKey: string } {
  let url = (typeof import.meta !== "undefined" && import.meta.env?.['VITE_SUPABASE_URL']) || "";
  let anonKey = (typeof import.meta !== "undefined" && import.meta.env?.['VITE_SUPABASE_ANON_KEY']) || "";

  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const savedUrl = localStorage.getItem(STORAGE_URL_KEY);
    const savedKey = localStorage.getItem(STORAGE_KEY_KEY);
    if (savedUrl) url = savedUrl;
    if (savedKey) anonKey = savedKey;
  }

  // Trim any trailing slashes or spaces
  url = url.trim().replace(/\/+$/, "");
  anonKey = anonKey.trim();

  return { url, anonKey };
}

/**
 * Persists custom Supabase credentials from the Admin Control Panel.
 */
export function saveSupabaseCredentials(url: string, anonKey: string): void {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_URL_KEY, url.trim().replace(/\/+$/, ""));
    localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
    // Invalidate cached client to recreate on next call
    cachedClient = null;
  }
}

/**
 * Clears custom Supabase credentials.
 */
export function clearSupabaseCredentials(): void {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_URL_KEY);
    localStorage.removeItem(STORAGE_KEY_KEY);
    cachedClient = null;
  }
}

/**
 * Checks if Supabase URL and Key are properly defined.
 */
export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseCredentials();
  return (
    Boolean(url) &&
    Boolean(anonKey) &&
    url.startsWith("http") &&
    anonKey.length > 10
  );
}

let cachedClient: SupabaseClient | null = null;

/**
 * Returns a singleton instance of the Supabase Client.
 */
export function getSupabase(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const { url, anonKey } = getSupabaseCredentials();
  if (!url || !anonKey || !url.startsWith("http")) {
    return null;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return cachedClient;
  } catch (err) {
    console.warn("Failed to initialize Supabase client:", err);
    return null;
  }
}

/**
 * Tests live connection to Supabase and checks if tables exist.
 */
export async function testSupabaseConnection(): Promise<{
  success: boolean;
  message: string;
  tablesFound?: boolean;
}> {
  const client = getSupabase();
  if (!client) {
    return {
      success: false,
      message: "Supabase client is not configured. Please supply Project URL and Anon Key.",
    };
  }

  try {
    const { data, error } = await client
      .from("v2_clinic_settings")
      .select("id, clinic_name_ar")
      .limit(1);

    if (error) {
      // If table does not exist (code 42P01)
      if (error.code === "42P01" || error.message?.includes("does not exist")) {
        return {
          success: true,
          tablesFound: false,
          message: "Connected to Supabase! However, the 'v2_clinic_settings' table was not found yet. Please run the schema.sql script in your SQL Editor.",
        };
      }
      return {
        success: false,
        message: `Supabase returned error: ${error.message} (${error.code || "unknown"})`,
      };
    }

    return {
      success: true,
      tablesFound: true,
      message: "Connection verified! Supabase is fully connected and tables are accessible.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Network error connecting to Supabase: ${err?.message || String(err)}`,
    };
  }
}
