
import { Param } from "@/types/Param";
import { Method } from "@/types/Method";
import { ResponseData } from "@/types/ResponseData";

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

export interface PostmanState extends PostmanURLState {
  variables: Param[];
  response: ResponseData;
  isLoading: boolean;
}

