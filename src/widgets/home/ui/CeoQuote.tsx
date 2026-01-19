import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CeoQuote: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-primary-600 font-bold uppercase tracking-wider text-sm block mb-4">Ein Wort vom Chef</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Marcus Ivangs</h2>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Geschäftsführer & Dachdeckermeister</p>
                
                <div className="prose prose-lg text-slate-600 leading-relaxed mb-10">
                   <p className="italic font-medium text-slate-800 text-xl border-l-4 border-primary-600 pl-6 mb-6">
                     "Warum man auf uns zählen kann? Weil unser Unternehmen mehr ist, als nur ein Business."
                   </p>
                   <p>
                     Jede Person in unserem Team ist einzigartig – und wir alle teilen die gleichen Werte. 
                     Wenn wir sagen, wir sind pünktlich, dann sind wir es. Wenn wir einen Preis nennen, dann halten wir ihn.
                     Handwerk ist Vertrauenssache, und dieses Vertrauen erarbeiten wir uns jeden Tag neu – auf Ihrem Dach.
                   </p>
                </div>
                
                <Link 
                  to={`/${lang}/about`} 
                  className="group flex items-center gap-3 text-slate-900 font-bold hover:text-primary-600 transition-colors"
                >
                  Mehr über unser Team erfahren
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all">
                    <ArrowRight size={18} />
                  </div>
                </Link>
              </div>

              <div className="relative order-1 lg:order-2">
                 <div className="absolute top-0 right-0 w-full h-full border-4 border-slate-200 translate-x-6 translate-y-6 rounded-3xl -z-10"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" 
                   className="rounded-3xl w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                   alt="Marcus Ivangs" 
                 />
                 <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Unterschrift" className="h-12 opacity-80" />
                 </div>
              </div>
           </div>
        </div>
      </section>
  );
};
