import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { Hammer } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export interface EquipmentBlockProps {
  data: {
    icon?: string;
    title: string;
    description?: string;
  };
  parentField?: string;
}

const getIcon = (iconName: string) => {
  const icons = LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>;
  return icons[iconName] || Hammer;
};

export const EquipmentBlock: React.FC<EquipmentBlockProps> = ({ data, parentField }) => {
  const Icon = data.icon ? getIcon(data.icon) : Hammer;

  return (
    <section className="py-16 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <Icon 
          size={40} 
          className="md:w-12 md:h-12 text-primary mx-auto mb-4 md:mb-6" 
        />
        <h2 
          className="text-h2 font-bold text-slate-900 mb-3 md:mb-4"
          data-tina-field={parentField && tinaField(data, 'title')}
        >
          {data.title}
        </h2>
        {data.description && (
          <p 
            className="text-slate-600 text-lg leading-relaxed"
            data-tina-field={parentField && tinaField(data, 'description')}
          >
            {data.description}
          </p>
        )}
      </div>
    </section>
  );
};
