import { getSessionOrLogin } from '@/entities/auth';
import { api } from '@/shared/api';
import { type User } from '../schema';

export const getUsers = async (callbackUrl: string = ''): Promise<User[]> => {
  const session = await getSessionOrLogin(callbackUrl);

  return await api
    .get<User[]>('users', {
      headers: {
        Authorization: `Bearer ${session.user.body.accessToken}`,
      },
    })
    .json();
};
