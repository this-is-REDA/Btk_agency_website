// Utilitaires de sécurité pour le frontend

// Validation des entrées utilisateur
export const validateInput = {
  // Validation email
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validation téléphone
  phone: (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  // Validation nom (pas de caractères spéciaux dangereux)
  name: (name) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
    return nameRegex.test(name.trim());
  },

  // Validation message (longueur et contenu)
  message: (message) => {
    if (!message || message.length < 10 || message.length > 2000) {
      return false;
    }
    // Vérifier les caractères dangereux
    const dangerousChars = /<script|javascript:|vbscript:|onload=|onerror=/i;
    return !dangerousChars.test(message);
  },

  // Validation URL
  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Nettoyer les entrées
  sanitize: (input) => {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Supprimer les balises HTML
      .replace(/javascript:/gi, '') // Supprimer javascript:
      .replace(/vbscript:/gi, '') // Supprimer vbscript:
      .trim();
  }
};

// Protection contre les attaques XSS
export const xssProtection = {
  // Encoder les caractères spéciaux
  encode: (str) => {
    if (typeof str !== 'string') return str;
    
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  // Décoder les caractères spéciaux
  decode: (str) => {
    if (typeof str !== 'string') return str;
    
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/');
  }
};

// Protection CSRF
export const csrfProtection = {
  // Générer un token CSRF
  generateToken: () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },

  // Valider un token CSRF
  validateToken: (token, storedToken) => {
    return token === storedToken;
  }
};

// Protection contre les injections
export const injectionProtection = {
  // Vérifier les caractères dangereux
  hasDangerousChars: (input) => {
    if (typeof input !== 'string') return false;
    
    const dangerousPatterns = [
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
    ];

    return dangerousPatterns.some(pattern => pattern.test(input));
  },

  // Nettoyer les entrées
  sanitizeInput: (input) => {
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
  }
};

// Validation des formulaires
export const formValidation = {
  // Validation complète d'un formulaire de contact
  contactForm: (data) => {
    const errors = {};

    // Validation nom
    if (!data.name || !validateInput.name(data.name)) {
      errors.name = 'Nom invalide (2-50 caractères, lettres et espaces uniquement)';
    }

    // Validation email
    if (!data.email || !validateInput.email(data.email)) {
      errors.email = 'Email invalide';
    }

    // Validation téléphone (optionnel)
    if (data.phone && !validateInput.phone(data.phone)) {
      errors.phone = 'Numéro de téléphone invalide';
    }

    // Validation sujet
    if (!data.subject || data.subject.length < 5 || data.subject.length > 200) {
      errors.subject = 'Sujet invalide (5-200 caractères)';
    }

    // Validation message
    if (!data.message || !validateInput.message(data.message)) {
      errors.message = 'Message invalide (10-2000 caractères)';
    }

    // Vérifier les injections
    Object.keys(data).forEach(key => {
      if (injectionProtection.hasDangerousChars(data[key])) {
        errors[key] = 'Contenu non autorisé détecté';
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Validation d'un projet
  projectForm: (data) => {
    const errors = {};

    // Validation titre
    if (!data.title || data.title.length < 5 || data.title.length > 200) {
      errors.title = 'Titre invalide (5-200 caractères)';
    }

    // Validation client
    if (!data.client || data.client.length < 2 || data.client.length > 100) {
      errors.client = 'Nom du client invalide (2-100 caractères)';
    }

    // Validation URL (optionnel)
    if (data.website && !validateInput.url(data.website)) {
      errors.website = 'URL invalide';
    }

    // Vérifier les injections
    Object.keys(data).forEach(key => {
      if (injectionProtection.hasDangerousChars(data[key])) {
        errors[key] = 'Contenu non autorisé détecté';
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

// Protection contre les attaques par force brute
export const bruteForceProtection = {
  attempts: new Map(),
  maxAttempts: 5,
  lockoutTime: 15 * 60 * 1000, // 15 minutes

  // Vérifier si une IP est bloquée
  isBlocked: (identifier) => {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return false;

    const now = Date.now();
    if (now - attempt.lastAttempt > this.lockoutTime) {
      this.attempts.delete(identifier);
      return false;
    }

    return attempt.count >= this.maxAttempts;
  },

  // Enregistrer une tentative
  recordAttempt: (identifier) => {
    const now = Date.now();
    const attempt = this.attempts.get(identifier) || { count: 0, lastAttempt: now };
    
    attempt.count++;
    attempt.lastAttempt = now;
    
    this.attempts.set(identifier, attempt);
  },

  // Réinitialiser les tentatives
  resetAttempts: (identifier) => {
    this.attempts.delete(identifier);
  }
};

// Chiffrement côté client (basique)
export const encryption = {
  // Chiffrer des données sensibles (basique)
  encrypt: (data) => {
    // En production, utilisez une vraie bibliothèque de chiffrement
    return btoa(JSON.stringify(data));
  },

  // Déchiffrer des données
  decrypt: (encryptedData) => {
    try {
      return JSON.parse(atob(encryptedData));
    } catch {
      return null;
    }
  }
};

// Protection de la session
export const sessionProtection = {
  // Vérifier si la session est valide
  isSessionValid: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // Nettoyer la session
  clearSession: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.clear();
  }
};

// Protection contre les clics frauduleux
export const clickProtection = {
  // Détecter les clics suspects
  detectSuspiciousClick: (event) => {
    const now = Date.now();
    const lastClick = sessionStorage.getItem('lastClick');
    
    if (lastClick && now - parseInt(lastClick) < 100) {
      // Clic trop rapide, probablement frauduleux
      event.preventDefault();
      return false;
    }
    
    sessionStorage.setItem('lastClick', now.toString());
    return true;
  }
};

export default {
  validateInput,
  xssProtection,
  csrfProtection,
  injectionProtection,
  formValidation,
  bruteForceProtection,
  encryption,
  sessionProtection,
  clickProtection
}; 