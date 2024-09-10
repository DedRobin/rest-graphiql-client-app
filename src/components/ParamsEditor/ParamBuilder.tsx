import React, { useState } from "react";
import { Param } from "@/types/Param";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";
import { Button } from "@/components/UI/buttons/Button";
import { PlusIcon } from "@/components/UI/buttons/BurgerButton/PlusIcon";

export function ParamBuilder({
  addNewParam,
}: {
  addNewParam: (param: Param) => void;
}) {
  const [localKey, setLocalKey] = useState("");
  const [localValue, setLocalValue] = useState("");

  function handleAddNewParam() {
    if (!localKey && !localValue) {
      return;
    }
    const id = new Date().valueOf();
    const newParam = { id, key: localKey, value: localValue };
    addNewParam(newParam);
    setLocalKey("");
    setLocalValue("");
  }

  return (
    <div className="flex gap-2 items-center">
      <TextInput
        className="bg-gray-700"
        placeholder="New key"
        value={localKey}
        onChange={(e) => setLocalKey(e.target.value)}
      />
      <TextInput
        className="bg-gray-700"
        placeholder="New value"
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
      />
      <Button
        title="Add"
        onClick={handleAddNewParam}
        IconComponent={PlusIcon}
      ></Button>
    </div>
  );
}
