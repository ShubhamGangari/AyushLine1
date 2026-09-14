import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Ayurveda Icon - Healing Botanical Leaf with Veins
export const AyurvedaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className.includes('text-') ? className : `text-[#5C8A3C] ${className}`}
    width={size}
    height={size}
  >
    <path
      d="M12 2C6.5 2 4 8 4 13.5C4 17.6 7.4 21 11.5 21C16.5 21 20 16.5 20 9.5C20 9.5 14.5 9 12 2Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M12 21V10M12 14C9.5 12.5 8 13 8 13M12 16.5C14.5 15 16.5 15.5 16.5 15.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// 2. Yoga Icon - Meditating Person in Padmasana (Lotus Posture)
export const YogaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className.includes('text-') ? className : `text-[#7B4FA6] ${className}`}
    width={size}
    height={size}
  >
    <circle cx="12" cy="4.5" r="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 6.5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 8C9.5 8.8 7 11 5.5 14C4.5 16 6 17 8 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 8C14.5 8.8 17 11 18.5 14C19.5 16 18 17 16 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M4 18.5C6 16 9 15 12 15C15 15 18 16 20 18.5C18 20.5 15 21.5 12 21.5C9 21.5 6 20.5 4 18.5Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

// 3. Unani Icon - Exact Potion Flask with Stopper & 3-Leaf Motif (Matching User Reference Image)
export const UnaniIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className.includes('text-') ? className : `text-[#2E7D9A] ${className}`}
    width={size}
    height={size}
  >
    {/* Round Stopper Top Knob */}
    <circle cx="12" cy="2.8" r="1.4" fill="currentColor" />
    
    {/* Stopper Neck Lip Rim */}
    <path d="M9.5 4.8H14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    
    {/* Flask Neck & Bulbous Body */}
    <path
      d="M10.5 4.8C10.5 7.5 7 9.2 7 14C7 17.5 9.2 19.8 12 19.8C14.8 19.8 17 17.5 17 14C17 9.2 13.5 7.5 13.5 4.8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.15"
    />
    
    {/* Central Vertical Stem */}
    <path d="M12 19.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Center Top Leaf */}
    <path
      d="M12 11C10.8 13 12 15.5 12 15.5C12 15.5 13.2 13 12 11Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    
    {/* Left Leaf */}
    <path
      d="M12 15.5C9.8 14.2 8.2 15.5 8.2 17C9.8 17.2 11.2 16.2 12 15.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    
    {/* Right Leaf */}
    <path
      d="M12 15.5C14.2 14.2 15.8 15.5 15.8 17C14.2 17.2 12.8 16.2 12 15.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    
    {/* Base Stand Line */}
    <path d="M7 21.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 4. Siddha Icon - Mortar & Pestle Grinding Bowl (Kalvam)
export const SiddhaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className.includes('text-') ? className : `text-[#B5451B] ${className}`}
    width={size}
    height={size}
  >
    <path d="M16.5 3.5L11 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M4 11H20C20 11 18.8 17.5 12 17.5C5.2 17.5 4 11 4 11Z"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 17.5H15.5V20H8.5V17.5Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

// 5. Homeopathy Icon - Liquid Medicine Dropper & Remedy Globules
export const HomeopathyIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className.includes('text-') ? className : `text-[#2A6B5E] ${className}`}
    width={size}
    height={size}
  >
    <path d="M10 2.5H14V5H10V2.5Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M11 5V13L12 15.5L13 13V5"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M12 18.5C12 18.5 10.5 20.2 12 21.5C13.5 20.2 12 18.5 12 18.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle cx="6.5" cy="19" r="1.8" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="19" r="1.8" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);





