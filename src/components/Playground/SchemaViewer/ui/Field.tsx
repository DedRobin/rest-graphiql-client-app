import React from "react";

export function Field({
  name,
  type,
  separator = ": ",
  className = "",
}: {
  name: string;
  type: string;
  separator?: string;
  className?: string;
}) {
  return (
    <p className={className}>
      {name}
      {separator}
      {type}
    </p>
  );
}
