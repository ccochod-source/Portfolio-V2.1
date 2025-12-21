import React from 'react';
import type { ComponentVariant, ComponentSize } from '@/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-accent text-cream hover:bg-accent-dark active:scale-95 shadow-sm hover:shadow-md',
    secondary:
      'bg-transparent border-2 border-accent text-accent-dark hover:bg-accent hover:text-cream active:scale-95',
    tertiary:
      'bg-sand-light text-text hover:bg-sand active:scale-95 shadow-sm hover:shadow-md',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

