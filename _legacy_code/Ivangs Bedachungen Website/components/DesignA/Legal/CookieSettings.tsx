import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';

const CookieSettings: React.FC = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Simulate API save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in bg-white pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Cookie-Einstellungen</h1>
        <p className="text-slate-600 mb-10 text-lg">
          Hier können Sie entscheiden, welche Cookies wir verwenden dürfen. Ihre Einstellungen können jederzeit geändert werden.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-sm overflow-hidden mb-8">
           
           {/* Essential */}
           <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-1">Notwendige Cookies</h3>
                 <p className="text-sm text-slate-500">
                    Diese Cookies sind für den Betrieb der Seite unerlässlich (z.B. Sicherheitsfunktionen, Speichern Ihrer Einstellungen).
                 </p>
              </div>
              <div className="relative inline-flex items-center cursor-not-allowed opacity-50">
                 <input type="checkbox" checked={true} disabled className="sr-only peer" />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </div>
           </div>

           {/* Analytics */}
           <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-1">Analyse & Statistik</h3>
                 <p className="text-sm text-slate-500">
                    Helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem Informationen anonym gesammelt werden.
                 </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={preferences.analytics} 
                   onChange={() => setPreferences(prev => ({...prev, analytics: !prev.analytics}))}
                   className="sr-only peer" 
                 />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
           </div>

           {/* Marketing */}
           <div className="p-6 flex items-start justify-between gap-4">
              <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-1">Marketing</h3>
                 <p className="text-sm text-slate-500">
                    Werden verwendet, um Besuchern auf Webseiten zu folgen. Die Absicht ist, Anzeigen zu zeigen, die relevant und ansprechend für den einzelnen Benutzer sind.
                 </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={preferences.marketing} 
                   onChange={() => setPreferences(prev => ({...prev, marketing: !prev.marketing}))}
                   className="sr-only peer" 
                 />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
           </div>
        </div>

        <div className="flex justify-end">
           <button 
             onClick={handleSave}
             className={`px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-all ${
               saved ? 'bg-green-600 text-white' : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
             }`}
           >
             {saved ? (
               <>
                 <Check size={20} /> Gespeichert
               </>
             ) : (
               <>
                 <Save size={20} /> Einstellungen speichern
               </>
             )}
           </button>
        </div>

      </div>
    </div>
  );
};

export default CookieSettings;