import IArticle from "./Article";

export default interface ListOfArticles {
  data: IArticle[];
  nextCursor: number | null;
}
