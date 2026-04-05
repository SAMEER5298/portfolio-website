export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export const timeline: TimelineItem[] = [
  {
    year: '2019',
    title: 'B.Com - Lucknow University',
    description: 'Bachelor of Commerce degree with focus on business fundamentals',
    icon: '🎓',
  },
  {
    year: '2022',
    title: 'Self-taught Developer',
    description: 'Began learning web development through online courses and personal projects',
    icon: '💻',
  },
  {
    year: '2023',
    title: 'Freelance Developer',
    description: 'Started taking on client projects, building real-world applications',
    icon: '🚀',
  },
  {
    year: '2024',
    title: 'AI App Builder',
    description: 'Specialized in building AI-powered applications with LLMs',
    icon: '🤖',
  },
  {
    year: '2024',
    title: 'E-Commerce Specialist',
    description: 'Created multiple e-commerce solutions with payment integrations',
    icon: '🛒',
  },
];
