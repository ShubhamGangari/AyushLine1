import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Ayurveda Icon - Healing Herbal Leaf with Veins
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
      d="M12 2C6.5 2 4 8.5 4 13.5C4 17.64 7.36 21 11.5 21C16.5 21 20 16.5 20 9.5C20 9.5 14.5 9 12 2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path
      d="M12 21V9.5M12 13.5C9.5 12 8 12.5 8 12.5M12 16.5C14.5 15 16.5 15.5 16.5 15.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 2. Yoga Icon - Meditating Yogi in Padmasana (Lotus Pose)
export const YogaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className.includes('text-') ? className : `text-[#7B4FA6] ${className}`}
    width={size}
    height={size}
  >
    <circle cx="12" cy="4.5" r="2.2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 7V13"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 8.5C9.5 9.5 7.5 11 6.5 13.5C5.5 16 6.5 17 8 17M12 8.5C14.5 9.5 16.5 11 17.5 13.5C18.5 16 17.5 17 16 17"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M4 19.5C6.5 17.5 9.5 16.5 12 16.5C14.5 16.5 17.5 17.5 20 19.5C17.5 20.5 14.5 21 12 21C9.5 21 6.5 20.5 4 19.5Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 3. Unani Icon - Apothecary Hikmat Flask & Extract
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
      d="M11 3.5V7L6.5 16C5.5 18 6.5 20.5 9.5 20.5H14.5C17.5 20.5 18.5 18 17.5 16L13 7V3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M8.2 13C10.5 12 13.5 14 15.8 13"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
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
    <path
      d="M17 3.5L11.5 11.5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M4 11H20C20 11 19 17.5 12 17.5C5 17.5 4 11 4 11Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 17.5H15.5V20H8.5V17.5Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M19 15.5C20.5 14.5 21.5 15 22 16.5C20.5 17 19.5 16.5 19 15.5Z"
      fill="currentColor"
    />
  </svg>
);

// 5. Homeopathy Icon - Liquid Dropper & Remedy Globules
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
      d="M11 5V13.5L12 16L13 13.5V5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M12 18.5C12 18.5 10.5 20.2 12 21.5C13.5 20.2 12 18.5 12 18.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle cx="6.5" cy="19" r="1.8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="19" r="1.8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);


