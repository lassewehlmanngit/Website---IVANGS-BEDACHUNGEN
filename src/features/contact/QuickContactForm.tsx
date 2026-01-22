import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { toast } from '@/shared/lib/toast';
import { tinaField } from 'tinacms/dist/react';
import { cn } from '@/shared/lib/cn';

export interface QuickContactData {
  name: string;
  contact: string;
  source: 'hero' | 'mobile';
}

export interface QuickContactFormProps {
  /** Where this form is displayed */
  source: 'hero' | 'mobile';
  /** CMS form data for labels */
  formData?: {
    title?: string;
    nameLabel?: string;
    contactLabel?: string;
    buttonText?: string;
    disclaimer?: string;
  };
  /** Language for redirect fallback */
  lang?: string;
  /** Custom class name */
  className?: string;
  /** Variant for different visual styles */
  variant?: 'dark' | 'light';
  /** Callback after successful submission */
  onSuccess?: () => void;
}

const initialFormData: QuickContactData = {
  name: '',
  contact: '',
  source: 'hero',
};

export const QuickContactForm: React.FC<QuickContactFormProps> = ({
  source,
  formData: cmsData,
  lang = 'de',
  className,
  variant = 'dark',
  onSuccess,
}) => {
  const [formState, setFormState] = useState<QuickContactData>({
    ...initialFormData,
    source,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof QuickContactData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuickContactData, string>> = {};

    if (!formState.name.trim() || formState.name.length < 2) {
      newErrors.name = 'Bitte geben Sie Ihren Namen ein';
    }

    if (!formState.contact.trim()) {
      newErrors.contact = 'Bitte geben Sie eine Kontaktmöglichkeit ein';
    } else {
      // Check if it's a valid email or phone
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.contact);
      const isPhone = /^[\d\s+\-()]{6,}$/.test(formState.contact.replace(/\s/g, ''));
      if (!isEmail && !isPhone) {
        newErrors.contact = 'Bitte geben Sie eine gültige E-Mail oder Telefonnummer ein';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof QuickContactData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to backend (you can replace this with your actual API endpoint)
      const response = await fetch('/api/quick-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSuccess(true);
      setFormState({ ...initialFormData, source });
      toast.success('Anfrage gesendet!', {
        description: 'Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
      });
      onSuccess?.();
    } catch (error) {
      // On error, show toast but don't fail completely - allow retry
      toast.error('Verbindungsproblem', {
        description: 'Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = variant === 'dark';

  if (isSuccess) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className={cn(
          'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
          isDark ? 'bg-primary/20' : 'bg-primary/10'
        )}>
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className={cn(
          'text-xl font-bold mb-2',
          isDark ? 'text-white' : 'text-slate-900'
        )}>
          Vielen Dank!
        </h3>
        <p className={cn(
          'text-sm',
          isDark ? 'text-slate-300' : 'text-slate-600'
        )}>
          Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {/* Header - only show in hero variant */}
      {source === 'hero' && (
        <h3 
          className="text-h4 font-bold text-white mb-4 md:mb-6 flex items-center gap-2 relative z-10"
          data-tina-field={cmsData && tinaField(cmsData, 'title')}
        >
          <Mail size={20} className="text-primary shrink-0" />
          {cmsData?.title || 'Schnellanfrage'}
        </h3>
      )}

      <div className="space-y-4 relative z-10">
        {/* Name Field */}
        <div>
          <label 
            htmlFor={`${source}-name`}
            className={cn(
              'text-xs font-bold uppercase tracking-wider mb-1 block',
              isDark ? 'text-slate-300' : 'text-slate-600'
            )}
            data-tina-field={cmsData && tinaField(cmsData, 'nameLabel')}
          >
            {cmsData?.nameLabel || 'Ihr Name'}
          </label>
          <input
            id={`${source}-name`}
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 rounded-sm text-sm transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isDark 
                ? 'bg-slate-900/50 border border-white/10 text-white placeholder:text-slate-500 focus:border-primary' 
                : 'bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary',
              errors.name && 'border-destructive'
            )}
            placeholder="Max Mustermann"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${source}-name-error` : undefined}
          />
          {errors.name && (
            <p id={`${source}-name-error`} className="text-xs text-destructive mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Contact Field */}
        <div>
          <label 
            htmlFor={`${source}-contact`}
            className={cn(
              'text-xs font-bold uppercase tracking-wider mb-1 block',
              isDark ? 'text-slate-300' : 'text-slate-600'
            )}
            data-tina-field={cmsData && tinaField(cmsData, 'contactLabel')}
          >
            {cmsData?.contactLabel || 'E-Mail oder Telefon'}
          </label>
          <input
            id={`${source}-contact`}
            name="contact"
            type="text"
            value={formState.contact}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 rounded-sm text-sm transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isDark 
                ? 'bg-slate-900/50 border border-white/10 text-white placeholder:text-slate-500 focus:border-primary' 
                : 'bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary',
              errors.contact && 'border-destructive'
            )}
            placeholder="ihre@email.de oder 0123 456789"
            autoComplete="email tel"
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? `${source}-contact-error` : undefined}
          />
          {errors.contact && (
            <p id={`${source}-contact-error`} className="text-xs text-destructive mt-1">
              {errors.contact}
            </p>
          )}
        </div>

        {/* Honeypot field (hidden) */}
        <input
          type="text"
          name="_gotcha"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isSubmitting}
          className={cn(
            'w-full mt-2 shadow-lg',
            isDark 
              ? 'bg-white text-slate-900 hover:bg-slate-100' 
              : 'bg-primary text-white hover:bg-primary/90'
          )}
          data-tina-field={cmsData && tinaField(cmsData, 'buttonText')}
        >
          {cmsData?.buttonText || 'Kostenlos anfragen'}
          <ArrowRight size={18} className="ml-2" />
        </Button>

        {/* Disclaimer */}
        <p 
          className={cn(
            'text-[10px] text-center',
            isDark ? 'text-slate-400' : 'text-slate-500'
          )}
          data-tina-field={cmsData && tinaField(cmsData, 'disclaimer')}
        >
          {cmsData?.disclaimer || 'Wir melden uns innerhalb von 24h. Unverbindlich & kostenlos.'}
        </p>
      </div>
    </form>
  );
};
