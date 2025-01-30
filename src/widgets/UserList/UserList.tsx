'use client';

import { type FC, useEffect } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { LogoutButton } from '@/entities/auth';
import { type Branch } from '@/entities/branches';
import { type Course } from '@/entities/courses';
import { type Post } from '@/entities/posts';
import { type TableUser, useTableUserStore } from '@/entities/users';
import {
  dateDisplayFormat,
  dateTimeDisplayFormat,
  dateUtil,
} from '@/shared/lib';
import { DataTable } from '@/shared/ui';
import { UserFilterPanel } from './lib';

type UserListProps = {
  users: TableUser[];
  posts: Post[];
  branches: Branch[];
  courses: Course[];
};

const userTableColumns: ColumnDef<TableUser>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'fullName',
    header: 'Пользователь',
  },
  {
    accessorKey: 'postOrRole',
    header: 'Должность / Роль',
  },
  {
    accessorKey: 'branch',
    header: 'Отделение',
  },
  {
    accessorKey: 'course',
    header: 'Курс',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell(props) {
      const value = props.row.getValue<string>('createdAt');
      return dateUtil(value).format(dateDisplayFormat);
    },
  },
  {
    accessorKey: 'lastEntry',
    header: 'Last Entry',
    cell(props) {
      const value = props.row.getValue<string>('lastEntry');
      return dateUtil(value).format(dateTimeDisplayFormat);
    },
  },
];

export const UserList: FC<UserListProps> = ({
  users: initialUsers,
  posts,
  branches,
  courses,
}) => {
  const { users, updateUsers } = useTableUserStore();

  useEffect(() => {
    updateUsers(initialUsers);
  }, []);

  return (
    <main className="size-full p-4">
      <UserFilterPanel posts={posts} branches={branches} courses={courses} />
      <div className="mt-4">
        <DataTable columns={userTableColumns} data={users} />
      </div>
      <LogoutButton className="mt-6">Logout</LogoutButton>
    </main>
  );
};
