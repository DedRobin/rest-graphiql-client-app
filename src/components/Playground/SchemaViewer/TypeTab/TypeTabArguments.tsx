import React from "react";

import { TypeToDisplay } from "../types";
import { Field } from "@/components/Playground/SchemaViewer/ui/Field";
import {
  isOutputFieldType,
  isScalarFieldType,
} from "@/components/Playground/SchemaViewer/utils";

export function TypeTabArguments({
  typeToDisplay,
  tabIndex,
  addNewTypeToDisplay,
}: {
  typeToDisplay: TypeToDisplay;
  tabIndex: number;
  addNewTypeToDisplay: (type: TypeToDisplay, tabIndex: number) => void;
}) {
  if (!isOutputFieldType(typeToDisplay)) {
    return null;
  }

  if (isScalarFieldType(typeToDisplay)) {
    return null;
  }

  if (typeToDisplay.args.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="pt-2 text-green">Arguments</h4>
      <ul>
        {typeToDisplay.args.map((argument) => {
          const { name, type } = argument;
          return (
            <li
              key={name}
              onClick={() => addNewTypeToDisplay(argument, tabIndex)}
            >
              <Field name={name} type={type.toString()} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
