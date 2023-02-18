import issuesReducer, {
  IssuesState,
  setSelectedId,
  clearSelectedId,
} from "./issuesSlice";

describe("issue reducer", () => {
  const initialState: IssuesState = {
    selectedId: undefined,
  };
  it("should handle initial state", () => {
    expect(issuesReducer(undefined, { type: "unknown" })).toEqual({
      selectedId: undefined,
    });
  });

  it("should set selected id", () => {
    const actual = issuesReducer(initialState, setSelectedId(123));
    expect(actual.selectedId).toEqual(123);
  });

  it("should handle incrementByAmount", () => {
    const actual = issuesReducer(initialState, clearSelectedId());
    expect(actual.selectedId).toEqual(undefined);
  });
});
