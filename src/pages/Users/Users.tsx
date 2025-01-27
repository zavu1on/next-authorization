'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/shared/ui';

export const Users = () => {
  const session = useSession();

  return (
    <main>
      <h1>Users</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button
        variant="destructive"
        onClick={async () => {
          await signOut({
            redirectTo: '/login',
          });
        }}
      >
        Logout
      </Button>
    </main>
  );
};
