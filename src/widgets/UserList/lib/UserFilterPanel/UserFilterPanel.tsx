'use client';

import { type FC, useRef, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AUTH_IS_REQUIRED } from '@/entities/auth';
import { type Branch } from '@/entities/branches';
import { type Course } from '@/entities/courses';
import { type Post } from '@/entities/posts';
import {
  type FilterUsersFormSchema,
  filterUsersAction,
  filterUsersFormSchema,
  transferUserToTabled,
  useTableUserStore,
} from '@/entities/users';
import { useToast } from '@/shared/hooks';
import { Form, Input, LoadingButton, MultiSelect } from '@/shared/ui';

type UserFilterPanelProps = {
  posts: Post[];
  branches: Branch[];
  courses: Course[];
};

export const UserFilterPanel: FC<UserFilterPanelProps> = ({
  posts,
  branches,
  courses,
}) => {
  const postsOptions = posts.map(el => ({
    label: el.name,
    value: JSON.stringify(el),
  }));
  const branchesOptions = branches.map(el => ({
    label: el.name,
    value: JSON.stringify(el),
  }));
  const coursesOptions = courses.map(el => ({
    label: el.name,
    value: JSON.stringify(el),
  }));

  const formRef = useRef<HTMLFormElement>(null);
  const filterUsersForm = useForm<FilterUsersFormSchema>({
    resolver: zodResolver(filterUsersFormSchema),
    defaultValues: {
      name: '',
      posts: [],
      branches: [],
      courses: [],
    },
  });

  const { updateUsers } = useTableUserStore();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { toast } = useToast();

  return (
    <Form
      ref={formRef}
      form={filterUsersForm}
      onSubmit={event => {
        event.preventDefault();
        filterUsersForm.handleSubmit(value => {
          startTransition(async () => {
            const resp = await filterUsersAction(value);

            if (resp.error === AUTH_IS_REQUIRED) {
              toast({
                title: 'Необходима авторизация!',
                variant: 'destructive',
              });
              router.push(`/login?callbackUrl=${location.href}`);
            } else if (resp.error) {
              toast({
                title: 'Что-то пошло не так..',
                description: resp.error,
                variant: 'destructive',
              });
            } else if (resp.users) {
              updateUsers(resp.users.map(user => transferUserToTabled(user)));
            }
          });
        })(event);
      }}
    >
      <div className="flex w-full flex-row">
        <Input
          control={filterUsersForm.control}
          name="name"
          placeholder="ФИО"
          containerClassName="w-64 pr-4"
        />
        <MultiSelect
          control={filterUsersForm.control}
          name="posts"
          placeholder="Должности"
          containerClassName="pr-4"
          options={postsOptions}
          maxCount={2}
        />
        <MultiSelect
          control={filterUsersForm.control}
          name="branches"
          placeholder="Отделение"
          containerClassName="pr-4"
          options={branchesOptions}
          maxCount={2}
        />
        <MultiSelect
          control={filterUsersForm.control}
          name="courses"
          placeholder="Курсы"
          options={coursesOptions}
          maxCount={2}
        />
      </div>
      <LoadingButton loading={isPending}>Filter</LoadingButton>
    </Form>
  );
};
