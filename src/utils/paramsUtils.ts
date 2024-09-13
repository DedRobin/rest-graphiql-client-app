import { Param } from "@/types/Param";

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

export function createParamsFromSearchParamsURL(url: string): Param[] {
  if (!url) {
    return [];
  }
  const id = new Date().valueOf();
  return url.split("&").map((paramString, index) => {
    const [key, value] = paramString.split("=");
    return { key, value, id: id + index };
  });
}

export function createParamsFromNextSearchParams(searchParams: {
  [key: string]: string | undefined;
}): Param[] {
  let id = Date.now().valueOf();
  return Object.entries(searchParams).map(([key, value]) => {
    id += 1;
    return { key, value: value || "", id };
  });
}

export function replaceVariablesInStr(template: string, variables: Param[]) {
  return template.replace(/{{(.*?)}}/g, (match, tag) => {
    const found = variables.find((variable) => variable.key === tag);
    return found ? found.value : match;
  });
}

export function replaceVariablesInParams(
  params: Param[],
  variables: Param[],
): Param[] {
  return params.map((param) => {
    const newKey = param.key.replace(/{{(.*?)}}/g, (_, tag) => {
      const variable = variables.find((v) => v.key === tag);
      return variable ? variable.value : `{{${tag}}}`;
    });
    const newValue = param.value.replace(/{{(.*?)}}/g, (_, tag) => {
      const variable = variables.find((v) => v.key === tag);
      return variable ? variable.value : `{{${tag}}}`;
    });
    return { ...param, key: newKey, value: newValue };
  });
}
