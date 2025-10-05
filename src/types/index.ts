export interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
}