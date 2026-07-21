import React from 'react';
import { SectionWrapper } from '../../shared/components/SectionWrapper/SectionWrapper';
import { AnimatedElement } from '../../shared/components/AnimatedElement/AnimatedElement';
import { ContactForm } from './ContactForm';
import { useTheme } from '../../shared/context/ThemeContext';

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();

  const descriptionStyles: React.CSSProperties = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    maxWidth: '800px',
    margin: '0 auto 2rem auto',
    textAlign: 'center',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  };

  return (
    <SectionWrapper id="contact" title="Contact Me">
      <AnimatedElement>
        <p style={descriptionStyles}>
          Have a question or want to work together? Feel free to reach out using the form below, and I'll get back to you as soon as possible.
        </p>
        <ContactForm />
      </AnimatedElement>
    </SectionWrapper>
  );
};
