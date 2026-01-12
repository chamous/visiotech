import React from 'react';

const VisioTechLogo: React.FC = () => {
  return (
    <svg
      width="160"
      height="30"
      viewBox="0 0 160 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path
        d="M10 0L0 15L10 30H30L20 15L30 0H10Z"
        fill="currentColor"
      />
      <path
        d="M40 0L30 15L40 30H60L50 15L60 0H40Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M70 0L60 15L70 30H90L80 15L90 0H70Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <rect x="100" y="5" width="10" height="20" fill="currentColor" />
      <rect x="115" y="5" width="10" height="20" fill="currentColor" />
      <text x="130" y="22" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="currentColor">
        VisioTech
      </text>
    </svg>
  );
};

export default VisioTechLogo;
