import RestfullClient from "@/app/(main)/GET/client";
import { parseURLWithBody } from "@/utils/urlState/parseURLWithBody";
import { HttpMethod } from "@/types/Method";

export default function PutPageWithSlug({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const urlState = parseURLWithBody(HttpMethod.PATCH, slug, searchParams);

  return <RestfullClient urlState={urlState} />;
}
