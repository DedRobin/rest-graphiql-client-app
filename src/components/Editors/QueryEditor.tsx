import React from "react";
import { graphql } from "cm6-graphql";
import { GraphQLSchema } from "graphql";
import { EditableEditor } from "@/components/Editors/EditableEditor";

export function QueryEditor({
  schema,
  query,
  setQuery,
}: {
  schema: GraphQLSchema | undefined;
  query: string;
  setQuery: (newQuery: string) => void;
}) {
  return (
    <EditableEditor
      value={query}
      setValueOnBlur={setQuery}
      extensions={schema ? graphql(schema) : undefined}
    />
  );
}
