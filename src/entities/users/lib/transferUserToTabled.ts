import { type TableUser, type User } from '../schema';

export const transferUserToTabled = (user: User): TableUser => ({
  id: user.id,
  fullName:
    `${user.firstName} ${user.lastName}` +
    (user.patronymic ? ` ${user.patronymic}` : ''),
  postOrRole: user.post?.name ?? user.role,
  branch: user.branch?.name ?? '-',
  course: user.course?.name ?? '-',
  createdAt: user.createdAt,
  lastEntry: user.lastEntry,
});
