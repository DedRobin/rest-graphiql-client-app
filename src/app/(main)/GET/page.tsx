import { HttpMethod } from "@/types/Method";
import { createEmptyPostmanUrlStateWithSearchParams } from "@/utils/urlState/createEmptyPostmanUrlStateWithBody";
import { Postman } from "@/components/Postman/Postman";

export default function GetPage() {
  return (
    <Postman
      urlState={createEmptyPostmanUrlStateWithSearchParams(HttpMethod.GET)}
    />
  );
}
