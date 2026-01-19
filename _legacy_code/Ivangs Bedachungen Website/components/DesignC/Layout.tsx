import React, { useState, useEffect } from 'react';
import { Page } from '../../types';
import { Menu, X, Hammer, ArrowRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: Page.HOME, label: 'Startseite' },
    { id: Page.ABOUT, label: 'Über Uns' },
    { id: Page.SERVICES, label: 'Leistungen' },
    { id: Page.CAREER, label: 'Karriere' },
    { id: Page.CONTACT, label: 'Kontakt' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-white selection:bg-primary-500 selection:text-white">
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || isMenuOpen ? 'bg-slate-900/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center text-white">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentPage(Page.HOME)}
          >
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
               <Hammer size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide">RUTHER</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10 flex">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                    currentPage === link.id 
                      ? 'bg-white text-slate-900 shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <button 
              onClick={() => setCurrentPage(Page.CONTACT)}
              className="bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-primary-50 transition-colors"
            >
              Kontakt <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white bg-white/10 p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 lg:hidden flex flex-col p-6 animate-fade-in shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMenuOpen(false);
                }}
                className={`py-4 text-left font-medium border-b border-slate-800 last:border-0 ${
                  currentPage === link.id ? 'text-white' : 'text-slate-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
             <div>
               <h2 className="text-3xl font-bold mb-2">Bereit für Ihr Projekt?</h2>
               <p className="text-slate-400">Lassen Sie uns gemeinsam Großes schaffen.</p>
             </div>
             <button onClick={() => setCurrentPage(Page.CONTACT)} className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-primary-50 transition-colors">
               Jetzt anfragen
             </button>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
             <div className="flex items-center gap-2">
               <Hammer size={16} />
               <span>Ruther Bedachungen GmbH</span>
             </div>
             <div className="flex gap-6">
               <a href="#" className="hover:text-white transition-colors">Impressum</a>
               <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
               <a href="#" className="hover:text-white transition-colors">AGB</a>
             </div>
             <div>&copy; {new Date().getFullYear()} Design C Concept</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;