import React from "react";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import { PostBody, TypePostBody } from "@/components/Postman/types";

export function PostBodyEditor({
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
      <label>
        <input
          type="radio"
          name="radio"
          value="json"
          checked={type === "json"}
          onChange={(event) => event.target.checked && setNewType("json")}
        />
        json
      </label>
      <label>
        <input
          type="radio"
          name="radio"
          value="plane text"
          checked={type === "plane text"}
          onChange={(event) => event.target.checked && setNewType("plane text")}
        />
        text
      </label>
      <EditableEditor value={data} setValueOnBlur={setNewData} />
    </div>
  );
}
