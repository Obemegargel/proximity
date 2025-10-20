// import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient(
//   process.env.EXPO_PUBLIC_SUPABASE_URL!,
//   process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
//   { realtime: { params: { eventsPerSecond: 10 } } }
// );
//_____________________________________________________________________________________________different version
// // supabaseClient.ts
// import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(
//   process.env.EXPO_PUBLIC_SUPABASE_URL!,
//   process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
// )
//_____________________________________________________________________________________________different version
// supabaseClient.ts
// import { createClient } from "@supabase/supabase-js";

// // Put these in app.config.ts -> expo.extra (or EXPO_PUBLIC_* env vars)
// const url = process.env.EXPO_PUBLIC_SUPABASE_URL!;
// const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(url, anon, {
//   realtime: { params: { eventsPerSecond: 10 } },
// });
//_____________________________________________________________________________________________different version
// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://YOUR-PROJECT-URL.supabase.co",
  "YOUR-ANON-KEY"
);

export type PresenceMeta = { id: string; name: string }; // (optional)
