export type TypePostBody = "json" | "plane text";

export interface PostBody {
  data: string;
  type: TypePostBody;
}
