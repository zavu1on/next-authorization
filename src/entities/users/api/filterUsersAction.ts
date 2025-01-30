'use server';

import { HTTPError } from 'ky';
import {
  AUTH_IS_REQUIRED,
  SessionIsNullError,
  getSessionOrThrowError,
} from '@/entities/auth';
import { api } from '@/shared/api';
import { type FilterUsersFormSchema, type User } from '../schema';

type FilterUserActionState = {
  users?: User[];
  error?: string;
};

export const filterUsersAction = async (
  body: FilterUsersFormSchema
): Promise<FilterUserActionState> => {
  try {
    const session = await getSessionOrThrowError();
    const users = await api
      .post<User[]>('users/filter', {
        json: {
          name: body.name,
          posts: body.posts?.map(el => JSON.parse(el)),
          branches: body.branches?.map(el => JSON.parse(el)),
          courses: body.courses?.map(el => JSON.parse(el)),
        },
        headers: {
          Authorization: `Bearer ${session.user.body.accessToken}`,
        },
      })
      .json();

    return { users };
  } catch (error) {
    if (error instanceof HTTPError) {
      const data = await error.response.json<{ message: string }>();
      return {
        error: data.message,
      };
    }
    if (error instanceof SessionIsNullError) {
      return {
        error: AUTH_IS_REQUIRED,
      };
    }

    console.log(error);
    return {
      error: 'Server error',
    };
  }
};
