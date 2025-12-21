import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseStyles =
    'bg-cream border border-sand rounded-xl p-6 transition-all duration-300';

  const hoverStyles = hover
    ? 'hover:shadow-lg hover:border-accent-light cursor-pointer transform hover:-translate-y-1'
    : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={onClick ? 'Cliquer pour ouvrir' : undefined}
    >
      {children}
    </div>
  );
};

