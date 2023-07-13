import { Separator } from "@/components/ui/separator";
import IArticle from "@/types/Article";
import { Calendar, CalendarClock, Dot } from "lucide-react";
import { DateTime } from "luxon";
import { Balancer } from "react-wrap-balancer";
import he from "he";

interface Props {
  article: IArticle;
}

export default function ArticleBody({ article }: Props) {
  const formattedCreatedAtDate = DateTime.fromISO(
    article.createdAt,
  ).toLocaleString(DateTime.DATE_HUGE);

  const formattedUpdatedAtDate = DateTime.fromISO(
    article.updatedAt,
  ).toLocaleString(DateTime.DATE_HUGE);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <Balancer>{he.decode(article.title)}</Balancer>
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        <Balancer>{he.decode(article.description)}</Balancer>
      </h3>
      <div className="flex flex-row items-center justify-start gap-4 text-slate-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <Calendar className="h-4 w-4" />
          Created at: {formattedCreatedAtDate}
        </div>
        {article.createdAt !== article.updatedAt && (
          <>
            <Dot className="text-slate-300" />
            <div className="flex flex-row items-center justify-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Updated at: {formattedUpdatedAtDate}
            </div>
          </>
        )}
      </div>
      <Separator className="w-full" />
      <p className="leading-7">{he.decode(article.content)}</p>
    </div>
  );
}
