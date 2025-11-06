import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Quote from "./pages/Quote";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SEOOptimization from "./pages/services/SEOOptimization";
import DigitalAdvertising from "./pages/services/DigitalAdvertising";
import BrandDesign from "./pages/services/BrandDesign";
import AnalyticsInsights from "./pages/services/AnalyticsInsights";
import WebDevelopment from "./pages/services/WebDevelopment";
import SocialMediaMarketing from "./pages/services/SocialMediaMarketing";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/services/seo-optimization" element={<SEOOptimization />} />
            <Route path="/services/digital-advertising" element={<DigitalAdvertising />} />
            <Route path="/services/brand-design" element={<BrandDesign />} />
            <Route path="/services/analytics-insights" element={<AnalyticsInsights />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
