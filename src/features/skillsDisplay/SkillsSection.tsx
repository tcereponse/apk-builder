import React from 'react';
import { SectionWrapper } from '../../shared/components/SectionWrapper/SectionWrapper';
import { AnimatedElement } from '../../shared/components/AnimatedElement/AnimatedElement';
import { Skill } from './types';
import { useTheme } from '../../shared/context/ThemeContext';

const mockSkills: Skill[] = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'HTML5', icon: 'HTML' },
  { name: 'CSS3', icon: 'CSS' },
  { name: 'Node.js', icon: '🐘' },
  { name: 'Git', icon: '🌲' },
  { name: 'REST APIs', icon: '🌐' },
  { name: 'Redux', icon: '🔴' },
  { name: 'Webpack', icon: '📦' },
];

export const SkillsSection: React.FC = () => {
  const { theme } = useTheme();

  const skillCardStyles: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
    border: `1px solid ${theme === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)'}`,
    borderRadius: '0.5rem',
    padding: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ':hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 12px rgba(0,0,0,0.1)' }
  };

  const iconStyles: React.CSSProperties = {
    fontSize: '3rem',
    marginBottom: '0.75rem'
  };

  const skillNameStyles: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  };

  return (
    <SectionWrapper id="skills" title="My Skills">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
        {mockSkills.map((skill, index) => (
          <AnimatedElement key={skill.name} className={`skill-item-animation-${index}`}>
            <div style={skillCardStyles}>
              <div style={iconStyles}>{skill.icon}</div>
              <p style={skillNameStyles}>{skill.name}</p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
};
