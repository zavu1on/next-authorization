'use client';

import { type FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import ky, { type HTTPError } from 'ky';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type LoginFormSchema, loginFormSchema } from '@/entities/auth';
import { useToast } from '@/shared/hooks';
import { Card, Form, Input, LoadingButton } from '@/shared/ui';

const signIn = async (data: LoginFormSchema) => {
  return await ky.post('/api/auth/login', {
    json: data,
  });
};

export const LoginForm: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess() {
      toast({
        title: 'Успех!',
        description: 'Вы успешно вошли в систему',
      });

      router.push('/users');
    },
    async onError(error: HTTPError) {
      const resp = await error.response.json<{ message: string }>();
      toast({
        title: 'Что-то пошло не так...',
        description: resp.message,
        variant: 'destructive',
      });
    },
  });

  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (values: LoginFormSchema) => loginMutation.mutate(values);

  return (
    <>
      <Card
        title="Интеграция"
        description="Введите логин и пароль"
        className="w-96"
      >
        <Form form={loginForm} onSubmit={loginForm.handleSubmit(onSubmit)}>
          <Input control={loginForm.control} name="email" label="Логин" />
          <div className="flex flex-row items-end justify-between">
            <Input
              control={loginForm.control}
              containerClassName="w-full mr-4"
              name="password"
              label="Пароль"
              type={isPasswordVisible ? 'text' : 'password'}
            />
            <Image
              src={isPasswordVisible ? '/eye-slash.svg' : '/eye.svg'}
              alt="eye"
              width={28}
              height={28}
              className="mb-3 cursor-pointer"
              onClick={() => setIsPasswordVisible(prev => !prev)}
            />
          </div>
          <LoadingButton loading={loginMutation.isPending} className="mt-4">
            Submit
          </LoadingButton>
        </Form>
      </Card>
    </>
  );
};
