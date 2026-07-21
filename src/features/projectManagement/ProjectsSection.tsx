import React from 'react';
import { SectionWrapper } from '../../shared/components/SectionWrapper/SectionWrapper';
import { AnimatedElement } from '../../shared/components/AnimatedElement/AnimatedElement';
import { ProjectCard } from './ProjectCard';
import { Project } from './types';

const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'E-commerce Storefront',
    description: 'A fully functional e-commerce platform built with React and Redux, featuring product listings, cart management, and user authentication.',
    image: 'https://via.placeholder.com/400x200/63b3ed/ffffff?text=Project+1',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/yourprofile/ecommerce-storefront',
    liveUrl: 'https://ecommerce-store.example.com',
  },
  {
    id: 'p2',
    title: 'Task Management App',
    description: 'A responsive task management application for organizing daily tasks, with drag-and-drop functionality and real-time updates.',
    image: 'https://via.placeholder.com/400x200/ed8936/ffffff?text=Project+2',
    technologies: ['React', 'TypeScript', 'Firebase', 'Styled Components'],
    githubUrl: 'https://github.com/yourprofile/task-manager-app',
    liveUrl: 'https://task-manager.example.com',
  },
  {
    id: 'p3',
    title: 'Personal Blog Platform',
    description: 'A modern blog platform with a content management system, allowing users to create, edit, and publish posts.',
    image: 'https://via.placeholder.com/400x200/a0aec0/ffffff?text=Project+3',
    technologies: ['Next.js', 'GraphQL', 'Strapi', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourprofile/blog-platform',
    liveUrl: 'https://myblog.example.com',
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <SectionWrapper id="projects" title="My Projects">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {mockProjects.map((project, index) => (
          <AnimatedElement key={project.id} className={`project-card-animation-${index}`}>
            <ProjectCard project={project} />
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
};
