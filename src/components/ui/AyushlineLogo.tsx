import React from 'react';
import { Link } from 'react-router-dom';

interface AyushlineLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'light' | 'dark' | 'forest';
  showText?: boolean;
  showTagline?: boolean;
  to?: string;
}

export const AyushlineLogo: React.FC<AyushlineLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'gold',
  showText = true,
  showTagline = false,
  to,
}) => {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', sub: 'text-[9px]', badge: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-xl sm:text-2xl', sub: 'text-[10px]', badge: 'text-[10px]' },
    lg: { icon: 'w-11 h-11', text: 'text-2xl sm:text-3xl', sub: 'text-xs', badge: 'text-xs' },
    xl: { icon: 'w-14 h-14', text: 'text-3xl sm:text-4xl', sub: 'text-sm', badge: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  const textColorClass = {
    gold: 'text-ayush-gold',
    light: 'text-white',
    dark: 'text-ayush-forest',
    forest: 'text-ayush-forest',
  }[variant];

  const badgeColorClass = {
    gold: 'text-ayush-gold/90',
    light: 'text-white/80',
    dark: 'text-ayush-forest/80',
    forest: 'text-ayush-gold',
  }[variant];

  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Official AYUSH Line Emblem SVG */}
      <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200 ${currentSize.icon}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Deep Purple Squircle Gradient */}
            <linearGradient id="ayushLogoPurpleBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A346E" />
              <stop offset="50%" stopColor="#3F2A61" />
              <stop offset="100%" stopColor="#321D50" />
            </linearGradient>

            {/* Green Leaf Gradient */}
            <linearGradient id="ayushLogoGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#55B526" />
              <stop offset="100%" stopColor="#3C9516" />
            </linearGradient>
          </defs>

          {/* Squircle Background */}
          <rect x="2" y="2" width="96" height="96" rx="26" fill="url(#ayushLogoPurpleBg)" />

          {/* Inset Dashed Border */}
          <rect
            x="11"
            y="11"
            width="78"
            height="78"
            rx="20"
            fill="none"
            stroke="#E8DCF9"
            strokeWidth="2.4"
            strokeDasharray="6 4.5"
            opacity="0.95"
          />

          {/* Left Lotus Petal */}
          <path
            d="M38 64 C28 64 18 61 17 54 C16 47 24 45 32 50 C37 53 40 59 42 63 Z"
            fill="#C5A8E6"
            opacity="0.95"
          />
          <path
            d="M40 67 C30 67 21 65 19 59 C18 53 26 51 34 55 C39 58 42 63 43 66 Z"
            fill="#BA9BDD"
            opacity="0.75"
          />

          {/* Right Lotus Petal */}
          <path
            d="M62 64 C72 64 82 61 83 54 C84 47 76 45 68 50 C63 53 60 59 58 63 Z"
            fill="#C5A8E6"
            opacity="0.95"
          />
          <path
            d="M60 67 C70 67 79 65 81 59 C82 53 74 51 66 55 C61 58 58 63 57 66 Z"
            fill="#BA9BDD"
            opacity="0.75"
          />

          {/* Base Connector Under Leaf */}
          <ellipse cx="50" cy="68" rx="14" ry="4" fill="#B392DA" opacity="0.9" />

          {/* Outer Halo / Border of Central Teardrop Leaf */}
          <path
            d="M50 19 C50 19 31 43 31 56 C31 66 39 71 50 71 C61 71 69 66 69 56 C69 43 50 19 50 19 Z"
            fill="#F4EDFD"
          />

          {/* Inner Vibrant Green Leaf Teardrop */}
          <path
            d="M50 24 C50 24 34 45 34 56 C34 64 41 68 50 68 C59 68 66 64 66 56 C66 45 50 24 50 24 Z"
            fill="url(#ayushLogoGreen)"
          />

          {/* Central White Bindu / Dew Drop */}
          <circle cx="50" cy="55" r="5.2" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center leading-none">
            <span className={`font-display font-bold tracking-wide ${currentSize.text} ${textColorClass}`}>
              AYUSHLINE
            </span>
            <sup className={`ml-0.5 font-sans font-bold ${currentSize.badge} ${badgeColorClass} select-none`}>
              ®
            </sup>
          </div>
          {showTagline && (
            <span className={`font-ui tracking-wider uppercase text-ayush-ivory/70 ${currentSize.sub} mt-0.5`}>
              Holistic Health, Holistic Life
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>;
  }

  return content;
};

export default AyushlineLogo;
