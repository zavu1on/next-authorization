import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { type Mock, vi } from 'vitest';
import { useToast } from '@/shared/hooks';
import { LoginForm } from './LoginForm';

// Mocks
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('@/shared/hooks', () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}));

describe('LoginForm Component', () => {
  let mockSignIn: Mock;
  let mockRouterPush: Mock;
  let mockToast: Mock;

  beforeEach(() => {
    mockSignIn = vi.mocked(signIn);
    mockRouterPush = vi.mocked(useRouter().push);
    mockToast = vi.mocked(useToast().toast);

    mockSignIn.mockClear();
    mockRouterPush.mockClear();
    mockToast.mockClear();
  });

  it('renders the form correctly', () => {
    render(<LoginForm />);

    expect(screen.getByText('Интеграция')).toBeInTheDocument();
    expect(screen.getByText('Введите логин и пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Логин')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('toggles password visibility on eye icon click', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText('Пароль');
    const eyeIcon = screen.getByAltText('eye');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('validates the form fields', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('handles successful form submission', async () => {
    mockSignIn.mockResolvedValueOnce({ error: null });
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText('Логин'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Пароль'), 'password123');
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Успех!',
      description: 'Вы успешно вошли в систему',
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/users');
  });

  it('handles form submission with an error', async () => {
    mockSignIn.mockResolvedValueOnce({ error: 'User not found' });
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText('Логин'), 'wrong@example.com');
    await userEvent.type(screen.getByLabelText('Пароль'), 'wrongpassword');
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Что-то пошло не так...',
      description: 'Пользователь не найден',
      variant: 'destructive',
    });
  });
});
