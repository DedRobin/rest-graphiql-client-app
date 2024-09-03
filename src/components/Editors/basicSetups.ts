import { BasicSetupOptions } from "@uiw/codemirror-extensions-basic-setup";

export const editorBasicSetup: BasicSetupOptions = {
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

export const readonlyBasicSetup: BasicSetupOptions = {
  autocompletion: false,
  foldGutter: false,
  lineNumbers: false,
  bracketMatching: true,
  highlightActiveLine: false,
};
