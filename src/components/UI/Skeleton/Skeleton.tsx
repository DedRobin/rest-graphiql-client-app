// src/components/UI/Skeleton/Skeleton.tsx

import React from "react";

const Skeleton: React.FC = () => {
  return (
    <>
      {/* Скелетон формы */}
      <div className="flex flex-col gap-6 col-span-1 md:col-span-6 lg:col-span-4">
        <div className="bg-darkGray h-8 w-3/4 mb-4 animate-pulse"></div>
        <div className="bg-darkGray h-6 w-full mb-4 animate-pulse"></div>
        <div className="bg-darkGray h-6 w-full mb-4 animate-pulse"></div>
        <div className="bg-darkGray h-12 w-full mb-4 animate-pulse"></div>
        <div className="bg-darkGray h-12 w-full animate-pulse"></div>
      </div>

      {/* Скелетон изображения */}
      <div className="hidden md:hidden lg:block lg:col-start-5 lg:col-span-3 bg-darkGray h-full rounded animate-pulse"></div>

      {/* Скелетон кнопок */}
      <div className="hidden sm:flex flex-col gap-4 items-end lg:col-span-1 lg:col-start-8 md:col-start-7 md:col-span-2">
        <div className="bg-darkGray h-6 w-24 mb-2 animate-pulse"></div>
        <div className="bg-darkGray h-6 w-32 animate-pulse"></div>
      </div>
    </>
  );
};

export default Skeleton;
