import { type Session } from 'next-auth';
import { type NextRequest } from 'next/server';

export type NextRequestWithAuth = NextRequest & { auth: Session };

export function isAuthenticatedRequest(
  request: NextRequest & { auth?: Session }
): request is NextRequestWithAuth {
  return !!request.auth;
}
