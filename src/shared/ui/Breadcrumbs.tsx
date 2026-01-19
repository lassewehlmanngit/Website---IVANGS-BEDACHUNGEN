import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { SupportedLang } from '@/shared/config/i18n';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  lang: SupportedLang;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, lang, className }) => {
  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
        <li>
          <Link to={`/${lang}`} className="hover:text-primary flex items-center transition-colors min-h-touch min-w-touch p-1">
            <Home size={16} className="shrink-0" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight size={16} className="shrink-0 text-border" aria-hidden="true" />
            {item.href ? (
              <Link 
                to={`/${lang}${item.href}`} 
                className="hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-[200px] md:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
