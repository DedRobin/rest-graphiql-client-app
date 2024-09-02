import React from "react";
import { GraphQLField } from "graphql";
import { TypeToDisplay } from "./types";

export function QueriesTab({
  queries,
  setOpenedTypes,
}: {
  queries: GraphQLField<unknown, unknown, unknown>[];
  setOpenedTypes: React.Dispatch<React.SetStateAction<TypeToDisplay[]>>;
}) {
  return (
    <div>
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
    </div>
  );
}
