import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { OptimizedImage } from '@/shared/ui/Image';
import { CheckCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export interface StoryBlockProps {
  data: {
    title: string;
    text1?: string;
    text2?: string;
    image?: string;
    highlights?: Array<{
      text: string;
      icon?: string;
    }>;
  };
  parentField?: string;
}

const getIcon = (iconName: string) => {
  const icons = LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>;
  return icons[iconName] || CheckCircle;
};

export const StoryBlock: React.FC<StoryBlockProps> = ({ data, parentField }) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <h2 
            className="text-h2 font-bold text-slate-900 mb-4 md:mb-6"
            data-tina-field={parentField && tinaField(data, 'title')}
          >
            {data.title}
          </h2>
          
          {data.text1 && (
            <p 
              className="text-slate-600 text-lg leading-relaxed mb-6"
              data-tina-field={parentField && tinaField(data, 'text1')}
            >
              {data.text1}
            </p>
          )}
          
          {data.text2 && (
            <p 
              className="text-slate-600 text-lg leading-relaxed mb-8"
              data-tina-field={parentField && tinaField(data, 'text2')}
            >
              {data.text2}
            </p>
          )}
          
          {data.highlights && data.highlights.length > 0 && (
            <div className="flex flex-col gap-4">
              {data.highlights.map((highlight, i) => {
                const Icon = highlight.icon ? getIcon(highlight.icon) : CheckCircle;
                return (
                  <div 
                    key={i} 
                    className="flex items-center gap-3"
                    data-tina-field={parentField && data.highlights && tinaField(data.highlights[i], 'text')}
                  >
                    <Icon className="text-primary shrink-0" size={24} />
                    <span className="font-semibold text-slate-800">{highlight.text}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {data.image && (
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-sm -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-100 rounded-sm -z-10"></div>
            <OptimizedImage 
              src={data.image} 
              alt={data.title} 
              className="w-full h-auto rounded-md"
              data-tina-field={parentField && tinaField(data, 'image')}
            />
          </div>
        )}
      </div>
    </section>
  );
};
