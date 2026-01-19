import React, { useState } from 'react';
import { Page } from '../../types';
import { Menu, X, ArrowRight, Hammer } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: Page.HOME, label: 'Startseite' },
    { id: Page.ABOUT, label: 'Über Uns' },
    { id: Page.SERVICES, label: 'Leistungen' },
    { id: Page.CAREER, label: 'Karriere' },
    { id: Page.CONTACT, label: 'Kontakt' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-[#F3F5F7] selection:bg-slate-300">
      {/* Simple Header */}
      <header className="absolute top-0 w-full z-50 py-6 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center text-white mix-blend-difference">
          {/* Logo - using mix-blend to ensure visibility on both light and dark backgrounds if header overlaps */}
          <div 
            className="flex items-center gap-2 cursor-pointer font-bold text-xl tracking-tight" 
            onClick={() => setCurrentPage(Page.HOME)}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
            RUTHER
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-sm font-medium hover:opacity-70 transition-opacity ${
                   currentPage === link.id ? 'opacity-100 underline underline-offset-4' : 'opacity-80'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          
           <div className="hidden md:block text-sm font-medium opacity-90">
             +49 123 456 7890
           </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-900 text-white shadow-xl md:hidden flex flex-col p-6 animate-fade-in z-50 rounded-b-3xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMenuOpen(false);
                }}
                className="py-3 text-left font-bold text-lg border-b border-slate-800 last:border-0"
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

      {/* Footer - Minimalist as per screenshot */}
      <footer className="bg-[#F3F5F7] text-slate-900 py-16 border-t border-slate-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-left">
             <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Email</div>
             <a href="mailto:info@ruther.de" className="text-xl md:text-2xl font-medium hover:text-primary-600 transition-colors">info@ruther-bedachungen.de</a>
           </div>

           <div className="flex gap-8">
             <a href="#" className="font-medium hover:text-primary-600">Telegram</a>
             <a href="#" className="font-medium hover:text-primary-600">Instagram</a>
             <a href="#" className="font-medium hover:text-primary-600">WhatsApp</a>
           </div>

           <div className="text-right">
             <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Rückruf</div>
             <a href="tel:+123" className="flex items-center gap-2 text-xl md:text-2xl font-medium hover:text-primary-600 transition-colors">
               Nummer anzeigen <ArrowRight size={20} className="bg-slate-900 text-white rounded-full p-1" />
             </a>
           </div>
        </div>
        <div className="container mx-auto px-4 mt-12 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Ruther Bedachungen GmbH. Design D Concept.
        </div>
      </footer>
    </div>
  );
};

export default Layout;