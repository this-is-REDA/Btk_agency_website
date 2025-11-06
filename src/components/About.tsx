import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const achievements = [
    { icon: Users, number: "150+", label: t('about.happyClients') },
    { icon: Target, number: "500+", label: t('about.projectsCompleted') },
    { icon: Award, number: "98%", label: t('about.successRate') },
    { icon: CheckCircle, number: "5+", label: t('about.yearsExperience') }
  ];

  const values = [
    {
      title: t('about.innovationFirst'),
      description: t('about.innovationFirstDesc')
    },
    {
      title: t('about.resultsDriven'),
      description: t('about.resultsDrivenDesc')
    },
    {
      title: t('about.clientPartnership'),
      description: t('about.clientPartnershipDesc')
    },
    {
      title: t('about.transparentProcess'),
      description: t('about.transparentProcessDesc')
    }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about.title').split(' ')[0]} <span className="text-primary">{t('about.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {t('about.subtitle')}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Founded with the vision to bridge the gap between traditional marketing and 
              digital innovation, we've helped over 150 businesses achieve their digital 
              marketing goals. Our team of experts combines creativity with data-driven 
              insights to deliver exceptional results.
            </p>
            
            <Link to="/about">
              <Button variant="hero" size="lg" className="mb-8">
                {t('about.learnStory')}
              </Button>
            </Link>

            {/* Achievements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{item.number}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="animate-fade-in">
            <div className="space-y-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6 card-hover bg-gradient-card border-0 shadow-elegant">
                  <h3 className="text-xl font-bold mb-3 text-primary">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;