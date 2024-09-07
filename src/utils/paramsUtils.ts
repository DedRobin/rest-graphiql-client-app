import { Param } from "@/components/Postman/types";

export function createRecordFromParams(params: Param[]) {
  return params.reduce<Record<string, string>>((record, param) => {
    const { key, value } = param;
    record[key] = value;
    return record;
  }, {});
}

export function createSearchParamsURLFormParams(params: Param[]) {
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
