import React, { useState } from "react";
import { createDateKey } from "@/components/Postman/VariablesViewer/utils";

export function VariableBuilder({
  addNewVariable,
}: {
  addNewVariable: (dateKey: string, value: string) => void;
}) {
  const [localKey, setLocalKey] = useState("");
  const [localValue, setLocalValue] = useState("");

  function handleAddNewVariable() {
    if (!localKey && !localValue) {
      return;
    }
    const date = new Date().valueOf().toString();
    addNewVariable(createDateKey(date, localKey), localValue);
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
      <button type="button" onClick={handleAddNewVariable}>
        Add
      </button>
    </div>
  );
}
