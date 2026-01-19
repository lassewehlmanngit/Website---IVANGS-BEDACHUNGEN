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
      <ol className="flex items-center space-x-2 text-sm text-slate-500">
        <li>
          <Link to={`/${lang}`} className="hover:text-primary flex items-center">
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={14} className="mx-1" />
            {item.href ? (
              <Link to={`/${lang}${item.href}`} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
