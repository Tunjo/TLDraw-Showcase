import React from "react";

// Custom cube icon component
export const CubeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      {/* Front face */}
      <rect x="3" y="7" width="8" height="8" />
      {/* Top face */}
      <path d="M3 7L6 4H14L11 7" />
      {/* Right face */}
      <path d="M11 7L14 4V12L11 15" />
    </g>
  </svg>
);
