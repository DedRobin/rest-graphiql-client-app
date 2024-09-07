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
  const entries = Object.entries(variables).sort();

  function changeValueOnBlur(dateKey: string, newValue: string) {
    const newVars = { ...variables };
    newVars[dateKey] = newValue;
    setVariables(newVars);
  }

  function changeKeyOnBlur(dateKey: string, newDataKey: string) {
    const newVars = { ...variables };
    const variableValue = newVars[dateKey];
    delete newVars[dateKey];
    newVars[newDataKey] = variableValue;
    setVariables(newVars);
  }

  function addNewVariable(dateKey: string, value: string) {
    const newVars = { ...variables };
    newVars[dateKey] = value;
    setVariables(newVars);
  }

  function deleteVariable(dateKey: string) {
    const newVars = { ...variables };
    delete newVars[dateKey];
    setVariables(newVars);
  }

  return (
    <div className={"w-[800px] "}>
      {entries.map((variable) => {
        const [dateKey, value] = variable;
        return (
          <VariableKeyValue
            key={dateKey}
            dateKey={dateKey}
            value={value}
            deleteVariable={deleteVariable}
            changeKeyOnBlur={changeKeyOnBlur}
            changeValueOnBlur={changeValueOnBlur}
          />
        );
      })}
      <VariableBuilder addNewVariable={addNewVariable} />
    </div>
  );
}
