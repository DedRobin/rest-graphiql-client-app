import { GraphQLSchema } from "graphql";
import React, { useEffect, useState } from "react";
import { TypeToDisplay } from "@/components/Playground/SchemaViewer/types";
import { QueriesTab } from "@/components/Playground/SchemaViewer/QueriesTab";
import { TypeTab } from "@/components/Playground/SchemaViewer/TypeTab/TypeTab";
import { Button } from "@/components/UI/buttons/Button";
import { CrossIcon } from "@/components/UI/buttons/CrossIcon";

export function SchemaViewer({
  schema,
  setViewer,
}: {
  schema: GraphQLSchema;
  setViewer: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}) {
  const [openedTypes, setOpenedTypes] = useState<TypeToDisplay[]>([]);

  const queryType = schema.getQueryType();
  const queries = queryType ? Object.values(queryType.getFields()) : [];

  function addNewTypeToDisplay(newType: TypeToDisplay, tabIndex: number) {
    setOpenedTypes((prevOpenedTypes) => {
      const arrFront = prevOpenedTypes.slice(0, tabIndex + 1);
      if (prevOpenedTypes[tabIndex + 1] === newType) return [...arrFront];
      return [...arrFront, newType];
    });
  }

  function closeViewer() {
    setOpenedTypes([]);
  }

  useEffect(() => {
    const viewer =
      openedTypes.length === 0 ? null : (
        <div className="w-full h-full flex flex-row fixed z-50 bg-black">
          <div className="fixed right-12 top-20 z-1000">
            <Button
              title="Close"
              onClick={closeViewer}
              IconComponent={CrossIcon}
            ></Button>
          </div>
          {openedTypes.map((openedType, index, array) => {
            return (
              <TypeTab
                key={index}
                typeToDisplay={openedType}
                tabIndex={index}
                addNewTypeToDisplay={addNewTypeToDisplay}
                nextType={index + 1 < array.length ? array[index + 1] : null}
              />
            );
          })}
        </div>
      );
    setViewer(viewer);
  }, [openedTypes, setViewer]);

  if (!queries.length) {
    return <p>No queries in schema!</p>;
  }

  return (
    <div className="w-full flex flex-col">
      <QueriesTab
        queries={queries}
        openedTypes={openedTypes}
        setOpenedTypes={setOpenedTypes}
      />
    </div>
  );
}
