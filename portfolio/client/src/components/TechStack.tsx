import type React from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { techstack } from '../data/techstack';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  FaReact: FaIcons.FaReact,
  FaNodeJs: FaIcons.FaNodeJs,
  FaJs: FaIcons.FaJs,
  FaCss3Alt: FaIcons.FaCss3Alt,
  FaMagic: FaIcons.FaMagic,
  FaServer: FaIcons.FaServer,
  FaDatabase: FaIcons.FaDatabase,
  FaCode: FaIcons.FaCode,
  FaBrain: FaIcons.FaBrain,
  FaRobot: FaIcons.FaRobot,
  FaProjectDiagram: FaIcons.FaProjectDiagram,
  FaUserShield: FaIcons.FaUserShield,
  FaLock: FaIcons.FaLock,
  FaCreditCard: FaIcons.FaCreditCard,
  FaRupeeSign: FaIcons.FaRupeeSign,
  FaGitAlt: FaIcons.FaGitAlt,
  FaGithub: FaIcons.FaGithub,
  FaDocker: FaIcons.FaDocker,
  FaCloud: FaIcons.FaCloud,
  FaAws: FaIcons.FaAws,
};

function TechPill({ name, icon }: { name: string; icon: string }) {
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-surface border border-border rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-200 hover:border-accent-mint hover:shadow-mint hover:scale-105 cursor-default"
    >
      {IconComponent && <IconComponent className="text-accent-mint" style={{ fontSize: '16px' }} />}
      <span className="font-dm text-text-primary text-sm">{name}</span>
    </motion.div>
  );
}

function DesktopView() {
  return (
    <div className="space-y-8">
      {techstack.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: categoryIndex * 0.1, duration: 0.4 }}
        >
          <h3 className="font-mono text-text-muted text-sm mb-3 tracking-widest uppercase">
            {category.category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {category.items.map((item, itemIndex) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: itemIndex * 0.05, duration: 0.3 }}
              >
                <TechPill name={item.name} icon={item.icon} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MobileMarquee() {
  const allItems = techstack.flatMap((category) =>
    category.items.map((item) => ({ ...item, category: category.category }))
  );
  const doubledItems = [...allItems, ...allItems];

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-3 w-max animate-marquee">
        {doubledItems.map((item, index) => (
          <TechPill key={`${item.name}-${index}`} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-mono text-accent-mint text-sm">// tools i work with</span>
        <h2 className="font-syne font-bold text-4xl text-text-primary mt-4">
          My Tech Arsenal
        </h2>
      </motion.div>

      <div className="mt-12">
        <div className="hidden md:block">
          <DesktopView />
        </div>
        <div className="md:hidden">
          <MobileMarquee />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
