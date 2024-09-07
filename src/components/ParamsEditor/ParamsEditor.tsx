import { Dispatch, SetStateAction } from "react";
import { ParamKeyValue } from "@/components/ParamsEditor/ParamKeyValue";
import { ParamBuilder } from "@/components/ParamsEditor/ParamBuilder";

export function ParamsEditor({
  params,
  setParams,
}: {
  params: Record<string, string>;
  setParams: Dispatch<SetStateAction<Record<string, string>>>;
}) {
  const entries = Object.entries(params).sort();

  function changeValueOnBlur(dateKey: string, newValue: string) {
    const newVars = { ...params };
    newVars[dateKey] = newValue;
    setParams(newVars);
  }

  function changeKeyOnBlur(dateKey: string, newDataKey: string) {
    const newVars = { ...params };
    const variableValue = newVars[dateKey];
    delete newVars[dateKey];
    newVars[newDataKey] = variableValue;
    setParams(newVars);
  }

  function addNewParam(dateKey: string, value: string) {
    const newParams = { ...params };
    newParams[dateKey] = value;
    setParams(newParams);
  }

  function deleteParam(dateKey: string) {
    const newParams = { ...params };
    delete newParams[dateKey];
    setParams(newParams);
  }

  return (
    <div className={"w-[800px] "}>
      {entries.map((param) => {
        const [dateKey, value] = param;
        return (
          <ParamKeyValue
            key={dateKey}
            dateKey={dateKey}
            value={value}
            deleteParam={deleteParam}
            changeKeyOnBlur={changeKeyOnBlur}
            changeValueOnBlur={changeValueOnBlur}
          />
        );
      })}
      <ParamBuilder addNewParam={addNewParam} />
    </div>
  );
}
