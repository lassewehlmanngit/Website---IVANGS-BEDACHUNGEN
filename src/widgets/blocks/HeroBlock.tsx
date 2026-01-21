import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { Button } from '@/shared/ui/Button';
import { SmartLink } from '@/shared/ui/SmartLink';
import { cn } from '@/shared/lib/cn';

export interface HeroBlockProps {
  data: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    description?: string;
    primaryButton?: {
      text: string;
      link: string;
      variant?: string;
    };
    secondaryButton?: {
      text: string;
      link: string;
      variant?: string;
    };
    backgroundImage?: string;
    variant?: 'dark' | 'light' | 'overlay';
  };
  parentField?: string;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ data, parentField }) => {
  const variant = data.variant || 'dark';
  const isDark = variant === 'dark' || variant === 'overlay';

  return (
    <section 
      className={cn(
        'relative py-16 md:py-24 overflow-hidden',
        isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      )}
    >
      {/* Background Image */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={data.backgroundImage} 
            alt="" 
            className="w-full h-full object-cover"
            data-tina-field={parentField && tinaField(data, 'backgroundImage')}
          />
          {variant === 'overlay' && (
            <div className="absolute inset-0 bg-slate-900/70" />
          )}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {data.eyebrow && (
            <span 
              className={cn(
                'font-bold uppercase tracking-[0.2em] text-sm mb-4 block',
                isDark ? 'text-primary' : 'text-primary'
              )}
              data-tina-field={parentField && tinaField(data, 'eyebrow')}
            >
              {data.eyebrow}
            </span>
          )}
          
          <h1 
            className="text-h1 font-bold mb-4 md:mb-6"
            data-tina-field={parentField && tinaField(data, 'title')}
          >
            {data.title}
          </h1>
          
          {data.subtitle && (
            <h2 
              className={cn(
                'text-h3 font-medium mb-4',
                isDark ? 'text-slate-300' : 'text-slate-600'
              )}
              data-tina-field={parentField && tinaField(data, 'subtitle')}
            >
              {data.subtitle}
            </h2>
          )}
          
          {data.description && (
            <p 
              className={cn(
                'text-lg md:text-xl mb-8 leading-relaxed',
                isDark ? 'text-slate-300' : 'text-slate-600'
              )}
              data-tina-field={parentField && tinaField(data, 'description')}
            >
              {data.description}
            </p>
          )}
          
          {(data.primaryButton || data.secondaryButton) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {data.primaryButton && (
                <SmartLink link={data.primaryButton.link}>
                  <Button 
                    className="w-full sm:w-auto"
                    data-tina-field={parentField && tinaField(data.primaryButton, 'text')}
                  >
                    {data.primaryButton.text}
                  </Button>
                </SmartLink>
              )}
              {data.secondaryButton && (
                <SmartLink link={data.secondaryButton.link}>
                  <Button 
                    variant="outline"
                    className={cn(
                      'w-full sm:w-auto',
                      isDark && 'border-white/20 text-white hover:bg-white/10'
                    )}
                    data-tina-field={parentField && tinaField(data.secondaryButton, 'text')}
                  >
                    {data.secondaryButton.text}
                  </Button>
                </SmartLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
