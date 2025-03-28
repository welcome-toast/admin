interface User {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string;
  lastSignInAt: string | undefined;
}

interface Project {
  id: string;
  name: string;
  link: string;
  api_key: string;
  is_installed: boolean;
  created_at: string;
  updated_at: string;
}

export type { User, Project };
