import { Reducer, configureStore } from "@reduxjs/toolkit";
import { issuesReducer } from "./issuesSlice";

export const store = configureStore({
  reducer: {
    issues: issuesReducer as Reducer,
  },
});
