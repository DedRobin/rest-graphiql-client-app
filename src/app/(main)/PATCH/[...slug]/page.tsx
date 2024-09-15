import { parseURLWithBody } from "@/utils/urlState/parseURLWithBody";
import { HttpMethod } from "@/types/Method";
import { Postman } from "@/components/Postman/Postman";

export default function PutPageWithSlug({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const urlState = parseURLWithBody(HttpMethod.PATCH, slug, searchParams);

  return <Postman urlState={urlState} />;
}
