import { usePlayground } from "@/components/Playground/usePlayground";
import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";
import { graphql } from "cm6-graphql";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import React, { useState } from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import Image from "next/image";
import { ParamsEditor } from "@/components/ParamsEditor/ParamsEditor";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";
import { Button } from "@/components/UI/buttons/Button";
import { ExecuteIcon } from "@/components/UI/buttons/ExecuteIcon";
import { PrettifyIcon } from "@/components/UI/buttons/PrettifyIcon";
import { cn } from "@/utils/cn";
import { PlaygroundURLState } from "@/components/Playground/types";

export function Playground({ urlState }: { urlState: PlaygroundURLState }) {
  const {
    endpoint,
    endpointSdl,
    variables,
    query,
    headers,
    response,
    isLoading,
    schema,
    executeQuery,
    setHeaders,
    setEndpoint,
    setEndpointSdl,
    setQuery,
    setVariables,
    prettify,
  } = usePlayground(urlState);

  const responseValue =
    (isLoading && "Loading...") || response.error || response.body || "No data";

  const [viewer, setViewer] = useState<null | React.ReactNode>(null);

  return (
    <>
      <div className="col-span-8 md:col-span-3 lg:col-span-2 flex flex-col gap-4 py-8">
        <h2>GraphiQL Editor</h2>
        <div className="flex flex-col gap-4">
          {/* Поле для Endpoint */}
          <div className="flex items-center gap-4">
            <TextInput
              label="Endpoint URL"
              placeholder="Endpoint"
              defaultValue={endpoint}
              onBlur={(e) => setEndpoint(e.target.value)}
            />
          </div>

          {/* Поле для SDL URL */}
          <div className="flex items-center gap-4">
            <TextInput
              label="SDL URL"
              placeholder="SDL"
              defaultValue={endpointSdl}
              onBlur={(e) => setEndpointSdl(e.target.value)}
            />
          </div>
          {schema && <SchemaViewer schema={schema} setViewer={setViewer} />}
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
              <h6 className="mt-1">Variables</h6>
              <EditableEditor value={variables} setValueOnBlur={setVariables} />
              <h6 className="mt-1">Query</h6>
              <EditableEditor
                value={query}
                setValueOnBlur={setQuery}
                extensions={schema ? graphql(schema) : undefined}
              />
              <ParamsEditor
                params={headers}
                setParams={setHeaders}
                title="Headers"
                readOnlyItems={1}
              />
            </div>
          </div>

          {/* Response Column */}
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
        {viewer}
      </div>
    </>
  );
}
