import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    e.currentTarget.style.setProperty('--rotateX', String(rotateX));
    e.currentTarget.style.setProperty('--rotateY', String(rotateY));
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--rotateX', '0');
    e.currentTarget.style.setProperty('--rotateY', '0');
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-border bg-surface ${
        featured ? 'md:col-span-2' : ''
      }`}
      style={{
        height: featured ? '18rem' : '14rem',
        willChange: 'transform, opacity',
      }}
      whileHover={{ 
        scale: 1.02,
        borderColor: project.accentColor,
        boxShadow: `0 20px 40px ${project.accentColor}26`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, ${project.accentColor}, ${project.gradientTo})`,
        }}
      />
      
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
      />

      <div 
        className="relative h-full p-6 flex flex-col justify-between"
        style={{
          transform: 'perspective(1000px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="flex flex-wrap gap-2"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-border rounded-full px-2 py-0.5 text-xs font-mono text-text-muted"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          style={{
            transform: 'translateZ(10px)',
          }}
        >
          <h3 className="font-syne font-bold text-xl text-text-primary">
            {project.title}
          </h3>
          <p className="font-dm text-text-muted text-sm mt-2 line-clamp-2">
            {project.description}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-between gap-4"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && project.githubUrl !== '#' && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-text-muted hover:text-text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                title="View Code"
              >
                <FaGithub size={20} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface border border-border rounded text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  View Code
                </span>
              </motion.a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-1 text-accent-mint hover:underline"
                whileHover={{ x: 4 }}
                title="View Live"
              >
                <span className="hidden md:inline">Live Demo</span>
                <FaExternalLinkAlt size={14} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface border border-border rounded text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  View Live
                </span>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
