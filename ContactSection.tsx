import React, { useState, useEffect } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value ? '' : 'Name is required.';
      case 'email':
        return /[A-Z0-9._%+-]+@[A-Z0-9.-]+".[A-Z]{2,}/i.test(value) ? '' : 'Invalid email address.';
      case 'message':
        return value.length > 0 ? '' : 'Message is required.';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.example.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Clear the form
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setStatusMessage('Message sent successfully!');
      setTimeout(() => setStatusMessage(''), 5000);
    } catch (error) {
      if (error.message.includes('NetworkError')) {
        setStatusMessage('Network error, please try again later.');
      } else {
        setStatusMessage(error.message);  
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div aria-live="polite">
      <form onSubmit={handleSubmit} aria-label="Contact Form">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} aria-describedby="nameError" />
          {errors.name && <span id="nameError" style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} aria-describedby="emailError" />
          {errors.email && <span id="emailError" style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} aria-describedby="messageError"></textarea>
          {errors.message && <span id="messageError" style={{ color: 'red' }}>{errors.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>Send</button>
        {statusMessage && <div style={{ color: 'green' }}>{statusMessage}</div>}
      </form>
      <div>
        <p>Character count for message: {formData.message.length}/500</p>
      </div>
    </div>
  );
};

export default ContactSection;