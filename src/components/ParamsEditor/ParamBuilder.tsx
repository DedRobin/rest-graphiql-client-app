import React, { useState } from "react";
import { createDateKey } from "@/utils/paramsUtils";

export function ParamBuilder({
  addNewParam,
}: {
  addNewParam: (dateKey: string, value: string) => void;
}) {
  const [localKey, setLocalKey] = useState("");
  const [localValue, setLocalValue] = useState("");

  function handleAddNewParam() {
    if (!localKey && !localValue) {
      return;
    }
    const date = new Date().valueOf().toString();
    const dateKey = createDateKey(date, localKey);
    addNewParam(dateKey, localValue);
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
