import RestfullClient from "@/app/(main)/GET/client";
import { HttpMethod } from "@/types/Method";
import { createEmptyPostmanUrlStateWithSearchParams } from "@/utils/urlState/createEmptyPostmanUrlStateWithBody";

export default function DeletePage() {
  return (
    <RestfullClient
      urlState={createEmptyPostmanUrlStateWithSearchParams(HttpMethod.DELETE)}
    />
  );
}
