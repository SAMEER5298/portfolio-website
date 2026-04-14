import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

// ============================================
// CORS Configuration - Environment Aware
// ============================================
const getAllowedOrigins = (): string[] => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  const allowedOrigins: Record<string, string[]> = {
    development: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
    ],
    production: [
      'https://portfolio-website-8vxp.vercel.app',
    ],
  };

  if (process.env.CLIENT_URL) {
    const customUrl = process.env.CLIENT_URL.trim();
    if (!allowedOrigins[nodeEnv].includes(customUrl)) {
      allowedOrigins[nodeEnv].push(customUrl);
    }
  }

  return allowedOrigins[nodeEnv] || allowedOrigins.development;
};

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = getAllowedOrigins();
    
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('CORS policy: Origin not allowed'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// ============================================
// Root Route (FIX FOR "Cannot GET /" ERROR)
// ============================================
app.get('/', (req, res) => {
  res.json({
    status: 'API Server Running',
    message: 'Portfolio Contact API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
    },
  });
});

// ============================================
// API Routes
// ============================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.use('/api/contact', contactRoutes);

// ============================================
// 404 Handler
// ============================================
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested endpoint ${req.method} ${req.path} does not exist`,
  });
});

// ============================================
// Error Handling Middleware
// ============================================
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  
  if (err.message.includes('CORS')) {
    res.status(403).json({ error: 'CORS policy violation' });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================
// Server Startup
// ============================================
app.listen(PORT, () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const allowedOrigins = getAllowedOrigins();
  
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${nodeEnv}`);
  console.log(`✅ Allowed Origins:`, allowedOrigins);
});