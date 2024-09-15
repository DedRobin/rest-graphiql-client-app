import { HttpMethod } from "@/types/Method";
import { createEmptyPostmanUrlStateWithBody } from "@/utils/urlState/createEmptyPostmanUrlStateWithSearchParams";
import { Postman } from "@/components/Postman/Postman";

export default function PutPage() {
  return (
    <Postman urlState={createEmptyPostmanUrlStateWithBody(HttpMethod.PUT)} />
  );
}
