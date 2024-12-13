import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
);

async function signIn() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: import.meta.env.VITE_SUPABASE_GOOGLE_REDIRECT_URL,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

export { supabase, signIn };
