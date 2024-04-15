import { IState } from "./issuesSlice";

export const selectRepoData = (state: { issues: IState }) =>
  state.issues.repoData;

export const selectOpenIssues = (state: { issues: IState }) =>
  state.issues.openIssues;

export const selectAssigneeIssues = (state: { issues: IState }) =>
  state.issues.assigneeIssues;

export const selectClosedIssues = (state: { issues: IState }) =>
  state.issues.closedIssues;

export const selectIsLoading = (state: { issues: IState }) =>
  state.issues.isLoading;

export const selectError = (state: { issues: IState }) => state.issues.error;
