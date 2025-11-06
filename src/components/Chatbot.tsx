import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User,
  Loader2,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Code,
  Palette,
  TrendingUp,
  Users,
  Award,
  Zap
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'contact-info' | 'service-info';
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis l'assistant virtuel de BTK Agency. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Base de connaissances du chatbot
  const knowledgeBase = {
    services: {
      "développement web": "Nous créons des sites web modernes et performants avec les dernières technologies (React, Node.js, etc.). Nos solutions incluent des sites vitrines, e-commerce et applications web personnalisées.",
      "marketing digital": "Notre équipe spécialisée en marketing digital propose des stratégies complètes : SEO, publicité en ligne, réseaux sociaux, email marketing et analytics.",
      "design": "Nous créons des identités visuelles uniques, logos, chartes graphiques et designs d'interfaces utilisateur modernes et intuitives.",
      "seo": "Nous optimisons votre visibilité en ligne avec des stratégies SEO techniques et créatives pour améliorer votre classement dans les moteurs de recherche.",
      "publicité": "Nous gérons vos campagnes publicitaires Google Ads, Facebook Ads et autres plateformes pour maximiser votre ROI.",
      "réseaux sociaux": "Nous créons et gérons votre présence sur les réseaux sociaux avec du contenu engageant et des stratégies de croissance.",
      "site web": "Nous développons des sites web sur mesure avec des technologies modernes. Nos sites sont responsives, rapides et optimisés SEO.",
      "application": "Nous créons des applications web et mobiles personnalisées pour répondre à vos besoins spécifiques.",
      "e-commerce": "Nous développons des boutiques en ligne complètes avec gestion des produits, paiements sécurisés et analytics.",
      "branding": "Nous créons votre identité de marque complète : logo, charte graphique, supports de communication.",
      "social media": "Nous gérons vos réseaux sociaux : création de contenu, community management, publicités ciblées.",
      "google ads": "Nous optimisons vos campagnes Google Ads pour maximiser votre ROI et atteindre vos objectifs.",
      "facebook ads": "Nous créons et gérons vos campagnes publicitaires Facebook et Instagram.",
      "email marketing": "Nous concevons des stratégies d'email marketing personnalisées pour fidéliser vos clients."
    },
    contact: {
      "adresse": "Notre adresse : Bd Moulay Abdellah Cherif, Casablanca 20250, Maroc",
      "téléphone": "Vous pouvez nous appeler au +212 5 22 123 456",
      "email": "Contactez-nous par email à btkagency0@gmail.com",
      "heures": "Nous travaillons du lundi au vendredi de 8h00 à 18h00 (GMT+1)",
      "localisation": "Nous sommes situés au cœur de Casablanca, facilement accessible.",
      "rendez-vous": "Nous proposons des consultations gratuites en ligne ou en personne.",
      "urgence": "Pour les urgences, appelez-nous directement au +212 5 22 123 456"
    },
    company: {
      "équipe": "Notre équipe compte 5 experts passionnés : développeurs, designers, marketeurs et consultants digitaux.",
      "expérience": "BTK Agency a plus de 5 ans d'expérience dans le digital avec plus de 100 projets réalisés.",
      "valeurs": "Nos valeurs : innovation, qualité, transparence et satisfaction client.",
      "mission": "Notre mission est de transformer les entreprises grâce au digital et de créer des expériences exceptionnelles.",
      "histoire": "BTK Agency a été fondée en 2019 avec la vision de démocratiser l'accès aux solutions digitales de qualité.",
      "culture": "Nous cultivons une culture d'innovation, de collaboration et d'excellence dans tout ce que nous faisons.",
      "certifications": "Notre équipe possède des certifications Google, Facebook, et autres plateformes majeures.",
      "partenaires": "Nous collaborons avec les meilleurs outils et plateformes du marché."
    },
    pricing: {
      "tarifs": "Nos tarifs varient selon la complexité du projet. Contactez-nous pour un devis personnalisé.",
      "budget": "Nous proposons des solutions adaptées à tous les budgets, de 5 000 à 50 000+ MAD.",
      "devis": "Obtenez un devis gratuit en 24h en nous contactant via notre formulaire en ligne.",
      "prix": "Nos prix sont transparents et adaptés à vos besoins. Pas de frais cachés.",
      "paiement": "Nous proposons des modalités de paiement flexibles : 50% à la commande, 50% à la livraison.",
      "maintenance": "Nous proposons des forfaits de maintenance mensuels pour maintenir votre site à jour.",
      "formation": "Nous incluons une formation gratuite pour que vous puissiez gérer votre site en autonomie."
    },
    process: {
      "démarche": "Notre processus : 1) Consultation, 2) Stratégie, 3) Design, 4) Développement, 5) Livraison",
      "durée": "La durée varie selon le projet : sites web (2-4 semaines), stratégies marketing (1-2 mois)",
      "communication": "Nous communiquons régulièrement avec nos clients via email, téléphone et réunions en ligne.",
      "méthodologie": "Nous utilisons une approche agile avec des sprints de 2 semaines et des livraisons régulières.",
      "qualité": "Chaque projet passe par des tests rigoureux avant la livraison finale.",
      "support": "Nous assurons un support technique pendant 3 mois après la livraison."
    },
    technologies: {
      "react": "Nous utilisons React pour créer des interfaces utilisateur modernes et performantes.",
      "node.js": "Node.js nous permet de développer des applications backend robustes et scalables.",
      "wordpress": "Nous créons des sites WordPress personnalisés avec des thèmes sur mesure.",
      "shopify": "Nous développons des boutiques Shopify optimisées pour la conversion.",
      "seo": "Nous utilisons les meilleures pratiques SEO pour améliorer votre visibilité.",
      "google analytics": "Nous configurons Google Analytics pour suivre vos performances.",
      "facebook pixel": "Nous intégrons Facebook Pixel pour optimiser vos campagnes publicitaires."
    },
    industries: {
      "restaurant": "Nous avons une expertise particulière dans le digital pour les restaurants et la restauration.",
      "e-commerce": "Nous créons des boutiques en ligne performantes pour tous types de produits.",
      "services": "Nous aidons les entreprises de services à développer leur présence en ligne.",
      "startup": "Nous accompagnons les startups dans leur développement digital.",
      "santé": "Nous créons des solutions digitales adaptées au secteur de la santé.",
      "éducation": "Nous développons des plateformes éducatives et de formation en ligne."
    }
  };

  // Réponses rapides suggérées
  const quickReplies: QuickReply[] = [
    { id: '1', text: "Nos services", action: "services" },
    { id: '2', text: "Nos tarifs", action: "pricing" },
    { id: '3', text: "Nous contacter", action: "contact" },
    { id: '4', text: "Notre équipe", action: "team" },
    { id: '5', text: "Nos réalisations", action: "portfolio" },
    { id: '6', text: "Devis gratuit", action: "quote" },
    { id: '7', text: "Processus", action: "process" },
    { id: '8', text: "Technologies", action: "technologies" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000 + Math.random() * 2000);
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Gestion de l'arabe
    if (message.includes('مرحبا') || message.includes('السلام عليكم') || message.includes('أهلا')) {
      return "مرحبا! أنا المساعد الافتراضي لوكالة BTK. كيف يمكنني مساعدتك اليوم؟ يمكنني تقديم معلومات عن خدماتنا وأسعارنا وعملية العمل أو أي جانب آخر من وكالتنا.";
    }

    if (message.includes('شكرا') || message.includes('شكرا لك') || message.includes('مشكور')) {
      return "على الرحب والسعة! إنه لمن دواعي سروري مساعدتك. لا تتردد إذا كان لديك أسئلة أخرى حول وكالة BTK أو إذا كنت ترغب في عرض أسعار مخصص.";
    }

    if (message.includes('مع السلامة') || message.includes('وداعا') || message.includes('إلى اللقاء')) {
      return "مع السلامة! لا تتردد في العودة إذا كنت بحاجة إلى مساعدة. يمكنك أيضًا الاتصال بنا مباشرة على +212 5 22 123 456 أو عبر البريد الإلكتروني btkagency0@gmail.com.";
    }

    if (message.includes('ما') || message.includes('كيف') || message.includes('متى') || message.includes('أين') || message.includes('لماذا') || message.includes('من')) {
      return "يمكنني مساعدتك في جميع أسئلتك حول وكالة BTK! نحن متخصصون في تطوير الويب والتسويق الرقمي والتصميم. ما الذي تريد معرفته تحديدًا؟";
    }

    if (message.includes('خدمات') || message.includes('ماذا تفعلون') || message.includes('مساعدة')) {
      return "تقدم وكالة BTK حلول رقمية شاملة:\n\n🖥️ تطوير الويب\n📈 التسويق الرقمي\n🎨 التصميم والعلامة التجارية\n📱 إدارة وسائل التواصل الاجتماعي\n🔍 تحسين محركات البحث والتحليلات\n\nما الخدمة التي تهمك أكثر؟";
    }

    if (message.includes('سعر') || message.includes('تكلفة') || message.includes('كم')) {
      return "تختلف أسعارنا حسب تعقيد المشروع. نقدم حلول لجميع الميزانيات، من 5,000 إلى 50,000+ درهم مغربي. اتصل بنا للحصول على عرض أسعار مخصص مجاني. هل تريد عرض أسعار؟";
    }

    // Gestion des langues étrangères
    if (message.includes('hello') || message.includes('hi') || message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
      return "Hello! I'm the BTK Agency virtual assistant. How can I help you today? I can provide information about our services, pricing, process, or any other aspect of our agency.";
    }

    if (message.includes('thank you') || message.includes('thanks') || message.includes('thx')) {
      return "You're welcome! It's a pleasure to help you. Don't hesitate if you have other questions about BTK Agency or if you'd like a personalized quote.";
    }

    if (message.includes('goodbye') || message.includes('bye') || message.includes('see you')) {
      return "Goodbye! Don't hesitate to come back if you need help. You can also contact us directly at +212 5 22 123 456 or by email at btkagency0@gmail.com.";
    }

    if (message.includes('what') || message.includes('how') || message.includes('when') || message.includes('where') || message.includes('why') || message.includes('who')) {
      return "I can help you with all your questions about BTK Agency! We specialize in web development, digital marketing, and design. What would you like to know specifically?";
    }

    if (message.includes('services') || message.includes('what do you do') || message.includes('help')) {
      return "BTK Agency offers comprehensive digital solutions:\n\n🖥️ Web Development\n📈 Digital Marketing\n🎨 Design & Branding\n📱 Social Media Management\n🔍 SEO & Analytics\n\nWhat service interests you most?";
    }

    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return "Our prices vary according to project complexity. We offer solutions for all budgets, from 5,000 to 50,000+ MAD. Contact us for a free personalized quote. Would you like a quote?";
    }

    // Gestion de l'espagnol
    if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes')) {
      return "¡Hola! Soy el asistente virtual de BTK Agency. ¿Cómo puedo ayudarte hoy? Puedo proporcionarte información sobre nuestros servicios, precios, proceso o cualquier otro aspecto de nuestra agencia.";
    }

    if (message.includes('gracias') || message.includes('muchas gracias')) {
      return "¡De nada! Es un placer ayudarte. No dudes si tienes otras preguntas sobre BTK Agency o si quieres un presupuesto personalizado.";
    }

    if (message.includes('adiós') || message.includes('hasta luego') || message.includes('chao')) {
      return "¡Adiós! No dudes en volver si necesitas ayuda. También puedes contactarnos directamente al +212 5 22 123 456 o por email a btkagency0@gmail.com.";
    }

    // Recherche dans toutes les catégories avec une logique améliorée
    const allCategories = {
      ...knowledgeBase.services,
      ...knowledgeBase.contact,
      ...knowledgeBase.company,
      ...knowledgeBase.pricing,
      ...knowledgeBase.process,
      ...knowledgeBase.technologies,
      ...knowledgeBase.industries
    };

    // Recherche exacte d'abord
    for (const [key, value] of Object.entries(allCategories)) {
      if (message.includes(key)) {
        return value;
      }
    }

    // Recherche par mots-clés partiels
    const keywords = {
      "site": "site web",
      "web": "site web",
      "application": "application",
      "app": "application",
      "mobile": "application",
      "boutique": "e-commerce",
      "shop": "e-commerce",
      "commerce": "e-commerce",
      "logo": "branding",
      "marque": "branding",
      "identité": "branding",
      "réseau": "réseaux sociaux",
      "social": "social media",
      "instagram": "social media",
      "facebook": "facebook ads",
      "google": "google ads",
      "ads": "publicité",
      "pub": "publicité",
      "email": "email marketing",
      "newsletter": "email marketing",
      "seo": "seo",
      "référencement": "seo",
      "google analytics": "google analytics",
      "analytics": "google analytics",
      "pixel": "facebook pixel",
      "react": "react",
      "node": "node.js",
      "wordpress": "wordpress",
      "shopify": "shopify",
      "prix": "tarifs",
      "coût": "tarifs",
      "budget": "budget",
      "devis": "devis",
      "gratuit": "devis",
      "équipe": "équipe",
      "expérience": "expérience",
      "années": "expérience",
      "projet": "expérience",
      "processus": "démarche",
      "méthode": "démarche",
      "durée": "durée",
      "temps": "durée",
      "semaine": "durée",
      "mois": "durée",
      "communication": "communication",
      "contact": "téléphone",
      "appeler": "téléphone",
      "téléphoner": "téléphone",
      "adresse": "adresse",
      "localisation": "localisation",
      "casablanca": "adresse",
      "maroc": "adresse",
      "heures": "heures",
      "horaire": "heures",
      "travail": "heures",
      "urgence": "urgence",
      "urgent": "urgence",
      "restaurant": "restaurant",
      "restauration": "restaurant",
      "startup": "startup",
      "santé": "santé",
      "médecin": "santé",
      "hôpital": "santé",
      "éducation": "éducation",
      "formation": "éducation",
      "école": "éducation"
    };

    for (const [keyword, category] of Object.entries(keywords)) {
      if (message.includes(keyword)) {
        return allCategories[category] || "Je peux vous aider avec ce sujet. Pouvez-vous me donner plus de détails ?";
      }
    }

    // Questions spécifiques avec variations
    if (message.includes('quoi') || message.includes('que faites-vous') || message.includes('que faites vous') || message.includes('que fait') || message.includes('c\'est quoi') || message.includes('qu\'est-ce que')) {
      return "BTK Agency est une agence digitale spécialisée dans le développement web, le marketing digital et le design. Nous créons des solutions sur mesure pour transformer votre présence en ligne. Que souhaitez-vous savoir en particulier ?";
    }

    if (message.includes('comment') || message.includes('comment ça marche') || message.includes('comment faire') || message.includes('comment procéder')) {
      return "Notre processus est simple : nous commençons par une consultation gratuite pour comprendre vos besoins, puis nous élaborons une stratégie personnalisée, nous créons le design, nous développons la solution et nous vous livrons le projet final. Voulez-vous en savoir plus sur une étape spécifique ?";
    }

    if (message.includes('pourquoi') || message.includes('pour quoi') || message.includes('raison')) {
      return "Nous choisissons les meilleures technologies et stratégies pour garantir des résultats optimaux. Notre expertise nous permet de créer des solutions performantes qui répondent parfaitement à vos objectifs. Avez-vous un projet spécifique en tête ?";
    }

    if (message.includes('quand') || message.includes('délai') || message.includes('temps') || message.includes('durée')) {
      return "Les délais varient selon la complexité du projet. Un site web simple prend 2-3 semaines, une boutique en ligne 3-4 semaines, et une stratégie marketing complète 1-2 mois. Voulez-vous un devis personnalisé avec planning détaillé ?";
    }

    if (message.includes('où') || message.includes('adresse') || message.includes('lieu') || message.includes('localisation')) {
      return "Nous sommes situés au Bd Moulay Abdellah Cherif, Casablanca 20250, Maroc. Nous proposons aussi des consultations en ligne pour votre commodité. Souhaitez-vous prendre rendez-vous ?";
    }

    if (message.includes('qui') || message.includes('équipe') || message.includes('personnes')) {
      return "Notre équipe compte 5 experts passionnés : développeurs, designers, marketeurs et consultants digitaux. Nous avons plus de 5 ans d'expérience et plus de 100 projets réalisés. Voulez-vous en savoir plus sur notre équipe ?";
    }

    if (message.includes('combien') || message.includes('prix') || message.includes('coût') || message.includes('tarif')) {
      return "Nos tarifs varient selon la complexité du projet. Nous proposons des solutions adaptées à tous les budgets, de 5 000 à 50 000+ MAD. Contactez-nous pour un devis personnalisé gratuit. Voulez-vous un devis ?";
    }

    // Salutations et politesse avec variations
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello') || message.includes('hi') || message.includes('coucou') || message.includes('bonsoir')) {
      return "Bonjour ! Je suis l'assistant virtuel de BTK Agency. Comment puis-je vous aider aujourd'hui ? Je peux vous renseigner sur nos services, tarifs, processus ou tout autre aspect de notre agence.";
    }

    if (message.includes('merci') || message.includes('thanks') || message.includes('thank you') || message.includes('merci beaucoup')) {
      return "De rien ! C'est un plaisir de vous aider. N'hésitez pas si vous avez d'autres questions sur BTK Agency ou si vous souhaitez un devis personnalisé.";
    }

    if (message.includes('au revoir') || message.includes('bye') || message.includes('goodbye') || message.includes('à bientôt') || message.includes('ciao')) {
      return "Au revoir ! N'hésitez pas à revenir si vous avez besoin d'aide. Vous pouvez aussi nous contacter directement au +212 5 22 123 456 ou par email à btkagency0@gmail.com.";
    }

    // Questions ouvertes et générales
    if (message.includes('aide') || message.includes('help') || message.includes('soutien')) {
      return "Je peux vous aider avec :\n\n📋 Nos services (développement web, marketing, design)\n💰 Nos tarifs et devis\n👥 Notre équipe et expérience\n📞 Nos coordonnées\n🔄 Notre processus de travail\n\nQue souhaitez-vous savoir ?";
    }

    if (message.includes('tout') || message.includes('tous') || message.includes('toutes') || message.includes('complet')) {
      return "Voici un aperçu complet de BTK Agency :\n\n🖥️ Développement web et applications\n📈 Marketing digital et SEO\n🎨 Design et branding\n📱 Réseaux sociaux et publicité\n💰 Tarifs adaptés à tous budgets\n👥 Équipe de 5 experts expérimentés\n\nQuel aspect vous intéresse le plus ?";
    }

    if (message.includes('possible') || message.includes('peut-on') || message.includes('peut on')) {
      return "Oui, tout est possible ! Nous adaptons nos solutions à vos besoins spécifiques. Que souhaitez-vous réaliser ? Je peux vous orienter vers les services les plus adaptés.";
    }

    if (message.includes('difficile') || message.includes('compliqué') || message.includes('complexe')) {
      return "Pas de souci ! Nous avons l'expérience pour gérer des projets complexes. Nous simplifions le processus pour vous et vous accompagnons à chaque étape. Quel type de projet avez-vous en tête ?";
    }

    if (message.includes('rapide') || message.includes('vite') || message.includes('urgent')) {
      return "Nous pouvons accélérer les délais selon vos besoins urgents. Contactez-nous directement au +212 5 22 123 456 pour les projets urgents. Quel est votre délai souhaité ?";
    }

    if (message.includes('qualité') || message.includes('bon') || message.includes('excellent')) {
      return "La qualité est notre priorité ! Nous utilisons les meilleures technologies et suivons les standards internationaux. Notre taux de satisfaction client est de 98%. Voulez-vous voir nos réalisations ?";
    }

    if (message.includes('problème') || message.includes('souci') || message.includes('difficulté')) {
      return "Nous sommes là pour résoudre vos problèmes ! Notre équipe d'experts peut vous aider avec tous types de défis digitaux. Décrivez-moi votre situation et je vous orienterai vers la meilleure solution.";
    }

    if (message.includes('conseil') || message.includes('avis') || message.includes('recommandation')) {
      return "Je peux vous donner des conseils personnalisés ! Pour cela, j'ai besoin de comprendre votre projet et vos objectifs. Pouvez-vous me décrire votre situation ?";
    }

    if (message.includes('exemple') || message.includes('cas') || message.includes('référence')) {
      return "Nous avons plus de 100 projets réalisés ! Vous pouvez voir nos exemples sur notre page Portfolio. Nous avons travaillé avec des entreprises de tous secteurs. Quel type d'exemple vous intéresse ?";
    }

    if (message.includes('formation') || message.includes('apprendre') || message.includes('cours')) {
      return "Nous proposons des formations gratuites pour nos clients ! Nous vous apprenons à gérer votre site en autonomie. Voulez-vous en savoir plus sur nos formations ?";
    }

    if (message.includes('maintenance') || message.includes('support') || message.includes('service après-vente')) {
      return "Nous proposons des forfaits de maintenance mensuels pour maintenir votre site à jour et sécurisé. Nous assurons aussi un support technique pendant 3 mois après la livraison. Voulez-vous un devis maintenance ?";
    }

    // Questions sur les technologies
    if (message.includes('technologie') || message.includes('tech') || message.includes('outil')) {
      return "Nous utilisons les meilleures technologies : React, Node.js, WordPress, Shopify, Google Analytics, et bien d'autres. Quelle technologie vous intéresse particulièrement ?";
    }

    // Questions sur les secteurs
    if (message.includes('secteur') || message.includes('domaine') || message.includes('industrie')) {
      return "Nous avons de l'expérience dans tous les secteurs : e-commerce, restauration, santé, éducation, startups, et bien d'autres. Quel secteur vous intéresse ?";
    }

    // Questions sur la concurrence
    if (message.includes('concurrence') || message.includes('différence') || message.includes('avantage')) {
      return "Notre différence ? Une approche personnalisée, des technologies modernes, un accompagnement complet et un taux de satisfaction de 98%. Nous nous adaptons à vos besoins spécifiques.";
    }

    // Questions sur la garantie
    if (message.includes('garantie') || message.includes('assurance') || message.includes('sécurité')) {
      return "Nous offrons une garantie satisfaction et un support technique pendant 3 mois après la livraison. Nous testons rigoureusement chaque projet avant la livraison.";
    }

    // Questions sur les paiements
    if (message.includes('paiement') || message.includes('payer') || message.includes('facturation')) {
      return "Nous proposons des modalités de paiement flexibles : 50% à la commande et 50% à la livraison. Nous acceptons aussi des échéanciers personnalisés pour les gros projets.";
    }

    // Questions très spécifiques
    if (message.includes('erreur') || message.includes('bug') || message.includes('panne')) {
      return "Nous offrons un support technique pour résoudre tous les problèmes ! Contactez-nous au +212 5 22 123 456 pour un support d'urgence ou décrivez-moi le problème.";
    }

    if (message.includes('mise à jour') || message.includes('update') || message.includes('évolution')) {
      return "Nous proposons des forfaits de maintenance pour maintenir votre site à jour avec les dernières technologies et sécurités. Voulez-vous un devis maintenance ?";
    }

    if (message.includes('responsive') || message.includes('mobile') || message.includes('adaptatif')) {
      return "Tous nos sites sont responsives et optimisés pour mobile ! Nous utilisons les meilleures pratiques pour une expérience parfaite sur tous les appareils.";
    }

    if (message.includes('seo') || message.includes('référencement') || message.includes('google')) {
      return "Nous optimisons votre visibilité en ligne avec des stratégies SEO techniques et créatives. Nous utilisons les dernières techniques pour améliorer votre classement dans Google.";
    }

    if (message.includes('vitesse') || message.includes('performance') || message.includes('rapidité')) {
      return "La performance est cruciale ! Nous optimisons tous nos sites pour une vitesse de chargement maximale. Nous utilisons les meilleures techniques d'optimisation.";
    }

    if (message.includes('sécurité') || message.includes('protection') || message.includes('hack')) {
      return "La sécurité est notre priorité ! Nous implémentons les meilleures pratiques de sécurité : HTTPS, protection contre les attaques, sauvegardes régulières.";
    }

    if (message.includes('hébergement') || message.includes('serveur') || message.includes('domaine')) {
      return "Nous proposons des solutions d'hébergement fiables et sécurisées. Nous gérons aussi vos domaines et certificats SSL pour une présence en ligne optimale.";
    }

    // Questions sur les réseaux sociaux
    if (message.includes('instagram') || message.includes('facebook') || message.includes('tiktok') || message.includes('linkedin')) {
      return "Nous gérons votre présence sur tous les réseaux sociaux ! Création de contenu, community management, publicités ciblées. Quel réseau vous intéresse ?";
    }

    // Questions sur l'email marketing
    if (message.includes('email') || message.includes('newsletter') || message.includes('mailing')) {
      return "Nous créons des stratégies d'email marketing personnalisées pour fidéliser vos clients et augmenter vos ventes. Voulez-vous en savoir plus ?";
    }

    // Questions sur les publicités
    if (message.includes('publicité') || message.includes('ads') || message.includes('pub')) {
      return "Nous gérons vos campagnes publicitaires Google Ads, Facebook Ads et autres plateformes pour maximiser votre ROI. Quel type de publicité vous intéresse ?";
    }

    // Réponse intelligente par défaut avec plus de variations
    const defaultResponses = [
      "Excellente question ! Je peux vous renseigner sur nos services de développement web, marketing digital, design, ou sur nos tarifs et processus. Que souhaitez-vous savoir en particulier ?",
      "Je suis là pour vous aider ! BTK Agency propose des solutions complètes en digital. Voulez-vous en savoir plus sur nos services, nos tarifs, ou prendre rendez-vous pour une consultation gratuite ?",
      "Intéressant ! Nous avons une expertise dans de nombreux domaines. Pouvez-vous me dire quel type de projet vous avez en tête ? Je pourrai alors vous orienter vers les services les plus adaptés.",
      "Je comprends votre question. Pouvez-vous me donner plus de détails sur ce que vous recherchez ? Je peux vous aider avec nos services, tarifs, contact ou tout autre aspect de BTK Agency.",
      "Excellente question ! BTK Agency peut vous aider avec tous vos besoins digitaux. Que ce soit un site web, du marketing, du design ou de la formation, nous avons la solution. Que souhaitez-vous explorer ?",
      "Je suis votre assistant BTK ! Je peux vous guider vers les meilleures solutions pour votre projet. Dites-moi ce qui vous intéresse et je vous orienterai vers les services adaptés.",
      "Parfait ! BTK Agency est spécialisée dans le digital. Nous créons des solutions sur mesure pour tous types de projets. Quel aspect vous intéresse le plus : développement, marketing, design ou tarifs ?",
      "Excellente question ! Nous avons l'expérience et l'expertise pour répondre à tous vos besoins digitaux. Pouvez-vous me dire quel type de projet vous avez en tête ?",
      "Je peux vous aider avec tout ce qui concerne BTK Agency ! Développement web, marketing digital, design, tarifs, processus... Que souhaitez-vous découvrir ?",
      "BTK Agency est votre partenaire digital ! Nous créons des solutions sur mesure pour transformer votre présence en ligne. Quel aspect vous intéresse le plus ?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleQuickReply = (action: string) => {
    let response = "";
    
    switch (action) {
      case "services":
        response = "Nos services principaux :\n\n🖥️ Développement Web\n• Sites web sur mesure\n• Applications web et mobiles\n• Boutiques en ligne (e-commerce)\n• Intégrations API\n\n📈 Marketing Digital\n• SEO et référencement\n• Publicité Google Ads & Facebook Ads\n• Gestion réseaux sociaux\n• Email marketing\n\n🎨 Design & Branding\n• Logos et identité visuelle\n• Charte graphique\n• Design d'interfaces\n• Supports de communication\n\nQuel service vous intéresse le plus ?";
        break;
      case "pricing":
        response = "Nos tarifs sont adaptés à tous les budgets :\n\n💰 Sites web : 5 000 - 25 000 MAD\n🛒 E-commerce : 15 000 - 50 000 MAD\n📱 Applications : 20 000 - 80 000 MAD\n📈 Marketing : 3 000 - 15 000 MAD/mois\n\n✅ Devis gratuit en 24h\n✅ Paiement flexible (50% + 50%)\n✅ Maintenance incluse\n\nSouhaitez-vous un devis personnalisé ?";
        break;
      case "contact":
        response = "📞 Téléphone : +212 5 22 123 456\n📧 Email : btkagency0@gmail.com\n📍 Adresse : Bd Moulay Abdellah Cherif, Casablanca 20250\n⏰ Heures : Lun-Ven 8h-18h (GMT+1)\n\n💡 Nous proposons :\n• Consultations gratuites\n• Rendez-vous en ligne\n• Support d'urgence\n\nQuand souhaitez-vous nous contacter ?";
        break;
      case "team":
        response = "Notre équipe de 5 experts passionnés :\n\n👨‍💻 Développeurs Full-Stack\n• React, Node.js, WordPress\n• Applications web et mobiles\n• Intégrations API\n\n🎨 Designers UX/UI\n• Design d'interfaces\n• Identité visuelle\n• Expérience utilisateur\n\n📈 Spécialistes Marketing\n• SEO et analytics\n• Publicité en ligne\n• Stratégies digitales\n\n🔍 Experts SEO\n• Optimisation technique\n• Content marketing\n• Analytics avancées\n\n📊 Analystes Data\n• Google Analytics\n• Facebook Pixel\n• Rapports de performance\n\nVoulez-vous en savoir plus sur un expert en particulier ?";
        break;
      case "portfolio":
        response = "Découvrez nos réalisations sur notre page Portfolio !\n\n🏆 Plus de 100 projets réalisés\n🎯 Taux de satisfaction : 98%\n📈 Clients dans tous secteurs\n\nNos derniers projets incluent :\n• Sites e-commerce performants\n• Applications web innovantes\n• Campagnes marketing réussies\n• Identités de marque uniques\n\nVoulez-vous voir des exemples spécifiques ou prendre rendez-vous pour discuter de votre projet ?";
        break;
      case "quote":
        response = "Parfait ! Obtenez votre devis gratuit en 3 étapes :\n\n1️⃣ Remplissez notre formulaire en ligne\n2️⃣ Nous analysons vos besoins\n3️⃣ Devis personnalisé sous 24h\n\n✅ Gratuit et sans engagement\n✅ Analyse complète de vos besoins\n✅ Proposition détaillée avec planning\n✅ Garantie satisfaction\n\nVoulez-vous que je vous guide vers le formulaire de devis ?";
        break;
      case "process":
        response = "Notre processus en 5 étapes :\n\n1️⃣ Consultation gratuite\n• Analyse de vos besoins\n• Étude de votre marché\n• Définition des objectifs\n\n2️⃣ Stratégie personnalisée\n• Plan d'action détaillé\n• Planning et milestones\n• Budget et ROI estimé\n\n3️⃣ Design et maquettes\n• Wireframes et prototypes\n• Design d'interfaces\n• Validation client\n\n4️⃣ Développement\n• Développement agile\n• Tests et optimisations\n• Livraisons régulières\n\n5️⃣ Livraison et formation\n• Mise en ligne\n• Formation utilisateur\n• Support post-livraison\n\nVoulez-vous en savoir plus sur une étape spécifique ?";
        break;
      case "technologies":
        response = "Nous utilisons les meilleures technologies :\n\n🖥️ Frontend\n• React.js pour interfaces modernes\n• Next.js pour performance\n• TypeScript pour la robustesse\n\n⚙️ Backend\n• Node.js et Express\n• Bases de données SQL/NoSQL\n• APIs RESTful et GraphQL\n\n📱 Mobile & CMS\n• Applications React Native\n• WordPress personnalisé\n• Shopify pour e-commerce\n\n🔧 Outils & Analytics\n• Google Analytics 4\n• Facebook Pixel\n• Outils SEO avancés\n\nVoulez-vous en savoir plus sur une technologie spécifique ?";
        break;
      default:
        response = "Je ne comprends pas cette action. Pouvez-vous reformuler ou choisir une option dans les réponses rapides ?";
    }

    addMessage(response, 'bot');
  };

  const addMessage = (text: string, sender: 'user' | 'bot', type: 'text' | 'quick-reply' | 'contact-info' | 'service-info' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue('');

    simulateTyping(() => {
      const botResponse = generateResponse(userMessage);
      addMessage(botResponse, 'bot');
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bouton Chatbot */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Interface Chatbot */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4">
          <Card className="w-full max-w-md h-[500px] bg-white shadow-xl rounded-t-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <img 
                  src="/btkblack.svg" 
                  alt="BTK Agency" 
                  className="h-10 w-10"
                />
                <div>
                  <h3 className="font-semibold text-sm">BTK Assistant</h3>
                  <p className="text-xs text-muted-foreground">Comment puis-je vous aider ?</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <img 
                        src="/btkblack.svg" 
                        alt="BTK" 
                        className="h-8 w-8 mt-1"
                      />
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        {message.sender === 'user' && (
                          <User className="h-4 w-4 mt-1 text-primary-foreground flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-2">
                    <img 
                      src="/btkblack.svg" 
                      alt="BTK" 
                      className="h-8 w-8 mt-1"
                    />
                    <div className="flex gap-1 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}

                {/* Réponses rapides */}
                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Réponses rapides :</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <Button
                          key={reply.id}
                          onClick={() => handleQuickReply(reply.action)}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {reply.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot; 