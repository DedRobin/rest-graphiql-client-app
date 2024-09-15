import { ParamKeyValue } from "@/components/ParamsEditor/ParamKeyValue";
import { ParamBuilder } from "@/components/ParamsEditor/ParamBuilder";
import { Param } from "@/types/Param";
import React from "react";
import { Button } from "@/components/UI/buttons/Button";
import { PlusIcon } from "@/components/UI/buttons/PlusIcon";
import { CloseIcon } from "@/components/UI/buttons/CloseIcon";

export function ParamsEditor({
  params,
  setParams,
  title,
  readOnlyItems = 0,
  isVisible = true,
  setIsVisible,
}: {
  params: Param[];
  setParams: (params: Param[]) => void;
  title: string;
  readOnlyItems?: number;
  isVisible?: boolean;
  setIsVisible?: (value: boolean) => void;
}) {
  function changeParamOnBlur(updatedParam: Param) {
    const newParams = params.map((param) => {
      if (param.id === updatedParam.id) {
        return updatedParam;
      }
      return param;
    });
    setParams(newParams);
  }

  function addNewParam(param: Param) {
    const newParams = [...params, param];
    setParams(newParams);
  }

  function removeParam(id: number) {
    const newParams = params.filter((p) => p.id !== id);
    setParams(newParams);
  }

  return (
    <div className="mt-1">
      <div className="flex justify-between items-center pr-3">
        <h6 className="mt-1">{title}</h6>
        {/* Кнопка для показа/скрытия секции переменных */}
        {setIsVisible && (
          <Button
            title={isVisible ? "Hide" : "Show"}
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            IconComponent={isVisible ? CloseIcon : PlusIcon}
          />
        )}
      </div>

      {isVisible && (
        <div className="bg-darkGray px-3 py-2 flex flex-col gap-1.5 overflow-auto mt-3">
          {params.map((param, index) => (
            <ParamKeyValue
              param={param}
              key={param.id}
              removeParam={removeParam}
              changeParamOnBlur={changeParamOnBlur}
              isReadOnly={index + 1 <= readOnlyItems}
            />
          ))}

          <ParamBuilder addNewParam={addNewParam} />
        </div>
      )}
    </div>
  );
}
