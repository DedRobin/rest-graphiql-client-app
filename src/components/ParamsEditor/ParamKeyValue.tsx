import React, { useState } from "react";
import { Param } from "@/types/Param";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";
import { Button } from "@/components/UI/buttons/Button";
import { TrashIcon } from "@/components/UI/buttons/TrashIcon";

export function ParamKeyValue({
  param,
  changeParamOnBlur,
  removeParam,
}: {
  param: Param;
  changeParamOnBlur: (param: Param) => void;
  removeParam: (id: number) => void;
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
    <div className="flex gap-2 items-center">
      <TextInput
        className="bg-darkGray"
        placeholder="Key"
        value={localKey}
        onBlur={(e) => onBlurKey(e.target.value)}
        onChange={(e) => setLocalKey(e.target.value)}
      />
      <TextInput
        className="bg-darkGray"
        placeholder="Value"
        value={localValue}
        onBlur={(e) => onBlurValue(e.target.value)}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      <Button
        title="Remove"
        onClick={() => removeParam(id)}
        IconComponent={TrashIcon}
      ></Button>
    </div>
  );
}
