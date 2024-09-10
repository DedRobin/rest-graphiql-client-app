import React from "react";
import { GraphQLField } from "graphql";
import { TypeToDisplay } from "./types";
import { Field } from "@/components/Playground/SchemaViewer/ui/Field";

export function QueriesTab({
  queries,
  openedTypes,
  setOpenedTypes,
}: {
  queries: GraphQLField<unknown, unknown, unknown>[];
  openedTypes: TypeToDisplay[];
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
}) {
  const [firstOpenedType] = openedTypes;
  return (
    <>
      <h5 className="text-green pb-1">Schema queries</h5>
      <div className="custom-scroll max-h-[calc(100vh-464px)] overflow-y-auto pr-2">
        <ul>
          {queries.map((field) => {
            const isActive = field === firstOpenedType;
            return (
              <li key={field.name} className={isActive ? "active-class" : ""}>
                <Field
                  name={`${field.name}`}
                  type={`${field.type.toString()}`}
                  isOpen={isActive}
                  onClick={() => setOpenedTypes(isActive ? [] : [field])}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <h3>Queries</h3>
      <ul>
        {queries.map((field) => {
          return (
            <li key={field.name} onClick={() => setOpenedTypes([field])}>
              <p>
                name={field.name}: {field.type.toString()}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
