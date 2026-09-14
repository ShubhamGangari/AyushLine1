import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Ayurveda Icon - Natural Sprouting Leaf Teardrop
export const AyurvedaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    <path
      d="M12 2C12 2 6 9.5 6 14.5C6 17.8137 8.68629 20.5 12 20.5C15.3137 20.5 18 17.8137 18 14.5C18 9.5 12 2 Z"
      fill="#5C8A3C"
      fillOpacity="0.2"
      stroke="#5C8A3C"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 20.5V11M12 11C10 9 8 9 8 9M12 14C14 12.5 15.5 13 15.5 13"
      stroke="#5C8A3C"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 2. Yoga & Naturopathy Icon - Meditating Lotus / Body Balance
export const YogaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    <circle cx="12" cy="5" r="2" fill="#7B4FA6" stroke="#7B4FA6" strokeWidth="0.5" />
    <path
      d="M12 8C10 9.5 8.5 11 7 13C6 14.3333 5.5 15.5 5 17.5M12 8C14 9.5 15.5 11 17 13C18 14.3333 18.5 15.5 19 17.5"
      stroke="#7B4FA6"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M7 17.5C8.5 17.5 10 16.5 12 16.5C14 16.5 15.5 17.5 17 17.5M5 20C8 20 10.5 19.5 12 19.5C13.5 19.5 16 20 19 20"
      stroke="#7B4FA6"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// 3. Unani Icon - Herbal Oil Flask / Potion Bottle with Leaf Motif (2nd icon in Unani row)
export const UnaniIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    {/* Bottle Stopper Top */}
    <circle cx="12" cy="3.5" r="1.5" fill="#2E7D9A" />
    {/* Bottle Neck & Body */}
    <path
      d="M10 5.5H14M11 5.5V8C11 9 7.5 12 7.5 16.5C7.5 19.2614 9.51472 21.5 12 21.5C14.4853 21.5 16.5 19.2614 16.5 16.5C16.5 12 13 9 13 8V5.5"
      stroke="#2E7D9A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#2E7D9A"
      fillOpacity="0.12"
    />
    {/* Herbal Leaf Inside Bottle */}
    <path
      d="M12 13.5C10.5 15 10.5 17.5 12 19M12 13.5C13.5 15 13.5 17.5 12 19M12 13.5V19"
      stroke="#2E7D9A"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 4. Siddha Icon - Traditional Mortar & Pestle Grinding Stone with Herbs (1st icon in Siddha row)
export const SiddhaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    {/* Pestle / Grinding Stick */}
    <path
      d="M16 3L11.5 11.5"
      stroke="#B5451B"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Mortar Bowl */}
    <path
      d="M4.5 11H19.5C19.5 11 18.5 18 12 18C5.5 18 4.5 11 4.5 11Z"
      fill="#B5451B"
      fillOpacity="0.18"
      stroke="#B5451B"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bowl Base */}
    <path
      d="M8.5 18H15.5V20.5H8.5V18Z"
      fill="#B5451B"
      stroke="#B5451B"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Leaves beside bowl */}
    <path
      d="M18 16.5C19.5 15.5 21 16 21.5 17.5C20 18 18.5 17.5 18 16.5Z"
      fill="#B5451B"
    />
  </svg>
);

// 5. Homeopathy Icon - Test Tube with Remedy Globules & Sprouting Leaf (2nd icon in Homeopathy row)
export const HomeopathyIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    {/* Test Tube Outer Glass */}
    <path
      d="M9 7H15M10 7V17.5C10 18.8807 10.8954 20 12 20C13.1046 20 14 18.8807 14 17.5V7"
      stroke="#2A6B5E"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#2A6B5E"
      fillOpacity="0.1"
    />
    {/* Remedy Pills / Globules inside Test Tube */}
    <circle cx="12" cy="17" r="1" fill="#2A6B5E" />
    <circle cx="11.5" cy="14.5" r="0.9" fill="#2A6B5E" />
    <circle cx="12.5" cy="12.5" r="0.9" fill="#2A6B5E" />
    {/* Sprouting Green Leaves at top */}
    <path
      d="M12 7V3.5M12 3.5C10.5 2.5 9 3 8.5 4.5C10 5 11.5 4.5 12 3.5ZM12 3.5C13.5 2.5 15 3 15.5 4.5C14 5 12.5 4.5 12 3.5Z"
      stroke="#2A6B5E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#2A6B5E"
      fillOpacity="0.25"
    />
  </svg>
);
