import GraphiQL from "@/app/(main)/GRAPHQL/client";
import { Route } from "@/app/routes";
import { parsePlaygroundURL } from "@/utils/url/parsePlaygroundURL";
import { redirect } from "next/navigation";

export default function GraphiQLPage({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  try {
    const urlState = parsePlaygroundURL(slug, searchParams);
    return <GraphiQL urlState={urlState} />;
  } catch {
    redirect(Route.GraphQL);
  }
}
