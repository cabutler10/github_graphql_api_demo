import issuesReducer, {
  IssuesState,
  // setIssues,
  setSelectedId,
  clearSelectedId,
} from "./issuesSlice";

describe("issue reducer", () => {
  const initialState: IssuesState = {
    data: null,
    selectedId: undefined,
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(issuesReducer(undefined, { type: "unknown" })).toEqual({
      data: null,
      selectedId: undefined,
      status: "idle",
    });
  });

  // it("should handle increment", () => {
  //   const actual = issuesReducer(
  //     initialState,
  //     setIssues([{ node: {}, node: {} }])
  //   );
  //   expect(actual.length).toEqual(4);
  // });

  it("should set selected id", () => {
    const actual = issuesReducer(initialState, setSelectedId(123));
    expect(actual.selectedId).toEqual(123);
  });

  it("should handle incrementByAmount", () => {
    const actual = issuesReducer(initialState, clearSelectedId());
    expect(actual.selectedId).toEqual(undefined);
  });
});
