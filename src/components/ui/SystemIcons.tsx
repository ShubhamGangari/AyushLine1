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

// 1. Ayurveda Icon - 🌿 Herbal Leaf
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

// 2. Yoga Icon - 🧘 Person in Lotus Meditation Position
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

// 3. Unani Icon - ⚗️ Alembic Alchemy / Extract Flask
export const UnaniIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <span
    className={getEmojiClass(className)}
    style={size ? { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` } : undefined}
    role="img"
    aria-label="Unani"
  >
    ⚗️
  </span>
);

// 4. Siddha Icon - 🔬 Laboratory Microscope / Mineral Science
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

// 5. Homeopathy Icon - 💊 Medicine Pill / Remedy Globule
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




