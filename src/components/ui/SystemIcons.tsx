import React from 'react';
import { Leaf, Activity, FlaskConical, Moon, Droplets } from 'lucide-react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Ayurveda Icon - Original Leaf
export const AyurvedaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <Leaf className={className.includes('text-') ? className : `text-[#5C8A3C] ${className}`} size={size} />
);

// 2. Yoga Icon - Original Activity
export const YogaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <Activity className={className.includes('text-') ? className : `text-[#7B4FA6] ${className}`} size={size} />
);

// 3. Unani Icon - Original FlaskConical
export const UnaniIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <FlaskConical className={className.includes('text-') ? className : `text-[#2E7D9A] ${className}`} size={size} />
);

// 4. Siddha Icon - Original Moon
export const SiddhaIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <Moon className={className.includes('text-') ? className : `text-[#B5451B] ${className}`} size={size} />
);

// 5. Homeopathy Icon - Original Droplets
export const HomeopathyIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <Droplets className={className.includes('text-') ? className : `text-[#2A6B5E] ${className}`} size={size} />
);

