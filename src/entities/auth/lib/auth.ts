import { type AdapterUser } from '@auth/core/adapters';
import { type JWT } from '@auth/core/jwt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { api } from '@/shared/api';
import { type TokenPair } from '../schema';

declare module '@auth/core/jwt' {
  interface JWT {
    body: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  }
}

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }

  interface Session {
    user: JWT;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV !== 'production',
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const resp = await api.post<TokenPair>('auth/signin', {
          json: {
            email: credentials.email,
            password: credentials.password,
          },
          throwHttpErrors: false,
        });

        if (resp.ok) {
          const data = await resp.json();
          return {
            ...data,
            expiresAt: Math.floor(
              new Date(Date.now() + 1000 * 60 * 30).getTime() / 1000
            ),
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.body = {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
        };
      } else if (Date.now() < token.body.expiresAt * 1000) {
        return token;
      }

      try {
        const data = await api
          .get<TokenPair>('auth/refresh', {
            headers: {
              Authorization: `Bearer ${token.body.refreshToken}`,
            },
          })
          .json();

        return {
          ...token,
          body: {
            ...data,
            expiresAt: Math.floor(
              new Date(Date.now() + 1000 * 60 * 30).getTime() / 1000
            ),
          },
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return null;
      }
    },
    async session({ session, token }) {
      session.user = token as AdapterUser & JWT;

      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
});
