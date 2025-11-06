import React from 'react';

interface BTKLogoProps {
  className?: string;
  size?: number;
}

const BTKLogo: React.FC<BTKLogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      {/* Element 1 - Stylized B/Crown with jagged bottom */}
      <path d="M15 20 L25 15 L35 20 L35 25 L30 23 L25 25 L20 23 L15 25 L15 30 L20 28 L25 30 L30 28 L35 30 L35 35 L30 33 L25 35 L20 33 L15 35 Z" />
      
      {/* Element 2 - Stylized T with angled cut */}
      <path d="M40 15 L85 15 L85 20 L80 20 L80 25 L75 25 L75 85 L70 85 L70 25 L65 25 L65 20 L60 20 L60 25 L55 25 L55 20 L50 20 L50 25 L45 25 L45 20 L40 20 Z" />
      
      {/* Element 3 - Stylized K with angular structure */}
      <path d="M15 40 L25 40 L25 45 L30 45 L30 50 L35 50 L35 55 L40 55 L40 60 L45 60 L45 65 L50 65 L50 70 L55 70 L55 75 L60 75 L60 80 L65 80 L65 85 L70 85 L70 80 L65 80 L65 75 L60 75 L60 70 L55 70 L55 65 L50 65 L50 60 L45 60 L45 55 L40 55 L40 50 L35 50 L35 45 L30 45 L30 40 L25 40 L25 35 L20 35 L20 40 Z" />
    </svg>
  );
};

export default BTKLogo; 