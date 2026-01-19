import React, { useState } from 'react';
import { Target, Users, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-slate-900 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Über Ruther.</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">Meisterhandwerk aus Leidenschaft seit über 25 Jahren.</p>
      </div>

      <section className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Die Geschichte dahinter.</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Gegründet im Jahr 1998, hat sich Ruther Bedachungen von einem kleinen Zwei-Mann-Betrieb zu einem der führenden Dachdeckerunternehmen der Region entwickelt.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Wir glauben daran, dass Qualität sich durchsetzt. Deshalb bilden wir unsere Mitarbeiter stetig weiter und setzen auf modernste Technologien, ohne die traditionelle Handwerkskunst zu vergessen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://picsum.photos/400/500?random=301" className="rounded-2xl shadow-lg mt-12" />
             <img src="https://picsum.photos/400/500?random=302" className="rounded-2xl shadow-lg" />
          </div>
        </div>
      </section>

      <section className="bg-primary-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg border-b-8 border-primary-600">
               <Target size={48} className="text-primary-600 mb-6" />
               <h3 className="text-2xl font-bold mb-4">Mission</h3>
               <p className="text-slate-600">Dächer zu bauen, die Generationen schützen und dabei ästhetische Maßstäbe zu setzen.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg border-b-8 border-primary-600">
               <Users size={48} className="text-primary-600 mb-6" />
               <h3 className="text-2xl font-bold mb-4">Team</h3>
               <p className="text-slate-600">Ein starkes Miteinander. Wir fördern Talente und schätzen jeden einzelnen Mitarbeiter.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg border-b-8 border-primary-600">
               <Heart size={48} className="text-primary-600 mb-6" />
               <h3 className="text-2xl font-bold mb-4">Werte</h3>
               <p className="text-slate-600">Ehrlichkeit, Pünktlichkeit und Sauberkeit sind für uns keine leeren Worte, sondern Versprechen.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;