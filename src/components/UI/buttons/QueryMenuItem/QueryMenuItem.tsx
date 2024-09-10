import React, { useState } from "react";
import { GraphQLField } from "graphql";
import Image from "next/image";
import { cn } from "@/utils/cn";

interface QueryMenuItemProps {
  field: GraphQLField<unknown, unknown, unknown>;
  onClick: (field: GraphQLField<unknown, unknown, unknown>) => void;
}

export const QueryMenuItem: React.FC<QueryMenuItemProps> = ({
  field,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onClick(field);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={cn(
          "flex items-center justify-between px-4 py-2 w-full text-left transition-colors",
          "bg-black hover:bg-darkGray active:bg-darkGray", // классы по умолчанию
        )}
      >
        <div className="flex items-center">
          <h6 className="text-lightGray">
            {field.name}:{" "}
            <span className="text-mediumGray">{field.type.toString()}</span>
          </h6>
        </div>
        <Image
          src={
            isOpen
              ? "/icons/button-right--arrow.svg"
              : "/icons/button-left--arrow.svg"
          }
          alt="Toggle"
          width={14}
          height={14}
          className="transition-transform"
        />
      </button>
    </div>
  );
};
