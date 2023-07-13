import axiosInstance from "@/axiosInstance";
import ListOfArticles from "@/types/ListOfArticles";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Balancer } from "react-wrap-balancer";
import Article from "./Article";
import IArticle from "@/types/Article";

async function fetchArticles({ pageParam = 0 }) {
  const response = await axiosInstance.get(
    "articles?cursor=" + String(pageParam),
  );
  return response.data as ListOfArticles;
}

export default function ListOfArticles() {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const currentDiv = divRef.current;

    if (currentDiv) {
      observer.observe(currentDiv);
    }

    return () => {
      if (currentDiv) {
        observer.unobserve(currentDiv);
      }
    };
  });

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (hasNextPage && !isFetchingNextPage) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          fetchNextPage();
        }
      }
    });
  };

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="flex flex-row items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
          <p className="text-slate-500">Loading...</p>
        </div>
      ) : isError ? (
        <p className="text-center text-lg text-slate-500">
          An unexpected error occurred while fetching articles.
        </p>
      ) : (
        <div className="flex w-full flex-col gap-4">
          {data.pages.map((group, i) => (
            <div className="flex w-full flex-col gap-4" key={i}>
              {group.data.map((article: IArticle) => (
                <Article key={article._id} article={article} />
              ))}
            </div>
          ))}
          {data.pages[0].data.length === 0 ? (
            <p className="text-center text-lg text-slate-500">
              <Balancer>There aren't any articles yet...</Balancer>
            </p>
          ) : (
            <>
              {isFetchingNextPage ? (
                <div className="flex flex-row items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                  <p className="text-slate-500">Loading...</p>
                </div>
              ) : hasNextPage ? (
                <div ref={divRef} className="-mt-4"></div>
              ) : (
                <p className="text-center text-lg text-slate-500">
                  Nothing more to load
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
