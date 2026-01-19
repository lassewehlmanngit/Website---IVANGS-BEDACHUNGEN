import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { Select } from '@/shared/ui/Select';
import { Checkbox } from '@/shared/ui/Checkbox';
import { FormField } from '@/shared/ui/FormField';
import { Alert } from '@/shared/ui/Alert';
import { toast } from '@/shared/lib/toast';
import {
  validateForm,
  required,
  email,
  minLength,
  maxLength,
  type FieldValidation,
} from '@/shared/lib/validation';

export interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
  privacy: boolean;
  _gotcha: string; // Honeypot field
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  topic: 'Allgemeine Anfrage',
  message: '',
  privacy: false,
  _gotcha: '',
};

const TOPICS = [
    { value: 'Allgemeine Anfrage', label: 'Allgemeine Anfrage' },
    { value: 'Angebot Steildach', label: 'Angebot Steildach' },
    { value: 'Angebot Flachdach', label: 'Angebot Flachdach' },
    { value: 'Angebot Solar/PV', label: 'Angebot Solar/PV' },
    { value: 'Reparatur / Wartung', label: 'Reparatur / Wartung' },
    { value: 'Bewerbung', label: 'Bewerbung' },
];

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className }) => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validationSchema: Partial<Record<keyof ContactFormData, FieldValidation>> = {
    name: [required(t('validation.required')), minLength(2), maxLength(100)],
    email: [required(t('validation.required')), email(t('validation.email'))],
    topic: [required(t('validation.required'))],
    message: [required(t('validation.required')), minLength(10), maxLength(5000)],
    privacy: [{ validate: (val: string) => val === 'true', message: t('validation.required') }],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    // Honeypot check
    if (formData._gotcha) {
      // Bot detected - simulate success
      setSubmitStatus('success');
      setFormData(initialFormData);
      return;
    }

    // Validate form
    const validationErrors = validateForm(formData, validationSchema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSubmitStatus('success');
      setFormData(initialFormData);
      toast.success(t('status.success'), {
        description: 'Ihre Nachricht wurde erfolgreich versendet.',
      });
    } catch (error) {
      setSubmitStatus('error');
      toast.error(t('status.error'), {
        description: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {submitStatus === 'success' && (
        <Alert variant="success" className="mb-6">
          Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="destructive" className="mb-6">
          Etwas ist schiefgelaufen. Bitte versuchen Sie es später noch einmal.
        </Alert>
      )}

      {/* Honeypot field (hidden) */}
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-4">
        <FormField
          label="Name"
          htmlFor="contact-name"
          error={errors.name}
          required
        >
          <Input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ihr Name"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="contact-email"
          error={errors.email}
          required
        >
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ihre@email.de"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </FormField>

        <FormField
          label="Worum geht es?"
          htmlFor="contact-topic"
          error={errors.topic}
          required
        >
          <Select
            id="contact-topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            options={TOPICS}
            aria-invalid={!!errors.topic}
          />
        </FormField>

        <FormField
          label="Nachricht"
          htmlFor="contact-message"
          error={errors.message}
          required
        >
          <Textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Ihre Nachricht..."
            rows={5}
            aria-invalid={!!errors.message}
          />
        </FormField>
        
        <div className="py-2">
            <Checkbox 
                id="contact-privacy"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                label="Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu."
                aria-invalid={!!errors.privacy}
            />
            {errors.privacy && <p className="text-sm text-destructive mt-1">{errors.privacy}</p>}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
          Nachricht absenden
        </Button>
      </div>
    </form>
  );
};
