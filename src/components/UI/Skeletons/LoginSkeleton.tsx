// src/components/UI/Skeleton/Skeleton.tsx

import React from "react";

const Skeleton: React.FC = () => {
  return (
    <>
      {/* Скелетон формы */}
      <div className="flex-container bg-darkGray col-span-4 md:col-span-6 lg:col-span-4 animate-pulse">
        <div className="h-[368px] w-[487px]"></div>
      </div>

      {/* Скелетон изображения */}
      <div className="hidden md:hidden lg:block lg:col-start-5 lg:col-span-3 bg-darkGray h-full animate-pulse"></div>

      {/* Скелетон кнопок */}
      <div className="hidden sm:flex flex-col gap-4 items-end lg:col-span-1 lg:col-start-8 md:col-start-7 md:col-span-2">
        <div className="bg-darkGray h-6 w-24 mb-2 animate-pulse"></div>
        <div className="bg-darkGray h-6 w-32 animate-pulse"></div>
      </div>
    </>
  );
};

export default Skeleton;
