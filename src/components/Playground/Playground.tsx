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
import { ErrorComponent } from "./ErrorComponent";
import { PlusIcon } from "../UI/buttons/PlusIcon";
import { TrashIcon } from "../UI/buttons/TrashIcon";

export function Playground({ urlState }: { urlState: PlaygroundURLState }) {
  const {
    endpoint,
    endpointSdl,
    variables,
    query,
    headers,
    response,
    isLoading,
    isVisibleVars,
    schema,
    executeQuery,
    setHeaders,
    setEndpoint,
    setEndpointSdl,
    setQuery,
    setVariables,
    prettify,
    setIsVisibleVars,
  } = usePlayground(urlState);

  const responseValue =
    (isLoading && "Loading...") || response.body || "No data";
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (response.error) {
      setError(response.error);
    } else {
      setError(null);
    }
  }, [response.error]);

  const [viewer, setViewer] = useState<null | React.ReactNode>(null);
  const errorCode = error?.match(/\d{3}/)?.[0] || "default";

  return (
    <>
      <div className="flex-container max-w-none w-full col-span-8 md:col-span-3 lg:col-span-2 flex flex-col gap-4 py-8 h-auto">
        <h2>GraphiQL Editor</h2>
        <div className="flex flex-col gap-4 h-fit">
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
      <div className="relative lg:col-start-3 lg:col-span-6 md:col-start-4 md:col-span-5 pb-8 flex flex-col h-[calc(100vh-64px)] col-span-8">
        <div className="flex justify-between w-full mb-4 pt-8">
          <div className="flex gap-4 w-[calc(100%-96px)] items-center">
            <Image src="/icons/link.svg" alt="Link" width={24} height={24} />
            <h3 className="text-mediumGray truncate">{endpoint}</h3>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              title="Execute"
              onClick={executeQuery} // Обновленная функция
              IconComponent={ExecuteIcon}
            />
            <Button
              title="Prettify"
              onClick={prettify}
              IconComponent={PrettifyIcon}
            />
          </div>
        </div>

        <div className="flex flex-1 lg:flex-row gap-6 overflow-hidden flex-col">
          {/* Request Column */}
          <div className="flex flex-col gap-3 overflow-hidden w-full">
            <div className="sticky top-0 z-10">
              <h5 className="text-green">Request</h5>
            </div>
            <div className="custom-scroll flex-1 overflow-auto pr-2 flex flex-col gap-3">
              <ParamsEditor
                params={headers}
                setParams={setHeaders}
                title="Headers"
                readOnlyItems={1}
              />

              <h6 className="mt-1">Query</h6>
              <EditableEditor
                value={query}
                setValueOnBlur={setQuery}
                extensions={schema ? graphql(schema) : undefined}
              />

              <div className="flex flex-col">
                <div className="flex justify-between items-center pr-3">
                  <h6 className="mt-1">Variables</h6>
                  {/* Кнопка для показа/скрытия секции переменных */}
                  <Button
                    title={isVisibleVars ? "Hide Variables" : "Show Variables"}
                    onClick={() => {
                      console.log(!isVisibleVars);
                      setIsVisibleVars(!isVisibleVars);
                    }}
                    IconComponent={isVisibleVars ? TrashIcon : PlusIcon}
                  />
                </div>
                {/* Секция переменных, показывается по клику на кнопку */}
                {isVisibleVars && (
                  <div className="mt-2">
                    <EditableEditor
                      value={variables}
                      setValueOnBlur={setVariables}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Response Column */}
          <div className="flex flex-col gap-2 overflow-hidden w-full">
            <div className="sticky top-0 z-10">
              <div className="flex justify-between items-center pr-3">
                <h5 className="text-green">Response</h5>
                <div className="flex flex-row gap-1">
                  {response.status && (
                    <span className="text-mediumGray">Status:</span>
                  )}
                  <h6
                    className={cn("text-mediumGray", {
                      "text-darkGreen":
                        response.status !== undefined &&
                        response.status >= 200 &&
                        response.status < 300,
                      "text-red":
                        response.status !== undefined &&
                        response.status >= 400 &&
                        response.status < 600,
                    })}
                  >
                    {response.status ?? "No status"}
                  </h6>
                </div>
              </div>
            </div>
            <div className="custom-scroll flex-1 overflow-auto pr-2 flex flex-col gap-2">
              <h6 className="mt-1">Body</h6>
              <ReadOnlyEditor value={responseValue} />
              {error && <ErrorComponent errorCode={errorCode} />}
            </div>
          </div>
        </div>
        {viewer}
      </div>
    </>
  );
}
