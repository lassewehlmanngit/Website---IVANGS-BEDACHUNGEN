import React, { useEffect, useState } from 'react';
import { Save, Check } from 'lucide-react';
import { Seo } from '@/shared/ui/Seo';
import { SupportedLang } from '@/shared/config/i18n';
import { Button } from '@/shared/ui/Button';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

// Reuse the key and types to ensure sync with CookieBanner
const COOKIE_STORAGE_KEY = 'cookie-consent-settings';

interface CookieSettings {
  status: 'accepted' | 'rejected' | 'custom';
  preferences: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

export const CookieSettingsPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: CookieSettings = JSON.parse(stored);
        if (parsed.preferences) {
          setPreferences(parsed.preferences);
        }
      } catch (e) {
        console.error('Failed to parse cookie settings', e);
      }
    }
  }, []);

  const handleSave = () => {
    const settings: CookieSettings = {
      status: 'custom',
      preferences: preferences
    };
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('cookie-settings-changed'));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <Seo 
        title="Cookie-Einstellungen - Ivangs Bedachungen" 
        description="Verwalten Sie Ihre Cookie-Einstellungen für die Website von Ivangs Bedachungen."
        ogLocale="de_DE"
      />
      <div className="animate-fade-in bg-white pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <Breadcrumbs 
            lang={lang}
            items={[{ label: 'Cookie-Einstellungen' }]}
            className="mb-6"
          />
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
                   <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
             </div>

             {/* Analytics */}
             <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
                <div id="analytics-label">
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
                     aria-labelledby="analytics-label"
                   />
                   <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                   <span className="sr-only">Analyse & Statistik Cookies aktivieren</span>
                </label>
             </div>

             {/* Marketing */}
             <div className="p-6 flex items-start justify-between gap-4">
                <div id="marketing-label">
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
                     aria-labelledby="marketing-label"
                   />
                   <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                   <span className="sr-only">Marketing Cookies aktivieren</span>
                </label>
             </div>
          </div>

          <div className="flex justify-end">
             <Button 
               onClick={handleSave}
               className={`px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-all ${
                 saved ? 'bg-green-600 hover:bg-green-700' : ''
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
             </Button>
          </div>

        </div>
      </div>
    </>
  );
};
