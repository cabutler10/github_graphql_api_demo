import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IIssue {
  title: string;
  id: string;
}

export interface IssuesState {
  data: IIssue[] | null;
  selectedId?: number;
  status: "idle" | "loading" | "failed";
}

const initialState: IssuesState = {
  data: null,
  selectedId: undefined,
  status: "idle",
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    // setIssues: (state, action: PayloadAction<IIssue[]>) => {
    //   state.data = action.payload;
    // },
    setSelectedId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
    },
    clearSelectedId: (state) => {
      state.selectedId = undefined;
    },
  },
});

export const { setSelectedId, clearSelectedId } = issuesSlice.actions;

export const selectIssues = (state: RootState) => state.issues.data;
export const selectSelectedId = (state: RootState) => state.issues.selectedId;

export default issuesSlice.reducer;
