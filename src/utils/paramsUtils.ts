import { Param } from "@/components/Postman/types";

export function createRecordFromParams(params: Param[]) {
  return params.reduce<Record<string, string>>((record, param) => {
    const { key, value } = param;
    record[key] = value;
    return record;
  }, {});
}

export function createSearchParamsURLFromParams(params: Param[]) {
  if (params.length === 0) {
    return "";
  }
  const record = createRecordFromParams(params);
  const tail = Object.entries(record)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join("&");

  return `?${tail}`;
}

export function createParamsFromSearchParamsUrl(url: string): Param[] {
  if (!url) {
    return [];
  }
  const id = new Date().valueOf();
  return url.split("&").map((paramString, index) => {
    const [key, value] = paramString.split("=");
    return { key, value, id: id + index };
  });
}
