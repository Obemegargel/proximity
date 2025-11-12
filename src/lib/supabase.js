import AsyncStorage from "@react-native-async-storage/async-storage";
import { createrClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kobobuwpptezjwkkogkz.supabase.co"; // put in environment variables this will replace the other supabaseClient.ts file I assume.
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvYm9idXdwcHRlemp3a2tvZ2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NjMyMzQsImV4cCI6MjA3NzMzOTIzNH0.pQQwq2Hni4DDEssZLdO5TE2HMnsNSlONM7LUYXTiODU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
