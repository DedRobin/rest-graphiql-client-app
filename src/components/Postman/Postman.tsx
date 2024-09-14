"use client";

import React from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { usePostman } from "@/components/Postman/usePostman";
import { ParamsEditor } from "@/components/ParamsEditor/ParamsEditor";
import {
  HttpMethod,
  isMethodWithBody,
  isMethodWithSearchParams,
} from "@/types/Method";
import { BodyEditor } from "@/components/Postman/BodyEditor";
import { PostmanURLState } from "@/components/Postman/types";
import { Button } from "../UI/buttons/Button";
import { PrettifyIcon } from "../UI/buttons/PrettifyIcon";
import { ExecuteIcon } from "../UI/buttons/ExecuteIcon";
import { ListInput } from "@/components/UI/Inputs/ListInput/ListInput";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";
import Image from "next/image";
import { cn } from "@/utils/cn";

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
    <div className="col-span-8 grid grid-cols-8 gap-6 h-full">
      <div className="flex-container max-w-none w-full col-span-8 md:col-span-3 lg:col-span-2 flex flex-col gap-4 py-8">
        <h2>Restfull Client</h2>
        <div className="flex flex-col gap-4">
          <ListInput
            label="Method"
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            options={["GET", "POST", "PUT", "PATCH", "DELETE"]}
            name="method"
          />
          {/* Поле для Endpoint */}
          <div className="flex items-center gap-4">
            <TextInput
              label="Endpoint URL"
              placeholder="Endpoint"
              defaultValue={endpoint}
              onBlur={(event) => setEndpoint(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="relativ lg:col-start-3 lg:col-span-6 md:col-start-4 md:col-span-5 pb-8 flex flex-col h-[calc(100vh-64px)] sm:col-span-8">
        <div className="flex justify-between w-full mb-4 pt-8">
          <div className="flex gap-4 w-[calc(100%-96px)] items-center">
            <Image src="/icons/link.svg" alt="Link" width={24} height={24} />
            <h3 className="text-mediumGray truncate">{endpoint}</h3>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              title="Execute"
              onClick={executeQuery}
              IconComponent={ExecuteIcon}
            ></Button>
            <Button
              title="Prettify"
              onClick={prettify}
              IconComponent={PrettifyIcon}
            ></Button>
          </div>
        </div>
        <div className="flex flex-1 lg:flex-row gap-6 overflow-hidden sm:flex-col">
          {/* Request Column */}
          <div className="flex flex-col gap-2 overflow-hidden w-full">
            <div className="sticky top-0 z-10">
              <h5 className="text-green">Request</h5>
            </div>
            <div className="custom-scroll flex-1 overflow-auto pr-2 flex flex-col gap-2">
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
              <ParamsEditor
                params={variables}
                setParams={setVariables}
                title="Variables"
              />
              {isMethodWithBody(method) && (
                <BodyEditor setPostBody={setPostBody} postBody={postBody} />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-hidden w-full">
            <div className="sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <h5 className="text-green">Response</h5>
                <h6
                  className={cn(
                    "text-mediumGray",
                    { "text-darkGreen": response.status === 200 },
                    { "text-red": response.status === 400 },
                  )}
                >
                  {response.status || "No status"}
                </h6>
              </div>
            </div>
            <div className="custom-scroll flex-1 overflow-auto pr-2 flex flex-col gap-2">
              <h6 className="mt-1">Body</h6>
              <ReadOnlyEditor value={responseValue} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
