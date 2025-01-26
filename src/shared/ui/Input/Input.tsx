import { type InputHTMLAttributes } from 'react';
import { type Control, type FieldValues } from 'react-hook-form';
import { type FormChildrenProps, FormField } from '../Form';
import { Input as UIInput } from './ui';

type InputProps<Values extends FieldValues> = {
  control: Control<Values>;
  containerClassName?: string;
} & FormChildrenProps<Values> &
  InputHTMLAttributes<HTMLInputElement>;

export const Input = <Values extends FieldValues = FieldValues>({
  control,
  containerClassName,
  ...props
}: InputProps<Values>) => {
  return (
    <FormField control={control} className={containerClassName}>
      <UIInput {...props} />
    </FormField>
  );
};
