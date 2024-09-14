import RestfullClient from "@/app/(main)/GET/client";
import { parsePostURL } from "@/utils/url/parsePostURL";

export default function PostPage({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const urlState = parsePostURL(slug, searchParams);

  return <RestfullClient urlState={urlState} />;
}
