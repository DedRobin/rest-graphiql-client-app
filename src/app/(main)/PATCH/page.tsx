import { HttpMethod } from "@/types/Method";
import { createEmptyPostmanUrlStateWithBody } from "@/utils/urlState/createEmptyPostmanUrlStateWithSearchParams";
import { Postman } from "@/components/Postman/Postman";

export default function PatchPage() {
  return (
    <Postman urlState={createEmptyPostmanUrlStateWithBody(HttpMethod.PUT)} />
  );
}
