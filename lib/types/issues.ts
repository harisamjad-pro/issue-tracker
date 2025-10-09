export interface IssueFile {
  id: string;
  file_url: string;
}

export interface Issues {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  created_at: string;
  updated_at?: string;
  files?: IssueFile[];
}
