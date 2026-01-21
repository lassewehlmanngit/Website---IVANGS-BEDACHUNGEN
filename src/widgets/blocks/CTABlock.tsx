import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { Button } from '@/shared/ui/Button';
import { SmartLink } from '@/shared/ui/SmartLink';
import { cn } from '@/shared/lib/cn';

export interface CTABlockProps {
  data: {
    eyebrow?: string;
    title: string;
    description?: string;
    button?: {
      text: string;
      link: string;
      variant?: string;
    };
    variant?: 'dark' | 'light' | 'primary';
  };
  parentField?: string;
}

export const CTABlock: React.FC<CTABlockProps> = ({ data, parentField }) => {
  const variant = data.variant || 'dark';
  
  const variantClasses: Record<string, string> = {
    dark: 'bg-slate-900 text-white',
    light: 'bg-slate-50 text-slate-900',
    primary: 'bg-primary text-white',
  };

  const descriptionClasses: Record<string, string> = {
    dark: 'text-slate-300',
    light: 'text-slate-600',
    primary: 'text-white/90',
  };

  return (
    <section className={cn('py-16 md:py-20', variantClasses[variant])}>
      <div className="container mx-auto px-4 text-center">
        {data.eyebrow && (
          <span 
            className={cn(
              'font-bold uppercase tracking-wider text-sm mb-3 block',
              variant === 'dark' ? 'text-primary' : variant === 'primary' ? 'text-white/80' : 'text-primary'
            )}
            data-tina-field={parentField && tinaField(data, 'eyebrow')}
          >
            {data.eyebrow}
          </span>
        )}
        
        <h2 
          className="text-h2 font-bold mb-4 md:mb-6"
          data-tina-field={parentField && tinaField(data, 'title')}
        >
          {data.title}
        </h2>
        
        {data.description && (
          <p 
            className={cn('max-w-2xl mx-auto mb-8', descriptionClasses[variant])}
            data-tina-field={parentField && tinaField(data, 'description')}
          >
            {data.description}
          </p>
        )}
        
        {data.button && (
          <SmartLink link={data.button.link}>
            <Button 
              variant={variant === 'primary' ? 'secondary' : 'primary'}
              className="shadow-lg"
              data-tina-field={parentField && tinaField(data.button, 'text')}
            >
              {data.button.text}
            </Button>
          </SmartLink>
        )}
      </div>
    </section>
  );
};
