import React from "react";
import { isObjectType, isScalarType, isInputObjectType } from "graphql";
import { TypeToDisplay } from "@/components/Playground/SchemaViewer/types";
import { Field } from "@/components/Playground/SchemaViewer/ui/Field";
import { getPureType } from "@/components/Playground/SchemaViewer/utils";

export function TypeTabDetails({
  typeToDisplay,
  tabIndex,
  addNewTypeToDisplay,
}: {
  typeToDisplay: TypeToDisplay;
  tabIndex: number;
  addNewTypeToDisplay: (type: TypeToDisplay, tabIndex: number) => void;
}) {
  const pureType = getPureType(typeToDisplay);

  if (isScalarType(pureType)) {
    return (
      <div>
        <h4>Scalar type</h4>
        <p>{pureType.description}</p>
        <Field name="scalar" type={pureType.name} />
      </div>
    );
  }

  if (!isObjectType(pureType) && !isInputObjectType(pureType)) {
    throw new Error("!isObjectType");
  }

  const fields = Object.values(pureType.getFields());

  if (fields.length === 0) {
    throw new Error("fields.length === 0");
  }

  return (
    <div>
      <h4>Details</h4>
      <p>{`${pureType.toString()} {`}</p>
      <ul>
        {fields.map((field) => {
          const { name, type } = field;
          return (
            <li onClick={() => addNewTypeToDisplay(field, tabIndex)} key={name}>
              <Field name={name} type={type.toString()} />
            </li>
          );
        })}
      </ul>
      {"}"}
    </div>
  );
}
