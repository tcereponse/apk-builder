export type Theme = 'light' | 'dark';

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // SVG path or class name
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}
