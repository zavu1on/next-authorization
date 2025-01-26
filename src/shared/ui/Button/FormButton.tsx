'use client';

import { type FC, type Ref } from 'react';
import { useFormStatus } from 'react-dom';
import { LoadingButton } from './LoadingButton';
import { type ButtonProps } from './ui';

type FormButtonProps = ButtonProps & {
  ref?: Ref<HTMLButtonElement>;
};

export const FormButton: FC<FormButtonProps> = props => {
  const { pending } = useFormStatus();

  return <LoadingButton loading={pending} {...props} />;
};
