import GraphiQL from "./client";

import { parseSlug } from "@/utils/urlUtils";
import { redirect } from "next/navigation";

export default function GraphiQLPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const settings = parseSlug(slug, redirect);
  return <GraphiQL settings={settings} />;
}
