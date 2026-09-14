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
      {/* Official AYUSH Line Emblem SVG — Simple Clean Teardrop Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 ${currentSize.icon}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Green Leaf Gradient */}
            <linearGradient id="ayushLogoGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4BB526" />
              <stop offset="100%" stopColor="#2D7A17" />
            </linearGradient>
          </defs>

          {/* Outer Soft Leaf Border */}
          <path
            d="M50 10 C50 10 25 40 25 60 C25 73.8 36.2 85 50 85 C63.8 85 75 73.8 75 60 C75 40 50 10 50 10 Z"
            fill="#D4A853"
            fillOpacity="0.2"
          />

          {/* Inner Vibrant Green Teardrop Leaf */}
          <path
            d="M50 16 C50 16 30 43 30 60 C30 71 39 79 50 79 C61 79 70 71 70 60 C70 43 50 16 50 16 Z"
            fill="url(#ayushLogoGreen)"
          />

          {/* Central White Dewdrop */}
          <circle cx="50" cy="58" r="6" fill="#FFFFFF" />
          <path
            d="M50 79 V46M50 46 C44 41 40 41 40 41M50 56 C56 52 58 53 58 53"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />
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
