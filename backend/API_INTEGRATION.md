# API Integration Guide

Ce guide explique comment intégrer le frontend React avec le backend API.

## Configuration du Frontend

### 1. Créer un service API

Créez un fichier `src/services/api.js` dans le frontend :

```javascript
const API_BASE_URL = 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Méthode générique pour les requêtes
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint);
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
```

### 2. Service pour les projets

Créez `src/services/projectService.js` :

```javascript
import apiService from './api';

export const projectService = {
  // Récupérer tous les projets
  async getProjects(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/projects${queryString ? `?${queryString}` : ''}`;
    return apiService.get(endpoint);
  },

  // Récupérer un projet spécifique
  async getProject(id) {
    return apiService.get(`/projects/${id}`);
  },

  // Liker un projet
  async likeProject(id) {
    return apiService.post(`/projects/${id}/like`);
  },

  // Créer un projet (admin)
  async createProject(projectData) {
    return apiService.post('/projects', projectData);
  },

  // Mettre à jour un projet (admin)
  async updateProject(id, projectData) {
    return apiService.put(`/projects/${id}`, projectData);
  },

  // Supprimer un projet (admin)
  async deleteProject(id) {
    return apiService.delete(`/projects/${id}`);
  }
};
```

### 3. Service pour les contacts

Créez `src/services/contactService.js` :

```javascript
import apiService from './api';

export const contactService = {
  // Soumettre un formulaire de contact
  async submitContact(contactData) {
    return apiService.post('/contact', contactData);
  },

  // Récupérer tous les contacts (admin)
  async getContacts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/contact${queryString ? `?${queryString}` : ''}`;
    return apiService.get(endpoint);
  },

  // Récupérer un contact spécifique (admin)
  async getContact(id) {
    return apiService.get(`/contact/${id}`);
  },

  // Mettre à jour un contact (admin)
  async updateContact(id, contactData) {
    return apiService.put(`/contact/${id}`, contactData);
  },

  // Supprimer un contact (admin)
  async deleteContact(id) {
    return apiService.delete(`/contact/${id}`);
  }
};
```

### 4. Service d'authentification

Créez `src/services/authService.js` :

```javascript
import apiService from './api';

export const authService = {
  // S'inscrire
  async register(userData) {
    return apiService.post('/auth/register', userData);
  },

  // Se connecter
  async login(credentials) {
    return apiService.post('/auth/login', credentials);
  },

  // Récupérer l'utilisateur actuel
  async getCurrentUser() {
    return apiService.get('/auth/me');
  },

  // Se déconnecter
  async logout() {
    return apiService.post('/auth/logout');
  }
};
```

## Intégration dans les composants

### 1. Formulaire de contact

Modifiez le composant Contact pour utiliser l'API :

```javascript
import { useState } from 'react';
import { contactService } from '../services/contactService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: 'other',
    budget: 'not-sure',
    timeline: 'not-sure',
    source: 'website'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await contactService.submitContact(formData);
      setSubmitStatus({ type: 'success', message: response.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        service: 'other',
        budget: 'not-sure',
        timeline: 'not-sure',
        source: 'website'
      });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... reste du composant
};
```

### 2. Page Case Studies

Modifiez la page Case Studies pour récupérer les données depuis l'API :

```javascript
import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';

const CaseStudies = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadProjects();
  }, [activeFilter]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const params = {};
      if (activeFilter !== 'all') {
        params.category = activeFilter;
      }
      
      const response = await projectService.getProjects(params);
      setProjects(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeProject = async (projectId) => {
    try {
      await projectService.likeProject(projectId);
      // Recharger les projets pour mettre à jour les likes
      loadProjects();
    } catch (error) {
      console.error('Error liking project:', error);
    }
  };

  // ... reste du composant
};
```

### 3. Page Portfolio

Modifiez la page Portfolio pour utiliser l'API :

```javascript
import { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getProjects({ featured: 'true' });
      setProjects(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ... reste du composant
};
```

## Gestion des erreurs

Créez un composant pour gérer les erreurs API :

```javascript
// src/components/ErrorMessage.jsx
const ErrorMessage = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Erreur de chargement
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
```

## Variables d'environnement

Créez un fichier `.env` dans le frontend :

```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_ENVIRONMENT=development
```

## Démarrage des deux serveurs

### Script de démarrage

Créez un script dans le package.json principal :

```json
{
  "scripts": {
    "dev": "vite",
    "dev:backend": "cd backend && npm run simple",
    "dev:full": "concurrently \"npm run dev\" \"npm run dev:backend\""
  }
}
```

### Installation de concurrently

```bash
npm install --save-dev concurrently
```

## Test de l'intégration

1. Démarrez le backend : `cd backend && npm run simple`
2. Démarrez le frontend : `npm run dev`
3. Testez les fonctionnalités :
   - Formulaire de contact
   - Affichage des projets
   - Navigation entre les pages

## Prochaines étapes

1. **Authentification** : Implémenter l'authentification JWT
2. **Gestion d'état** : Utiliser React Query ou Redux
3. **Upload de fichiers** : Intégrer Multer pour les images
4. **Email** : Configurer l'envoi d'emails
5. **Base de données** : Migrer vers MongoDB Atlas 