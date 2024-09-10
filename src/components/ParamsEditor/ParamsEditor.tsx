import { ParamKeyValue } from "@/components/ParamsEditor/ParamKeyValue";
import { ParamBuilder } from "@/components/ParamsEditor/ParamBuilder";
import { Param } from "@/types/Param";

export function ParamsEditor({
  params,
  setParams,
  title,
}: {
  params: Param[];
  setParams: (params: Param[]) => void;
  title: string;
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
      <h6>{title}</h6>
      <div className="bg-darkGray px-3 py-2 flex flex-col gap-1.5 overflow-auto">
        {params.map((param) => {
          return (
            <ParamKeyValue
              param={param}
              key={param.id}
              removeParam={removeParam}
              changeParamOnBlur={changeParamOnBlur}
            />
          );
        })}
        <ParamBuilder addNewParam={addNewParam} />
      </div>
    </div>
  );
}
