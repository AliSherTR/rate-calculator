import { createClient } from "@supabase/supabase-js";

export type Region = {
  id: string;
  name: string;
  multiplier: number;
};

export type Role = {
  id: string;
  name: string;
  base_rate: number;
};

export type SeniorityLevel = {
  id: string;
  name: string;
  multiplier: number;
};

export type Workload = {
  id: string;
  name: string;
  percentage: number;
};

export type Duration = {
  id: string;
  name: string;
  discount: number;
};

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
