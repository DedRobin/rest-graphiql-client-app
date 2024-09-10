import { GraphQLSchema } from "graphql";
import { useState } from "react";
import { TypeToDisplay } from "@/components/Playground/SchemaViewer/types";
import { QueriesTab } from "@/components/Playground/SchemaViewer/QueriesTab";
import { TypeTab } from "@/components/Playground/SchemaViewer/TypeTab/TypeTab";

export function SchemaViewer({ schema }: { schema: GraphQLSchema }) {
  const [openedTypes, setOpenedTypes] = useState<TypeToDisplay[]>([]);

  const queryType = schema.getQueryType();
  const queries = queryType ? Object.values(queryType.getFields()) : [];

  const [isVisibleAccordion] = useState<boolean>(false);

  if (!queries.length) {
    return <p>No queries in schema!</p>;
  }

  function addNewTypeToDisplay(newType: TypeToDisplay, tabIndex: number) {
    setOpenedTypes((prevOpenedTypes) => {
      const arrFront = prevOpenedTypes.slice(0, tabIndex + 1);
      return [...arrFront, newType];
    });
  }

  return (
    <div className="w-full flex flex-col">
      <QueriesTab
        queries={queries}
        openedTypes={openedTypes}
        setOpenedTypes={setOpenedTypes}
      />
      {isVisibleAccordion &&
        openedTypes.map((openedType, index) => {
          return (
            <TypeTab
              key={index}
              typeToDisplay={openedType}
              tabIndex={index}
              addNewTypeToDisplay={addNewTypeToDisplay}
            />
          );
        })}
    </div>
  );
}
