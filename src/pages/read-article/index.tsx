import axiosInstance from "@/axiosInstance";
import IArticle from "@/types/Article";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ArticleBody from "./components/ArticleBody";
import ReturnButton from "./components/ReturnButton";
import { Loader2 } from "lucide-react";

async function fetchArticleById(articleId: string | undefined) {
  if (typeof articleId === "undefined") {
    throw new Error("Invalid article id");
  } else {
    const response = await axiosInstance.get(`articles/${articleId}`);
    return response.data.article as IArticle;
  }
}

export default function ReadArticlePage() {
  const { articleId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => fetchArticleById(articleId),
  });

  return (
    <div className="flex flex-col gap-8">
      <ReturnButton />
      {isLoading ? (
        <div className="flex flex-row items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
          <p className="text-slate-500">Loading...</p>
        </div>
      ) : isError ? (
        <p className="text-center text-lg text-slate-500">
          An error occurred while fetching this article.
        </p>
      ) : (
        data && <ArticleBody article={data} />
      )}
    </div>
  );
}
