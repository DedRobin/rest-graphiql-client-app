import GraphiQL from "@/app/(main)/GRAPHQL/client";
import { decodeBase64 } from "@/utils/base64";
import {
  createPlaygroundHeaders,
  createPlaygroundURL,
} from "@/components/Playground/utils";
import { PlaygroundURLState } from "@/components/Playground/types";
import { redirect } from "next/navigation";
import { emptyPlaygroundUrlState } from "@/constants/playgroundEmptyState";

export default function GraphiQLPage({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  function parseSlug(): PlaygroundURLState {
    const [endpoint, body] = slug.map(decodeBase64);
    const headers = createPlaygroundHeaders(searchParams);

    const stateWithoutBody: PlaygroundURLState = {
      ...emptyPlaygroundUrlState,
      endpoint,
      headers,
    };

    if (!endpoint) {
      return emptyPlaygroundUrlState;
    }

    if (!body) {
      return stateWithoutBody;
    }

    let query = "";
    let variables = "";

    try {
      const bodyObj = JSON.parse(body);
      query = bodyObj.query ? bodyObj.query : "";
      variables = bodyObj.variables
        ? JSON.stringify(bodyObj.variables, null, 2)
        : "";
    } catch {
      redirect(createPlaygroundURL(stateWithoutBody));
      // Проброс может ошибки что в ссылке был плохой объект и мы его удалили
    }
    return { query, endpoint, variables, headers };
  }

  const urlState = parseSlug();
  return <GraphiQL urlState={urlState} />;
}
