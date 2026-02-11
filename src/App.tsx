import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileBottomBar from "./components/MobileBottomBar";
import HeroSection from "./sections/HeroSection";
import LogoStrip from "./sections/LogoStrip";
import ServicesCards from "./sections/ServicesCards";
import AboutIntro from "./sections/AboutIntro";
import DetailedServices from "./sections/DetailedServices";
import WhyChooseMe from "./sections/WhyChooseMe";
import AboutFull from "./sections/AboutFull";
import Testimonials from "./sections/Testimonials";
import ContactSection from "./sections/ContactSection";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <LogoStrip />
        <ServicesCards />
        <AboutIntro />
        <DetailedServices />
        <WhyChooseMe />
        <AboutFull />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  </TooltipProvider>
);

export default App;
