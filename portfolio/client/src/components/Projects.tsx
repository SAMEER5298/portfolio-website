import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const filterTabs = ['All', 'AI', 'E-Commerce', 'SaaS', 'Fashion'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase())));

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-mono text-accent-mint text-sm">// what i've built</span>
        <h2 className="font-syne font-bold text-4xl text-text-primary mt-4">
          Projects That Ship.
        </h2>
        <p className="font-dm text-text-muted mt-2">
          Real products. Real users. Real code.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-3 mt-8 justify-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-5 py-2 rounded-full text-sm font-dm transition-all duration-300 ${
              activeFilter === tab
                ? 'bg-accent-mint text-background'
                : 'border border-border text-text-muted hover:border-accent-mint'
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        <AnimatePresence mode="popLayout">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <ProjectCard project={project} featured />
            </motion.div>
          ))}
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: (featuredProjects.length + index) * 0.1, duration: 0.4 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <a
          href="https://github.com/sameerkhan"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 border border-accent-mint text-accent-mint rounded-full px-6 py-3 font-dm transition-all duration-300 hover:bg-accent-mint/10"
        >
          View All on GitHub
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
