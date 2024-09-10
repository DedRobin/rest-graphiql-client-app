import React from "react";
import { TypeToDisplay } from "../types";

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
    <div className="text-green">
      <p>{`${name} (`}</p>
      {typeToDisplay.args.map((argument) => {
        return (
          <h4 key={argument.name}>
            {argument.name}: {argument.type.toString()}
          </h4>
        );
      })}
      <h4>{`): ${type.toString()}`}</h4>
    </div>
  );
}
