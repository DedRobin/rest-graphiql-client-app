import { Dispatch, SetStateAction } from "react";
import { VariableKeyValue } from "@/components/Postman/VariablesViewer/VariableKeyValue";
import { VariableBuilder } from "@/components/Postman/VariablesViewer/VariableBuilder";

export function VariablesViewer({
  variables,
  setVariables,
}: {
  variables: Record<string, string>;
  setVariables: Dispatch<SetStateAction<Record<string, string>>>;
}) {
  const entries = Object.entries(variables);

  function tryChangedOnBlur(
    key: string,
    updatingField: "key" | "value",
    newValue: string,
  ) {
    const newVars = { ...variables };

    if (updatingField === "key") {
      if (!newValue || variables.hasOwnProperty(newValue)) {
        return false;
      }
      const variableValue = newVars[key];
      delete newVars[key];
      newVars[newValue] = variableValue;
    } else {
      newVars[key] = newValue;
    }
    setVariables(newVars);
    return true;
  }

  function tryAddNewVariable(key: string, value: string) {
    if (!key || variables.hasOwnProperty(key)) {
      return false;
    }

    const newVars = { ...variables };
    newVars[key] = value;
    setVariables(newVars);
    return true;
  }

  return (
    <div className={"w-[800px]"}>
      {entries.map((variable) => {
        const [key, value] = variable;
        return (
          <VariableKeyValue
            key={key}
            keyName={key}
            value={value}
            tryChangedOnBlur={tryChangedOnBlur}
          />
        );
      })}
      <VariableBuilder tryAddNewVariable={tryAddNewVariable} />
    </div>
  );
}
