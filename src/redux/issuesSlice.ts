import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IIssues, IRepoData } from "../types";

export interface IState {
  repoData: IRepoData | null;
  openIssues: IIssues[];
  assigneeIssues: IIssues[];
  closedIssues: IIssues[];
  isLoading: boolean;
  error: any | null;
}

export const handlePending = (state: IState): void => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (
  state: IState,
  action: PayloadAction<any>
): void => {
  state.isLoading = false;
  state.error = action.payload;

  if (state.error === "Network Error") {
    toast.error("Something went wrong, please try later", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

export const INITIAL_STATE: IState = {
  repoData: null,
  openIssues: [],
  assigneeIssues: [],
  closedIssues: [],
  isLoading: false,
  error: null,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState: INITIAL_STATE,

  reducers: {
    clearState(state) {
      state = INITIAL_STATE;
    },
    setRepoData(state, action: PayloadAction<IRepoData>) {
      state.repoData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setOpenIssues(state, action: PayloadAction<IIssues[]>) {
      state.openIssues = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setAssigneeIssues(state, action: PayloadAction<IIssues[]>) {
      state.assigneeIssues = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setClosedIssues(state, action: PayloadAction<IIssues[]>) {
      state.closedIssues = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<any | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  clearState,
  setRepoData,
  setOpenIssues,
  setAssigneeIssues,
  setClosedIssues,
  setLoading,
  setError,
} = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
