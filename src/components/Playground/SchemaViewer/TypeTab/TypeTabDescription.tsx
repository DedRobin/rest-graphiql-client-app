import React from "react";
import { TypeToDisplay } from "../types";

export function TypeTabDescription({
  typeToDisplay,
}: {
  typeToDisplay: TypeToDisplay;
}) {
  const { description } = typeToDisplay;

  return (
    <h6 className="text-mediumGray -mt-2">
      {description || "Type without description"}
    </h6>
  );
}
