import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tinaField } from 'tinacms/dist/react';
import { OptimizedImage } from '@/shared/ui/Image';

export interface CeoQuoteProps {
  lang: string;
  ceoData?: any;
}

export const CeoQuote: React.FC<CeoQuoteProps> = ({ lang, ceoData }) => {
  const ceo = ceoData || {};
  
  return (
    <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-primary-600 font-bold uppercase tracking-wider text-sm block mb-4" data-tina-field={ceoData && tinaField(ceoData, 'eyebrow')}>
                  {ceo.eyebrow || 'Ein Wort vom Chef'}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2" data-tina-field={ceoData && tinaField(ceoData, 'name')}>
                  {ceo.name || 'Marcus Ivangs'}
                </h2>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8" data-tina-field={ceoData && tinaField(ceoData, 'role')}>
                  {ceo.role || 'Geschäftsführer & Dachdeckermeister'}
                </p>
                
                <div className="prose prose-lg text-slate-600 leading-relaxed mb-10">
                   <p className="italic font-medium text-slate-800 text-xl border-l-4 border-primary pl-6 mb-6" data-tina-field={ceoData && tinaField(ceoData, 'quote')}>
                     "{ceo.quote || 'Warum man auf uns zählen kann? Weil unser Unternehmen mehr ist, als nur ein Business.'}"
                   </p>
                   <p data-tina-field={ceoData && tinaField(ceoData, 'text')}>
                     {ceo.text || 'Jede Person in unserem Team ist einzigartig – und wir alle teilen die gleichen Werte. Wenn wir sagen, wir sind pünktlich, dann sind wir es. Wenn wir einen Preis nennen, dann halten wir ihn. Handwerk ist Vertrauenssache, und dieses Vertrauen erarbeiten wir uns jeden Tag neu – auf Ihrem Dach.'}
                   </p>
                </div>
                
                <Link 
                  to={ceo.buttonLink || `/${lang}/about`} 
                  className="group flex items-center gap-3 text-slate-900 font-bold hover:text-primary transition-colors"
                >
                  <span data-tina-field={ceoData && tinaField(ceoData, 'buttonText')}>
                    {ceo.buttonText || 'Mehr über unser Team erfahren'}
                  </span>
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    <ArrowRight size={18} />
                  </div>
                </Link>
              </div>

              <div className="relative order-1 lg:order-2">
                 <div className="absolute top-0 right-0 w-full h-full border-4 border-slate-200 translate-x-6 translate-y-6 rounded-sm -z-10"></div>
                 <OptimizedImage
                   src={ceo.image || '/uploads/invangs-ceo-image.webp'}
                   alt={ceo.name || 'Marcus Ivangs'}
                   className="rounded-sm w-full h-[650px] object-cover transition-all duration-700 shadow-xl"
                   width={800}
                   height={1200}
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   loading="lazy"
                   data-tina-field={ceoData && tinaField(ceoData, 'image')}
                 />
              </div>
           </div>
        </div>
      </section>
  );
};
