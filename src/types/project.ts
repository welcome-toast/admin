interface Project {
  id: string;
  name: string;
  link: string;
  api_key: string;
  is_installed: boolean;
  created_at: string;
  updated_at: string;
}

type PreviewNode = HTMLIFrameElement | null;
type IndexToastForEdit = number;
type IsMatchedProject = boolean;

export type { Project, PreviewNode, IndexToastForEdit, IsMatchedProject };
