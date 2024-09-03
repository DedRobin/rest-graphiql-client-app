import React from "react";
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { readonlyBasicSetup } from "./basicSetups";
import { consoleDarkInit } from "@uiw/codemirror-theme-console";
import { ReactCodeMirrorProps } from "@uiw/react-codemirror/src";

export function ResponseEditor({
  error,
  value,
  isLoading,
}: {
  error: string;
  value: string;
  isLoading: boolean;
}) {
  const dataToDisplay =
    (isLoading && "Loading...") || error || value || "No data";

  const editorConfigs: ReactCodeMirrorProps = {
    value: dataToDisplay,
    basicSetup: readonlyBasicSetup,
    theme: consoleDarkInit({
      settings: {
        background: "#121212",
      },
    }),
    extensions: [EditorState.readOnly.of(true), EditorView.lineWrapping],
  };

  return <CodeMirror {...editorConfigs} />;
}
