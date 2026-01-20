import React from 'react';
import { cn } from '@/shared/lib/cn';
import { Label } from './Label';

export interface FormFieldRenderProps {
  id: string;
  describedBy?: string;
  invalid: boolean;
}

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  description?: string;
  error?: string;
  className?: string;
  children: React.ReactNode | ((props: FormFieldRenderProps) => React.ReactNode);
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  description,
  error,
  className,
  children,
}) => {
  const generatedId = React.useId();
  const id = htmlFor ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const invalid = Boolean(error);

  // Clone child element to inject id and aria attributes if it's a single element
  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ id, describedBy, invalid });
    }
    
    // If children is a single React element, clone it with the id
    if (React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean }>, {
        id,
        'aria-describedby': describedBy,
        'aria-invalid': invalid || undefined,
      });
    }
    
    return children;
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {description ? (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {renderChildren()}
      {error ? (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

