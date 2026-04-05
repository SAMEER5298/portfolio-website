import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { sendContactEmail } from '../utils/mailer';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  projectType: z.enum(['Web App', 'E-Commerce', 'AI App', 'Consulting', 'Other']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: 'Too many requests. Please wait before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', rateLimiter, async (req, res) => {
  try {
    const result = contactSchema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues,
      });
      return;
    }

    const { name, email, projectType, message } = result.data;
    
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      projectType: projectType.trim(),
      message: message.trim(),
    };
    
    await sendContactEmail(sanitizedData);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent! Sameer will get back to you soon.' 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again.' 
    });
  }
});

export default router;
