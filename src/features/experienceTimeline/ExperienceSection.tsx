import React from 'react';
import { SectionWrapper } from '../../shared/components/SectionWrapper/SectionWrapper';
import { AnimatedElement } from '../../shared/components/AnimatedElement/AnimatedElement';
import { ExperienceItem } from './types';
import { useTheme } from '../../shared/context/ThemeContext';

const mockExperience: ExperienceItem[] = [
  {
    id: 'exp1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    period: 'Jan 2021 - Present',
    description: [
      'Led the development of a new customer-facing dashboard using React and TypeScript.',
      'Mentored junior developers and conducted code reviews to ensure high code quality.',
      'Optimized application performance, reducing load times by 20%.',
    ],
    technologies: ['React', 'TypeScript', 'Redux', 'GraphQL', 'Styled Components'],
  },
  {
    id: 'exp2',
    title: 'Frontend Developer',
    company: 'Web Innovations Ltd.',
    period: 'Mar 2018 - Dec 2020',
    description: [
      'Developed and maintained responsive web applications for various clients.',
      'Collaborated with UX/UI designers to translate wireframes into interactive user interfaces.',
      'Implemented SEO best practices to improve search engine rankings.',
    ],
    technologies: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'REST API'],
  },
];

export const ExperienceSection: React.FC = () => {
  const { theme } = useTheme();

  const timelineItemStyles: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
    border: `1px solid ${theme === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)'}`,
    borderRadius: '0.5rem',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto 2rem auto'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: 'var(--primary-color)'
  };

  const companyPeriodStyles: React.CSSProperties = {
    fontSize: '1rem',
    color: theme === 'dark' ? 'var(--secondary-color-dark)' : 'var(--secondary-color-light)',
    marginBottom: '1rem'
  };

  const descriptionListStyles: React.CSSProperties = {
    listStyleType: 'disc',
    marginLeft: '1.25rem',
    padding: 0,
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)'
  };

  const techBadgeStyles: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: theme === 'dark' ? '#4a5568' : '#e2e6ea',
    color: theme === 'dark' ? '#e2e8f0' : '#4a5568',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.75rem',
    fontSize: '0.8rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  };

  return (
    <SectionWrapper id="experience" title="Work Experience">
      <div className="experience-timeline">
        {mockExperience.map((item, index) => (
          <AnimatedElement key={item.id} className={`experience-item-animation-${index}`}>
            <div style={timelineItemStyles}>
              <h3 style={titleStyles}>{item.title}</h3>
              <p style={companyPeriodStyles}>{item.company} | {item.period}</p>
              <ul style={descriptionListStyles}>
                {item.description.map((desc, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{desc}</li>
                ))}
              </ul>
              {item.technologies && (
                <div style={{ marginTop: '1rem' }}>
                  {item.technologies.map((tech) => (
                    <span key={tech} style={techBadgeStyles}>{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
};
