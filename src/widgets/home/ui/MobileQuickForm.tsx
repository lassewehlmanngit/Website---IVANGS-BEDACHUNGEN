import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tinaField } from 'tinacms/dist/react';

interface MobileQuickFormProps {
  lang: string;
  data: any; // The full homePage data
}

export const MobileQuickForm: React.FC<MobileQuickFormProps> = ({ lang, data }) => {
  // Use new quickForm data or fallbacks
  const formData = data?.quickForm || {};
  
  if (data?.hero?.showQuickForm === false) return null;

  return (
    <section className="md:hidden bg-slate-900 border-b border-white/10 py-12 px-4 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -mr-12 -mt-12 pointer-events-none"></div>

      <div className="relative z-10 max-w-md mx-auto">
        <h3 
          className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          data-tina-field={formData && tinaField(formData, 'title')}
        >
          <div className="bg-primary/20 p-2 rounded-full text-primary">
            <Mail size={20} />
          </div>
          {formData.title || 'Schnellanfrage'}
        </h3>

        <div className="space-y-4 bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block" data-tina-field={formData && tinaField(formData, 'nameLabel')}>
              {formData.nameLabel || 'Ihr Name'}
            </label>
            <input 
              type="text" 
              className="w-full bg-slate-950/50 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
              placeholder="Max Mustermann" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block" data-tina-field={formData && tinaField(formData, 'contactLabel')}>
              {formData.contactLabel || 'Telefon oder E-Mail'}
            </label>
            <input 
              type="text" 
              className="w-full bg-slate-950/50 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
              placeholder="0176..." 
            />
          </div>
          
          <Link to={`/${lang}/contact`} className="block pt-2">
            <button 
              className="w-full bg-primary hover:bg-primary-600 text-white px-6 py-4 rounded-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
              data-tina-field={formData && tinaField(formData, 'buttonText')}
            >
              {formData.buttonText || 'Kostenlos anfragen'} <ArrowRight size={18} />
            </button>
          </Link>
          
          <p 
            className="text-[10px] text-slate-500 text-center leading-relaxed"
            data-tina-field={formData && tinaField(formData, 'disclaimer')}
          >
            {formData.disclaimer || 'Wir melden uns innerhalb von 24h. Unverbindlich & kostenlos.'}
          </p>
        </div>
      </div>
    </section>
  );
};
