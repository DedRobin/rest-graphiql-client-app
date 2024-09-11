import { TempButton } from "@/components/UI/TempButton";
import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { usePostman } from "@/components/Postman/usePostman";
import { ParamsEditor } from "@/components/ParamsEditor/ParamsEditor";
import { Method } from "@/types/Method";
import { PostBodyEditor } from "@/components/Postman/PostBodyEditor";

export function Postman() {
  const {
    method,
    endpoint,
    headers,
    searchParams,
    variables,
    postBody,
    isLoading,
    response,
    setMethod,
    executeQuery,
    setEndpoint,
    setPostBody,
    setParamsByField,
  } = usePostman();

  const responseValue =
    (isLoading && "Loading...") || response.error || response.body || "No data";

  return (
    <div>
      <div className={"flex gap-2 w-[800px]"}>
        <select
          value={method}
          onChange={(event) => setMethod(event.target.value as Method)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
        <TempButton title="Execute" onClick={executeQuery}>
          Execute
        </TempButton>
        <input
          className="bg-gray-800 w-[800px]"
          type="text"
          placeholder="Endpoint"
          defaultValue={endpoint}
          onBlur={(event) => setEndpoint(event.target.value)}
        />
      </div>
      <div>
        <ParamsEditor
          params={headers}
          setParams={(params) => setParamsByField(params, "headers")}
          title="Headers"
        />
        {method === "GET" && (
          <ParamsEditor
            params={searchParams}
            setParams={(params) => setParamsByField(params, "searchParams")}
            title="Search Params"
          />
        )}
        {method === "POST" && (
          <PostBodyEditor postBody={postBody} setPostBody={setPostBody} />
        )}
        <ParamsEditor
          params={variables}
          setParams={(params) => setParamsByField(params, "variables")}
          title="Variables"
        />
        {/*Response*/}
        <ReadOnlyEditor value={responseValue} />
      </div>
    </div>
  );
}
