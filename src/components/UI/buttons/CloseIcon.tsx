import React from "react";

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    data-testid="cross-icon"
    style={{ transform: "rotate(45deg)" }}
  >
    <g clipPath="url(#clip0_7527_4166)">
      <path
        d="M7 0.540039V13.54"
        stroke="currentColor"
        strokeWidth="1.42"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 7H13.5"
        stroke="currentColor"
        strokeWidth="1.42"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_7527_4166">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
