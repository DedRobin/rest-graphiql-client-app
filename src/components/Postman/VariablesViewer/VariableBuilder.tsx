import React, { useState } from "react";

export function VariableBuilder({
  tryAddNewVariable,
}: {
  tryAddNewVariable: (key: string, value: string) => boolean;
}) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  function handleAddNewVariable() {
    if (tryAddNewVariable(key, value)) {
      setKey("");
      setValue("");
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          className="bg-black"
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
        <input
          className="bg-black"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="button" onClick={handleAddNewVariable}>
          Add
        </button>
      </div>
    </div>
  );
}
