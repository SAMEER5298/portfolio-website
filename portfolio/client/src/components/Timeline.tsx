import { motion } from 'framer-motion';

// NOTE: year alone is not unique (two 2024 entries) so we add a unique `id` field
const timelineData = [
  {
    id: 'bcom',
    year: '2021',
    title: 'B.Com, Lucknow University',
    description:
      'Graduated with a Bachelor of Commerce degree, laying the foundation for business understanding that helps me build user-centric products.',
    icon: '🎓',
  },
  {
    id: 'self-taught',
    year: '2022',
    title: 'Began Self-Teaching Full-Stack Development',
    description:
      'Started learning web development through online courses and personal projects. Built first React apps and Node.js backends.',
    icon: '💻',
  },
  {
    id: 'freelance',
    year: '2023',
    title: 'First Freelance Projects Shipped',
    description:
      'Took on real client work, delivering web applications and learning the business side of development.',
    icon: '🚀',
  },
  {
    id: 'calsnap',
    year: '2024',
    title: 'Built CalSnap with Claude Vision AI',
    description:
      'Created an AI-powered calorie tracking app using computer vision, my first major AI product.',
    icon: '🤖',
  },
  {
    id: 'ecommerce',
    year: '2024',
    title: 'E-Commerce Specialist',
    description:
      'Built multiple e-commerce solutions including Earthen Pearl (luxury marble), Fell (fashion brand), and SKFits.',
    icon: '🛒',
  },
  {
    id: 'scaling',
    year: '2025–26',
    title: 'Scaling Products + Open for Hire',
    description:
      'Currently focused on scaling existing products, taking on new projects, and continuing to build impactful applications.',
    icon: '⚡',
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="py-24 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-mono text-accent-mint text-sm">// my journey</span>
        <h2 className="font-syne font-bold text-4xl text-text-primary mt-4">How I Got Here.</h2>
      </motion.div>

      <div className="mt-16 relative">
        <motion.div
          className="absolute left-4 top-0 bottom-0 w-0.5 bg-border origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-accent-mint border-2 border-background relative z-10 mt-1.5 flex-shrink-0"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15 + 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            />

            <div className="ml-8 pb-12">
              <span className="font-mono text-xs text-accent-mint bg-surface border border-border rounded-full px-2 py-0.5 mb-1 inline-block">
                {item.year}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <h3 className="font-syne font-bold text-lg text-text-primary">{item.title}</h3>
              </div>
              <p className="font-dm text-text-muted text-sm leading-relaxed mt-2">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
