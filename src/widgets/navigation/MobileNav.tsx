import React from 'react';
import { Hammer, Menu, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SupportedLang } from '@/shared/config/i18n';
import { cn } from '@/shared/lib/cn';

interface MobileNavProps {
  lang: SupportedLang;
  onMenuClick: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ lang, onMenuClick }) => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background border-t border-border shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-between items-center h-16 px-6 relative">
            {/* Left: Logo/Brand */}
            <Link
              to={`/${lang}`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-primary p-1.5 rounded-md text-primary-foreground">
                <Hammer size={16} />
              </div>
              <span className="font-bold text-foreground tracking-tight">IVANGS</span>
            </Link>

            {/* Center: Menu Button (Floating) */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-6">
              <button
                onClick={onMenuClick}
                className="bg-foreground text-background w-14 h-14 rounded-full shadow-lg shadow-foreground/30 border-4 border-background flex items-center justify-center transform active:scale-95 transition-transform"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Right: Home Button */}
            <Link
              to={`/${lang}`}
              className={cn(
                "p-2 rounded-full transition-colors",
                activePath === `/${lang}` || activePath === `/${lang}/` ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Home size={24} />
            </Link>
        </div>
    </div>
  );
};
