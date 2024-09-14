import RestfullClient from "@/app/(main)/GET/client";
import { HttpMethod } from "@/types/Method";
import { createEmptyPostmanUrlStateWithBody } from "@/utils/urlState/createEmptyPostmanUrlStateWithSearchParams";

export default function PatchPage() {
  return (
    <RestfullClient
      urlState={createEmptyPostmanUrlStateWithBody(HttpMethod.PUT)}
    />
  );
}
