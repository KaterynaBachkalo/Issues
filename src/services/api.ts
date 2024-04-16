import axios from "axios";
import { RepoDataParams } from "../types";

axios.defaults.baseURL = "https://api.github.com/repos/";

export const fetchRepoData = async (params: RepoDataParams) => {
  const { owner, repo } = params;

  const response = await axios.get(
    `${owner}/${repo}`,

    {
      headers: {
        Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const fetchIssuesOpen = async (params: RepoDataParams) => {
  const { owner, repo } = params;

  const response = await axios.get(
    `${owner}/${repo}/issues?state=open&per_page=100`,
    {
      headers: {
        Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const fetchIssuesClosed = async (params: RepoDataParams) => {
  const { owner, repo } = params;

  const response = await axios.get(
    `${owner}/${repo}/issues?state=closed&per_page=100`,
    {
      headers: {
        Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
      },
    }
  );
  return response.data;
};
