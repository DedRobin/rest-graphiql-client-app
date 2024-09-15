import React, { useCallback, useRef, useEffect } from "react";
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
  const editorRef = useRef<EditorView | null>(null);
  const prevValueRef = useRef<string>(value);

  const handleChange = useCallback(
    (newValue: string, viewUpdate: ViewUpdate) => {
      if (!viewUpdate.view.hasFocus && newValue !== prevValueRef.current) {
        setValueOnBlur(newValue);
        prevValueRef.current = newValue;
      }
    },
    [setValueOnBlur],
  );

  useEffect(() => {
    if (editorRef.current && value !== prevValueRef.current) {
      const doc = editorRef.current.state.doc;
      const transaction = editorRef.current.state.update({
        changes: { from: 0, to: doc.length, insert: value },
      });
      editorRef.current.dispatch(transaction);
      prevValueRef.current = value;
    }
  }, [value]);

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
        handleChange(v.state.doc.toString(), v);
      }),
      ...(extensions ?? []),
    ],
    onCreateEditor: (view) => {
      editorRef.current = view;
    },
  };

  return <CodeMirror {...editorConfigs} />;
}
