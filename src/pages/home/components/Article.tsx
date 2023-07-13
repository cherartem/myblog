import IArticle from "@/types/Article";
import { DateTime } from "luxon";
import he from "he";
import { Balancer } from "react-wrap-balancer";
import { Link } from "react-router-dom";

interface Props {
  article: IArticle;
}

export default function Article({ article }: Props) {
  const formattedDate = DateTime.fromISO(article.createdAt).toLocaleString(
    DateTime.DATE_HUGE,
  );

  return (
    <Link to={`/articles/${article._id}`}>
      <div className="flex w-full flex-col gap-4 rounded-lg border border-border bg-white p-4 drop-shadow-sm cursor-pointer hover:drop-shadow-md transition-all">
        <h1 className="text-xl font-semibold">
          <Balancer>{he.decode(article.title)}</Balancer>
        </h1>
        <p>{formattedDate}</p>
        <p className="text-slate-400">
          <Balancer>{he.decode(article.description)}</Balancer>
        </p>
      </div>
    </Link>
  );
}
