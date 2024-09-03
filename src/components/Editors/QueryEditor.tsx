import React from "react";
import { graphql } from "cm6-graphql";
import { GraphQLSchema } from "graphql";
import { consoleDarkInit } from "@uiw/codemirror-theme-console";
import { ReactCodeMirrorProps } from "@uiw/react-codemirror/src";
import CodeMirror, { EditorView, ViewUpdate } from "@uiw/react-codemirror";
import { editorBasicSetup } from "@/components/Editors/basicSetups";

export function QueryEditor({
  schema,
  query,
  setQuery,
}: {
  schema: GraphQLSchema | undefined;
  query: string;
  setQuery: (newQuery: string) => void;
}) {
  const editorConfigs: ReactCodeMirrorProps = {
    value: query,
    basicSetup: editorBasicSetup,
    theme: consoleDarkInit({
      settings: {
        background: "#121212",
        gutterBackground: "#121212",
        lineHighlight: "transparent",
      },
    }),

    extensions: [
      EditorView.lineWrapping,
      EditorView.updateListener.of((v: ViewUpdate) => {
        if (!v.view.hasFocus && !v.docChanged) {
          setQuery(v.state.doc.toString());
        }
      }),
      schema ? graphql(schema) : [],
    ].flat(),
  };

  return <CodeMirror {...editorConfigs} />;
}
