import { Param } from "@/types/Param";

export function replaceTagsToVariableValue(
  template: string,
  variables: Param[],
) {
  return template.replace(/{{(.*?)}}/g, (match, tag) => {
    const found = variables.find((variable) => variable.key === tag);
    return found ? found.value : match;
  });
}
