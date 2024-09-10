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
    <div className="flex-container ml-0 mr-0 pb-0 flex w-1/4 z-10 flex-col max-h-[calc(100vh-96px)]">
      <TypeTabHeader typeToDisplay={typeToDisplay} />
      <TypeTabDescription typeToDisplay={typeToDisplay} />
      <div className="flex flex-col gap-2 custom-scroll overflow-y-auto pr-2 w-full">
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
    </div>
  );
}
