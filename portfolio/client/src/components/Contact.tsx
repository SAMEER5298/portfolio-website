import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaXTwitter, FaCheck, FaPaperPlane } from 'react-icons/fa6';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/sameerkhan', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/sameerkhan', label: 'LinkedIn' },
    { icon: FaXTwitter, href: 'https://x.com/sameerkhan', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-mono text-accent-mint text-sm">// let's connect</span>
        <h2 className="font-syne font-bold text-5xl text-text-primary mt-4">
          Let's Build Something.
        </h2>
        <p className="font-dm text-text-muted mt-3">
          Available for freelance projects, SaaS builds, and full-time roles.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-surface border border-border rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-background border border-border rounded-xl px-4 py-3 w-full text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-mint transition"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background border border-border rounded-xl px-4 py-3 w-full text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-mint transition"
              />
            </div>
            <div>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="bg-background border border-border rounded-xl px-4 py-3 w-full text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-mint transition"
              >
                <option value="">Select Project Type</option>
                <option value="Web App">Web App</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="AI App">AI App</option>
                <option value="Consulting">Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-background border border-border rounded-xl px-4 py-3 w-full text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-mint transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-mint text-background font-syne font-bold rounded-xl py-4 transition-all duration-300 hover:shadow-mint disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <FaPaperPlane />
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <FaCheck />
                </motion.div>
                Message sent! I'll get back to you soon.
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
              >
                Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-text-muted">
              <span>📍</span>
              <span className="font-dm">Raebareli, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <span>✉️</span>
              <a href="mailto:hello@sameerkhan.dev" className="font-dm hover:text-accent-mint transition">
                hello@sameerkhan.dev
              </a>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <span className="w-3 h-3 bg-accent-mint rounded-full animate-pulse" />
              <span className="font-dm">Open to Work</span>
            </div>
          </div>

          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-accent-mint hover:border-accent-mint hover:shadow-mint transition-all duration-300"
                title={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
