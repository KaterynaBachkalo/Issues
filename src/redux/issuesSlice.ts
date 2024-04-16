import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IIssues, IRepoData } from "../types";
import {
  fetchIssuesClosedThunk,
  fetchIssuesOpenThunk,
  fetchRepoDataThunk,
} from "./operations";

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
    // setRepoData(state, action: PayloadAction<IRepoData>) {
    //   state.repoData = action.payload;
    //   state.isLoading = false;
    //   state.error = null;
    // },
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepoDataThunk.pending, handlePending)
      .addCase(fetchRepoDataThunk.fulfilled, (state, action) => {
        state.repoData = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchRepoDataThunk.rejected, handleRejected)

      .addCase(fetchIssuesOpenThunk.pending, handlePending)
      .addCase(fetchIssuesOpenThunk.fulfilled, (state, action) => {
        state.openIssues = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIssuesOpenThunk.rejected, handleRejected)

      .addCase(fetchIssuesClosedThunk.pending, handlePending)
      .addCase(fetchIssuesClosedThunk.fulfilled, (state, action) => {
        state.closedIssues = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIssuesClosedThunk.rejected, handleRejected);
  },
});

export const {
  clearState,
  // setRepoData,
  setOpenIssues,
  setAssigneeIssues,
  setClosedIssues,
  setLoading,
  setError,
} = issuesSlice.actions;
export const issuesReducer = issuesSlice.reducer;
