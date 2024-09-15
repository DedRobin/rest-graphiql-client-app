import React from "react";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import { PostBody, TypePostBody } from "@/components/Postman/types";
import { RadioButton } from "@/components/UI/Inputs/RadioButton/RadioButton";

export function BodyEditor({
  postBody,
  setPostBody,
}: {
  postBody: PostBody;
  setPostBody: (newPostBody: PostBody) => void;
}) {
  const { data, type } = postBody;

  function setNewData(newData: string) {
    setPostBody({ type, data: newData });
  }

  function setNewType(newType: TypePostBody) {
    setPostBody({ type: newType, data });
  }

  return (
    <div>
      <h6 className="mt-1 mb-2">Body</h6>
      <EditableEditor value={data} setValueOnBlur={setNewData} />
      <div className="flex flex-row gap-2 mt-1.5">
        <RadioButton
          value="json"
          checked={type === "json"}
          onChange={(event) => event.target.checked && setNewType("json")}
          label="JSON"
        />
        <RadioButton
          value="plain text"
          checked={type === "plane text"}
          onChange={(event) => event.target.checked && setNewType("plane text")}
          label="Text"
        />
      </div>
    </div>
  );
}
