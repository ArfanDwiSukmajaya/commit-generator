export interface GitLabProject {
  id: number;
  name: string;
  path_with_namespace: string;
}

export interface GitLabCommit {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committed_date: string;
  message: string;
  web_url: string;
  project_name?: string;
  parent_ids?: string[];
}
