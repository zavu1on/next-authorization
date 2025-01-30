import { z } from 'zod';

export const filterUsersFormSchema = z.object({
  name: z.string().min(0),
  posts: z.array(z.string()),
  branches: z.array(z.string()),
  courses: z.array(z.string()),
});

export type FilterUsersFormSchema = z.infer<typeof filterUsersFormSchema>;
