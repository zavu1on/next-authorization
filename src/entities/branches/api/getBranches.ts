import { getSessionOrLogin } from '@/entities/auth';
import { api } from '@/shared/api';
import { type Branch } from '../schema';

export const getBranches = async (
  callbackUrl: string = ''
): Promise<Branch[]> => {
  const session = await getSessionOrLogin(callbackUrl);

  return await api
    .get<Branch[]>('branches', {
      headers: {
        Authorization: `Bearer ${session.user.body.accessToken}`,
      },
    })
    .json();
};
