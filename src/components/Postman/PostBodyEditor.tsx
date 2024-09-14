import React from "react";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import { PostBody, TypePostBody } from "@/components/Postman/types";
import { RadioButton } from "../UI/Inputs/RadioButton/RadioButton";

const hardcodedPostBody: PostBody = { type: "json", data: '{"key": "value"}' };

export function PostBodyEditor() {
  const { data, type } = hardcodedPostBody;

  function setNewData(newData: string) {
    // temporarily
    console.log({ type, data: newData });
  }

  function setNewType(newType: TypePostBody) {
    // temporarily
    console.log({ type: newType, data });
  }

  return (
    <div>
      <h6 className="mt-1 mb-2">Body</h6>
      <EditableEditor value={data} setValueOnBlur={setNewData} />
      <div className="flex flex-row gap-2 mt-1.5">
        <RadioButton
          value="json"
          checked={type === "json"}
          onChange={() => setNewType("json")}
          label="JSON"
        />
        <RadioButton
          value="plain text"
          checked={type === "plain text"}
          onChange={() => setNewType("plain text")}
          label="Text"
        />
      </div>
    </div>
  );
}
