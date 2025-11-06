import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Instagram, 
  Mail, 
  Phone,
  MapPin
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1TxMyJCF36/?mibextid=wwXIfr", label: "Facebook" },
    { icon: "X", href: "https://x.com/Btkagency", label: "X (Twitter)" },
    { icon: Instagram, href: "https://www.instagram.com/btk.work?igsh=MTVkMWpncTg1cHlweQ==", label: "Instagram" },
    { icon: "TikTok", href: "https://www.tiktok.com/@btk.work?_t=ZM-8yPgTPW8da4&_r=1", label: "TikTok" },
  ];

  const quickLinks = [
    { name: t('footer.aboutUs'), href: "#about" },
    { name: t('nav.services'), href: "#services" },
    { name: t('nav.portfolio'), href: "/portfolio" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  const services = [
    { name: t('services.seo.title'), href: "/services/seo-optimization" },
    { name: t('services.advertising.title'), href: "/services/digital-advertising" },
    { name: t('services.design.title'), href: "/services/brand-design" },
    { name: t('services.web.title'), href: "/services/web-development" },
  ];

  const handleFooterNavigation = (href: string) => {
    if (href.includes('#')) {
      // Si on n'est pas sur la page d'accueil, naviguer d'abord vers l'accueil
      if (location.pathname !== '/') {
        navigate('/');
        // Attendre que la page soit chargée puis scroll vers la section
        setTimeout(() => {
          const sectionId = href.split('#')[1];
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        // Si on est déjà sur la page d'accueil, scroll directement
        const sectionId = href.split('#')[1];
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Navigation normale vers une autre page
      navigate(href);
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/btkwhite.svg" alt="BTK Logo" className="w-12 h-12" />
              <h3 className="text-xl font-bold">BTK Agency</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.icon === "TikTok" ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  ) : link.icon === "X" ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ) : (
                    <link.icon className="w-5 h-5" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleFooterNavigation(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.services')}</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Language Selector */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.contact')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Bd Moulay Abdellah Cherif, Casablanca 20250
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  +212 5 22 123 456
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  btkagency0@gmail.com
                </span>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('language')}:</span>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/terms-of-service"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.terms')}
              </Link>
              <Link
                to="/privacy-policy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;