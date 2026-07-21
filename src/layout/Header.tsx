import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../features/navigation/types';
import { ThemeToggle } from '../features/themeToggle/ThemeToggle';
import { SocialLinks } from '../shared/components/SocialLinks/SocialLinks';
import { useTheme } from '../shared/context/ThemeContext';

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Skills', path: '/#skills' },
  { name: 'Experience', path: '/#experience' },
  { name: 'Projects', path: '/#projects' },
  { name: 'Contact', path: '/#contact' },
];

export const Header: React.FC = () => {
  const { theme } = useTheme();

  const headerStyles: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
    color: theme === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)',
    padding: '1rem 0',
    borderBottom: `1px solid ${theme === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)'}`,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const navLinkStyles = (isActive: boolean) => ({
    color: isActive ? 'var(--primary-color)' : 'inherit',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease, background-color 0.2s ease',
    ':hover': { backgroundColor: theme === 'dark' ? '#3a4454' : '#e2e6ea' }
  });

  return (
    <header style={headerStyles}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>DevPortfolio</NavLink>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => navLinkStyles(isActive)}
                  onClick={() => {
                    if (item.path.includes('#')) {
                      const id = item.path.split('#')[1];
                      setTimeout(() => {
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                      }, 100); // Small delay to allow route change first
                    }
                  }}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <SocialLinks />
        </nav>
      </div>
    </header>
  );
};
