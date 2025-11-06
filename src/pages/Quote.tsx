import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  ArrowRight,
  Calendar,
  DollarSign,
  Users,
  Target
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Quote = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCountry: "+1", // Default to US
    company: "",
    website: "",
    budget: "",
    timeline: "",
    services: [] as string[],
    projectDescription: "",
    additionalInfo: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Liste des pays avec leurs codes téléphoniques (triés par popularité)
  const countries = [
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+212", name: "Morocco", flag: "🇲🇦" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+39", name: "Italy", flag: "🇮🇹" },
    { code: "+34", name: "Spain", flag: "🇪🇸" },
    { code: "+31", name: "Netherlands", flag: "🇳🇱" },
    { code: "+32", name: "Belgium", flag: "🇧🇪" },
    { code: "+41", name: "Switzerland", flag: "🇨🇭" },
    { code: "+46", name: "Sweden", flag: "🇸🇪" },
    { code: "+47", name: "Norway", flag: "🇳🇴" },
    { code: "+45", name: "Denmark", flag: "🇩🇰" },
    { code: "+358", name: "Finland", flag: "🇫🇮" },
    { code: "+48", name: "Poland", flag: "🇵🇱" },
    { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
    { code: "+36", name: "Hungary", flag: "🇭🇺" },
    { code: "+43", name: "Austria", flag: "🇦🇹" },
    { code: "+351", name: "Portugal", flag: "🇵🇹" },
    { code: "+30", name: "Greece", flag: "🇬🇷" },
    { code: "+90", name: "Turkey", flag: "🇹🇷" },
    { code: "+7", name: "Russia", flag: "🇷🇺" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+64", name: "New Zealand", flag: "🇳🇿" },
    { code: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "+52", name: "Mexico", flag: "🇲🇽" },
    { code: "+54", name: "Argentina", flag: "🇦🇷" },
    { code: "+56", name: "Chile", flag: "🇨🇱" },
    { code: "+57", name: "Colombia", flag: "🇨🇴" },
    { code: "+58", name: "Venezuela", flag: "🇻🇪" },
    { code: "+51", name: "Peru", flag: "🇵🇪" },
    { code: "+593", name: "Ecuador", flag: "🇪🇨" },
    { code: "+595", name: "Paraguay", flag: "🇵🇾" },
    { code: "+598", name: "Uruguay", flag: "🇺🇾" },
    { code: "+591", name: "Bolivia", flag: "🇧🇴" }
  ];

  const services = [
    { id: "seo", name: "SEO Optimization", description: "Improve search rankings" },
    { id: "ppc", name: "Digital Advertising", description: "PPC & social media ads" },
    { id: "web", name: "Web Development", description: "Custom websites & apps" },
    { id: "branding", name: "Brand Design", description: "Logo & brand identity" },
    { id: "social", name: "Social Media", description: "Social media management" },
    { id: "analytics", name: "Analytics", description: "Data insights & reporting" }
  ];

  const budgets = [
    { value: "under-5k", label: "Under $5,000" },
    { value: "5k-10k", label: "$5,000 - $10,000" },
    { value: "10k-25k", label: "$10,000 - $25,000" },
    { value: "25k-50k", label: "$25,000 - $50,000" },
    { value: "50k+", label: "$50,000+" }
  ];

  const timelines = [
    { value: "asap", label: "ASAP" },
    { value: "1-2-weeks", label: "1-2 weeks" },
    { value: "1-month", label: "1 month" },
    { value: "2-3-months", label: "2-3 months" },
    { value: "3+months", label: "3+ months" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phoneCountry: value
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Préparer les données pour l'API avec le numéro de téléphone complet
      const fullPhone = formData.phone ? `${formData.phoneCountry} ${formData.phone}` : '';
      
      const quoteData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: fullPhone,
        company: formData.company,
        projectType: formData.services.length > 0 ? formData.services.join(', ') : 'Projet Web',
        description: formData.projectDescription,
        budget: formData.budget || 'À discuter',
        timeline: formData.timeline || 'À discuter',
        features: formData.services.join(', '),
        additionalInfo: formData.additionalInfo || ''
      };

      console.log('Sending quote data:', quoteData);

      // Envoyer à l'API
      const response = await fetch('https://localhost:5001/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Quote submitted successfully");
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            phoneCountry: "+1",
            company: "",
            website: "",
            budget: "",
            timeline: "",
            services: [],
            projectDescription: "",
            additionalInfo: ""
          });
        }, 3000);
      } else {
        console.error('Failed to submit quote:', responseData);
        
        // Afficher des messages d'erreur plus détaillés
        let errorMessage = 'Erreur lors de l\'envoi du devis.';
        
        if (responseData.errors) {
          const errorDetails = Object.entries(responseData.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join('\n');
          errorMessage = `Erreurs de validation:\n${errorDetails}`;
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto container-padding">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Your project request has been submitted successfully. We'll get back to you within 24 hours.
                </p>
              </div>
              
              <div className="bg-muted/50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span>We'll review your project requirements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span>Our team will prepare a detailed proposal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span>We'll schedule a consultation call</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={() => window.location.href = "/"}>
                  Back to Home
                </Button>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Submit Another Request
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Get Started <span className="text-primary">With Us</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Ready to transform your business? Let's discuss your project and provide you with a 
              customized solution that fits your needs and budget.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">24h</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Custom Quote</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Project Details</CardTitle>
                  <CardDescription>
                    Tell us about your project and we'll provide a customized quote within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <div className="flex gap-2">
                          <Select onValueChange={handleCountryChange} defaultValue={formData.phoneCountry}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  <div className="flex items-center gap-2">
                                    <span>{country.flag}</span>
                                    <span>{country.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="123-456-7890"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <Input
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Services */}
                    <div>
                      <label className="block text-sm font-medium mb-4">Services Needed *</label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              formData.services.includes(service.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handleServiceToggle(service.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                formData.services.includes(service.id)
                                  ? "bg-primary border-primary"
                                  : "border-muted-foreground"
                              }`}>
                                {formData.services.includes(service.id) && (
                                  <CheckCircle className="w-3 h-3 text-primary-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{service.name}</div>
                                <div className="text-sm text-muted-foreground">{service.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Budget & Timeline */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Budget Range *</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                          <option value="">Select budget range</option>
                          {budgets.map((budget) => (
                            <option key={budget.value} value={budget.value}>
                              {budget.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Timeline *</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        >
                          <option value="">Select timeline</option>
                          {timelines.map((timeline) => (
                            <option key={timeline.value} value={timeline.value}>
                              {timeline.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Description *</label>
                      <Textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us about your project goals, target audience, and any specific requirements..."
                        rows={4}
                      />
                    </div>

                    {/* Additional Information */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Information</label>
                      <Textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Any other details, questions, or special requirements..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full group">
                      <Send className="mr-2 h-4 w-4" />
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm">btkagency0@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm">+212 5 22 123 456</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">Bd Moulay Abdellah Cherif, Casablanca 20250</span>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose BTK Agency?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Target className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Custom Solutions</div>
                      <div className="text-xs text-muted-foreground">Tailored strategies for your business</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Expert Team</div>
                      <div className="text-xs text-muted-foreground">Experienced professionals</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Fast Delivery</div>
                      <div className="text-xs text-muted-foreground">Quick turnaround times</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Competitive Pricing</div>
                      <div className="text-xs text-muted-foreground">Best value for your investment</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-sm">Get Started</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-sm">Review & Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-sm">Custom Proposal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <span className="text-sm">Project Kickoff</span>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote; 