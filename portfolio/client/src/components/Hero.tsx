import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mouse } from 'lucide-react';

const words = [
  'Full-Stack Developer',
  'AI App Builder',
  'Self-Taught & Shipping',
  'React + Node.js Engineer',
];

function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayedText;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(110, 231, 183, 0.3)';
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(110, 231, 183, ${0.15 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
    />
  );
}

function GridOverlay() {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(110,231,183,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }}
    />
  );
}

function GradientOrbs() {
  return (
    <>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl -top-20 -left-20 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(110,231,183,0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl bottom-20 right-10 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Mouse className="w-5 h-5 text-text-muted" />
      </motion.div>
      <span className="text-text-muted text-xs">Scroll to explore</span>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const displayedText = useTypewriter(words);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <ParticleBackground />
      <GridOverlay />
      <GradientOrbs />
      
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="font-mono text-accent-mint text-sm tracking-widest">
            👋 Hello, I'm
          </span>
        </motion.div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-syne font-bold text-5xl md:text-7xl lg:text-8xl text-text-primary leading-tight mt-4"
        >
          <motion.span variants={itemVariants} className="block">
            I Build Products,
          </motion.span>
          <motion.span variants={itemVariants} className="block">
            Not Just Pages.
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-dm text-text-muted text-lg md:text-xl mt-4 h-8"
        >
          {displayedText}
          <span className="animate-blink">|</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex gap-4 justify-center flex-wrap"
        >
          <button
            onClick={scrollToProjects}
            className="bg-accent-mint text-background rounded-full px-8 py-3 font-dm font-medium transition-all duration-300 hover:scale-105 hover:shadow-mint"
          >
            View My Work
          </button>
          <button className="border border-accent-mint text-accent-mint rounded-full px-8 py-3 font-dm font-medium transition-all duration-300 hover:bg-accent-mint/10">
            Download Resume
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center gap-2 border border-border rounded-full px-4 py-1 text-sm text-text-muted">
            <span className="w-2 h-2 bg-accent-mint rounded-full animate-pulse" />
            Available for Projects
          </div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
