import { useState } from 'react';

export type CareerStep = 'intro' | 'outdoors' | 'indoors' | 'result';
export type CareerResult = 'dachdecker' | 'kaufmann' | 'none' | null;

export const useCareerWizard = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<CareerResult>(null);

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

  const finalize = (res: CareerResult) => {
    setResult(res);
    setStep(3); // Result step
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
