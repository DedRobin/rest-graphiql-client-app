import React from "react";
import { TypeToDisplay } from "../types";

export function TypeTabDescription({
  typeToDisplay,
}: {
  typeToDisplay: TypeToDisplay;
}) {
  const { description } = typeToDisplay;

  return <p>{description || "Type without description"}</p>;
}
