import React from 'react';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label';

interface TextProps {
  variant?: TextVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark leading-tight',
  h3: 'text-2xl md:text-3xl font-semibold text-text-dark leading-snug',
  h4: 'text-xl md:text-2xl font-semibold text-text-dark leading-snug',
  body: 'text-base md:text-lg text-text leading-relaxed',
  'body-sm': 'text-sm md:text-base text-text-light leading-relaxed',
  caption: 'text-xs md:text-sm text-text-light leading-normal',
  label: 'text-sm font-medium text-text uppercase tracking-wide',
};

export const Text = React.forwardRef<
  HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement,
  TextProps
>(({ variant = 'body', as, children, className = '' }, ref) => {
  const Component = (as || (variant.startsWith('h') ? variant : 'p')) as React.ElementType;
  const baseStyles = variantStyles[variant];

  return (
    <Component ref={ref} className={`${baseStyles} ${className}`}>
      {children}
    </Component>
  );
});

Text.displayName = 'Text';

