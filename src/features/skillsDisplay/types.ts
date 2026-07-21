export interface Skill {
  name: string;
  icon: string; // SVG path or class name, or image URL
  level?: 'basic' | 'intermediate' | 'advanced';
}
