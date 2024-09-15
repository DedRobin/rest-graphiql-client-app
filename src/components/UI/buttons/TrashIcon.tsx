import React from "react";

export const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    data-testid="cross-icon"
  >
    <g clipPath="url(#clip0_7692_3953)">
      <path
        d="M11.5 5.5L10.5 13.5H3.5L2.5 5.5"
        stroke="#C0C4CC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 3.5H13"
        stroke="#C0C4CC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.45996 3.20998V1.47998C4.45996 1.21476 4.56532 0.96041 4.75285 0.772874C4.94039 0.585337 5.19474 0.47998 5.45996 0.47998H8.45996C8.72518 0.47998 8.97953 0.585337 9.16707 0.772874C9.3546 0.96041 9.45996 1.21476 9.45996 1.47998V3.47998"
        stroke="#C0C4CC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_7692_3953">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
