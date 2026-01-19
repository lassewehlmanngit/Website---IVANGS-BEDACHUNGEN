import React, { useState, useEffect } from 'react';
import { Page, ServiceId } from '../../types';
import { Menu, X, Phone, Mail, Instagram, Facebook, MapPin, Hammer, Home, Briefcase, Layers, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  navigateToService: (id: ServiceId) => void;
  currentService?: ServiceId; // Added optional prop to track active service
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage, navigateToService, currentService }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookie, setShowCookie] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { id: Page.HOME, label: 'Startseite' },
    { id: Page.ABOUT, label: 'Unternehmen' },
    { id: Page.CAREER, label: 'Karriere' },
    { id: Page.CONTACT, label: 'Kontakt' },
  ];

  const serviceLinks: { id: ServiceId; label: string }[] = [
    { id: 'steildach', label: 'Steildach' },
    { id: 'flachdach', label: 'Flachdach' },
    { id: 'solar', label: 'Solar & PV' },
    { id: 'fenster', label: 'Fenster' },
    { id: 'sanierung', label: 'Sanierung & Reparatur' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      
      {/* DESKTOP HEADER (Hidden on mobile) */}
      <div className="hidden md:flex fixed top-0 w-full z-50 flex-col shadow-sm transition-all duration-300">
        <header 
          className={`w-full transition-colors duration-300 relative z-20 ${scrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 h-20 flex justify-between items-center">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setCurrentPage(Page.HOME)}
            >
              <div className="bg-primary-600 p-2 rounded-lg text-white shadow-lg shadow-primary-600/20">
                <Hammer size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-none text-slate-900 tracking-tight">
                  IVANGS
                </h1>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Bedachungen</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    currentPage === link.id ? 'text-primary-600' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(Page.CONTACT)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-sm text-sm font-medium transition-transform active:scale-95 shadow-lg shadow-primary-600/20"
              >
                Angebot anfragen
              </button>
            </nav>
          </div>
        </header>

        {/* Secondary Service Nav (Desktop Only) */}
        <div className="bg-slate-50 border-t border-slate-200 relative z-10">
           <div className="container mx-auto px-4 h-12 flex items-center gap-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Leistungen:</span>
              {serviceLinks.map((service) => {
                const isActive = currentPage === Page.SERVICE_DETAIL && currentService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => navigateToService(service.id)}
                    className={`text-sm font-medium transition-colors flex flex-col justify-center h-full relative group ${
                      isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
                    }`}
                  >
                    <span>{service.label}</span>
                    <span 
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </button>
                );
              })}
           </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION (Fixed Bottom Bar - 3 Components) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] pb-safe">
        <div className="flex justify-between items-center h-16 px-6 relative">
            
            {/* Left: Logo/Brand */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setCurrentPage(Page.HOME)}
            >
              <div className="bg-primary-600 p-1.5 rounded-md text-white">
                <Hammer size={16} />
              </div>
              <span className="font-bold text-slate-900 tracking-tight">IVANGS</span>
            </div>

            {/* Center: Menu Button (Floating) */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-6">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="bg-slate-900 text-white w-14 h-14 rounded-full shadow-lg shadow-slate-900/30 border-4 border-slate-50 flex items-center justify-center transform active:scale-95 transition-transform"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Right: Home Button */}
            <button 
              onClick={() => setCurrentPage(Page.HOME)}
              className={`p-2 rounded-full transition-colors ${
                currentPage === Page.HOME ? 'text-primary-600 bg-primary-50' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home size={24} />
            </button>
        </div>
      </div>

      {/* MOBILE FULL SCREEN MENU DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white animate-fade-in flex flex-col md:hidden overflow-y-auto">
           {/* Header of Drawer */}
           <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div className="bg-primary-600 p-2 rounded-lg text-white">
                   <Hammer size={20} />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">IVANGS</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={24} />
              </button>
           </div>

           {/* Content of Drawer */}
           <div className="flex-grow p-6 flex flex-col gap-8 pb-32">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setCurrentPage(link.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left text-3xl font-bold py-3 border-b border-slate-50 ${
                      currentPage === link.id ? 'text-primary-600' : 'text-slate-900'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">Leistungen</span>
                <div className="grid grid-cols-1 gap-3">
                   {serviceLinks.map((service) => (
                     <button
                        key={service.id}
                        onClick={() => {
                          navigateToService(service.id);
                          setIsMenuOpen(false);
                        }}
                        className={`p-4 rounded-xl border text-left text-lg font-medium transition-colors flex items-center justify-between ${
                          currentPage === Page.SERVICE_DETAIL && currentService === service.id
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-slate-100 text-slate-600'
                        }`}
                     >
                       {service.label}
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                          <Layers size={16} />
                       </div>
                     </button>
                   ))}
                </div>
              </div>

              <div className="mt-8">
                 <button 
                   onClick={() => {
                     setCurrentPage(Page.CONTACT);
                     setIsMenuOpen(false);
                   }}
                   className="w-full bg-primary-600 text-white py-5 rounded-xl font-bold text-xl shadow-lg mb-6 flex items-center justify-center gap-2"
                 >
                   <Mail size={20} />
                   Angebot anfragen
                 </button>
                 
                 <div className="bg-slate-50 p-6 rounded-xl text-center">
                    <p className="text-sm text-slate-500 mb-2">Oder rufen Sie uns an:</p>
                    <a href="tel:+49123456789" className="text-xl font-bold text-slate-900 block">+49 123 456 789</a>
                 </div>

                 <div className="flex justify-center gap-8 text-slate-400 mt-8 text-sm">
                    <button onClick={() => { setCurrentPage(Page.IMPRESSUM); setIsMenuOpen(false); }} className="hover:text-slate-900">Impressum</button>
                    <button onClick={() => { setCurrentPage(Page.DATENSCHUTZ); setIsMenuOpen(false); }} className="hover:text-slate-900">Datenschutz</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Main Content - Adjusted top padding for desktop, bottom padding for mobile */}
      <main className="flex-grow pt-0 md:pt-32 pb-24 md:pb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 mb-20 md:mb-0">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6 text-white">
              <div className="bg-primary-600 p-1.5 rounded-sm text-white">
                <Hammer size={20} />
              </div>
              <span className="text-xl font-bold">IVANGS</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Ivangs Bedachungen GmbH & Co. KG – Ihr Meisterbetrieb für Bedachungen, Fassaden und Bauklempnerei im Kreis Viersen.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 transition-colors text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 transition-colors text-white">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Kontakt</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-600 shrink-0 mt-0.5" />
                <span>Musterstraße 12<br />52511 Geilenkirchen</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-600 shrink-0" />
                <span>+49 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-600 shrink-0" />
                <span>info@ivangs-bedachungen.de</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Rechtliches</h3>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setCurrentPage(Page.IMPRESSUM)} className="hover:text-white transition-colors">Impressum</button></li>
              <li><button onClick={() => setCurrentPage(Page.DATENSCHUTZ)} className="hover:text-white transition-colors">Datenschutz</button></li>
              <li><button onClick={() => setCurrentPage(Page.AGB)} className="hover:text-white transition-colors">AGB</button></li>
              <li><button onClick={() => setCurrentPage(Page.COOKIE_SETTINGS)} className="hover:text-white transition-colors">Cookie Einstellungen</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Karriere</h3>
            <p className="text-sm text-slate-400 mb-4">
              Werde Teil unseres 28-köpfigen Teams. Wir bilden aus!
            </p>
            <button 
              onClick={() => setCurrentPage(Page.CAREER)}
              className="text-primary-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
            >
              Zu den Stellenangeboten &rarr;
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Ivangs Bedachungen GmbH & Co. KG. Alle Rechte vorbehalten.
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookie && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] p-4 z-[55] animate-slide-up mb-16 md:mb-0">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setCurrentPage(Page.COOKIE_SETTINGS)}
                className="text-sm font-medium text-slate-500 hover:text-slate-800 px-3 py-2"
              >
                Einstellungen
              </button>
              <button 
                onClick={() => setShowCookie(false)}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium px-6 py-2 rounded-sm transition-colors"
              >
                Ablehnen
              </button>
              <button 
                onClick={() => setShowCookie(false)}
                className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-6 py-2 rounded-sm transition-colors"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;