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
    <path
      d="M24 4C24 4 12 19 12 29C12 35.6274 17.3726 41 24 41C30.6274 41 36 35.6274 36 29C36 19 24 4 Z"
      fill="#E6F4EA"
      stroke="#2D6A4F"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 41V22M24 22C20 18 16 18 16 18M24 28C28 25 31 26 31 26"
      stroke="#2D6A4F"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 2. Yoga & Naturopathy Icon - Meditating Lotus / Body Balance
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

// 3. Unani Icon - Exact Potion Flask image cropped directly from client screenshot (2nd icon in Unani row)
export const UnaniIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <img
    src="/icons/unani.png"
    alt="Unani"
    className={`object-contain ${className}`}
    style={{ width: size, height: size }}
  />
);

// 4. Siddha Icon - Exact Stone Mortar & Pestle image cropped directly from client screenshot (1st icon in Siddha row)
export const SiddhaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <img
    src="/icons/siddha.png"
    alt="Siddha"
    className={`object-contain ${className}`}
    style={{ width: size, height: size }}
  />
);

// 5. Homeopathy Icon - Exact Test Tube with Remedy Pills & Sprout image cropped directly from client screenshot (2nd icon in Homeopathy row)
export const HomeopathyIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <img
    src="/icons/homeopathy.png"
    alt="Homeopathy"
    className={`object-contain ${className}`}
    style={{ width: size, height: size }}
  />
);
