interface IComments {
  totalCount: number;
}

interface IData {
  title: string;
  id: string;
  comments: IComments;
  number: number;
}

interface IPageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface ISearch {
  pageInfo: IPageInfo;
  issueCount: string;
  nodes: IData[];
}

export type { ISearch, IPageInfo, IData, IComments };
