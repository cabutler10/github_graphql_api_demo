interface IAuthor {
  avatarUrl: string;
}

interface IComment {
  id: string;
  bodyHTML: string;
  createdAt: string;
  author: IAuthor;
}

export type { IComment, IAuthor };
