import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Please read these terms and conditions carefully before using our services. 
              By accessing or using our website and services, you agree to be bound by these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto prose prose-lg">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Welcome to BTK Agency. These Terms of Service ("Terms") govern your use of our website 
                and services operated by BTK Agency ("we," "us," or "our").
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using our services, you agree to be bound by these Terms. If you disagree 
                with any part of these terms, then you may not access our services.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Services */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">2. Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BTK Agency provides digital marketing, web development, branding, and related services. 
                Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Search Engine Optimization (SEO)</li>
                <li>Digital Advertising and PPC Management</li>
                <li>Web Development and Design</li>
                <li>Brand Identity and Design</li>
                <li>Social Media Marketing</li>
                <li>Content Marketing and Strategy</li>
                <li>Analytics and Reporting</li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* User Responsibilities */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">3. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account and passwords</li>
                <li>Not use our services for any illegal or unauthorized purpose</li>
                <li>Not interfere with or disrupt our services</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">4. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Payment terms for our services are as follows:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All fees are due upon receipt of invoice unless otherwise agreed</li>
                <li>Late payments may result in service suspension</li>
                <li>We reserve the right to modify pricing with 30 days notice</li>
                <li>Refunds are handled on a case-by-case basis</li>
                <li>All prices are in USD unless otherwise specified</li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website and services contain intellectual property owned by BTK Agency, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Copyrights in our content and designs</li>
                <li>Trademarks and service marks</li>
                <li>Trade secrets and proprietary information</li>
                <li>Software and technology</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You may not use, reproduce, or distribute our intellectual property without written permission.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">6. Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                use of our services and explains how we collect, use, and protect your information.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the maximum extent permitted by law, BTK Agency shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Service interruptions or technical issues</li>
                <li>Third-party actions or content</li>
                <li>Security breaches or data loss</li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may terminate or suspend your access to our services immediately, without prior notice, 
                for any reason, including breach of these Terms.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Upon termination, your right to use our services will cease immediately, and we may delete 
                your account and data.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any material 
                changes by posting the new Terms on our website. Your continued use of our services after 
                such changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of 
                Casablanca, Morocco, without regard to its conflict of law provisions.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-muted-foreground mb-2">
                  <strong>BTK Agency</strong>
                </p>
                <p className="text-muted-foreground mb-2">
                  Email: btkagency0@gmail.com
                </p>
                <p className="text-muted-foreground mb-2">
                  Phone: +1 (555) 123-4567
                </p>
                <p className="text-muted-foreground">
                  Address: Bd Moulay Abdellah Cherif, Casablanca 20250
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService; 