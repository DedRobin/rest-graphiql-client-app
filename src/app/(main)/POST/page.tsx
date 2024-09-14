import { HttpMethod } from "@/types/Method";
import { createEmptyPostmanUrlStateWithBody } from "@/utils/urlState/createEmptyPostmanUrlStateWithSearchParams";
import { Postman } from "@/components/Postman/Postman";

export default function PostPage() {
  return (
    <Postman urlState={createEmptyPostmanUrlStateWithBody(HttpMethod.POST)} />
  );
}
