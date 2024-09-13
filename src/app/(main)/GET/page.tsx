import RestfullClient from "@/app/(main)/GET/client";
import { emptyPostmanGetUrlState } from "@/constants/postmanEmptyState";

export default function GetPage() {
  return <RestfullClient urlState={emptyPostmanGetUrlState} />;
}
