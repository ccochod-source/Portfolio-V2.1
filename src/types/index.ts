export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  year?: number;
  category?: string;
}

export type ComponentVariant = 'primary' | 'secondary' | 'tertiary';
export type ComponentSize = 'sm' | 'md' | 'lg';

