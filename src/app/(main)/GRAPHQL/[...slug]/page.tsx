import { parseSlug } from "@/utils/urlUtils";
import { redirect } from "next/navigation";
import GraphiQL from "@/app/(main)/GRAPHQL/client";

export default function GraphiQLPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const settings = parseSlug(slug, redirect);
  return <GraphiQL settings={settings} />;
}
