import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Logo = ({ className }: { className?: string }) => {
  const id = React.useId().replace(/:/g, '');
  const pillGradId = `pill-grad-${id}`;
  const zenGlowId = `zen-glow-${id}`;
  
  return (
    <svg viewBox="0 0 100 100" className={cn("w-10 h-10", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={pillGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id={zenGlowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Artistic Capsule - Horizontal with soft edges */}
      <rect x="10" y="42" width="80" height="36" rx="18" fill="white" stroke={`url(#${pillGradId})`} strokeWidth="3" />
      <path d="M50 42V78" stroke={`url(#${pillGradId})`} strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="42" width="40" height="36" rx="18" fill={`url(#${pillGradId})`} opacity="0.08" />
      
      {/* Meditating Person - Fluid Zen Silhouette */}
      <g filter={`url(#${zenGlowId})`}>
        {/* Head - Floating like a seed of wisdom */}
        <circle cx="50" cy="28" r="7" fill={`url(#${pillGradId})`} />
        {/* Body - Flowing posture */}
        <path d="M50 35 Q50 48 50 58" stroke={`url(#${pillGradId})`} strokeWidth="5" strokeLinecap="round" />
        {/* Arms - Circular mudra for harmony */}
        <path d="M42 45 Q32 48 42 58" stroke={`url(#${pillGradId})`} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M58 45 Q68 48 58 58" stroke={`url(#${pillGradId})`} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Legs - Lotus position sitting gracefully */}
        <path d="M32 58 Q50 68 68 58" stroke={`url(#${pillGradId})`} strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
      
      {/* Zen Energy Ripples */}
      <circle cx="50" cy="28" r="16" stroke={`url(#${pillGradId})`} strokeWidth="0.5" strokeDasharray="3 5" opacity="0.25" />
      <circle cx="50" cy="28" r="22" stroke={`url(#${pillGradId})`} strokeWidth="0.5" strokeDasharray="1 7" opacity="0.1" />
    </svg>
  );
};
