import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

const CareerWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      id: 0,
      question: "Arbeitest du gerne an der frischen Luft und körperlich?",
      options: [
        { label: "Ja, sehr gerne!", value: "outdoors" },
        { label: "Nein, lieber im Büro.", value: "indoors" },
      ]
    },
    {
      id: 1,
      question: "Bist du schwindelfrei und trittsicher?",
      condition: (prev: string) => prev === "outdoors",
      options: [
        { label: "Ja, Höhe ist kein Problem.", value: "heights_yes" },
        { label: "Nicht so gerne.", value: "heights_no" },
      ]
    },
    {
      id: 2,
      question: "Magst du es, Dinge zu organisieren und zu planen?",
      condition: (prev: string) => prev === "indoors",
      options: [
        { label: "Ja, ich behalte gerne den Überblick.", value: "org_yes" },
        { label: "Eher kreativ oder handwerklich.", value: "org_no" },
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const currentAnswers = { ...answers, [step]: value };
    setAnswers(currentAnswers);

    // Logic to determine next step or result
    if (step === 0) {
      if (value === "outdoors") setStep(1);
      else setStep(2);
    } else if (step === 1) {
      if (value === "heights_yes") finalize("dachdecker");
      else finalize("none");
    } else if (step === 2) {
      if (value === "org_yes") finalize("kaufmann");
      else finalize("none");
    }
  };

  const finalize = (res: string) => {
    setResult(res);
    setStep(3); // Result step
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  if (step === 3) {
    return (
      <div className="bg-white p-8 rounded-md shadow-xl border border-slate-100 text-center animate-fade-in">
        {result === "dachdecker" && (
          <div>
            <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Perfect Match!</h3>
            <p className="text-slate-600 mb-6">
              Du scheinst perfekt für eine Stelle als <strong>Dachdeckergeselle (m/w/d)</strong> geeignet zu sein.
            </p>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-primary-700 transition-colors w-full">
              Jetzt direkt bewerben
            </button>
          </div>
        )}

        {result === "kaufmann" && (
          <div>
            <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Das passt!</h3>
            <p className="text-slate-600 mb-6">
              Eine Stelle im <strong>Büro & Organisation</strong> scheint genau dein Ding zu sein.
            </p>
            <button className="bg-primary-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-primary-700 transition-colors w-full">
              Initiativ bewerben
            </button>
          </div>
        )}

        {result === "none" && (
          <div>
            <div className="inline-flex p-4 bg-orange-100 text-orange-600 rounded-full mb-4">
              <XCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Nicht sicher?</h3>
            <p className="text-slate-600 mb-6">
              Unser Wizard konnte keine direkte Zuordnung finden, aber wir lernen dich gerne kennen!
            </p>
            <div className="bg-slate-50 p-6 rounded-md text-left mb-6">
              <h4 className="font-semibold mb-2">Initiativbewerbung</h4>
              <p className="text-sm text-slate-500 mb-4">Sende uns einfach deine Daten und wir schauen gemeinsam, was passt.</p>
              <input type="text" placeholder="Dein Name" className="w-full mb-3 p-3 border rounded-sm text-sm" />
              <input type="email" placeholder="Deine E-Mail" className="w-full mb-3 p-3 border rounded-sm text-sm" />
              <button className="w-full bg-slate-900 text-white py-2 rounded-sm text-sm font-medium">Absenden</button>
            </div>
          </div>
        )}
        
        <button onClick={reset} className="mt-4 text-slate-400 hover:text-slate-600 text-sm flex items-center justify-center gap-2 mx-auto">
          <RotateCcw size={14} />
          Wizard neu starten
        </button>
      </div>
    );
  }

  const currentQ = questions.find(q => q.id === step);

  return (
    <div className="bg-white p-8 rounded-md shadow-xl border border-slate-100 max-w-lg mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <span className="text-xs font-bold text-primary-600 tracking-wider uppercase">Karriere-Finder</span>
        <span className="text-xs text-slate-400">Schritt {step + 1} von 3</span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-8 leading-snug">
        {currentQ?.question}
      </h3>

      <div className="space-y-3">
        {currentQ?.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className="w-full text-left p-4 rounded-sm border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-all group flex items-center justify-between"
          >
            <span className="font-medium text-slate-700 group-hover:text-primary-700">{opt.label}</span>
            <ArrowRight size={18} className="text-slate-300 group-hover:text-primary-500" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CareerWizard;