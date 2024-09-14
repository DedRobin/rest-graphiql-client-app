import RestfullClient from "@/app/(main)/GET/client";
import { createEmptyPostmanUrlStateWithSearchParams } from "@/utils/urlState/asdf";
import { HttpMethod } from "@/types/Method";

export default function GetPage() {
  return (
    <RestfullClient
      urlState={createEmptyPostmanUrlStateWithSearchParams(HttpMethod.GET)}
    />
  );
}
