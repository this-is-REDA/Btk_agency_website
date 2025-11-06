import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Shield, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useSecurity } from "./SecurityProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email.title'),
      info: "btkagency0@gmail.com",
      description: t('contact.email.description')
    },
    {
      icon: Phone,
      title: t('contact.phone.title'),
      info: "+212 5 22 123 456",
      description: t('contact.phone.description')
    },
    {
      icon: MapPin,
      title: t('contact.address.title'),
      info: "Bd Moulay Abdellah Cherif",
      description: "Casablanca 20250"
    },
    {
      icon: Clock,
      title: t('contact.hours.title'),
      info: t('contact.hours.days'),
      description: t('contact.hours.time')
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('contact.title').split(' ')[0]} <span className="text-primary">{t('contact.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 card-hover bg-gradient-card border-0 shadow-elegant">
            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setSubmitStatus('idle');
              
              try {
                const response = await fetch('https://localhost:5001/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
                });
                
                if (response.ok) {
                  setSubmitStatus('success');
                  setFormData({ name: '', email: '', subject: '', message: '' });
                } else {
                  setSubmitStatus('error');
                }
              } catch (error) {
                console.error('Error submitting form:', error);
                setSubmitStatus('error');
              } finally {
                setIsSubmitting(false);
              }
            }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('contact.form.name')}</label>
                  <Input 
                    placeholder={t('contact.form.namePlaceholder')} 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('contact.form.email')}</label>
                  <Input 
                    placeholder={t('contact.form.emailPlaceholder')} 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">{t('contact.form.subject')}</label>
                <Input 
                  placeholder={t('contact.form.subjectPlaceholder')} 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">{t('contact.form.message')}</label>
                <Textarea 
                  placeholder={t('contact.form.messagePlaceholder')} 
                  className="min-h-32"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Envoi en cours...</span>
                  </div>
                ) : (
                  t('contact.form.send')
                )}
              </Button>
              
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
                  <CheckCircle className="h-5 w-5" />
                  <span>Message envoyé avec succès !</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-5 w-5" />
                  <span>Erreur lors de l'envoi. Veuillez réessayer.</span>
                </div>
              )}
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="p-6 card-hover bg-gradient-card border-0 shadow-elegant group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-primary font-semibold mb-1">{item.info}</p>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;