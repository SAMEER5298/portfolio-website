import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/sameerkhan', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/sameerkhan', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com/sameerkhan', label: 'Twitter' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-border py-8 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[1px]">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-accent-mint to-transparent opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4"
      >
        <div>
          <span className="font-mono text-accent-mint">&lt;SameerKhan /&gt;</span>
          <p className="font-dm text-text-muted text-sm mt-1">
            Full-Stack Developer · Raebareli, UP
          </p>
        </div>

        <div className="text-text-muted text-sm">
          Built with React + Node.js · 2026
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-text-muted hover:text-accent-mint transition-colors"
            title="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-text-muted hover:text-accent-mint transition-colors"
                title={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
