import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IssuesState {
  selectedId?: number;
}

const initialState: IssuesState = {
  selectedId: undefined,
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
    },
    clearSelectedId: (state) => {
      state.selectedId = undefined;
    },
  },
});

export const { setSelectedId, clearSelectedId } = issuesSlice.actions;

export const selectSelectedId = (state: RootState) => state.issues.selectedId;

export default issuesSlice.reducer;
