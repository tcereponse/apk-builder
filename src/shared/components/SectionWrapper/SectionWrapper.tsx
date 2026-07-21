import React from 'react';

interface SectionWrapperProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children, className }) => {
  return (
    <section id={id} className={`section-wrapper ${className || ''}`} style={{ padding: '4rem 0' }}>
      <div className="container">
        {title && <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>{title}</h2>}
        {children}
      </div>
    </section>
  );
};
