import { parseURLWithSearchParams } from "@/utils/urlState/parseURLWithSearchParams";
import { HttpMethod } from "@/types/Method";
import { Postman } from "@/components/Postman/Postman";

export default function DeletePageWithSlug({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const urlState = parseURLWithSearchParams(
    HttpMethod.OPTIONS,
    slug,
    searchParams,
  );

  return <Postman urlState={urlState} />;
}
