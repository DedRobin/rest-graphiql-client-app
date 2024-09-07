import React, { useState } from "react";

export function VariableKeyValue({
  keyName,
  value,
  tryChangedOnBlur,
}: {
  keyName: string;
  value: string;
  tryChangedOnBlur: (
    keyName: string,
    updatingField: "key" | "value",
    newValue: string,
  ) => boolean;
}) {
  const [localKey, setLocalKey] = useState(keyName);
  const [localValue, setLocalValue] = useState(value);

  return (
    <div>
      <input
        className="bg-black"
        type="text"
        value={localKey}
        onBlur={(event) => {
          if (!tryChangedOnBlur(keyName, "key", event.target.value)) {
            setLocalKey(keyName);
          }
        }}
        onChange={(event) => setLocalKey(event.target.value)}
      />
      <input
        type="text"
        className="bg-black"
        value={localValue}
        onBlur={(event) =>
          tryChangedOnBlur(keyName, "value", event.target.value)
        }
        onChange={(event) => setLocalValue(event.target.value)}
      />
    </div>
  );
}
