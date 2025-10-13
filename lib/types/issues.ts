export interface IssueFile {
  id: string;
  file_url: string;
}

export interface Projects {
  id: string;
  title: string;
  description: string;
}

export interface Issues {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: "Open" | "Progress" | "Closed";
  priority: "High" | "Medium" | "Low";
  created_at: string;
  updated_at?: string;
  files?: IssueFile[];
  projects: Projects | null;
  project_id: string | null;
}