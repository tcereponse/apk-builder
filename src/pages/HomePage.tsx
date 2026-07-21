import React from 'react';
import { HeroSection } from '../features/hero/HeroSection';
import { AboutSection } from '../features/about/AboutSection';
import { SkillsSection } from '../features/skillsDisplay/SkillsSection';
import { ExperienceSection } from '../features/experienceTimeline/ExperienceSection';
import { ProjectsSection } from '../features/projectManagement/ProjectsSection';
import { ContactSection } from '../features/contactFormSubmission/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
};
