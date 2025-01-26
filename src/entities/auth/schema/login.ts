import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type DBTokenPair = {
  access_token: string;
  refresh_token: string;
};
