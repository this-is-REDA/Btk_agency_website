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
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Calendar,
  CheckCircle,
  Download,
  Calendar as CalendarIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const CaseStudies = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const filters = [
    { id: "all", label: t('caseStudies.filters.all') },
    { id: "ecommerce", label: t('caseStudies.filters.ecommerce') },
    { id: "saas", label: t('caseStudies.filters.saas') },
    { id: "healthcare", label: t('caseStudies.filters.healthcare') },
    { id: "finance", label: t('caseStudies.filters.finance') },
  ];

  const caseStudies = [
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
      testimonial: {
        text: "BTK Agency transformed our online presence completely. The new platform increased our sales by 120% in just 6 months. The user experience is now seamless and our customers love it.",
        author: "Sarah Johnson",
        position: "CEO, TechCorp Inc.",
        rating: 5
      },
      process: [
        "Discovery & Analysis",
        "UX/UI Design",
        "Development",
        "Testing & QA",
        "Launch & Optimization"
      ]
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
      testimonial: {
        text: "The growth strategy implemented by BTK Agency was game-changing. We saw a 300% increase in users and our monthly recurring revenue grew by 180%.",
        author: "Michael Chen",
        position: "Founder, CloudFlow Solutions",
        rating: 5
      },
      process: [
        "Market Research",
        "Strategy Development",
        "Campaign Execution",
        "Performance Monitoring",
        "Continuous Optimization"
      ]
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
      testimonial: {
        text: "The new website has significantly improved our patient experience. Online appointments increased by 200% and our accessibility compliance is now perfect.",
        author: "Dr. Emma Wilson",
        position: "Medical Director, MedCare Plus",
        rating: 5
      },
      process: [
        "Compliance Audit",
        "Design & Development",
        "Accessibility Testing",
        "Security Implementation",
        "Training & Launch"
      ]
    },
    {
      id: 4,
      title: "Financial Services Digital Marketing",
      client: "SecureBank",
      category: "finance",
      industry: "Finance",
      duration: "8 months",
      image: "/placeholder.svg",
      website: "https://securebank.com",
      challenge: "SecureBank needed to increase online loan applications while maintaining strict compliance with financial regulations and building trust.",
      solution: "We developed a comprehensive digital marketing strategy focused on trust-building, compliance, and conversion optimization for financial services.",
      results: {
        applications: "+250%",
        trust_score: "+180%",
        compliance: "100%",
        roi: "450%"
      },
      technologies: ["Trust Marketing", "Compliance Tools", "Conversion Optimization", "Analytics", "Security"],
      testimonial: {
        text: "BTK Agency helped us navigate the complex world of financial marketing while maintaining full compliance. Our loan applications increased by 250%.",
        author: "David Rodriguez",
        position: "Marketing Director, SecureBank",
        rating: 5
      },
      process: [
        "Compliance Review",
        "Trust Building",
        "Campaign Development",
        "Performance Tracking",
        "Continuous Improvement"
      ]
    },
    {
      id: 5,
      title: "Brand Identity & Marketing Campaign",
      client: "GreenLife Organics",
      category: "ecommerce",
      industry: "Food & Beverage",
      duration: "6 months",
      image: "/placeholder.svg",
      website: "https://greenlifeorganics.com",
      challenge: "GreenLife needed to establish a strong brand identity and increase market share in the competitive organic food industry.",
      solution: "We created a comprehensive brand identity, developed a multi-channel marketing campaign, and implemented social media strategies to build brand awareness.",
      results: {
        brand: "+200%",
        engagement: "+150%",
        followers: "+300%",
        sales: "+180%"
      },
      technologies: ["Brand Strategy", "Social Media", "Content Marketing", "PPC", "Influencer Marketing"],
      testimonial: {
        text: "The brand transformation exceeded our expectations. Our social media engagement increased by 150% and sales grew by 180% in just 6 months.",
        author: "Lisa Park",
        position: "Brand Manager, GreenLife Organics",
        rating: 5
      },
      process: [
        "Brand Research",
        "Identity Design",
        "Campaign Development",
        "Multi-channel Execution",
        "Performance Analysis"
      ]
    }
  ];

  const filteredCaseStudies = activeFilter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  // Fonctions pour les actions des boutons
  const handleViewFullCaseStudy = (study: any) => {
    setSelectedCaseStudy(study);
    setShowModal(true);
  };

  const handleDownloadCaseStudies = () => {
    // Simuler le téléchargement d'un PDF
    const link = document.createElement('a');
    link.href = '/btk-case-studies.pdf'; // Fichier fictif
    link.download = 'BTK-Agency-Case-Studies.pdf';
    link.click();
  };

  const handleScheduleConsultation = () => {
    // Rediriger vers la page de contact
    window.location.href = '/#contact';
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto container-padding py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {t('caseStudies.title').split(' ')[0]} <span className="text-primary">{t('caseStudies.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('caseStudies.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="group" onClick={handleDownloadCaseStudies}>
                <Download className="mr-2 h-4 w-4" />
                {t('caseStudies.downloadAll')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleScheduleConsultation}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {t('caseStudies.scheduleConsultation')}
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
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">{t('stats.caseStudies')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">{t('stats.successRate')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">$5M+</div>
              <div className="text-muted-foreground">{t('stats.revenueGenerated')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">{t('stats.supportAvailable')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
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

          {/* Case Studies Grid */}
          <div className="space-y-12">
            {filteredCaseStudies.map((study) => (
              <Card key={study.id} className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left Side - Image */}
                  <div className="aspect-video bg-muted lg:aspect-square">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Right Side - Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{study.industry}</Badge>
                      <Badge variant="outline">{study.duration}</Badge>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">{study.title}</h2>
                    <p className="text-muted-foreground mb-6">
                      <strong>Client:</strong> {study.client}
                    </p>
                    
                    {/* Challenge & Solution */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center">
                          <Target className="h-4 w-4 mr-2 text-primary" />
                          {t('caseStudies.challenge')}
                        </h3>
                        <p className="text-sm text-muted-foreground">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                          {t('caseStudies.solution')}
                        </h3>
                        <p className="text-sm text-muted-foreground">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                        {t('caseStudies.results')}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(study.results).map(([key, value]) => (
                          <div key={key} className="bg-muted/50 p-3 rounded">
                            <div className="font-bold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">{t('caseStudies.technologies')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Process */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">{t('caseStudies.process')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.process.map((step, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="text-muted-foreground">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-muted/50 p-4 rounded-lg mb-6">
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(study.testimonial.rating)}
                      </div>
                      <p className="text-sm text-muted-foreground italic mb-2">
                        "{study.testimonial.text}"
                      </p>
                      <div className="text-xs">
                        <div className="font-semibold">{study.testimonial.author}</div>
                        <div className="text-muted-foreground">{study.testimonial.position}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 group"
                        onClick={() => handleViewFullCaseStudy(study)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {t('caseStudies.viewFullCase')}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExternalLink(study.website)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t('caseStudies.visitWebsite')}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results and transform your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary">
              Get Free Consultation
            </Button>
            <Button size="lg" variant="outline">
              View Our Process
            </Button>
          </div>
        </div>
      </section>

      {/* Modal pour Case Study Complet */}
      {showModal && selectedCaseStudy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedCaseStudy.title}</h2>
                  <p className="text-muted-foreground">
                    <strong>Client:</strong> {selectedCaseStudy.client}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedCaseStudy.image} 
                    alt={selectedCaseStudy.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        Challenge
                      </h3>
                      <p className="text-sm text-muted-foreground">{selectedCaseStudy.challenge}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                        Solution
                      </h3>
                      <p className="text-sm text-muted-foreground">{selectedCaseStudy.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                      Results
                    </h3>
                                         <div className="grid grid-cols-2 gap-3">
                       {Object.entries(selectedCaseStudy.results).map(([key, value]) => (
                         <div key={key} className="bg-muted/50 p-3 rounded">
                           <div className="font-bold text-primary">{value as string}</div>
                           <div className="text-xs text-muted-foreground capitalize">
                             {key.replace(/([A-Z])/g, ' $1').trim()}
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCaseStudy.technologies.map((tech: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Our Process</h3>
                    <div className="space-y-2">
                      {selectedCaseStudy.process.map((step: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="text-muted-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(selectedCaseStudy.testimonial.rating)}
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-2">
                      "{selectedCaseStudy.testimonial.text}"
                    </p>
                    <div className="text-xs">
                      <div className="font-semibold">{selectedCaseStudy.testimonial.author}</div>
                      <div className="text-muted-foreground">{selectedCaseStudy.testimonial.position}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleExternalLink(selectedCaseStudy.website)}
                      className="flex-1"
                    >
                      Visit Client Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CaseStudies; 