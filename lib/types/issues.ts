export interface IssueFile {
  id: string;
  file_url: string;
}

export interface Issues {
  id: string;
  title: string;
  description: string;
  status: "Open" | "Progress" | "Closed";
  created_at: string;
  updated_at?: string;
  files?: IssueFile[];
}
