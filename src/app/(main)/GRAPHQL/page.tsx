import GraphiQL from "@/app/(main)/GRAPHQL/client";
import { emptyPlaygroundUrlState } from "@/constants/playgroundEmptyState";

export default function GraphiQLRootPage() {
  return <GraphiQL urlState={emptyPlaygroundUrlState} />;
}
