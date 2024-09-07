import React from "react";
import { consoleDarkInit } from "@uiw/codemirror-theme-console";
import { ReactCodeMirrorProps } from "@uiw/react-codemirror/src";
import CodeMirror, {
  EditorView,
  Extension,
  ViewUpdate,
} from "@uiw/react-codemirror";
import { BasicSetupOptions } from "@uiw/codemirror-extensions-basic-setup";
import { BACKGROUND_COLOR } from "@/constants/colors";

const basicSetup: BasicSetupOptions = {
  highlightActiveLine: true,
  autocompletion: true,
  foldGutter: true,
  dropCursor: true,
  allowMultipleSelections: true,
  indentOnInput: true,
  bracketMatching: true,
  closeBrackets: true,
  lintKeymap: true,
};

export function EditableEditor({
  value,
  setValueOnBlur,
  extensions,
}: {
  value: string;
  setValueOnBlur: (newValue: string) => void;
  extensions?: Extension[];
}) {
  const editorConfigs: ReactCodeMirrorProps = {
    value,
    basicSetup,
    theme: consoleDarkInit({
      settings: {
        background: BACKGROUND_COLOR,
        gutterBackground: BACKGROUND_COLOR,
        lineHighlight: "transparent",
      },
    }),

    extensions: [
      EditorView.lineWrapping,
      EditorView.updateListener.of((v: ViewUpdate) => {
        // по логике надо писать v.docChanged , но работает именно с !
        if (!v.view.hasFocus && !v.docChanged) {
          setValueOnBlur(v.state.doc.toString());
        }
      }),
      extensions ?? [],
    ].flat(),
    // width: "800px",
  };

  return <CodeMirror {...editorConfigs} />;
}
