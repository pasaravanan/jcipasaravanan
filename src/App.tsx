import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileBottomBar from "./components/MobileBottomBar";
import HeroSection from "./sections/HeroSection";
import LogoStrip from "./sections/LogoStrip";
import ServicesCards from "./sections/ServicesCards";
import ProcessSection from "./sections/ProcessSection";
import CalculatorsSection from "./sections/CalculatorsSection";
import AboutIntro from "./sections/AboutIntro";
import DetailedServices from "./sections/DetailedServices";
import WhyChooseMe from "./sections/WhyChooseMe";
import AboutFull from "./sections/AboutFull";
import Testimonials from "./sections/Testimonials";
import ContactSection from "./sections/ContactSection";
import InstagramFeed from "./components/instagram/InstagramFeed";
import GallerySection from "./components/gallery/GallerySection";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUpload from "./pages/admin/AdminUpload";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminInstagram from "./pages/admin/AdminInstagram";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const PublicSite = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1 pb-16 md:pb-0">
      <HeroSection />
      <LogoStrip />
      <InstagramFeed />
      <CalculatorsSection />
      <GallerySection />
      <ServicesCards />
      <ProcessSection />
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
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>}
        />
        <Route
          path="/admin/upload"
          element={<AdminProtectedRoute><AdminUpload /></AdminProtectedRoute>}
        />
        <Route
          path="/admin/gallery"
          element={<AdminProtectedRoute><AdminGallery /></AdminProtectedRoute>}
        />
        <Route
          path="/admin/instagram"
          element={<AdminProtectedRoute><AdminInstagram /></AdminProtectedRoute>}
        />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
