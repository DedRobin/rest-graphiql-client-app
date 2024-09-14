import RestfullClient from "@/app/(main)/GET/client";
import { parseGetURL } from "@/utils/url/parseGetURL";

export default function GetPage({
  params: { slug },
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | undefined };
}) {
  const urlState = parseGetURL(slug, searchParams);

  return <RestfullClient urlState={urlState} />;
}
