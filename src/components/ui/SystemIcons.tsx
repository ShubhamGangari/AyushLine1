import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Ayurveda Icon - Natural Sprouting Leaf Teardrop (Green emblem)
export const AyurvedaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    {/* Background Glow Teardrop */}
    <path
      d="M24 4C24 4 12 19 12 29C12 35.6274 17.3726 41 24 41C30.6274 41 36 35.6274 36 29C36 19 24 4 Z"
      fill="#E6F4EA"
      stroke="#2D6A4F"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Central Leaf Vein & Branch */}
    <path
      d="M24 41V22M24 22C20 18 16 18 16 18M24 28C28 25 31 26 31 26"
      stroke="#2D6A4F"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 2. Yoga & Naturopathy Icon - Meditating Lotus / Body Balance (Purple/Plum theme)
export const YogaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    <circle cx="24" cy="10" r="4" fill="#7B4FA6" />
    <path
      d="M24 16C20 19 17 22 14 26C12 28.6667 11 31 10 35M24 16C28 19 31 22 34 26C36 28.6667 37 31 38 35"
      stroke="#7B4FA6"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M14 35C17 35 20 33 24 33C28 33 31 35 34 35M10 40C16 40 21 39 24 39C27 39 32 40 38 40"
      stroke="#7B4FA6"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// 3. Unani Icon - Herbal Oil Flask / Potion Bottle with Leaf Motif (2nd image in Unani row - Ticked by client)
export const UnaniIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    {/* Stopper Knob */}
    <ellipse cx="24" cy="7" rx="3" ry="2.5" fill="#2E7D9A" stroke="#1E5266" strokeWidth="1.5" />
    {/* Neck Ring */}
    <rect x="20" y="9.5" width="8" height="2" rx="1" fill="#4AA8C7" />
    {/* Flask Body */}
    <path
      d="M21 11.5H27V16.5C27 18.5 35 23 35 33C35 39 30 43 24 43C18 43 13 39 13 33C13 23 21 18.5 21 16.5V11.5Z"
      fill="#E1F5FE"
      stroke="#2E7D9A"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Green Leaf Motif inside Flask */}
    <path
      d="M24 24C19 28 20 35 24 37C28 35 29 28 24 24Z"
      fill="#43A047"
      stroke="#2E7D32"
      strokeWidth="1.5"
    />
    <path
      d="M24 26V36M24 30C21.5 29 20.5 30 20.5 30M24 32C26.5 31 27.5 32 27.5 32"
      stroke="#1B5E20"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// 4. Siddha Icon - Traditional Stone Mortar & Pestle with Herbs (1st image in Siddha row - Ticked by client)
export const SiddhaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    {/* Pestle / Grinding Rod */}
    <path
      d="M32 6L21 24"
      stroke="#546E7A"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M32 6L21 24"
      stroke="#78909C"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Mortar Bowl Outer */}
    <path
      d="M9 22H39C39 22 37 36 24 36C11 36 9 22 9 22Z"
      fill="#B0BEC5"
      stroke="#455A64"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bowl Inner Shadow */}
    <path
      d="M11 22C11 22 13 32 24 32C35 32 37 22 37 22"
      fill="#78909C"
      fillOpacity="0.4"
    />
    {/* Mortar Base Stand */}
    <path
      d="M17 36H31V41H17V36Z"
      fill="#546E7A"
      stroke="#37474F"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Green Medicinal Herbs beside bowl */}
    <path
      d="M36 33C40 30 43 32 44 35C40 37 37 36 36 33Z"
      fill="#4CAF50"
      stroke="#2E7D32"
      strokeWidth="1.2"
    />
    <path
      d="M38 35C41 33 43 36 43 38C40 39 38 38 38 35Z"
      fill="#81C784"
    />
  </svg>
);

// 5. Homeopathy Icon - Test Tube with Remedy Pills & Sprouting Leaf (2nd image in Homeopathy row - Ticked by client)
export const HomeopathyIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    {/* Test Tube Mouth Rim */}
    <rect x="18" y="14" width="12" height="3" rx="1.5" fill="#00838F" />
    {/* Test Tube Glass Body */}
    <path
      d="M20 17V37C20 39.2091 21.7909 41 24 41C26.2091 41 28 39.2091 28 37V17H20Z"
      fill="#E0F7FA"
      stroke="#00838F"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Liquid / Gel Level */}
    <path
      d="M21 28V37C21 38.6569 22.3431 40 24 40C25.6569 40 27 38.6569 27 37V28H21Z"
      fill="#80DEEA"
      fillOpacity="0.6"
    />
    {/* White Homeopathic Sugar Pills / Globules inside */}
    <circle cx="24" cy="36" r="1.8" fill="#FFFFFF" stroke="#006064" strokeWidth="0.8" />
    <circle cx="23" cy="32" r="1.6" fill="#FFFFFF" stroke="#006064" strokeWidth="0.8" />
    <circle cx="25" cy="29" r="1.6" fill="#FFFFFF" stroke="#006064" strokeWidth="0.8" />

    {/* Green Plant Leaf Sprout at top of test tube */}
    <path
      d="M24 14V7"
      stroke="#2E7D32"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 10C20 7 17 9 16 11C20 12 23 11 24 10Z"
      fill="#4CAF50"
      stroke="#1B5E20"
      strokeWidth="1.2"
    />
    <path
      d="M24 8C28 5 31 7 32 9C28 10 25 9.5 24 8Z"
      fill="#81C784"
      stroke="#1B5E20"
      strokeWidth="1.2"
    />
  </svg>
);
