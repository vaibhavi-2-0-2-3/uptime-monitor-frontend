import React from 'react';

const PulseLogo = ({ className = "w-6 h-6", color = "currentColor" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pulse Line */}
      <path 
        d="M2 12C2 12 4 8 6 8C8 8 10 12 12 12C14 12 16 8 18 8C20 8 22 12 22 12" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Pulse Dots */}
      <circle cx="6" cy="8" r="1" fill={color} />
      <circle cx="12" cy="12" r="1" fill={color} />
      <circle cx="18" cy="8" r="1" fill={color} />
      
      {/* Animated pulse effect */}
      <circle cx="12" cy="12" r="2" fill={color} opacity="0.3">
        <animate 
          attributeName="r" 
          values="2;4;2" 
          dur="2s" 
          repeatCount="indefinite" 
        />
        <animate 
          attributeName="opacity" 
          values="0.3;0.1;0.3" 
          dur="2s" 
          repeatCount="indefinite" 
        />
      </circle>
    </svg>
  );
};

export default PulseLogo;
