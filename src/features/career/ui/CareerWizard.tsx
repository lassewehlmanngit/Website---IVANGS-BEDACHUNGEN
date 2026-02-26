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
    navigate(`/${safeLang}/contact?subject=Bewerbung%20als%20${encodeURIComponent(topic || '')}`);
  };

  const questions = [
    {
      id: 0,
      question: "Was ist dir bei deiner Arbeit am wichtigsten?",
      options: [
        { label: "Handwerkliche Arbeit direkt auf dem Dach", value: "craft_experience" },
        { label: "Verantwortung und Baustellenleitung", value: "leadership" },
        { label: "Einen spannenden Beruf von Grund auf lernen", value: "learn" },
      ]
    },
    {
      id: 1,
      question: "Welche Art von Projekten reizt dich mehr?",
      options: [
        { label: "Teamarbeit bei Großprojekten (z.B. Flachdach)", value: "big_projects" },
        { label: "Vielfältige Einsätze auch im Steildachbereich", value: "classic_roof" },
      ]
    }
  ];

  if (step === 3) {
    return (
      <div className="text-center animate-fade-in w-full">
        {result === "dachdecker" && (
          <div>
            <div className="inline-flex p-4 bg-green-500/20 text-green-400 rounded-full mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Perfect Match!</h3>
            <p className="text-slate-300 mb-6">
              Du bist unser nächster <strong>Dachdecker (m/w/d)</strong> für vielfältige Projekte.
            </p>
            <Button className="w-full bg-white text-slate-900 hover:bg-slate-100" onClick={() => handleApply('Dachdecker')}>
              Jetzt direkt bewerben
            </Button>
          </div>
        )}

        {result === "geselle" && (
          <div>
            <div className="inline-flex p-4 bg-green-500/20 text-green-400 rounded-full mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Die Großprojekte warten!</h3>
            <p className="text-slate-300 mb-6">
              Wir suchen dich als <strong>Dachdeckergeselle (m/w/d)</strong> für unsere starken Teams.
            </p>
            <Button className="w-full bg-white text-slate-900 hover:bg-slate-100" onClick={() => handleApply('Dachdeckergeselle')}>
              Jetzt direkt bewerben
            </Button>
          </div>
        )}

        {result === "vorarbeiter" && (
          <div>
            <div className="inline-flex p-4 bg-blue-500/20 text-blue-400 rounded-full mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Führe unser Team!</h3>
            <p className="text-slate-300 mb-6">
              Deine Erfahrung macht dich zum perfekten <strong>Vorarbeiter (m/w/d)</strong>.
            </p>
            <Button className="w-full bg-white text-slate-900 hover:bg-slate-100" onClick={() => handleApply('Vorarbeiter')}>
              Wir wollen dich kennenlernen
            </Button>
          </div>
        )}

        {result === "ausbildung" && (
          <div>
            <div className="inline-flex p-4 bg-primary/20 text-primary-light rounded-full mb-4 ring-1 ring-primary/50">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Starte deine Karriere!</h3>
            <p className="text-slate-300 mb-6">
              Bewirb dich auf einen Platz für die <strong>Ausbildung (m/w/d)</strong>.
            </p>
            <Button className="w-full bg-primary text-white hover:bg-primary/90" onClick={() => handleApply('Ausbildung')}>
              Zur Bewerbung
            </Button>
          </div>
        )}

        {result === "none" && (
          <div>
            <div className="inline-flex p-4 bg-amber-500/20 text-amber-400 rounded-full mb-4">
              <XCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Initiativbewerbung</h3>
            <p className="text-slate-300 mb-6">
              Wir sind immer auf der Suche nach motivierten Machern.
            </p>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-slate-900" onClick={() => handleApply('Initiativbewerbung')}>Initiativ bewerben</Button>
          </div>
        )}

        <button onClick={reset} className="mt-8 text-slate-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2 mx-auto">
          <RotateCcw size={14} />
          Neu starten
        </button>
      </div>
    );
  }

  const currentQ = questions.find(q => q.id === step);

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center opacity-80">
        <span className="text-xs font-bold tracking-wider uppercase text-primary-light">Karriere-Finder</span>
        <span className="text-xs text-slate-300 font-medium">Schritt {step + 1} von 2</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 leading-snug">
        {currentQ?.question}
      </h3>

      <div className="space-y-3">
        {currentQ?.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 transition-all group flex items-center justify-between"
          >
            <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{opt.label}</span>
            <ArrowRight size={18} className="text-slate-400 group-hover:text-white translate-x-0 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};
