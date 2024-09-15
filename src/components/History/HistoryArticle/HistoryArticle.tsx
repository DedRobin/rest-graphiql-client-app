import { Tag } from "../../UI/tags/Tag";
import { HistoryLine } from "@/components/History/types";
import { parsePlaygroundURL } from "@/utils/urlState/parsePlaygroundURL";
import { PlaygroundArticle } from "@/components/History/HistoryArticle/PlaygroundArticle";
import { ArticleWithSearchParams } from "@/components/History/HistoryArticle/ArticleWithSearchParams";
import { ArticleWithBody } from "@/components/History/HistoryArticle/ArticleWithBody";
import { parseURLWithBody } from "@/utils/urlState/parseURLWithBody";
import { parseURLWithSearchParams } from "@/utils/urlState/parseURLWithSearchParams";
import { convertURLToNextSearchParams } from "@/utils/urlState/convertURLToNextSearchParams";
import clsx from "clsx";
import {
  HttpMethod,
  isMethodWithBody,
  isMethodWithSearchParams,
} from "@/types/Method";

export function HistoryArticle({ historyLine }: { historyLine: HistoryLine }) {
  const [path, searchParams] = historyLine.url.split("?");
  const [, page, ...slug] = path.split("/");

  const nextSearchParams = convertURLToNextSearchParams(searchParams);

  let articleContent = null;

  const articleType = clsx(
    { GRAPHQL: page === "GRAPHQL" },
    { WithSearch: isMethodWithSearchParams(page) },
    { WithBody: isMethodWithBody(page) },
  );

  switch (articleType) {
    case "GRAPHQL":
      articleContent = (
        <PlaygroundArticle
          state={parsePlaygroundURL(slug)}
          historyLine={historyLine}
        />
      );
      break;
    case "WithSearch":
      articleContent = (
        <ArticleWithSearchParams
          state={parseURLWithSearchParams(
            page as HttpMethod,
            slug,
            nextSearchParams,
          )}
          historyLine={historyLine}
        />
      );
      break;
    case "WithBody":
      articleContent = (
        <ArticleWithBody
          state={parseURLWithBody(page as HttpMethod, slug, nextSearchParams)}
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
