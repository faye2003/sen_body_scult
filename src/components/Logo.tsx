import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  light?: boolean;
}

export default function Logo({ className = '', showText = true, size = 'md', light = false }: LogoProps) {
  // Dimensions based on size
  const svgSize = size === 'sm' ? 'h-10 w-10' : size === 'md' ? 'h-16 w-16' : 'h-32 w-32';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* High-quality SVG Icon representing the Body Scult Logo */}
      <img
        src="/images/logo.png"
        alt="Logo"
        className="h-8 w-8 rounded-lg object-cover"
      />

      {/* Styled text matching the logo typeface hierarchy */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif font-black tracking-[0.12em] leading-none ${light ? 'text-white' : 'text-[#C25B1E]'}`}
            style={{
              fontSize: size === 'sm' ? '1.1rem' : size === 'md' ? '1.5rem' : '2.2rem',
              letterSpacing: '0.1em'
            }}
          >
            BODY SCULT
          </span>
          <span
            className={`text-[9px] uppercase tracking-[0.25em] font-medium mt-0.5 font-poppins ${light ? 'text-stone-300' : 'text-[#C9642B]'}`}
            style={{ fontSize: size === 'sm' ? '7px' : size === 'md' ? '9px' : '12px' }}
          >
            Institut de Beauté et de Bien-être
          </span>
        </div>
      )}
    </div>
  );
}
