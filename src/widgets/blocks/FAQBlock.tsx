import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/Accordion';

export interface FAQBlockProps {
  data: {
    title?: string;
    description?: string;
    questions?: Array<{
      question: string;
      answer: string;
    }>;
  };
  parentField?: string;
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ data, parentField }) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {(data.title || data.description) && (
            <div className="text-center mb-12">
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

          {data.questions && data.questions.length > 0 && (
            <Accordion type="single" collapsible>
              {data.questions.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>
                    <span data-tina-field={parentField && data.questions && tinaField(data.questions[index], 'question')}>
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p data-tina-field={parentField && data.questions && tinaField(data.questions[index], 'answer')}>
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};
