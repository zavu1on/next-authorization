import { getSessionOrLogin } from '@/entities/auth';
import { api } from '@/shared/api';
import { type Post } from '../schema';

export const getPosts = async (callbackUrl: string = ''): Promise<Post[]> => {
  const session = await getSessionOrLogin(callbackUrl);

  return await api
    .get<Post[]>('posts', {
      headers: {
        Authorization: `Bearer ${session.user.body.accessToken}`,
      },
    })
    .json();
};
