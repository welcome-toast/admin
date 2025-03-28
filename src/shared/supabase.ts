import { createClient } from "@supabase/supabase-js";

import type { ProjectId, ProjectInput } from "@/types/project";

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
      },
    },
  });

  return;
}

async function getSessionSignIn() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

async function signOut() {
  const { error } = await supabase.auth.signOut();

  return error;
}

async function createProject(input: ProjectInput) {
  await supabase.from("project").insert([input]).select();
}

async function deleteProject(projectId: ProjectId): Promise<Error | null> {
  const { error } = await supabase.from("project").delete().eq("id", projectId);
  return error;
}

export { supabase, signIn, getSessionSignIn, signOut, createProject, deleteProject };
