import { getSessionOrLogin } from '@/entities/auth';
import { api } from '@/shared/api';
import { type Course } from '../schema';

export const getCourses = async (
  callbackUrl: string = ''
): Promise<Course[]> => {
  const session = await getSessionOrLogin(callbackUrl);

  return await api
    .get<Course[]>('courses', {
      headers: {
        Authorization: `Bearer ${session.user.body.accessToken}`,
      },
    })
    .json();
};
