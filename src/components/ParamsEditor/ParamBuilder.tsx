import React, { useState } from "react";
import { Param } from "@/components/Postman/types";

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
    <div className="my-2">
      <input
        type="text"
        className="bg-gray-800 border-amber-50 border-2 mr-2"
        value={localKey}
        onChange={(event) => setLocalKey(event.target.value)}
      />
      <input
        className="bg-gray-800 border-amber-50 border-2 mr-2"
        type="text"
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
      />
      <button type="button" onClick={handleAddNewParam}>
        Add
      </button>
    </div>
  );
}
