import { GraphQLField, isListType, isNonNullType, isScalarType } from "graphql";
import { TypeToDisplay } from "@/components/Playground/SchemaViewer/types";

export function getPureType(typeToDisplay: TypeToDisplay) {
  let currentType = typeToDisplay.type;
  while (true) {
    const typeWithoutNonNull = isNonNullType(currentType)
      ? currentType.ofType
      : currentType;

    if (isListType(typeWithoutNonNull)) {
      currentType = typeWithoutNonNull.ofType;
    } else {
      return typeWithoutNonNull;
    }
  }
}

export function isOutputFieldType(
  typeToDisplay: TypeToDisplay,
): typeToDisplay is GraphQLField<unknown, unknown, unknown> {
  return !typeToDisplay.hasOwnProperty("defaultValue");
}

export function isScalarFieldType(typeToDisplay: TypeToDisplay) {
  return isScalarType(getPureType(typeToDisplay));
}
