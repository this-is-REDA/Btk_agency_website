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

// Supabase removed - using local storage instead

// Import controllers
import { submitQuote, getQuotes, getQuote, updateQuote, deleteQuote } from './controllers/quoteController.js';
import sendEmail from './utils/sendEmail.js';

// Import security middleware
import {
  corsOptions,
  apiLimiter,
  inputValidation,
  attackDetection,
  headerValidation,
  bruteForceProtection,
  contentTypeValidation,
  requestSizeValidation,
  securityLogging,
  helmetConfig
} from './middleware/security.js';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security middleware - Configuration avancée
app.use(helmet(helmetConfig));

// CORS sécurisé
app.use(cors(corsOptions));

// Middleware de sécurité
app.use(securityLogging);
app.use(headerValidation);
app.use(inputValidation);
app.use(attackDetection);
app.use(bruteForceProtection);
app.use(contentTypeValidation);
app.use(requestSizeValidation);

// Rate limiting avancé
app.use('/api/', apiLimiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BTK Agency API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      subject,
      message,
      service,
      budget,
      timeline,
      source
    } = req.body;

    // Validation des données
    const errors = {};
    
    // Validation nom
    if (!name || name.length < 2 || name.length > 50) {
      errors.name = 'Nom invalide (2-50 caractères)';
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Email invalide';
    }
    
    // Validation sujet
    if (!subject || subject.length < 5 || subject.length > 200) {
      errors.subject = 'Sujet invalide (5-200 caractères)';
    }
    
    // Validation message
    if (!message || message.length < 10 || message.length > 2000) {
      errors.message = 'Message invalide (10-2000 caractères)';
    }
    
    // Validation téléphone (optionnel)
    if (phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        errors.phone = 'Numéro de téléphone invalide';
      }
    }
    
    // Vérifier les injections
    const dangerousPatterns = [
      /<script/i, /javascript:/i, /vbscript:/i, /onload=/i, /onerror=/i,
      /eval\(/i, /document\./i, /window\./i, /alert\(/i, /confirm\(/i, /prompt\(/i,
      /<iframe/i, /<object/i, /<embed/i, /<form/i, /<input/i, /<textarea/i,
      /<select/i, /<button/i, /<link/i, /<meta/i, /<style/i, /<base/i
    ];
    
    const checkForDangerousContent = (text) => {
      return dangerousPatterns.some(pattern => pattern.test(text));
    };
    
    if (checkForDangerousContent(name) || checkForDangerousContent(email) || 
        checkForDangerousContent(subject) || checkForDangerousContent(message)) {
      return res.status(403).json({
        success: false,
        message: 'Contenu non autorisé détecté'
      });
    }
    
    // Retourner les erreurs si validation échoue
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation échouée',
        errors
      });
    }

    // Sauvegarder localement (fichier JSON)
    const contactData = {
      id: Date.now(),
      name,
      email,
      phone: phone || null,
      company: company || null,
      subject,
      message,
      service: service || null,
      budget: budget || null,
      timeline: timeline || null,
      source: source || 'Site web',
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    console.log('📝 Contact sauvegardé localement:', contactData);
    
    // Sauvegarder dans un fichier JSON (optionnel)
    try {
      const contactsFile = path.join(__dirname, '../../logs/contacts.json');
      let contacts = [];
      
      // Lire les contacts existants
      if (fs.existsSync(contactsFile)) {
        const data = fs.readFileSync(contactsFile, 'utf8');
        contacts = JSON.parse(data);
      }
      
      // Ajouter le nouveau contact
      contacts.push(contactData);
      
      // Sauvegarder
      fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
      console.log('✅ Contact sauvegardé dans contacts.json');
    } catch (fileError) {
      console.error('❌ Erreur sauvegarde fichier:', fileError.message);
    }
    
    const contact = contactData;

    // Send email notification with elegant template
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL || 'btkagency0@gmail.com',
        subject: `Nouveau Contact - ${subject}`,
        message: `
          Nouveau formulaire de contact reçu:
          
          Nom: ${name}
          Email: ${email}
          Téléphone: ${phone || 'Non fourni'}
          Entreprise: ${company || 'Non fourni'}
          Sujet: ${subject}
          Service: ${service || 'Non spécifié'}
          Budget: ${budget || 'Non spécifié'}
          Délai: ${timeline || 'Non spécifié'}
          Source: ${source || 'Site web'}
          
          Message:
          ${message}
        `,
        data: {
          name,
          email,
          phone,
          company,
          subject,
          service,
          budget,
          timeline,
          source,
          message
        }
      });
      console.log('✅ Email envoyé avec succès');
    } catch (emailError) {
      console.error('❌ Erreur envoi email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform Transformation",
      client: "TechCorp Inc.",
      category: "ecommerce",
      industry: "Technology",
      duration: "6 months",
      image: "/placeholder.svg",
      website: "https://techcorp.com",
      challenge: "TechCorp's existing e-commerce platform was outdated, slow, and had poor user experience, resulting in low conversion rates and customer dissatisfaction.",
      solution: "We redesigned and rebuilt the entire platform using modern technologies, implemented advanced UX/UI improvements, and integrated seamless payment processing.",
      results: {
        conversion: "+45%",
        revenue: "+120%",
        traffic: "+80%",
        satisfaction: "4.8/5"
      },
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      process: [
        "Discovery & Analysis",
        "UX/UI Design",
        "Development",
        "Testing & QA",
        "Launch & Optimization"
      ],
      testimonial: {
        text: "BTK Agency transformed our online presence completely. The new platform increased our sales by 120% in just 6 months. The user experience is now seamless and our customers love it.",
        author: "Sarah Johnson",
        position: "CEO, TechCorp Inc.",
        rating: 5
      },
      status: "published",
      featured: true,
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: "SaaS Platform Growth Strategy",
      client: "CloudFlow Solutions",
      category: "saas",
      industry: "Software",
      duration: "12 months",
      image: "/placeholder.svg",
      website: "https://cloudflow.com",
      challenge: "CloudFlow had a great product but struggled with user acquisition and retention. Their marketing efforts weren't generating the desired results.",
      solution: "We implemented a comprehensive digital marketing strategy including content marketing, SEO optimization, PPC campaigns, and customer lifecycle management.",
      results: {
        users: "+300%",
        retention: "+65%",
        mrr: "+180%",
        churn: "-40%"
      },
      technologies: ["Google Ads", "Facebook Ads", "Content Marketing", "SEO", "Analytics"],
      process: [
        "Market Research",
        "Strategy Development",
        "Campaign Execution",
        "Performance Monitoring",
        "Continuous Optimization"
      ],
      testimonial: {
        text: "The growth strategy implemented by BTK Agency was game-changing. We saw a 300% increase in users and our monthly recurring revenue grew by 180%.",
        author: "Michael Chen",
        position: "Founder, CloudFlow Solutions",
        rating: 5
      },
      status: "published",
      featured: true,
      views: 980,
      likes: 67
    },
    {
      id: 3,
      title: "Healthcare Website Redesign",
      client: "MedCare Plus",
      category: "healthcare",
      industry: "Healthcare",
      duration: "4 months",
      image: "/placeholder.svg",
      website: "https://medcareplus.com",
      challenge: "MedCare Plus needed a modern, accessible website that complied with healthcare regulations while providing excellent user experience for patients.",
      solution: "We created a HIPAA-compliant website with modern design, improved accessibility, online appointment booking, and patient portal integration.",
      results: {
        appointments: "+200%",
        engagement: "+150%",
        accessibility: "WCAG 2.1 AA",
        satisfaction: "4.9/5"
      },
      technologies: ["Next.js", "TypeScript", "HIPAA Compliance", "Accessibility", "Patient Portal"],
      process: [
        "Compliance Audit",
        "Design & Development",
        "Accessibility Testing",
        "Security Implementation",
        "Training & Launch"
      ],
      testimonial: {
        text: "The new website has significantly improved our patient experience. Online appointments increased by 200% and our accessibility compliance is now perfect.",
        author: "Dr. Emma Wilson",
        position: "Medical Director, MedCare Plus",
        rating: 5
      },
      status: "published",
      featured: false,
      views: 756,
      likes: 45
    }
  ];

  res.json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// Single project endpoint
app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const projects = [
    // ... same projects as above
  ];
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  res.json({
    success: true,
    data: project
  });
});

// Like project endpoint
app.post('/api/projects/:id/like', (req, res) => {
  const projectId = parseInt(req.params.id);
  
  // Simulate liking a project
  res.json({
    success: true,
    message: 'Project liked successfully',
    data: { projectId, likes: Math.floor(Math.random() * 100) + 50 }
  });
});

// Quote routes
app.post('/api/quote', submitQuote);
app.get('/api/quote', getQuotes);
app.get('/api/quote/:id', getQuote);
app.put('/api/quote/:id', updateQuote);
app.delete('/api/quote/:id', deleteQuote);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error'
  });
});

const PORT = process.env.PORT || 5001;

// Configuration HTTP (pour le développement)
// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname, '../../certs/localhost-key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, '../../certs/localhost.pem'))
// };

// Créer le serveur HTTP (pour le développement)
const server = app;

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`🔒 Server running in ${process.env.NODE_ENV} mode on port ${PORT} (HTTP)`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🛡️ Security: HTTP mode for development`);
  console.log(`📝 Contacts will be saved to logs/contacts.json`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
}); 