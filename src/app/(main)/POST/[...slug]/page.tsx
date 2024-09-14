import RestfullClient from "@/app/(main)/GET/client";
import { parseURLWithBody } from "@/utils/urlState/parseURLWithBody";
import { HttpMethod } from "@/types/Method";

export default function PostPageWithSlug({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const urlState = parseURLWithBody(HttpMethod.POST, slug, searchParams);

  return <RestfullClient urlState={urlState} />;
}
