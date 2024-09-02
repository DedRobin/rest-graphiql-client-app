import GraphiQL from "./client";
import { decode } from "js-base64";
import { PlaygroundSettings } from "@/components/Playground/usePlayground";

export default function GraphiQLPage({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: URLSearchParams;
}) {
  const { slug } = params;

  const [endpoint, body] = slug.map((item) => {
    const padding = "=".repeat((4 - (item.length % 4)) % 4);
    return decode(item + padding);
  });

  const bodyObj = JSON.parse(body);

  const query = bodyObj.query;

  const variables = JSON.stringify(bodyObj.variables);

  console.log("searchParams", searchParams);

  const headers = "";

  const settings: PlaygroundSettings = { endpoint, query, headers, variables };

  return <GraphiQL settings={settings} />;
}
