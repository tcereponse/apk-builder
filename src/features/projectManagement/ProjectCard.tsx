import React from 'react';
import { Project } from './types';
import { Button } from '../../shared/components/Button/Button';
import { useTheme } from '../../shared/context/ThemeContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { theme } = useTheme();

  const cardStyles: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
    border: `1px solid ${theme === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)'}`,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const contentStyles: React.CSSProperties = {
    padding: '1.5rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: 'var(--primary-color)'
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: '1rem',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)',
    marginBottom: '1rem',
    flexGrow: 1
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
    <div style={cardStyles}>
      <img src={project.image} alt={project.title} style={imageStyles} />
      <div style={contentStyles}>
        <h3 style={titleStyles}>{project.title}</h3>
        <p style={descriptionStyles}>{project.description}</p>
        <div style={{ marginBottom: '1rem' }}>
          {project.technologies.map((tech) => (
            <span key={tech} style={techBadgeStyles}>{tech}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
          {project.liveUrl && <Button onClick={() => window.open(project.liveUrl, '_blank')}>Live Demo</Button>}
          {project.githubUrl && <Button variant="outline" onClick={() => window.open(project.githubUrl, '_blank')}>GitHub</Button>}
        </div>
      </div>
    </div>
  );
};
