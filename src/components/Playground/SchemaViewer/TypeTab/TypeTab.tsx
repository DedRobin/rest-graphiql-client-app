import React from "react";
import { TypeToDisplay } from "@/components/Playground/SchemaViewer/types";
import { TypeTabHeader } from "@/components/Playground/SchemaViewer/TypeTab/TypeTabHeader";
import { TypeTabDescription } from "@/components/Playground/SchemaViewer/TypeTab/TypeTabDescription";
import { TypeTabDetails } from "@/components/Playground/SchemaViewer/TypeTab/TypeTabDetails";
import { TypeTabArguments } from "@/components/Playground/SchemaViewer/TypeTab/TypeTabArguments";

export function TypeTab({
  typeToDisplay,
  tabIndex,
  addNewTypeToDisplay,
}: {
  typeToDisplay: TypeToDisplay;
  tabIndex: number;
  addNewTypeToDisplay: (type: TypeToDisplay, tabIndex: number) => void;
}) {
  return (
    <div>
      <TypeTabHeader typeToDisplay={typeToDisplay} />
      <TypeTabDescription typeToDisplay={typeToDisplay} />
      <TypeTabDetails
        typeToDisplay={typeToDisplay}
        tabIndex={tabIndex}
        addNewTypeToDisplay={addNewTypeToDisplay}
      />
      <TypeTabArguments
        typeToDisplay={typeToDisplay}
        tabIndex={tabIndex}
        addNewTypeToDisplay={addNewTypeToDisplay}
      />
    </div>
  );
}
