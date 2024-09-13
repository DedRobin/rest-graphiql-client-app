import RestfullClient from "@/app/(main)/GET/client";
import { emptyPostmanPostUrlState } from "@/constants/postmanEmptyState";

export default function GetPage() {
  return <RestfullClient urlState={emptyPostmanPostUrlState} />;

}
