import RestfullClient from "@/app/(main)/GET/client";
import { parseURLWithSearchParams } from "@/utils/urlState/parseURLWithSearchParams";
import { HttpMethod } from "@/types/Method";

export default function GetPageWithSlug({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const urlState = parseURLWithSearchParams(HttpMethod.GET, slug, searchParams);

  return <RestfullClient urlState={urlState} />;
}
