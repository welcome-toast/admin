interface User {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string;
  lastSignInAt: string | undefined;
}

interface Modal {
  create: boolean;
  install: boolean;
  delete: boolean;
}

type ApiKeyInstallModal = string;

export type { User, Modal, ApiKeyInstallModal };
