export interface IIssues {
  id?: number;
  pull_request?: {};
  state?: string;
  title: string;
  number: number;
  created_at: string;
  user: {
    login: string;
    html_url: string;
  };
  comments: number;
  assignee?: {} | null;
}

export interface IRepoData {
  name: string;
  html_url: string;
  owner: {
    login: string;
    html_url: string;
  };
  stargazers_count: number;
}

export interface RepoDataParams {
  owner: string;
  repo: string;
}

export interface IIssuesProps {
  data: {
    id?: number;
    pull_request?: {};
    state?: string;
    title: string;
    number: number;
    created_at: string;
    user: {
      login: string;
      html_url: string;
    };
    comments: number;
    assignee?: {} | null;
  };
}
