import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { useState } from 'react';

const stats = [
  { value: 5, suffix: '+', label: 'Products Shipped' },
  { value: 3, suffix: '+', label: 'Years Building' },
  { value: -1, suffix: '', label: 'Cups of Chai ☕' }, // -1 = infinity sentinel
];

// Each stat gets its own component so hooks aren't called inside a loop
function StatCard({
  stat,
  index,
  trigger,
}: {
  stat: (typeof stats)[number];
  index: number;
  trigger: boolean;
}) {
  const count = useCountUp(stat.value === -1 ? 0 : stat.value, 2000, trigger);

  return (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-surface border border-border rounded-xl p-4 text-center"
    >
      <div className="font-syne font-bold text-3xl text-accent-mint">
        {stat.value === -1 ? '∞' : count}
        {stat.suffix}
      </div>
      <div className="font-dm text-text-muted text-sm mt-1">{stat.label}</div>
    </motion.div>
  );
}

export default function About() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-accent-mint text-sm">// about me</span>
          <h2 className="font-syne font-bold text-4xl md:text-5xl text-text-primary mt-4">
            From Raebareli to the Internet.
          </h2>
          <div className="font-dm text-text-muted leading-relaxed mt-4 space-y-4">
            <p>
              I'm Sameer Khan — a full-stack developer from Ashan Jagatpur, Bachhrawan, Raebareli,
              Uttar Pradesh. I hold a B.Com from Lucknow University, but my real education happened
              line by line, commit by commit.
            </p>
            <p>
              I build AI-powered apps, SaaS tools, and e-commerce platforms for real users with real
              problems — from calorie tracking for Indian households to luxury marble stores and
              men's fashion brands.
            </p>
            <p>
              I'm obsessed with shipping. Not planning, not prototype loops — actual products in the
              hands of users.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setHasEntered(true)}
        >
          <div className="rounded-2xl border border-border bg-surface w-full aspect-square flex items-center justify-center transition-shadow duration-300 hover:shadow-mint overflow-hidden">
            <img 
              src="/sameer khan.jpeg" 
              alt="Sameer Khan" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} trigger={hasEntered} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
