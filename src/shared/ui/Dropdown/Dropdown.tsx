import { type ReactNode } from 'react';
import { type SelectProps } from '@radix-ui/react-select';
import { type Control, type FieldValues } from 'react-hook-form';
import { type FilterItem } from '@/shared/schema';
import {
  type FormChildrenProps,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  UIFormField,
} from '../Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui';

type DropdownProps<Values extends FieldValues> = {
  options: FilterItem[];
  control: Control<Values>;
  containerClassName?: string;
  placeholderText?: string;
} & FormChildrenProps<Values> &
  Omit<SelectProps, 'onValueChange' | 'defaultValue'>;

export const Dropdown = <Values extends FieldValues = FieldValues>({
  options,
  control,
  name,
  label,
  containerClassName,
  placeholderText,
  description,
  ...props
}: DropdownProps<Values>): ReactNode => {
  return (
    <UIFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            {...props}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholderText ?? label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.code} value={option.code.toString()}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
