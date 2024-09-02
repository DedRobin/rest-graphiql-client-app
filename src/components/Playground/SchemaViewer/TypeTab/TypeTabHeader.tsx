import React from "react";
import { TypeToDisplay } from "../types";
import { Field } from "@/components/Playground/SchemaViewer/ui/Field";

import {
  isOutputFieldType,
  isScalarFieldType,
} from "@/components/Playground/SchemaViewer/utils";

export function TypeTabHeader({
  typeToDisplay,
}: {
  typeToDisplay: TypeToDisplay;
}) {
  const { name, type } = typeToDisplay;

  const tabHeaderWithoutArgs = (
    <p>
      {name}
      {": "}
      {type.toString()}
    </p>
  );

  if (isScalarFieldType(typeToDisplay)) {
    return tabHeaderWithoutArgs;
  }

  if (!isOutputFieldType(typeToDisplay)) {
    return tabHeaderWithoutArgs;
  }

  if (typeToDisplay.args.length === 0) {
    return tabHeaderWithoutArgs;
  }

  return (
    <div>
      <p>{`${name} (`}</p>
      {typeToDisplay.args.map((argument) => {
        return (
          <Field
            key={argument.name}
            name={argument.name}
            type={argument.type.toString()}
          />
        );
      })}
      <p>{`): ${type.toString()}`}</p>
    </div>
  );
}
