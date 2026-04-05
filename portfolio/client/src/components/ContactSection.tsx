import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaGithub, FaPaperPlane } from 'react-icons/fa6';
import './ContactSection.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const socialLinks = [
  {
    platform: 'Instagram',
    value: '@liftwithsameer786',
    href: 'https://instagram.com/liftwithsameer786',
    icon: FaInstagram,
    iconClass: 'social-card-icon--instagram',
    external: true,
  },
  {
    platform: 'WhatsApp',
    value: '+91 88536 84846',
    href: 'https://wa.me/918853684846',
    icon: FaWhatsapp,
    iconClass: 'social-card-icon--whatsapp',
    external: true,
  },
  {
    platform: 'Email',
    value: 'sameerkhan86316@gmail.com',
    href: 'mailto:sameerkhan86316@gmail.com',
    icon: FaEnvelope,
    iconClass: 'social-card-icon--email',
    external: false,
  },
  {
    platform: 'GitHub',
    value: 'SAMEER5298',
    href: 'https://github.com/SAMEER5298',
    icon: FaGithub,
    iconClass: 'social-card-icon--github',
    external: true,
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className="contact-heading-tag">// let's connect</span>
        <h2 className="contact-heading">Get In Touch</h2>
        <p className="contact-subheading">
          Available for freelance projects, SaaS builds, and full-time roles.
        </p>
      </motion.div>

      {/* Social Cards */}
      <motion.div
        className="social-cards-grid"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {socialLinks.map(({ platform, value, href, icon: Icon, iconClass, external }) => (
          <a
            key={platform}
            href={href}
            className="social-card"
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <div className={`social-card-icon ${iconClass}`}>
              <Icon />
            </div>
            <div className="social-card-info">
              <span className="social-card-label">{platform}</span>
              <span className="social-card-value">{value}</span>
            </div>
          </a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="contact-form-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact-input"
          />
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="contact-textarea"
          />
          <button
            type="submit"
            disabled={loading}
            className="contact-submit"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  style={{
                    width: 18,
                    height: 18,
                    border: '2px solid #0D0D0F',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                  }}
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
              className="contact-status contact-status--success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ✅ Message sent successfully!
            </motion.div>
          )}
          {error && (
            <motion.div
              className="contact-status contact-status--error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              ❌ Something went wrong. Try again.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
