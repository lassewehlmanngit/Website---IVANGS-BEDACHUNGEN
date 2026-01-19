import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in p-4 md:p-6 bg-[#F3F5F7] min-h-screen pt-32">
       <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
             <div className="bg-[#8DA3B3] rounded-[3rem] p-12 md:p-16 text-white flex flex-col justify-between min-h-[500px]">
                <div>
                  <h1 className="text-4xl md:text-6xl font-medium mb-12">Lass uns reden.</h1>
                  <p className="text-xl opacity-90 max-w-sm">
                    Erzähl uns von deinem Projekt. Wir melden uns innerhalb von 24 Stunden.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-2xl font-medium">info@ruther.de</div>
                  <div className="text-2xl font-medium">+49 123 456 789</div>
                  <div className="opacity-60 mt-8">Musterstraße 12, 12345 Stadt</div>
                </div>
             </div>
             
             <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-sm">
                <form className="space-y-6">
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Name</label>
                     <input type="text" className="w-full bg-[#F3F5F7] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all" placeholder="Dein Name" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                     <input type="email" className="w-full bg-[#F3F5F7] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all" placeholder="name@beispiel.de" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nachricht</label>
                     <textarea rows={4} className="w-full bg-[#F3F5F7] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all" placeholder="Wie können wir helfen?"></textarea>
                   </div>
                   <button className="w-full bg-slate-900 text-white font-bold py-5 rounded-xl hover:bg-slate-800 transition-colors">
                     Nachricht senden
                   </button>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Contact;