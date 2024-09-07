import React from "react";
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { consoleDarkInit } from "@uiw/codemirror-theme-console";
import { ReactCodeMirrorProps } from "@uiw/react-codemirror/src";
import { BACKGROUND_COLOR } from "@/constants/colors";
import { BasicSetupOptions } from "@uiw/codemirror-extensions-basic-setup";

const basicSetup: BasicSetupOptions = {
  autocompletion: false,
  foldGutter: false,
  lineNumbers: false,
  bracketMatching: true,
  highlightActiveLine: false,
};

export function ReadOnlyEditor({ value }: { value: string }) {
  const editorConfigs: ReactCodeMirrorProps = {
    value,
    basicSetup,
    theme: consoleDarkInit({
      settings: {
        background: BACKGROUND_COLOR,
      },
    }),
    // width: "800px",
    extensions: [EditorState.readOnly.of(true), EditorView.lineWrapping],
  };

  return <CodeMirror {...editorConfigs} />;
}
