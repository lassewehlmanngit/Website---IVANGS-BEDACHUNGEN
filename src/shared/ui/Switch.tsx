import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
  ariaLabel,
  ariaLabelledBy,
}) => {
  return (
    <label className={cn("relative inline-flex items-center", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-disabled:cursor-not-allowed"></div>
      {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
    </label>
  );
};
