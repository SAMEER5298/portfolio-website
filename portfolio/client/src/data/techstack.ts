export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

export const techstack: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: 'FaReact' },
      { name: 'Next.js', icon: 'FaNodeJs' },
      { name: 'TypeScript', icon: 'FaJs' },
      { name: 'Tailwind CSS', icon: 'FaCss3Alt' },
      { name: 'Framer Motion', icon: 'FaMagic' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: 'FaNodeJs' },
      { name: 'Express', icon: 'FaServer' },
      { name: 'MongoDB', icon: 'FaDatabase' },
      { name: 'PostgreSQL', icon: 'FaDatabase' },
      { name: 'Prisma', icon: 'FaCode' },
    ],
  },
  {
    category: 'AI/APIs',
    items: [
      { name: 'OpenAI', icon: 'FaBrain' },
      { name: 'Claude API', icon: 'FaRobot' },
      { name: 'REST APIs', icon: 'FaServer' },
      { name: 'GraphQL', icon: 'FaProjectDiagram' },
    ],
  },
  {
    category: 'Auth & Payments',
    items: [
      { name: 'Clerk', icon: 'FaUserShield' },
      { name: 'NextAuth', icon: 'FaLock' },
      { name: 'Stripe', icon: 'FaCreditCard' },
      { name: 'Razorpay', icon: 'FaRupeeSign' },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Git', icon: 'FaGitAlt' },
      { name: 'GitHub', icon: 'FaGithub' },
      { name: 'Docker', icon: 'FaDocker' },
      { name: 'Vercel', icon: 'FaCloud' },
      { name: 'AWS', icon: 'FaAws' },
    ],
  },
];
