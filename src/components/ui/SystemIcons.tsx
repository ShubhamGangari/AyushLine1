import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

const getEmojiClass = (className: string) => {
  let fontSize = 'text-2xl'; // default size for w-8 / h-8
  if (className.includes('w-16') || className.includes('h-16') || className.includes('w-12') || className.includes('h-12')) {
    fontSize = 'text-4xl sm:text-5xl';
  } else if (className.includes('w-6') || className.includes('h-6') || className.includes('w-5') || className.includes('h-5')) {
    fontSize = 'text-xl';
  } else if (className.includes('w-10') || className.includes('h-10')) {
    fontSize = 'text-3xl';
  }
  return `inline-flex items-center justify-center leading-none select-none ${fontSize} ${className}`;
};

// 1. Ayurveda Icon - 🌿 Herbal Leaf Emoji
export const AyurvedaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <span
    className={getEmojiClass(className)}
    style={size ? { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` } : undefined}
    role="img"
    aria-label="Ayurveda"
  >
    🌿
  </span>
);

// 2. Yoga Icon - 🧘 Person in Lotus Meditation Position Emoji
export const YogaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <span
    className={getEmojiClass(className)}
    style={size ? { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` } : undefined}
    role="img"
    aria-label="Yoga"
  >
    🧘
  </span>
);

// 3. Unani Icon - Custom SVG Herbal Potion Bottle with Stopper & 3-Leaf Motif (Matching Reference Image)
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

// 4. Siddha Icon - 🔬 Laboratory Microscope Emoji
export const SiddhaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <span
    className={getEmojiClass(className)}
    style={size ? { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` } : undefined}
    role="img"
    aria-label="Siddha"
  >
    🔬
  </span>
);

// 5. Homeopathy Icon - 💊 Medicine Pill Emoji
export const HomeopathyIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <span
    className={getEmojiClass(className)}
    style={size ? { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` } : undefined}
    role="img"
    aria-label="Homeopathy"
  >
    💊
  </span>
);






