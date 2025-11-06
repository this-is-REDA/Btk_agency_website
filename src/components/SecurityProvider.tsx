import React, { createContext, useContext, useEffect, useState } from 'react';
import { validateInput, formValidation, sessionProtection, clickProtection } from '../utils/security';

interface SecurityContextType {
  validateForm: (data: any, type: 'contact' | 'project') => { isValid: boolean; errors: any };
  sanitizeInput: (input: string) => string;
  isSessionValid: () => boolean;
  clearSession: () => void;
  handleSuspiciousClick: (event: React.MouseEvent) => boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialiser la sécurité au chargement
    initializeSecurity();
    setIsInitialized(true);
  }, []);

  const initializeSecurity = () => {
    // Désactiver les outils de développement en production
    if (process.env.NODE_ENV === 'production') {
      // Désactiver la console
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
    }

    // Protection contre les clics droits
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // Protection contre les raccourcis clavier dangereux
    document.addEventListener('keydown', (e) => {
      // Désactiver F12, Ctrl+Shift+I, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
      }
    });

    // Protection contre les inspecteurs
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 || 
          window.outerWidth - window.innerWidth > 200) {
        // Détecter l'ouverture des outils de développement
        console.clear();
        document.body.innerHTML = 'Inspection non autorisée';
      }
    }, 1000);
  };

  const validateForm = (data: any, type: 'contact' | 'project') => {
    if (type === 'contact') {
      return formValidation.contactForm(data);
    } else {
      return formValidation.projectForm(data);
    }
  };

  const sanitizeInput = (input: string) => {
    return validateInput.sanitize(input);
  };

  const isSessionValid = () => {
    return sessionProtection.isSessionValid();
  };

  const clearSession = () => {
    sessionProtection.clearSession();
  };

  const handleSuspiciousClick = (event: React.MouseEvent) => {
    return clickProtection.detectSuspiciousClick(event);
  };

  const securityContext: SecurityContextType = {
    validateForm,
    sanitizeInput,
    isSessionValid,
    clearSession,
    handleSuspiciousClick
  };

  if (!isInitialized) {
    return <div>Chargement de la sécurité...</div>;
  }

  return (
    <SecurityContext.Provider value={securityContext}>
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityProvider; 