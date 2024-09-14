import { PlaygroundURLState } from "@/components/Playground/types";
import { decodeBase64 } from "@/utils/base64";
import { createPlaygroundHeaders } from "@/components/Playground/utils";
import { emptyPlaygroundUrlState } from "@/constants/playgroundEmptyState";

export function parsePlaygroundURL(
  slug: string[],
  searchParams?: { [p: string]: string | undefined },
): PlaygroundURLState {
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
    // redirect(createPlaygroundURL(stateWithoutBody));
    // Проброс может ошибки что в ссылке был плохой объект и мы его удалили
    console.log(
      "Проброс может ошибки что в ссылке был плохой объект и мы его удалили",
    );
    return stateWithoutBody;
  }
  return { query, endpoint, variables, headers };
}
