import React, { useState } from 'react';
import { Page } from '../../types';
import { Menu, X, Phone, Hammer, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white py-4 px-4 md:px-8 shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setCurrentPage(Page.HOME)}
          >
            <div className="text-primary-600 transform group-hover:-rotate-12 transition-transform">
               {/* Abstract Roof/Hammer Icon */}
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M3 21l18 0" />
                 <path d="M5 21v-7l8 -6l8 6v7" />
                 <path d="M12 3l5 4l-5 4l-5 -4z" />
               </svg>
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">RUTHER</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                  currentPage === link.id ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a 
              href="tel:+49123456789" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary-600/30"
            >
              <Phone size={18} />
              <span>+49 123 456 7890</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl lg:hidden flex flex-col p-6 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMenuOpen(false);
                }}
                className={`py-3 text-left font-bold text-lg ${
                  currentPage === link.id ? 'text-primary-600' : 'text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage(Page.CONTACT);
                setIsMenuOpen(false);
              }}
              className="mt-4 bg-primary-600 text-white py-4 rounded-xl font-bold w-full flex justify-center items-center gap-2"
            >
              <Phone size={18} /> Kontakt aufnehmen
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-[88px]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                 <path d="M3 21l18 0" />
                 <path d="M5 21v-7l8 -6l8 6v7" />
                 <path d="M12 3l5 4l-5 4l-5 -4z" />
               </svg>
              <span className="text-2xl font-bold">RUTHER</span>
            </div>
            <p className="leading-relaxed">
              Professionelle Bedachungen und Sanierungen seit 1998. Wir schützen, was Ihnen wichtig ist.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Service</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setCurrentPage(Page.SERVICES)} className="hover:text-primary-600 transition-colors">Steildach</button></li>
              <li><button onClick={() => setCurrentPage(Page.SERVICES)} className="hover:text-primary-600 transition-colors">Flachdach</button></li>
              <li><button onClick={() => setCurrentPage(Page.SERVICES)} className="hover:text-primary-600 transition-colors">Fenster</button></li>
              <li><button onClick={() => setCurrentPage(Page.SERVICES)} className="hover:text-primary-600 transition-colors">Brandschaden</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Links</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setCurrentPage(Page.ABOUT)} className="hover:text-primary-600 transition-colors">Über Uns</button></li>
              <li><button onClick={() => setCurrentPage(Page.CAREER)} className="hover:text-primary-600 transition-colors">Karriere</button></li>
              <li><button onClick={() => setCurrentPage(Page.CONTACT)} className="hover:text-primary-600 transition-colors">Kontakt</button></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Impressum</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="mb-4">Abonnieren Sie unseren Newsletter für aktuelle Infos.</p>
            <div className="flex">
              <input type="email" placeholder="E-Mail Adresse" className="bg-slate-800 text-white px-4 py-3 rounded-l-lg focus:outline-none w-full border border-slate-700 focus:border-primary-600" />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-r-lg font-bold">
                Go
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Ruther Bedachungen GmbH. Design B Concept.
        </div>
      </footer>
    </div>
  );
};

export default Layout;