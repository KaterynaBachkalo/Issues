import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchIssuesClosed,
  fetchIssuesOpen,
  fetchRepoData,
} from "../services/api";
import { RepoDataParams } from "../types";

export const fetchRepoDataThunk = createAsyncThunk(
  "issues/fetchRepoData",
  async (params: RepoDataParams, thunkAPI) => {
    try {
      const response = await fetchRepoData(params);
      return response;
    } catch (error: string | any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchIssuesOpenThunk = createAsyncThunk(
  "issues/fetchIssuesOpen",
  async (params: RepoDataParams, thunkAPI) => {
    try {
      const response = await fetchIssuesOpen(params);
      return response;
    } catch (error: string | any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchIssuesClosedThunk = createAsyncThunk(
  "issues/fetchIssuesClosed",
  async (params: RepoDataParams, thunkAPI) => {
    try {
      const response = await fetchIssuesClosed(params);
      return response;
    } catch (error: string | any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
