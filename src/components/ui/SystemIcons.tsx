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
    {/* Yogi Head / Crown Aura */}
    <circle cx="12" cy="4.5" r="2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" />
    
    {/* Torso & Spine */}
    <path d="M12 6.5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    
    {/* Arms in Gyan Mudra resting on knees */}
    <path d="M12 8C9.5 8.8 7 11 5.5 14C4.5 16 6 17 8 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 8C14.5 8.8 17 11 18.5 14C19.5 16 18 17 16 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    
    {/* Lotus Crossed Legs Base */}
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

// 3. Unani Icon - Hikmat Apothecary Flask & Decoction Leaf
export const UnaniIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className.includes('text-') ? className : `text-[#2E7D9A] ${className}`}
    width={size}
    height={size}
  >
    <path d="M10 3.5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M11 3.5V7.5L6.5 16C5.5 18 6.8 20.5 9.5 20.5H14.5C17.2 20.5 18.5 18 17.5 16L13 7.5V3.5"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M8 14C10.5 13 13.5 15 16 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 11.5C11 12.5 11 14 12 15C13 14 13 12.5 12 11.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
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



