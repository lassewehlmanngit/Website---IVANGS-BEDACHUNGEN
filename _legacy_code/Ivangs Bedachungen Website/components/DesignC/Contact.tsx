import React from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in pt-32 bg-slate-900 min-h-screen text-white">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-medium mb-16 tracking-tighter">Kontakt.</h1>

        <div className="grid lg:grid-cols-2 gap-16 pb-24">
           <div>
              <p className="text-2xl text-slate-300 leading-relaxed mb-12">
                Haben Sie eine Vision für Ihr Projekt? Wir helfen Ihnen bei der Umsetzung. Schreiben Sie uns.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 p-6 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
                   <Phone className="text-slate-400" />
                   <div>
                     <p className="text-xs text-slate-400 uppercase tracking-widest">Telefon</p>
                     <p className="text-xl font-medium">+49 123 456 789</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 p-6 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
                   <Mail className="text-slate-400" />
                   <div>
                     <p className="text-xs text-slate-400 uppercase tracking-widest">Email</p>
                     <p className="text-xl font-medium">info@ruther.de</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 p-6 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
                   <MapPin className="text-slate-400" />
                   <div>
                     <p className="text-xs text-slate-400 uppercase tracking-widest">Büro</p>
                     <p className="text-xl font-medium">Musterstraße 12, DE</p>
                   </div>
                </div>
              </div>
           </div>

           <form className="bg-white rounded-3xl p-8 md:p-12 text-slate-900">
              <h3 className="text-2xl font-bold mb-8">Nachricht senden</h3>
              <div className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2">Vorname</label>
                      <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-200 p-3 focus:outline-none focus:border-slate-900 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2">Nachname</label>
                      <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-200 p-3 focus:outline-none focus:border-slate-900 transition-colors" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email</label>
                    <input type="email" className="w-full bg-slate-50 border-b-2 border-slate-200 p-3 focus:outline-none focus:border-slate-900 transition-colors" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">Nachricht</label>
                    <textarea rows={4} className="w-full bg-slate-50 border-b-2 border-slate-200 p-3 focus:outline-none focus:border-slate-900 transition-colors"></textarea>
                 </div>
                 <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-full hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                   Absenden <Send size={16} />
                 </button>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;