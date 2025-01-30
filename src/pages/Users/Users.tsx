import { type FC } from 'react';
import { getBranches } from '@/entities/branches';
import { getCourses } from '@/entities/courses';
import { getPosts } from '@/entities/posts';
import { getUsers, transferUserToTabled } from '@/entities/users';
import { UserList } from '@/widgets/UserList';

export const Users: FC = async () => {
  const users = await getUsers('/users');
  const posts = await getPosts('/users');
  const branches = await getBranches('/users');
  const courses = await getCourses('/users');

  return (
    <UserList
      users={users.map(user => transferUserToTabled(user))}
      posts={posts}
      branches={branches}
      courses={courses}
    />
  );
};
