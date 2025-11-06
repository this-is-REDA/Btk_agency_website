import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At BTK Agency, we are committed to protecting your privacy and ensuring the security of your 
              personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
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
              <h2 className="text-3xl font-bold mb-6">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Company name and job title</li>
                <li>Project requirements and business information</li>
                <li>Payment and billing information</li>
                <li>Communications with our team</li>
                <li>Feedback and testimonials</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We also automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide and improve our services</li>
                <li>Communicate with you about projects and services</li>
                <li>Process payments and manage billing</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and security threats</li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">3. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>With your explicit consent</li>
                <li>With service providers who assist in our operations</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">5. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve website functionality and performance</li>
                <li>Provide personalized content and advertisements</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can control cookie settings through your browser preferences. However, disabling 
                cookies may affect website functionality.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">6. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website may contain links to third-party websites and services. We are not responsible 
                for the privacy practices of these third parties. We encourage you to review their privacy 
                policies before providing any personal information.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party services for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Website analytics (Google Analytics)</li>
                <li>Email marketing (Mailchimp, etc.)</li>
                <li>Payment processing (Stripe, PayPal)</li>
                <li>Customer relationship management</li>
                <li>Social media platforms</li>
              </ul>
            </div>

            <Separator className="my-8" />

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements. When we no 
                longer need your information, we will securely delete or anonymize it.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">8. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for children under the age of 13. We do not knowingly collect 
                personal information from children under 13. If you believe we have collected information 
                from a child under 13, please contact us immediately.
              </p>
            </div>

            <Separator className="my-8" />

            {/* International Transfers */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">10. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure that such transfers comply with applicable data protection laws and implement 
                appropriate safeguards to protect your information.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">11. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new Privacy Policy on our website and updating the "Last updated" 
                date. Your continued use of our services after such changes constitutes acceptance of the 
                updated Privacy Policy.
              </p>
            </div>

            <Separator className="my-8" />

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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
              <p className="text-muted-foreground leading-relaxed mt-4">
                For EU residents, you also have the right to lodge a complaint with your local data 
                protection authority if you believe we have not addressed your concerns adequately.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 