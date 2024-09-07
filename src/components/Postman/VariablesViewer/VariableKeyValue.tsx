import React, { useState } from "react";
import {
  createDateKey,
  parseDateKey,
} from "@/components/Postman/VariablesViewer/utils";

export function VariableKeyValue({
  dateKey,
  value,
  changeValueOnBlur,
  changeKeyOnBlur,
  deleteVariable,
}: {
  dateKey: string;
  value: string;
  changeKeyOnBlur: (dateKey: string, newDateKey: string) => void;
  changeValueOnBlur: (dateKey: string, newValue: string) => void;
  deleteVariable: (dateKey: string) => void;
}) {
  const [date, key] = parseDateKey(dateKey);

  const [localKey, setLocalKey] = useState(key);
  const [localValue, setLocalValue] = useState(value);

  function onBlurKey(newKey: string) {
    const newDateKey = createDateKey(date, newKey);
    if (dateKey === newDateKey) {
      return;
    }
    changeKeyOnBlur(dateKey, newDateKey);
  }

  function onBlurValue(newValue: string) {
    if (value === newValue) {
      return;
    }
    changeValueOnBlur(dateKey, newValue);
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
      <button type="button" onClick={() => deleteVariable(dateKey)}>
        Delete
      </button>
    </div>
  );
}
