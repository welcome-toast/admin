type ProjectId = string;

interface Project {
  id: ProjectId;
  name: string;
  link: string;
  api_key: string;
  is_installed: boolean;
  created_at: string;
  updated_at: string;
}

interface ProjectDeleteConfirmed {
  projectId: ProjectId;
  projectName: string;
}

type PreviewNode = HTMLIFrameElement | null;
type IndexToastForEdit = number;
type IsMatchedProject = boolean;

export type {
  Project,
  ProjectId,
  ProjectDeleteConfirmed,
  PreviewNode,
  IndexToastForEdit,
  IsMatchedProject,
};
