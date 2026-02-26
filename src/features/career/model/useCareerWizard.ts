import { useState } from 'react';

export type CareerStep = 'intro' | 'q1' | 'q2' | 'result';
export type CareerResult = 'dachdecker' | 'geselle' | 'vorarbeiter' | 'ausbildung' | 'none' | null;

export const useCareerWizard = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<CareerResult>(null);

  const handleAnswer = (value: string) => {
    const currentAnswers = { ...answers, [step]: value };
    setAnswers(currentAnswers);

    if (step === 0) {
      if (value === "craft_experience") {
        setStep(1); // ask about details
      } else if (value === "leadership") {
        finalize("vorarbeiter");
      } else if (value === "learn") {
        finalize("ausbildung");
      } else {
        finalize("none");
      }
    } else if (step === 1) {
      if (value === "big_projects") {
        finalize("geselle");
      } else {
        finalize("dachdecker");
      }
    }
  };

  const finalize = (res: CareerResult) => {
    setResult(res);
    setStep(3); // Result step mapped to 3 for UI consistency
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return {
    step,
    result,
    handleAnswer,
    reset
  };
};
