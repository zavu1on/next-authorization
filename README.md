# Next-Authorization  

**Next-Authorization** is a modern authentication and authorization solution for Next.js applications, ensuring secure and scalable access management.  

## Features  

- **Secure Authentication**: Uses modern authentication and authorization methods to protect user data.  
- **Scalability**: Easily integrates with various authentication providers and supports extended functionality.  
- **Modern Technologies**: Built with TypeScript, SCSS, and other cutting-edge development tools.  

## Technologies  

- [Next.js](https://nextjs.org/): A React framework with server-side rendering support.  
- [TypeScript](https://www.typescriptlang.org/): A strongly typed programming language that enhances JavaScript.  
- [SCSS](https://sass-lang.com/): A CSS preprocessor for writing structured and maintainable styles.  
- [NextAuth.js](https://next-auth.js.org/): A powerful authentication library for Next.js applications, supporting multiple providers.  

## Installation  

1. **Clone the repository**:

```bash
git clone https://github.com/zavu1on/next-authorization.git
cd next-authorization
```
2. **Install dependencies:**:  
```bash
npm install
# or
yarn install
```
3. **Set up environment variables:**:  
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```
4. **Start the development server:**:  
```bash
npm run dev
# or
yarn dev
```

### Usage

#### Configuring NextAuth

In `pages/api/auth/[...nextauth].ts`, configure the authentication providers. Example setup for Keycloak:
```ts
import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  // Additional settings
});
```

#### Protecting Routes
To secure routes, use the `withAuth` HOC or middleware. Example using middleware:
```ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: ['/protected/:path*'],
};
```