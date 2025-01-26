import { type FC } from 'react';
import { LoginForm } from '@/features/LoginForm';
import styles from './Login.module.scss';

export const Login: FC = () => {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
};
