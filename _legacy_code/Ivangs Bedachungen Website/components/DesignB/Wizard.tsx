import React, { useState } from 'react';
import { Check, X, ArrowRight, RefreshCw, Briefcase, HardHat } from 'lucide-react';

const Wizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      id: 0,
      text: "Was macht dir am meisten Spaß?",
      options: [
        { label: "Körperliche Arbeit & Handwerk", value: "handwerk" },
        { label: "Organisation & Planung", value: "buero" }
      ]
    },
    {
      id: 1,
      text: "Wie stehst du zu Höhen?",
      condition: "handwerk",
      options: [
        { label: "Ich liebe den Ausblick!", value: "height_yes" },
        { label: "Bleibe lieber am Boden.", value: "height_no" }
      ]
    },
    {
      id: 2,
      text: "Arbeitest du lieber...",
      condition: "buero",
      options: [
        { label: "Im Team an Projekten", value: "team" },
        { label: "Eigenständig an Zahlen", value: "numbers" }
      ]
    }
  ];

  const handleSelect = (val: string) => {
    if (step === 0) {
      if (val === 'handwerk') setStep(1);
      else setStep(2);
    } else {
      // Logic
      if (val === 'height_yes') setResult('dachdecker');
      else if (val === 'team') setResult('kaufmann');
      else setResult('initiativ');
    }
  };

  const reset = () => {
    setStep(0);
    setResult(null);
  };

  const currentQ = questions.find(q => q.id === step);

  if (result) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-t-8 border-primary-600 animate-fade-in">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
           {result === 'dachdecker' ? <HardHat size={40} /> : <Briefcase size={40} />}
        </div>
        
        <h3 className="text-3xl font-bold text-slate-900 mb-4">
          {result === 'dachdecker' && "Dein Weg zum Dachdecker!"}
          {result === 'kaufmann' && "Das Büro ruft!"}
          {result === 'initiativ' && "Wir finden einen Platz!"}
        </h3>
        
        <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
          {result === 'dachdecker' && "Du scheinst wie gemacht für das Handwerk. Bewirb dich jetzt als Geselle oder für eine Ausbildung."}
          {result === 'kaufmann' && "Organisation liegt dir. Eine Ausbildung zum Kaufmann/-frau für Büromanagement passt perfekt."}
          {result === 'initiativ' && "Kein direkter Treffer, aber wir suchen immer motivierte Leute. Schick uns eine Initiativbewerbung!"}
        </p>

        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-primary-600/30 transition-all w-full md:w-auto mb-6">
          Jetzt bewerben
        </button>
        
        <button onClick={reset} className="flex items-center gap-2 mx-auto text-slate-400 hover:text-primary-600 transition-colors font-medium">
          <RefreshCw size={16} /> Neustart
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto border border-slate-100">
      <div className="bg-slate-900 p-6 flex justify-between items-center">
        <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">Karriere Check</span>
        <div className="flex gap-2">
          <div className={`h-2 w-8 rounded-full ${step >= 0 ? 'bg-primary-600' : 'bg-slate-700'}`}></div>
          <div className={`h-2 w-8 rounded-full ${step >= 1 ? 'bg-primary-600' : 'bg-slate-700'}`}></div>
          <div className={`h-2 w-8 rounded-full ${result ? 'bg-primary-600' : 'bg-slate-700'}`}></div>
        </div>
      </div>
      
      <div className="p-8 md:p-12">
        <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">{currentQ?.text}</h3>
        
        <div className="grid gap-4">
          {currentQ?.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="group flex items-center justify-between p-6 rounded-2xl border-2 border-slate-100 hover:border-primary-600 hover:bg-primary-50 transition-all text-left"
            >
              <span className="text-xl font-bold text-slate-700 group-hover:text-primary-700">{opt.label}</span>
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-primary-600 flex items-center justify-center transition-colors">
                <ArrowRight size={20} className="text-slate-400 group-hover:text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wizard;