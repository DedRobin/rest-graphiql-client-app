import { Param } from "@/types/Param";
import { Method } from "@/types/Method";

export type TypePostBody = "json" | "plane text";

export interface PostBody {
  data: string;
  type: TypePostBody;
}

export interface PostmanURLState {
  endpoint: string;
  searchParams: Param[];
  postBody: PostBody;
  method: Method;
  headers: Param[];
}
