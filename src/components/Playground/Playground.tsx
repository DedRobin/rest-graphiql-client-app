import { usePlayground } from "@/components/Playground/usePlayground";
import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";
import { graphql } from "cm6-graphql";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import React, { useState } from "react";
import Image from "next/image";
import { ParamsEditor } from "@/components/ParamsEditor/ParamsEditor";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";
import { Button } from "@/components/UI/buttons/Button";
import { ExecuteIcon } from "@/components/UI/buttons/ExecuteIcon";
import { PrettifyIcon } from "@/components/UI/buttons/PrettifyIcon";
import { PlaygroundURLState } from "@/components/Playground/types";
import { PlusIcon } from "../UI/buttons/PlusIcon";
import { CloseIcon } from "@/components/UI/buttons/CloseIcon";
import { json } from "@codemirror/lang-json";
import localeData from "@/services/locale/lang.json";
import { useLocale } from "@/services/locale/contex";
import { ResponseColumn } from "../ResponseColumn/ResponseColumn";

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

  const [viewer, setViewer] = useState<null | React.ReactNode>(null);
  const { language } = useLocale();

  return (
    <>
      <div className="flex-container max-w-none w-full col-span-8 md:col-span-3 lg:col-span-2 flex flex-col gap-4 py-8 h-auto">
        <h2>{localeData.playground.editor.title[language]}</h2>
        <div className="flex flex-col gap-4 h-fit">
          {/* Поле для Endpoint */}
          <div className="flex items-center gap-4">
            <TextInput
              label={localeData.playground.editor.endpointUrlLabel[language]}
              placeholder="Endpoint"
              defaultValue={endpoint}
              onBlur={(e) => setEndpoint(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <TextInput
              label={localeData.playground.editor.sdlUrlLabel[language]}
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
              title={localeData.playground.editor.executeButton[language]}
              onClick={executeQuery}
              IconComponent={ExecuteIcon}
            />
            <Button
              title={localeData.playground.editor.prettifyButton[language]}
              onClick={prettify}
              IconComponent={PrettifyIcon}
            />
          </div>
        </div>

        <div className="flex flex-1 lg:flex-row gap-6 overflow-hidden flex-col">
          {/* Request Column */}
          <div className="flex flex-col gap-3 overflow-hidden w-full">
            <div className="sticky top-0 z-10">
              <h5 className="text-green">
                {localeData.playground.editor.request[language]}
              </h5>
            </div>
            <div className="custom-scroll flex-1 overflow-auto pr-2 flex flex-col gap-3">
              <ParamsEditor
                params={headers}
                setParams={setHeaders}
                title={localeData.playground.editor.headers[language]}
                readOnlyItems={1}
              />

              <h6 className="mt-1">
                {localeData.playground.editor.query[language]}
              </h6>
              <EditableEditor
                value={query}
                setValueOnBlur={setQuery}
                extensions={schema ? graphql(schema) : undefined}
              />

              <div className="flex flex-col">
                <div className="flex justify-between items-center pr-3">
                  <h6 className="mt-1">
                    {localeData.playground.editor.variables[language]}
                  </h6>
                  {/* Кнопка для показа/скрытия секции переменных */}
                  <Button
                    title={isVisibleVars ? "Hide Variables" : "Show Variables"}
                    onClick={() => {
                      setIsVisibleVars(!isVisibleVars);
                    }}
                    IconComponent={isVisibleVars ? CloseIcon : PlusIcon}
                  />
                </div>
                {/* Секция переменных, показывается по клику на кнопку */}
                {isVisibleVars && (
                  <div className="mt-2">
                    <EditableEditor
                      value={variables}
                      setValueOnBlur={setVariables}
                      extensions={[json()]}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Response Column */}
          <ResponseColumn response={response} isLoading={isLoading} />
        </div>
        {viewer}
      </div>
    </>
  );
}
