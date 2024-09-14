import { Tag } from "../../UI/tags/Tag";
import { HistoryLine } from "@/components/History/types";
import { parsePlaygroundURL } from "@/utils/url/parsePlaygroundURL";
import { PlaygroundArticle } from "@/components/History/HistoryArticle/PlaygroundArticle";
import { GetArticle } from "@/components/History/HistoryArticle/GetArticle";
import { PostArticle } from "@/components/History/HistoryArticle/PostArticle";
import { parsePostURL } from "@/utils/url/parsePostURL";
import { parseGetURL } from "@/utils/url/parseGetURL";
import { convertURLToNextSearchParams } from "@/utils/url/convertURLToNextSearchParams";

export function HistoryArticle({ historyLine }: { historyLine: HistoryLine }) {
  const [path, searchParams] = historyLine.url.split("?");
  const [, page, ...slug] = path.split("/");

  const nextSearchParams = convertURLToNextSearchParams(searchParams);

  let articleContent = null;

  switch (page) {
    case "GRAPHQL":
      articleContent = (
        <PlaygroundArticle
          state={parsePlaygroundURL(slug)}
          historyLine={historyLine}
        />
      );
      break;
    case "GET":
      articleContent = (
        <GetArticle
          state={parseGetURL(slug, nextSearchParams)}
          historyLine={historyLine}
        />
      );
      break;
    case "POST":
      articleContent = (
        <PostArticle
          state={parsePostURL(slug, nextSearchParams)}
          historyLine={historyLine}
        />
      );
      break;
    default:
      articleContent = null;
  }

  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-1 flex justify-end items-start">
        <Tag>{page}</Tag>
      </div>
      {articleContent}
    </div>
  );
}
