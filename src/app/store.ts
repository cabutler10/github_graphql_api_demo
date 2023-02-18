import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import issuesReducer from "../store/issuesSlice";

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
