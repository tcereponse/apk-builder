import React from 'react';
import { ButtonProps } from '../../types';

const getButtonStyles = (variant: ButtonProps['variant'], size: ButtonProps['size']) => {
  let styles = {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  switch (variant) {
    case 'primary':
      styles = { ...styles, backgroundColor: 'var(--primary-color)', color: 'white' };
      break;
    case 'secondary':
      styles = { ...styles, backgroundColor: 'var(--secondary-color)', color: 'white' };
      break;
    case 'outline':
      styles = { ...styles, backgroundColor: 'transparent', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' };
      break;
    default:
      styles = { ...styles, backgroundColor: 'var(--primary-color)', color: 'white' };
      break;
  }

  switch (size) {
    case 'small':
      styles = { ...styles, padding: '0.5rem 1rem', fontSize: '0.875rem' };
      break;
    case 'large':
      styles = { ...styles, padding: '1rem 2rem', fontSize: '1.125rem' };
      break;
    default:
      styles = { ...styles, padding: '0.75rem 1.5rem', fontSize: '1rem' };
      break;
  }

  return styles;
};

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'medium', ...props }) => {
  const buttonStyles = getButtonStyles(variant, size);

  return (
    <button style={buttonStyles} {...props}>
      {children}
    </button>
  );
};
