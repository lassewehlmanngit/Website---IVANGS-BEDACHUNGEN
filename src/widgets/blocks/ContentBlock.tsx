import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { OptimizedImage } from '@/shared/ui/Image';
import { cn } from '@/shared/lib/cn';

export interface ContentBlockProps {
  data: {
    eyebrow?: string;
    title?: string;
    body?: TinaMarkdownContent;
    image?: string;
    imagePosition?: 'left' | 'right' | 'top' | 'bottom';
  };
  parentField?: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ data, parentField }) => {
  const imagePosition = data.imagePosition || 'right';
  const hasImage = Boolean(data.image);
  const isHorizontal = imagePosition === 'left' || imagePosition === 'right';

  const contentElement = (
    <div className={cn(hasImage && isHorizontal && 'flex-1')}>
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
          className="text-h2 font-bold text-slate-900 mb-6"
          data-tina-field={parentField && tinaField(data, 'title')}
        >
          {data.title}
        </h2>
      )}
      
      {data.body && (
        <div 
          className="prose prose-lg max-w-none"
          data-tina-field={parentField && tinaField(data, 'body')}
        >
          <TinaMarkdown content={data.body} />
        </div>
      )}
    </div>
  );

  const imageElement = hasImage && (
    <div className={cn(isHorizontal && 'flex-1')}>
      <OptimizedImage 
        src={data.image!} 
        alt={data.title || ''} 
        className="w-full h-auto rounded-md"
        data-tina-field={parentField && tinaField(data, 'image')}
      />
    </div>
  );

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {isHorizontal ? (
          <div className={cn(
            'grid gap-12 md:gap-16 items-center',
            hasImage ? 'md:grid-cols-2' : ''
          )}>
            {imagePosition === 'left' ? (
              <>
                {imageElement}
                {contentElement}
              </>
            ) : (
              <>
                {contentElement}
                {imageElement}
              </>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {imagePosition === 'top' && imageElement}
            {contentElement}
            {imagePosition === 'bottom' && imageElement}
          </div>
        )}
      </div>
    </section>
  );
};
