import React from "react";

interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <div className="inline-block px-4 py-1 bg-darkGray">
      <h6 className="text-lightGray">{children}</h6>
    </div>
  );
}
