import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { usePostman } from "@/components/Postman/usePostman";
import { ParamsEditor } from "@/components/ParamsEditor/ParamsEditor";
import {
  HttpMethod,
  isMethodWithBody,
  isMethodWithSearchParams,
} from "@/types/Method";
import { PostBodyEditor } from "@/components/Postman/PostBodyEditor";
import { PostmanURLState } from "@/components/Postman/types";
import { Button } from "../UI/buttons/Button";
import { PrettifyIcon } from "../UI/buttons/PrettifyIcon";
import { ExecuteIcon } from "../UI/buttons/ExecuteIcon";

export function Postman({ urlState }: { urlState: PostmanURLState }) {
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
    setEndpoint,
    setHeaders,
    setSearchParams,
    setPostBody,
    setVariables,
    executeQuery,
    prettify,
  } = usePostman(urlState);

  const responseValue =
    (isLoading && "Loading...") || response.error || response.body || "No data";

  return (
    <div>
      <div className={"flex gap-2 w-[800px]"}>
        <select
          className="text-black"
          value={method}
          onChange={(event) => setMethod(event.target.value as HttpMethod)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          className="bg-gray-800 w-[800px]"
          type="text"
          placeholder="Endpoint"
          defaultValue={endpoint}
          onBlur={(event) => setEndpoint(event.target.value)}
        />
        <Button
          title="Execute"
          onClick={executeQuery}
          IconComponent={ExecuteIcon}
        />
        {method === "POST" && (
          <Button
            title="Prettify"
            onClick={prettify}
            IconComponent={PrettifyIcon}
          />
        )}
      </div>
      <div>
        <ParamsEditor
          params={headers}
          setParams={setHeaders}
          title="Headers"
          readOnlyItems={isMethodWithBody(method) ? 1 : 0}
        />
        {isMethodWithSearchParams(method) && (
          <ParamsEditor
            params={searchParams}
            setParams={setSearchParams}
            title="Search Params"
          />
        )}
        {isMethodWithBody(method) && (
          <PostBodyEditor postBody={postBody} setPostBody={setPostBody} />
        )}
        <ParamsEditor
          params={variables}
          setParams={setVariables}
          title="Variables"
        />
        {/*Response*/}
        <ReadOnlyEditor value={responseValue} />
      </div>
    </div>
  );
}
