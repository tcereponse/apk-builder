import React from 'react';
import { SectionWrapper } from '../../shared/components/SectionWrapper/SectionWrapper';
import { AnimatedElement } from '../../shared/components/AnimatedElement/AnimatedElement';
import { useTheme } from '../../shared/context/ThemeContext';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();

  const textStyles: React.CSSProperties = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    maxWidth: '800px',
    margin: '0 auto 1rem auto',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  };

  return (
    <SectionWrapper id="about" title="About Me">
      <AnimatedElement>
        <p style={textStyles}>
          Hello! I'm [Your Name], a dedicated frontend developer with a knack for creating beautiful
          and functional web applications. My journey into web development began with a fascination
          for how things work on the internet, which quickly evolved into a passion for building them.
        </p>
        <p style={textStyles}>
          I specialize in React, TypeScript, and modern JavaScript, constantly seeking to learn new technologies
          and improve my craft. I thrive in environments where I can solve challenging problems and contribute
          to innovative projects. When I'm not coding, you can find me exploring new design patterns,
          contributing to open-source, or enjoying a good book.
        </p>
        <p style={textStyles}>
          My goal is to build user-friendly, high-performance, and visually appealing web experiences that make a difference.
          Let's connect and create something amazing!
        </p>
      </AnimatedElement>
    </SectionWrapper>
  );
};
