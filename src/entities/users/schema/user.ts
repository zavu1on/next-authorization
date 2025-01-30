import { type Branch } from '@/entities/branches';
import { type Course } from '@/entities/courses';
import { type Post } from '@/entities/posts';

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  role: string;
  post?: Post;
  branch?: Branch;
  course?: Course;
  createdAt: number;
  lastEntry: number;
};

export type TableUser = {
  id: number;
  fullName: string;
  postOrRole: string;
  branch: string;
  course: string;
  createdAt: number;
  lastEntry: number;
};
