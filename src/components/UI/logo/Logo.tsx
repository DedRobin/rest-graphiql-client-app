import Image from "next/image";
import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className="w-[93px] h-[21px]">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={93}
        height={21}
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
};
