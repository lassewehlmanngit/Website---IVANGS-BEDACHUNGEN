import React from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { useCareerWizard } from '@/features/career/model/useCareerWizard';
import { useNavigate, useParams } from 'react-router-dom';
import { SupportedLang } from '@/shared/config/i18n';

export const CareerWizard: React.FC = () => {
  const { step, result, handleAnswer, reset } = useCareerWizard();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const safeLang = (lang as SupportedLang) || 'de';

  const handleApply = (topic?: string) => {
    navigate(`/${safeLang}/contact`);
  };

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
      options: [
        { label: "Ja, Höhe ist kein Problem.", value: "heights_yes" },
        { label: "Nicht so gerne.", value: "heights_no" },
      ]
    },
    {
      id: 2,
      question: "Magst du es, Dinge zu organisieren und zu planen?",
      options: [
        { label: "Ja, ich behalte gerne den Überblick.", value: "org_yes" },
        { label: "Eher kreativ oder handwerklich.", value: "org_no" },
      ]
    }
  ];

  if (step === 3) {
    return (
      <div className="bg-white p-8 rounded-sm shadow-lg border border-slate-100 text-center animate-fade-in max-w-lg mx-auto">
        {result === "dachdecker" && (
          <div>
            <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Perfect Match!</h3>
            <p className="text-slate-600 mb-6">
              Du scheinst perfekt für eine Stelle als <strong>Dachdeckergeselle (m/w/d)</strong> geeignet zu sein.
            </p>
            <Button className="w-full" onClick={() => handleApply('Dachdecker')}>
              Jetzt direkt bewerben
            </Button>
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
            <Button className="w-full" onClick={() => handleApply('Büro')}>
              Initiativ bewerben
            </Button>
          </div>
        )}

        {result === "none" && (
          <div>
            <div className="inline-flex p-4 bg-warning/10 text-warning rounded-full mb-4">
              <XCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Nicht sicher?</h3>
            <p className="text-slate-600 mb-6">
              Unser Wizard konnte keine direkte Zuordnung finden, aber wir lernen dich gerne kennen!
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleApply('Initiativ')}>Initiativ bewerben</Button>
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
    <div className="bg-white p-8 rounded-sm shadow-lg border border-slate-100 max-w-lg mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <span className="text-xs font-bold text-primary tracking-wider uppercase">Karriere-Finder</span>
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
            className="w-full text-left p-4 rounded-sm border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between"
          >
            <span className="font-medium text-slate-700 group-hover:text-primary">{opt.label}</span>
            <ArrowRight size={18} className="text-slate-300 group-hover:text-primary" />
          </button>
        ))}
      </div>
    </div>
  );
};
