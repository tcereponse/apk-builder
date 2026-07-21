import React from 'react';
import { SocialLink } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
}

const defaultLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/yourprofile', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile', icon: 'M20.447 20.452h-3.529v-5.592c0-1.322-.025-3.027-1.841-3.027-1.842 0-2.126 1.444-2.126 2.939v5.68H9.352V9h3.364v1.541h.045c.478-.858 1.63-1.761 3.326-1.761 3.559 0 4.201 2.338 4.201 5.372v6.299zM5.716 7.237c-1.393 0-2.522-1.129-2.522-2.521S4.323 2.193 5.716 2.193c1.394 0 2.522 1.129 2.522 2.523S7.109 7.237 5.716 7.237zm1.761 13.215H3.955V9h3.522v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.453c.98 0 1.772-.773 1.772-1.729V1.729C24 .774 23.203 0 22.225 0z' }
];

export const SocialLinks: React.FC<SocialLinksProps> = ({ links = defaultLinks, className }) => {
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)';

  return (
    <div className={`social-links ${className || ''}`} style={{ display: 'flex', gap: '1rem' }}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={iconColor}
            stroke="currentColor"
            strokeWidth="0"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={link.icon}></path>
          </svg>
        </a>
      ))}
    </div>
  );
};
