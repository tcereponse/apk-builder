import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedElementProps {
  children: React.ReactNode;
  animationClass?: string;
  className?: string;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, animationClass = 'fade-in-up', className }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const animationStyles: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  };

  const visibleStyles: React.CSSProperties = {
    opacity: 1,
    transform: 'translateY(0)',
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`animated-element ${className || ''}`}
      style={isVisible ? { ...animationStyles, ...visibleStyles } : animationStyles}
    >
      {children}
    </div>
  );
};
