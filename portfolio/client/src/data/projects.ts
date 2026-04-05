export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  stack: string[];
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'calsnap',
    title: 'CalSnap',
    description: 'AI-powered calorie tracker that uses computer vision to estimate food calories from photos',
    tags: ['AI', 'Next.js', 'Claude API'],
    stack: ['Next.js', 'TypeScript', 'Claude API', 'Tailwind CSS'],
    accentColor: '#6EE7B7',
    gradientFrom: '#6EE7B7',
    gradientTo: '#3B82F6',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'earthen-pearl',
    title: 'Earthen Pearl',
    description: 'Luxury marble and stone e-commerce platform with premium UI/UX',
    tags: ['E-Commerce', 'PostgreSQL'],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    accentColor: '#D4AF37',
    gradientFrom: '#D4AF37',
    gradientTo: '#92400E',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'fell',
    title: 'Fell',
    description: 'Modern mens fashion brand website with shopping cart and wishlist functionality',
    tags: ['Fashion', 'MongoDB', 'Razorpay'],
    stack: ['Next.js', 'MongoDB', 'Razorpay', 'Framer Motion'],
    accentColor: '#9B2335',
    gradientFrom: '#9B2335',
    gradientTo: '#4A1C1C',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'sk-cyber-point',
    title: 'SK Cyber Point',
    description: 'Cafe management SaaS for tracking customer orders, inventory, and billing',
    tags: ['SaaS', 'Node.js'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    accentColor: '#818CF8',
    gradientFrom: '#818CF8',
    gradientTo: '#4F46E5',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'sk-printers',
    title: 'SK Printers',
    description: 'Print-on-demand backend API for custom printing services',
    tags: ['Backend', 'API'],
    stack: ['Node.js', 'Express', 'MongoDB', 'AWS S3'],
    accentColor: '#64748B',
    gradientFrom: '#64748B',
    gradientTo: '#374151',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];
