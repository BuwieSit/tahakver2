import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Switch from '../components/Switch';

describe('Switch', () => {
  it('renders a Register button', () => {
    render(<Switch />);
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('renders a Login button', () => {
    render(<Switch />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('Register button has value "register"', () => {
    render(<Switch />);
    expect(screen.getByRole('button', { name: /register/i })).toHaveAttribute('value', 'register');
  });

  it('Login button has value "login"', () => {
    render(<Switch />);
    expect(screen.getByRole('button', { name: /login/i })).toHaveAttribute('value', 'login');
  });

  it('Register button always has bg-primary class (active styling is not toggled)', () => {
    render(<Switch />);
    expect(screen.getByRole('button', { name: /register/i }).className).toContain('bg-primary');
  });

  it('Login button does not have bg-primary class', () => {
    render(<Switch />);
    expect(screen.getByRole('button', { name: /login/i }).className).not.toContain('bg-primary');
  });

  it('renders without crashing when onActive prop is not provided', () => {
    render(<Switch />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('accepts onActive prop without crashing (prop is currently unused)', () => {
    const noop = vi.fn();
    render(<Switch onActive={noop} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
    // onActive is never called by the component itself
    expect(noop).not.toHaveBeenCalled();
  });
});
