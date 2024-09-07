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

import { TempButton } from "@/components/UI/TempButton";
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

  return (
    <>
      <div className="col-span-8 sm:col-span-8 md:col-span-4 lg:col-span-2 h-full flex flex-col gap-4 py-8">
        {/* Поля для ввода */}
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
          {/* Схема отображается сразу при загрузке */}
          {schema && <SchemaViewer schema={schema} />}
        </div>
      </div>
      <div className="lg:col-start-3 lg:col-span-6 py-8">
        <div className="flex gap-4">
          <h3 className="text-mediumGray">{inputValue}</h3>
          <TempButton title="Prettify" onClick={prettify}>
            Prettify
          </TempButton>
          <TempButton title="Execute" onClick={executeQuery}>
            Execute
          </TempButton>
        </div>
        {/* Редакторы для переменных, запросов и заголовков */}
        <div className=" grid grid-cols-2 gap-6">
          <div className="  lg:col-span-1 flex flex-col gap-2 mt-4">
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
            <h6 className="mt-1">Headers</h6>
            <textarea
              rows={8}
              placeholder="Headers"
              defaultValue={headers.toString()}
            />
          </div>
          <div className="lg:col-start-2  lg:col-span-1 flex flex-col gap-2 mt-4">
            <div className="lg:col-span-1 flex flex-row justify-between gap-2 w-full">
              <h5>Response</h5>
              <h6
                className={
                  response.status === 200
                    ? "text-green"
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
