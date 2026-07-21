import React from 'react';
import { Button } from '../../shared/components/Button/Button';
import { useTheme } from '../../shared/context/ThemeContext';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();

  const heroStyles: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? 'var(--bg-color-dark)' : 'var(--bg-color-light)',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem 0'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '3.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    lineHeight: '1.2'
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: theme === 'dark' ? 'var(--secondary-color-dark)' : 'var(--secondary-color-light)'
  };

  return (
    <section className="hero-section" style={heroStyles}>
      <div className="container">
        <h1 style={titleStyles}>Hi, I'm [Your Name]</h1>
        <p style={subtitleStyles}>A Passionate Frontend Developer building captivating web experiences.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>View My Work</Button>
          <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Me</Button>
        </div>
      </div>
    </section>
  );
};
