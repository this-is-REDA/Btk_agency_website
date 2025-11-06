import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, TrendingUp, Palette, Smartphone, BarChart3, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Search,
      title: t('services.seo.title'),
      description: t('services.seo.description'),
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Local SEO"]
    },
    {
      icon: TrendingUp,
      title: t('services.advertising.title'),
      description: t('services.advertising.description'),
      features: ["Google Ads", "Facebook Ads", "Instagram Ads", "Remarketing"]
    },
    {
      icon: Palette,
      title: t('services.design.title'),
      description: t('services.design.description'),
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Marketing Materials"]
    },
    {
      icon: Smartphone,
      title: t('services.web.title'),
      description: t('services.web.description'),
      features: ["Custom Websites", "E-commerce", "Mobile Optimization", "Performance"]
    },
    {
      icon: BarChart3,
      title: t('services.analytics.title'),
      description: t('services.analytics.description'),
      features: ["Google Analytics", "Conversion Tracking", "Performance Reports", "A/B Testing"]
    },
    {
      icon: Users,
      title: t('services.social.title'),
      description: t('services.social.description'),
      features: ["Content Strategy", "Community Management", "Paid Social", "Influencer Marketing"]
    }
  ];

  const handleServiceClick = (serviceTitle: string) => {
    // Map service titles to their correct routes
    const serviceRoutes: { [key: string]: string } = {
      [t('services.seo.title')]: '/services/seo-optimization',
      [t('services.advertising.title')]: '/services/digital-advertising',
      [t('services.design.title')]: '/services/brand-design',
      [t('services.web.title')]: '/services/web-development',
      [t('services.analytics.title')]: '/services/analytics-insights',
      [t('services.social.title')]: '/services/social-media-marketing',
    };
    
    const url = serviceRoutes[serviceTitle] || '/';
    console.log('Navigating to:', url);
    navigate(url);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {t('services.title').split(' ')[0]} <span className="text-primary">{t('services.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-8 card-hover bg-gradient-card border-0 shadow-elegant group"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                  onClick={() => handleServiceClick(service.title)}
                >
                  {t('learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;