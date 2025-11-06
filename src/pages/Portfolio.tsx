import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  Star, 
  ExternalLink, 
  Eye,
  Filter,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Portfolio = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: t('portfolio.filters.all') },
    { id: "web", label: t('portfolio.filters.web') },
    { id: "branding", label: t('portfolio.filters.branding') },
    { id: "marketing", label: t('portfolio.filters.marketing') },
    { id: "seo", label: t('portfolio.filters.seo') },
  ];

  const projects = [
    {
      id: 1,
      title: t('portfolio.projects.ecommerce.title'),
      client: t('portfolio.projects.ecommerce.client'),
      category: "web",
      image: "/placeholder.svg",
      description: t('portfolio.projects.ecommerce.description'),
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      results: {
        conversion: "+45%",
        revenue: "+120%",
        traffic: "+80%"
      },
      testimonial: {
        text: t('portfolio.projects.ecommerce.testimonial'),
        author: t('portfolio.projects.ecommerce.author'),
        position: t('portfolio.projects.ecommerce.position'),
        rating: 5
      }
    },
    {
      id: 2,
      title: t('portfolio.projects.branding.title'),
      client: t('portfolio.projects.branding.client'),
      category: "branding",
      image: "/placeholder.svg",
      description: t('portfolio.projects.branding.description'),
      technologies: ["Brand Strategy", "Social Media", "Content Marketing", "PPC"],
      results: {
        brand: "+200%",
        engagement: "+150%",
        followers: "+300%"
      },
      testimonial: {
        text: t('portfolio.projects.branding.testimonial'),
        author: t('portfolio.projects.branding.author'),
        position: t('portfolio.projects.branding.position'),
        rating: 5
      }
    },
    {
      id: 3,
      title: t('portfolio.projects.seo.title'),
      client: t('portfolio.projects.seo.client'),
      category: "seo",
      image: "/placeholder.svg",
      description: t('portfolio.projects.seo.description'),
      technologies: ["SEO", "Content Strategy", "Technical SEO", "Local SEO"],
      results: {
        rankings: "+85%",
        traffic: "+200%",
        leads: "+150%"
      },
      testimonial: {
        text: t('portfolio.projects.seo.testimonial'),
        author: t('portfolio.projects.seo.author'),
        position: t('portfolio.projects.seo.position'),
        rating: 5
      }
    },
    {
      id: 4,
      title: t('portfolio.projects.advertising.title'),
      client: t('portfolio.projects.advertising.client'),
      category: "marketing",
      image: "/placeholder.svg",
      description: t('portfolio.projects.advertising.description'),
      technologies: ["Google Ads", "Facebook Ads", "Instagram", "Analytics"],
      results: {
        roas: "450%",
        installs: "+300%",
        retention: "+60%"
      },
      testimonial: {
        text: t('portfolio.projects.advertising.testimonial'),
        author: t('portfolio.projects.advertising.author'),
        position: t('portfolio.projects.advertising.position'),
        rating: 5
      }
    },
    {
      id: 5,
      title: t('portfolio.projects.corporate.title'),
      client: t('portfolio.projects.corporate.client'),
      category: "web",
      image: "/placeholder.svg",
      description: t('portfolio.projects.corporate.description'),
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      results: {
        performance: "95/100",
        leads: "+180%",
        engagement: "+120%"
      },
      testimonial: {
        text: t('portfolio.projects.corporate.testimonial'),
        author: t('portfolio.projects.corporate.author'),
        position: t('portfolio.projects.corporate.position'),
        rating: 5
      }
    },
    {
      id: 6,
      title: t('portfolio.projects.social.title'),
      client: t('portfolio.projects.social.client'),
      category: "marketing",
      image: "/placeholder.svg",
      description: t('portfolio.projects.social.description'),
      technologies: ["Instagram", "TikTok", "Content Creation", "Influencer Marketing"],
      results: {
        followers: "+400%",
        engagement: "+250%",
        sales: "+180%"
      },
      testimonial: {
        text: t('portfolio.projects.social.testimonial'),
        author: t('portfolio.projects.social.author'),
        position: t('portfolio.projects.social.position'),
        rating: 5
      }
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto container-padding py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {t('portfolio.title').split(' ')[0]} <span className="text-primary">{t('portfolio.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('portfolio.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/case-studies">
                <Button size="lg" className="group">
                  {t('caseStudies.title')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                {t('portfolio.downloadPDF')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">{t('stats.projectsCompleted')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">{t('stats.clientSatisfaction')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">$2M+</div>
              <div className="text-muted-foreground">{t('stats.revenueGenerated')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">{t('stats.supportAvailable')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24">
        <div className="container mx-auto container-padding">
          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className="rounded-full"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {project.client}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {project.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">{t('portfolio.technologies')}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">{t('portfolio.results')}:</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(project.results).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-muted rounded">
                          <div className="font-semibold text-primary">{value}</div>
                          <div className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(project.testimonial.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-2">
                      "{project.testimonial.text}"
                    </p>
                    <div className="text-xs">
                      <div className="font-semibold">{project.testimonial.author}</div>
                      <div className="text-muted-foreground">{project.testimonial.position}</div>
                    </div>
                  </div>


                </CardContent>
              </Card>
            ))}
          </div>


        </div>
      </section>



      <Footer />
    </div>
  );
};

export default Portfolio; 