import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface FeaturesBlockProps {
  data: {
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: Array<{
      icon?: string;
      title: string;
      description?: string;
    }>;
    columns?: '2' | '3' | '4';
  };
  parentField?: string;
}

const getIcon = (iconName: string) => {
  const icons = LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>;
  return icons[iconName] || LucideIcons.Star;
};

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ data, parentField }) => {
  const columns = data.columns || '3';
  const columnClasses: Record<string, string> = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {(data.eyebrow || data.title || data.description) && (
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            {data.eyebrow && (
              <span 
                className="text-primary font-bold uppercase tracking-wider text-sm mb-3 block"
                data-tina-field={parentField && tinaField(data, 'eyebrow')}
              >
                {data.eyebrow}
              </span>
            )}
            {data.title && (
              <h2 
                className="text-h2 font-bold text-slate-900 mb-4"
                data-tina-field={parentField && tinaField(data, 'title')}
              >
                {data.title}
              </h2>
            )}
            {data.description && (
              <p 
                className="text-lg text-slate-600"
                data-tina-field={parentField && tinaField(data, 'description')}
              >
                {data.description}
              </p>
            )}
          </div>
        )}

        {data.items && data.items.length > 0 && (
          <div className={cn('grid gap-8', columnClasses[columns])}>
            {data.items.map((item, index) => {
              const Icon = item.icon ? getIcon(item.icon) : LucideIcons.CheckCircle;
              return (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 
                    className="text-lg font-bold text-slate-900 mb-2"
                    data-tina-field={parentField && data.items && tinaField(data.items[index], 'title')}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p 
                      className="text-slate-600"
                      data-tina-field={parentField && data.items && tinaField(data.items[index], 'description')}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
