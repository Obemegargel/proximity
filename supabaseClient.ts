//_____________________________________________________________________________________________different version
// Most recent fully working version
import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY"
  );
}

// console.log("SB URL:", process.env.EXPO_PUBLIC_SUPABASE_URL); //just for testing can delete once works if you want

export const supabase = createClient(url, anon);

export type PresenceMeta = { id: string; name: string };

//_____________________________________________________________________________________________different version
