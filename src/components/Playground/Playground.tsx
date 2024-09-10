import {
  PlaygroundSettings,
  usePlayground,
} from "@/components/Playground/usePlayground";
import { graphql } from "cm6-graphql";
import { EditableEditor } from "@/components/Editors/EditableEditor";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";
import React, { useState, useEffect } from "react";
import { ReadOnlyEditor } from "@/components/Editors/ReadOnlyEditor";
import { Button } from "../UI/buttons/Button/Button";
import { ExecuteIcon } from "../UI/buttons/Button/ExecuteIcon";
import { Prettify } from "../UI/buttons/Button/prettify";
import { ReadonlyURLSearchParams } from "next/navigation";
import { PlusIcon } from "../UI/buttons/Button/PlusIcon";
import { TrashIcon } from "../UI/buttons/Button/TrashIcon";
import { Sidebar } from "./SchemaViewer/Sidebar";
import { Accordion } from "./SchemaViewer/Accordion";
import { TypeToDisplay } from "./SchemaViewer/types";
import Image from "next/image";

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
  const [openedTypes, setOpenedTypes] = useState<TypeToDisplay[]>([]);
  const [isAccordionVisible, setIsAccordionVisible] = useState(false);
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

  const addNewTypeToDisplay = (newType: TypeToDisplay, tabIndex: number) => {
    setOpenedTypes((prevOpenedTypes) => {
      const arrFront = prevOpenedTypes.slice(0, tabIndex + 1);
      return [...arrFront, newType];
    });
    setIsAccordionVisible(true);
  };

  return (
    <>
      <div className="sm:col-span-8 lg:col-span-2 flex flex-col gap-4 py-8">
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
          {schema && (
            <Sidebar
              queries={Object.values(schema.getQueryType()?.getFields() || [])}
              openedTypes={openedTypes}
              setOpenedTypes={setOpenedTypes}
              setIsAccordionVisible={setIsAccordionVisible}
            />
          )}
        </div>
      </div>

      <div className="relativ lg:col-start-3 lg:col-span-6 pb-8 flex flex-col h-[calc(100vh-64px)] sm:col-span-8">
        <div className="flex justify-between w-full mb-4 pt-8">
          <div className="flex gap-4">
            <Image
              src="/icons/link.svg" // Путь к изображению в папке public
              alt="Link"
              width={24} // Укажите нужную ширину
              height={24} // Укажите нужную высоту
            />

            <h3 className="text-mediumGray">{inputValue}</h3>
          </div>
          <div className="flex gap-4">
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
        <div className="flex flex-1 lg:flex-row gap-6 overflow-hidden sm:flex-col">
          {/* Request Column */}
          <div className="flex flex-col gap-2 overflow-hidden w-full">
            <div className="sticky top-0 z-10">
              <h5 className="text-green">Request</h5>
            </div>
            <div className="custom-scroll flex-1 overflow-auto pr-2 flex flex-col gap-2">
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
                <div className="flex justify-between items-center mb-2">
                  <h6>Headers</h6>
                  <Button
                    title="Add"
                    onClick={addHeader}
                    IconComponent={PlusIcon}
                  ></Button>
                </div>
                <div className="bg-darkGray px-3 py-2 flex flex-col gap-1.5 overflow-auto">
                  {headersList.map((header, index) => (
                    <div key={index} className="flex gap-2 items-center">
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
          </div>

          {/* Response Column */}
          <div className="flex flex-col gap-2 overflow-hidden w-full">
            <div className="sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <h5 className="text-green">Response</h5>
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
            </div>
            <div className="custom-scroll flex-1 overflow-auto pr-2 flex flex-col gap-2">
              <h6 className="mt-1">Body</h6>
              <ReadOnlyEditor value={responseValue} />
            </div>
          </div>
        </div>
        {isAccordionVisible && (
          <Accordion
            openedTypes={openedTypes}
            setOpenedTypes={setOpenedTypes}
            addNewTypeToDisplay={addNewTypeToDisplay}
            setIsAccordionVisible={setIsAccordionVisible}
          />
        )}
      </div>
    </>
  );
}
