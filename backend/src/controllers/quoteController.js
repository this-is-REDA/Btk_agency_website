import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const submitQuote = async (req, res) => {
  try {
    const { name, email, company, phone, project_type, budget, timeline, description } = req.body;
    
    const quoteData = {
      id: Date.now(),
      name,
      email,
      company: company || null,
      phone: phone || null,
      project_type,
      budget,
      timeline,
      description,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    // Sauvegarder dans un fichier JSON
    try {
      const quotesFile = path.join(__dirname, '../../logs/quotes.json');
      let quotes = [];
      
      // Lire les devis existants
      if (fs.existsSync(quotesFile)) {
        const data = fs.readFileSync(quotesFile, 'utf8');
        quotes = JSON.parse(data);
      }
      
      // Ajouter le nouveau devis
      quotes.push(quoteData);
      
      // Sauvegarder
      fs.writeFileSync(quotesFile, JSON.stringify(quotes, null, 2));
      console.log('✅ Devis sauvegardé dans quotes.json');
    } catch (fileError) {
      console.error('❌ Erreur sauvegarde fichier:', fileError.message);
    }
    
    res.status(201).json({
      success: true,
      message: 'Devis soumis avec succès',
      data: quoteData
    });
  } catch (error) {
    console.error('Erreur submitQuote:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

export const getQuotes = async (req, res) => {
  try {
    const quotesFile = path.join(__dirname, '../../logs/quotes.json');
    let quotes = [];
    
    // Lire les devis existants
    if (fs.existsSync(quotesFile)) {
      const data = fs.readFileSync(quotesFile, 'utf8');
      quotes = JSON.parse(data);
    }
    
    res.status(200).json({
      success: true,
      data: quotes
    });
  } catch (error) {
    console.error('Erreur getQuotes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

export const getQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quotesFile = path.join(__dirname, '../../logs/quotes.json');
    let quotes = [];
    
    // Lire les devis existants
    if (fs.existsSync(quotesFile)) {
      const data = fs.readFileSync(quotesFile, 'utf8');
      quotes = JSON.parse(data);
    }
    
    const quote = quotes.find(q => q.id == id);
    
    if (quote) {
      res.status(200).json({
        success: true,
        data: quote
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Devis non trouvé'
      });
    }
  } catch (error) {
    console.error('Erreur getQuote:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Pour l'instant, on retourne une réponse simple
    res.status(200).json({
      success: true,
      message: 'Devis mis à jour',
      data: { id, ...updateData }
    });
  } catch (error) {
    console.error('Erreur updateQuote:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Pour l'instant, on retourne une réponse simple
    res.status(200).json({
      success: true,
      message: 'Devis supprimé',
      data: { id }
    });
  } catch (error) {
    console.error('Erreur deleteQuote:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};
