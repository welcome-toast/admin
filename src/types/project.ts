type ProjectId = string;
type ProjectName = string;
type ProjectApiKey = string;

interface ProjectInput {
  name: ProjectName;
  link: string;
}

interface Project extends ProjectInput {
  id: ProjectId;
  api_key: ProjectApiKey;
  is_installed: boolean;
  created_at: string;
  updated_at: string;
}

interface ProjectDeleteConfirmed {
  projectId: ProjectId;
  projectName: ProjectName;
}

type PreviewNode = HTMLIFrameElement | null;
type IndexToastForEdit = number;
type IsMatchedProject = boolean;

export type {
  Project,
  ProjectInput,
  ProjectId,
  ProjectName,
  ProjectApiKey,
  ProjectDeleteConfirmed,
  PreviewNode,
  IndexToastForEdit,
  IsMatchedProject,
};
