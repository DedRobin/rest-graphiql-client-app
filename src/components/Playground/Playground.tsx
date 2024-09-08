// import { TempButton } from "@/components/UI/TempButton";
// import {
//   PlaygroundSettings,
//   usePlayground,
// } from "@/components/Playground/usePlayground";
// import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";
// import { graphql } from "cm6-graphql";
// import { EditableEditor } from "@/components/Editors/EditableEditor";
// import React from "react";
// import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";

// export function Playground({ settings }: { settings: PlaygroundSettings }) {
//   const {
//     endpoint,
//     schema,
//     getSchema,
//     query,
//     executeQuery,
//     response,
//     variables,
//     setNewSetting,
//     headers,
//     isLoading,
//     prettify,
//   } = usePlayground(settings);

//   const responseValue =
//     (isLoading && "Loading...") || response.error || response.body || "No data";

//   return (
//     <div>
//       <div className={"flex gap-2"}>
//         <TempButton title="Prettify" onClick={prettify}>
//           Prettify
//         </TempButton>
//         <TempButton title="Execute" onClick={executeQuery}>
//           Execute
//         </TempButton>
//         <TempButton title="Schema" onClick={getSchema}>
//           Schema
//         </TempButton>
//         <input
//           type="text"
//           placeholder="Endpoint"
//           defaultValue={endpoint}
//           onBlur={(event) => setNewSetting("endpoint", event.target.value)}
//         />
//       </div>
//       <div>
//         {/*VariablesEditor*/}
//         <EditableEditor
//           value={variables}
//           setValueOnBlur={(newValue) => setNewSetting("variables", newValue)}
//         />
//         {/*QueryEditor*/}
//         <EditableEditor
//           value={query}
//           setValueOnBlur={(newValue) => setNewSetting("query", newValue)}
//           extensions={schema ? graphql(schema) : undefined}
//         />
//         {/*Response*/}
//         <ReadOnlyEditor value={responseValue} />
//         <textarea
//           rows={8}
//           placeholder="Headers"
//           defaultValue={headers.toString()}
//         />
//       </div>
//       {schema && <SchemaViewer schema={schema} />}
//     </div>
//   );
// }
"use client";

import {
  PlaygroundSettings,
  usePlayground,
} from "@/components/Playground/usePlayground";
import { SchemaViewer } from "@/components/Playground/SchemaViewer/SchemaViewer";
import { graphql } from "cm6-graphql";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput"; // Импорт TextInput
import React, { useState, useEffect } from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { Button } from "../UI/buttons/Button/Button";
import { ExecuteIcon } from "../UI/buttons/Button/ExecuteIcon";
import { Prettify } from "../UI/buttons/Button/prettify";
import { ReadonlyURLSearchParams } from "next/navigation";
import { PlusIcon } from "../UI/buttons/Button/PlusIcon";
import { TrashIcon } from "../UI/buttons/Button/TrashIcon";

// Определение типа для заголовков
type Header = {
  key: string;
  value: string;
};

// Дефолтные заголовки
const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer token",
};

const parseHeaders = (
  headers: ReadonlyURLSearchParams,
): Record<string, string> => {
  const headersObject: Record<string, string> = {};
  headers.forEach((value, key) => {
    headersObject[key] = value;
  });
  return headersObject;
};

// Преобразование объекта заголовков в массив
const convertHeadersObjectToList = (
  headersObject: Record<string, string>,
): Header[] => {
  return Object.entries(headersObject).map(([key, value]) => ({ key, value }));
};

export function Playground({ settings }: { settings: PlaygroundSettings }) {
  const {
    endpoint,
    schema,
    getSchema,
    query,
    executeQuery,
    response,
    variables,
    setNewSetting,
    headers,
    isLoading,
    prettify,
  } = usePlayground(settings);

  const [inputValue, setInputValue] = useState(endpoint);
  const [sdlValue, setSdlValue] = useState(""); // Для SDL URL
  const [headersList, setHeadersList] = useState<Header[]>(
    convertHeadersObjectToList({
      ...defaultHeaders,
      ...parseHeaders(headers),
    }),
  );
  useEffect(() => {
    if (!schema) {
      getSchema(); // Получить схему сразу при загрузке компонента
    }
  }, [schema, getSchema]);

  const responseValue =
    (isLoading && "Loading...") || response.error || response.body || "No data";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSdlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSdlValue(event.target.value);
  };

  const handleBlur = () => {
    setNewSetting("endpoint", inputValue);
  };

  const handleHeaderChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const newHeadersList = [...headersList];
    newHeadersList[index] = { ...newHeadersList[index], [field]: value };
    setHeadersList(newHeadersList);
  };

  const addHeader = () => {
    setHeadersList([...headersList, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setHeadersList(headersList.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="col-span-8 sm:col-span-8 md:col-span-4 lg:col-span-2 h-full flex flex-col gap-4 py-8">
        <h2>GraphiQL Editor</h2>
        <div className="flex flex-col gap-4">
          {/* Поле для Endpoint */}
          <div className="flex items-center gap-4">
            <TextInput
              label="Endpoint URL"
              placeholder="Endpoint"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </div>

          {/* Поле для SDL URL */}
          <div className="flex items-center gap-4">
            <TextInput
              label="SDL URL"
              placeholder="SDL"
              value={sdlValue}
              onChange={handleSdlChange}
              onBlur={handleBlur}
            />
          </div>
          {schema && <SchemaViewer schema={schema} />}
        </div>
      </div>
      <div className="lg:col-start-3 lg:col-span-6 py-8">
        <div className="flex gap-2 justify-between w-full">
          <h3 className="text-mediumGray">{inputValue}</h3>
          <div className="flex gap-1">
            <Button
              title="Execute"
              onClick={executeQuery}
              IconComponent={ExecuteIcon}
            ></Button>
            <Button
              title="Prettify"
              onClick={prettify}
              IconComponent={Prettify}
            ></Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-2 mt-4">
            <h5>Request</h5>
            <h6 className="mt-1">Variables</h6>
            <EditableEditor
              value={variables}
              setValueOnBlur={(newValue) =>
                setNewSetting("variables", newValue)
              }
            />
            <h6 className="mt-1">Query</h6>
            <EditableEditor
              value={query}
              setValueOnBlur={(newValue) => setNewSetting("query", newValue)}
              extensions={schema ? graphql(schema) : undefined}
            />
            <div className="mt-1">
              <div className="flex flex-row justify-between gap-2 w-full items-center mb-2">
                <h6>Headers</h6>
                <Button
                  title="Add"
                  onClick={addHeader}
                  IconComponent={PlusIcon}
                ></Button>
              </div>
              <div className="bg-darkGray px-3 py-2 flex flex-col gap-1.5 w-full">
                {headersList.map((header, index) => (
                  <div key={index} className="flex gap-2 items-center w-full">
                    <TextInput
                      className="bg-darkGray"
                      placeholder="Header Key"
                      value={header.key}
                      onChange={(e) =>
                        handleHeaderChange(index, "key", e.target.value)
                      }
                    />
                    <TextInput
                      className="bg-darkGray"
                      placeholder="Header Value"
                      value={header.value}
                      onChange={(e) =>
                        handleHeaderChange(index, "value", e.target.value)
                      }
                    />
                    <Button
                      title="Remove"
                      onClick={() => removeHeader(index)}
                      IconComponent={TrashIcon}
                    ></Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-start-2 lg:col-span-1 flex flex-col gap-2 mt-4">
            <div className="lg:col-span-1 flex flex-row justify-between gap-2 w-full items-center">
              <h5>Response</h5>
              <h6
                className={
                  response.status === 200
                    ? "text-darkGreen"
                    : response.status === 400
                      ? "text-red"
                      : "text-mediumGray"
                }
              >
                {response.status || "No status"}
              </h6>
            </div>

            <h6 className="mt-1">Body</h6>
            <ReadOnlyEditor value={responseValue} />
          </div>
        </div>
      </div>
    </>
  );
}
