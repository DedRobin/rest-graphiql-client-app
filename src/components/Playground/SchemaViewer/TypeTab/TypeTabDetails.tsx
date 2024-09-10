import React from "react";
import { isObjectType, isScalarType, isInputObjectType } from "graphql";
import { TypeToDisplay } from "@/components/Playground/SchemaViewer/types";
import { Field } from "@/components/Playground/SchemaViewer/ui/Field";
import { getPureType } from "@/components/Playground/SchemaViewer/utils";

export function TypeTabDetails({
  typeToDisplay,
  tabIndex,
  addNewTypeToDisplay,
  nextType,
}: {
  typeToDisplay: TypeToDisplay;
  tabIndex: number;
  nextType: TypeToDisplay | null;
  addNewTypeToDisplay: (type: TypeToDisplay, tabIndex: number) => void;
}) {
  const pureType = getPureType(typeToDisplay);

  if (isScalarType(pureType)) {
    return (
      <div>
        <h4 className="pb-2 text-green">Scalar type</h4>
        <h6 className="text-mediumGray">{pureType.description}</h6>
        {/*<Field name="scalar" type={pureType.name} />*/}
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
      <h4 className="pb-2 text-green">Details</h4>
      <h6 className="-pb-3 text-mediumGray">{`${pureType.toString()} {`}</h6>
      <ul>
        {fields.map((field) => {
          const { name, type } = field;
          return (
            <li onClick={() => addNewTypeToDisplay(field, tabIndex)} key={name}>
              <Field
                name={name}
                type={type.toString()}
                isOpen={nextType === field}
              />
            </li>
          );
        })}
      </ul>
      <h6 className=" text-mediumGray">{`}`}</h6>
    </div>
  );
}
