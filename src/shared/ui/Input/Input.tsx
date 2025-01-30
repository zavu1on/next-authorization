import { type InputHTMLAttributes, type ReactNode } from 'react';
import { type FieldValues } from 'react-hook-form';
import { type FormChildrenProps, FormField } from '../Form';
import { Input as UIInput } from './ui';

type InputProps<Values extends FieldValues> = FormChildrenProps<Values> &
  InputHTMLAttributes<HTMLInputElement>;

export const Input = <Values extends FieldValues = FieldValues>({
  control,
  containerClassName,
  ...props
}: InputProps<Values>): ReactNode => {
  return (
    <FormField control={control} className={containerClassName}>
      <UIInput {...props} />
    </FormField>
  );
};
