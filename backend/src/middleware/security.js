import rateLimit from 'express-rate-limit';

// Configuration CORS
export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:8080',
      'https://localhost:8080',
      'https://localhost:5173'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Non autorisé par CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite de 100 requêtes par IP
  message: {
    error: 'Trop de requêtes, réessayez plus tard',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation des entrées
export const inputValidation = (req, res, next) => {
  // Vérification des headers
  if (req.get('content-type') && !req.get('content-type').includes('application/json')) {
    return res.status(400).json({ error: 'Content-Type invalide' });
  }
  
  next();
};

// Détection d'attaques
export const attackDetection = (req, res, next) => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i
  ];
  
  const bodyString = JSON.stringify(req.body);
  const queryString = JSON.stringify(req.query);
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(bodyString) || pattern.test(queryString)) {
      console.log('🚨 Tentative d\'attaque détectée:', req.ip, req.url);
      return res.status(403).json({ error: 'Requête suspecte détectée' });
    }
  }
  
  next();
};

// Validation des headers
export const headerValidation = (req, res, next) => {
  const requiredHeaders = ['user-agent'];
  
  for (const header of requiredHeaders) {
    if (!req.get(header)) {
      return res.status(400).json({ error: `Header ${header} manquant` });
    }
  }
  
  next();
};

// Protection contre le brute force
const loginAttempts = new Map();
export const bruteForceProtection = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  
  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 0, resetTime: now + windowMs });
  }
  
  const attempts = loginAttempts.get(ip);
  
  if (now > attempts.resetTime) {
    attempts.count = 0;
    attempts.resetTime = now + windowMs;
  }
  
  if (attempts.count >= 5) {
    return res.status(429).json({ 
      error: 'Trop de tentatives, réessayez plus tard',
      retryAfter: Math.ceil((attempts.resetTime - now) / 1000)
    });
  }
  
  next();
};

// Validation du content-type
export const contentTypeValidation = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.get('content-type')?.includes('application/json')) {
      return res.status(400).json({ error: 'Content-Type doit être application/json' });
    }
  }
  
  next();
};

// Validation de la taille des requêtes
export const requestSizeValidation = (req, res, next) => {
  const maxSize = 1024 * 1024; // 1MB
  
  if (req.get('content-length') && parseInt(req.get('content-length')) > maxSize) {
    return res.status(413).json({ error: 'Requête trop volumineuse' });
  }
  
  next();
};

// Logging de sécurité
export const securityLogging = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('user-agent')
    };
    
    if (res.statusCode >= 400) {
      console.log('🚨 Erreur détectée:', logData);
    }
  });
  
  next();
};

// Configuration Helmet
export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
};
