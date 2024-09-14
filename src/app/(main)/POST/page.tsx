import RestfullClient from "@/app/(main)/GET/client";
import { emptyPostmanPostUrlState } from "@/constants/postmanEmptyState";

export default function PostPage() {
  return <RestfullClient urlState={emptyPostmanPostUrlState} />;
}
