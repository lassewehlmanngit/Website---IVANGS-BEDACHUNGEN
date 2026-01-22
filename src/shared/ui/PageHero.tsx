import React from 'react';
import { cn } from '@/shared/lib/cn';

export type PageHeroVariant = 'dark' | 'light' | 'primary';

export interface PageHeroProps {
  /** Visual variant of the hero section */
  variant?: PageHeroVariant;
  /** Additional CSS classes */
  className?: string;
  /** Hero content */
  children: React.ReactNode;
}

export interface PageHeroEyebrowProps {
  /** Additional CSS classes */
  className?: string;
  /** Eyebrow text */
  children: React.ReactNode;
  /** TinaCMS data-tina-field attribute */
  'data-tina-field'?: any;
}

export interface PageHeroTitleProps {
  /** Additional CSS classes */
  className?: string;
  /** Title text */
  children: React.ReactNode;
  /** TinaCMS data-tina-field attribute */
  'data-tina-field'?: any;
}

export interface PageHeroDescriptionProps {
  /** Additional CSS classes */
  className?: string;
  /** Description text */
  children: React.ReactNode;
  /** TinaCMS data-tina-field attribute */
  'data-tina-field'?: any;
}

const variantStyles: Record<PageHeroVariant, {
  section: string;
  gradient: string;
  eyebrow: string;
  title: string;
  description: string;
}> = {
  dark: {
    section: 'bg-slate-900 text-white',
    gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    eyebrow: 'text-primary',
    title: 'text-white',
    description: 'text-slate-300',
  },
  light: {
    section: 'bg-white text-slate-900',
    gradient: 'bg-gradient-to-br from-white via-slate-50 to-white',
    eyebrow: 'text-primary',
    title: 'text-slate-900',
    description: 'text-slate-600',
  },
  primary: {
    section: 'bg-primary text-white',
    gradient: 'bg-gradient-to-br from-primary via-primary-600 to-primary',
    eyebrow: 'text-white/80',
    title: 'text-white',
    description: 'text-white/80',
  },
};

// Context to share variant with child components
const PageHeroContext = React.createContext<PageHeroVariant>('dark');

/**
 * PageHero - A compound component for page hero sections
 * 
 * @example
 * ```tsx
 * <PageHero variant="dark">
 *   <PageHero.Eyebrow>Contact</PageHero.Eyebrow>
 *   <PageHero.Title>Get in touch</PageHero.Title>
 *   <PageHero.Description>We'd love to hear from you</PageHero.Description>
 * </PageHero>
 * ```
 */
export const PageHero = ({ variant = 'dark', className, children }: PageHeroProps) => {
  const styles = variantStyles[variant];

  return (
    <PageHeroContext.Provider value={variant}>
      <section className={cn(
        'relative py-20 md:py-32 overflow-hidden',
        styles.section,
        className
      )}>
        <div className={cn('absolute inset-0', styles.gradient)} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {children}
          </div>
        </div>
      </section>
    </PageHeroContext.Provider>
  );
};

/**
 * PageHero.Eyebrow - Small uppercase text above the title
 */
const Eyebrow = ({ className, children, ...props }: PageHeroEyebrowProps) => {
  const variant = React.useContext(PageHeroContext);
  const styles = variantStyles[variant];

  return (
    <p 
      className={cn(
        'font-bold uppercase tracking-wider mb-4',
        styles.eyebrow,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

/**
 * PageHero.Title - Main heading of the hero section
 */
const Title = ({ className, children, ...props }: PageHeroTitleProps) => {
  const variant = React.useContext(PageHeroContext);
  const styles = variantStyles[variant];

  return (
    <h1 
      className={cn(
        'text-h1 font-bold mb-6',
        styles.title,
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

/**
 * PageHero.Description - Supporting text below the title
 */
const Description = ({ className, children, ...props }: PageHeroDescriptionProps) => {
  const variant = React.useContext(PageHeroContext);
  const styles = variantStyles[variant];

  return (
    <p 
      className={cn(
        'text-xl max-w-2xl',
        styles.description,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

// Attach compound components
PageHero.Eyebrow = Eyebrow;
PageHero.Title = Title;
PageHero.Description = Description;

// Named exports for tree-shaking
export { Eyebrow as PageHeroEyebrow };
export { Title as PageHeroTitle };
export { Description as PageHeroDescription };
