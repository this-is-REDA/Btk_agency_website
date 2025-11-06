import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware de base
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080', 'https://localhost:8080'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite de 100 requêtes par IP
});
app.use('/api/', limiter);

// Routes de base
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BTK Agency API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Route de contact simplifiée
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validation basique
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Nom, email et message sont requis'
      });
    }
    
    // Simulation d'enregistrement
    console.log('📧 Nouveau contact reçu:', { name, email, subject, message });
    
    res.json({
      success: true,
      message: 'Message envoyé avec succès',
      data: {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erreur contact:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
});

// Route de devis simplifiée
app.post('/api/quote', (req, res) => {
  try {
    const { name, email, company, phone, project_type, budget, timeline, description } = req.body;
    
    // Validation basique
    if (!name || !email || !project_type || !description) {
      return res.status(400).json({
        success: false,
        message: 'Nom, email, type de projet et description sont requis'
      });
    }
    
    // Simulation d'enregistrement
    console.log('💰 Nouveau devis reçu:', { name, email, company, project_type, budget, timeline });
    
    res.json({
      success: true,
      message: 'Devis soumis avec succès',
      data: {
        id: Date.now(),
        name,
        email,
        company,
        phone,
        project_type,
        budget,
        timeline,
        description,
        status: 'pending',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erreur devis:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
});

// Route pour récupérer les devis (simulation)
app.get('/api/quotes', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        name: 'Exemple Client',
        email: 'client@example.com',
        project_type: 'Site Web',
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    ]
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erreur serveur'
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('🚀 BTK Agency Backend démarré !');
  console.log(`📡 Serveur en cours d'exécution sur le port ${PORT}`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`💰 Quote API: http://localhost:${PORT}/api/quote`);
  console.log('✅ Backend prêt à recevoir des requêtes !');
});

export default app;
