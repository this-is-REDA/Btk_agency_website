import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.services'), href: "/#services" },
    { name: t('nav.portfolio'), href: "/portfolio" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.contact'), href: "/#contact" },
  ];

  const handleNavigation = (href: string) => {
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
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hero/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/btkwhite.svg" alt="BTK Logo" className="w-16 h-16" />
              <h1 className="text-2xl font-bold text-white">
                BTK <span className="text-white">Agency</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 rounded-md"
                >
                  {item.name}
                </button>
              ))}

            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-hero/95 backdrop-blur-md rounded-lg mt-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-white/90 hover:text-white block px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 rounded-md w-full text-left"
                >
                  {item.name}
                </button>
              ))}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;