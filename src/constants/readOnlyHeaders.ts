import { TypePostBody } from "@/components/Postman/types";
import { Param } from "@/types/Param";

export const READ_ONLY_HEADERS: Record<TypePostBody, Param> = {
  json: { id: 0, key: "Content-Type", value: "application/json" },
  "plane text": { id: 1, key: "Content-Type", value: "text/plain" },
};
