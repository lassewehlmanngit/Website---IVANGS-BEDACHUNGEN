import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-bold uppercase tracking-widest">Kontakt</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-4">Wir freuen uns auf Sie.</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-slate-900 text-white p-10 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
            
            <h3 className="text-2xl font-bold mb-8 relative z-10">Kontaktinformationen</h3>
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg text-primary-600"><MapPin size={24} /></div>
                <div>
                  <p className="font-bold text-lg">Anschrift</p>
                  <p className="text-slate-400">Musterstraße 12<br/>12345 Musterstadt</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg text-primary-600"><Phone size={24} /></div>
                <div>
                  <p className="font-bold text-lg">Telefon</p>
                  <p className="text-slate-400">+49 123 456 789</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-slate-800 p-3 rounded-lg text-primary-600"><Mail size={24} /></div>
                <div>
                  <p className="font-bold text-lg">E-Mail</p>
                  <p className="text-slate-400">info@ruther.de</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-800 relative z-10">
               <p className="font-bold mb-4">Folgen Sie uns</p>
               <div className="grid grid-cols-4 gap-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="aspect-square bg-slate-800 rounded-lg overflow-hidden">
                     <img src={`https://picsum.photos/100/100?random=${50+i}`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <form className="bg-white p-10 md:p-14 rounded-3xl shadow-xl">
             <div className="grid md:grid-cols-2 gap-6 mb-6">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Vorname</label>
                 <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-lg focus:outline-none focus:border-primary-600 transition-colors" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nachname</label>
                 <input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-lg focus:outline-none focus:border-primary-600 transition-colors" />
               </div>
             </div>
             <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">E-Mail</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-lg focus:outline-none focus:border-primary-600 transition-colors" />
             </div>
             <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nachricht</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-lg focus:outline-none focus:border-primary-600 transition-colors"></textarea>
             </div>
             <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-primary-600/20 transition-all flex items-center justify-center gap-2">
               <Send size={20} /> ABSENDEN
             </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;