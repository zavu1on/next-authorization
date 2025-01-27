import ky from 'ky';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const api = ky.extend({
  prefixUrl: BASE_URL,
});
