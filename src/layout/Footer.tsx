import React from 'react';
import { SocialLinks } from '../shared/components/SocialLinks/SocialLinks';
import { useTheme } from '../shared/context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const footerStyles: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
    color: theme === 'dark' ? 'var(--secondary-color-dark)' : 'var(--secondary-color-light)',
    padding: '2rem 0',
    textAlign: 'center',
    borderTop: `1px solid ${theme === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)'}`,
    marginTop: '4rem'
  };

  return (
    <footer style={footerStyles}>
      <div className="container">
        <p style={{ margin: '0 0 1rem 0' }}>&copy; {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>
        <SocialLinks />
      </div>
    </footer>
  );
};
