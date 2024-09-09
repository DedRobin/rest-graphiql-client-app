import React, { useState } from "react";
import { Param } from "@/components/Postman/types";

export function ParamKeyValue({
  param,
  changeParamOnBlur,
  deleteParam,
}: {
  param: Param;
  changeParamOnBlur: (param: Param) => void;
  deleteParam: (id: number) => void;
}) {
  const { value, key, id } = param;

  const [localKey, setLocalKey] = useState(key);
  const [localValue, setLocalValue] = useState(value);

  function onBlurKey(newKey: string) {
    if (key === newKey) {
      return;
    }
    const newParam = { id, value, key: newKey };
    changeParamOnBlur(newParam);
  }

  function onBlurValue(newValue: string) {
    if (value === newValue) {
      return;
    }
    const newParam = { id, value: newValue, key };
    changeParamOnBlur(newParam);
  }

  return (
    <div className="my-2">
      <input
        className="bg-black border-amber-50 border-2 mr-2"
        type="text"
        value={localKey}
        onBlur={(event) => onBlurKey(event.target.value)}
        onChange={(event) => setLocalKey(event.target.value)}
      />
      <input
        type="text"
        className="bg-black border-amber-50 border-2"
        value={localValue}
        onBlur={(event) => onBlurValue(event.target.value)}
        onChange={(event) => setLocalValue(event.target.value)}
      />
      <button type="button" onClick={() => deleteParam(id)}>
        Delete
      </button>
    </div>
  );
}
