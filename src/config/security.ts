// Configuration de sécurité pour le frontend

export const securityConfig = {
  // Configuration des headers de sécurité
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  },

  // Configuration CSP (Content Security Policy)
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "https:"],
    'connect-src': ["'self'"],
    'frame-src': ["'none'"],
    'object-src': ["'none'"]
  },

  // Configuration des validations
  validation: {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email invalide'
    },
    phone: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/,
      message: 'Numéro de téléphone invalide'
    },
    name: {
      pattern: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
      message: 'Nom invalide (2-50 caractères, lettres et espaces uniquement)'
    },
    message: {
      minLength: 10,
      maxLength: 2000,
      message: 'Message invalide (10-2000 caractères)'
    }
  },

  // Configuration des attaques
  attacks: {
    xss: {
      patterns: [
        /<script/i,
        /javascript:/i,
        /vbscript:/i,
        /onload=/i,
        /onerror=/i,
        /onclick=/i,
        /onmouseover=/i,
        /eval\(/i,
        /document\./i,
        /window\./i,
        /alert\(/i,
        /confirm\(/i,
        /prompt\(/i
      ]
    },
    sql: {
      patterns: [
        /union\s+select/i,
        /drop\s+table/i,
        /delete\s+from/i,
        /insert\s+into/i,
        /update\s+set/i,
        /select\s+from/i,
        /where\s+1=1/i,
        /or\s+1=1/i
      ]
    },
    injection: {
      patterns: [
        /<script/i,
        /javascript:/i,
        /vbscript:/i,
        /on\w+=/i,
        /eval\(/i,
        /document\./i,
        /window\./i
      ]
    }
  },

  // Configuration des limites
  limits: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxRequestSize: 1024 * 1024, // 1MB
    maxLoginAttempts: 5,
    lockoutTime: 15 * 60 * 1000, // 15 minutes
    sessionTimeout: 30 * 60 * 1000 // 30 minutes
  },

  // Configuration des sessions
  session: {
    tokenKey: 'authToken',
    userKey: 'user',
    timeout: 30 * 60 * 1000, // 30 minutes
    refreshInterval: 5 * 60 * 1000 // 5 minutes
  },

  // Configuration des logs
  logging: {
    enabled: true,
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    suspicious: {
      enabled: true,
      patterns: [
        /sqlmap/i,
        /nikto/i,
        /nmap/i,
        /dirb/i,
        /gobuster/i,
        /admin/i,
        /wp-admin/i,
        /phpmyadmin/i,
        /\.env/i,
        /\.git/i,
        /\.svn/i
      ]
    }
  },

  // Configuration des API
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
    timeout: 10000, // 10 secondes
    retries: 3,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  },

  // Configuration des formulaires
  forms: {
    contact: {
      fields: ['name', 'email', 'phone', 'company', 'subject', 'message', 'service', 'budget', 'timeline'],
      required: ['name', 'email', 'subject', 'message'],
      validation: {
        name: { min: 2, max: 50 },
        email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phone: { pattern: /^[\+]?[1-9][\d]{0,15}$/, optional: true },
        subject: { min: 5, max: 200 },
        message: { min: 10, max: 2000 }
      }
    },
    project: {
      fields: ['title', 'client', 'category', 'industry', 'duration', 'image', 'website', 'challenge', 'solution'],
      required: ['title', 'client', 'category', 'industry', 'duration', 'challenge', 'solution'],
      validation: {
        title: { min: 5, max: 200 },
        client: { min: 2, max: 100 },
        website: { pattern: /^https?:\/\/.+/, optional: true }
      }
    }
  }
};

// Fonctions utilitaires de sécurité
export const securityUtils = {
  // Vérifier si une chaîne contient des caractères dangereux
  hasDangerousChars: (input: string): boolean => {
    if (typeof input !== 'string') return false;
    
    const patterns = [
      ...securityConfig.attacks.xss.patterns,
      ...securityConfig.attacks.sql.patterns,
      ...securityConfig.attacks.injection.patterns
    ];
    
    return patterns.some(pattern => pattern.test(input));
  },

  // Nettoyer une chaîne de caractères
  sanitize: (input: string): string => {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/eval\(/gi, '')
      .replace(/document\./gi, '')
      .replace(/window\./gi, '')
      .trim();
  },

  // Valider un email
  validateEmail: (email: string): boolean => {
    return securityConfig.validation.email.pattern.test(email);
  },

  // Valider un numéro de téléphone
  validatePhone: (phone: string): boolean => {
    return securityConfig.validation.phone.pattern.test(phone.replace(/\s/g, ''));
  },

  // Valider un nom
  validateName: (name: string): boolean => {
    return securityConfig.validation.name.pattern.test(name.trim());
  },

  // Valider un message
  validateMessage: (message: string): boolean => {
    const { minLength, maxLength } = securityConfig.validation.message;
    return message.length >= minLength && message.length <= maxLength;
  },

  // Générer un token CSRF
  generateCSRFToken: (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },

  // Vérifier la taille d'un fichier
  validateFileSize: (size: number): boolean => {
    return size <= securityConfig.limits.maxFileSize;
  },

  // Vérifier le type de fichier
  validateFileType: (type: string, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(type);
  }
};

export default securityConfig; 