import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CtaButton } from '../components/Button';

describe('CtaButton', () => {
  it('renders children text', () => {
    render(<CtaButton>Book Now</CtaButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Book Now');
  });

  it('renders with default classes (bg-primary present)', () => {
    render(<CtaButton>Click</CtaButton>);
    expect(screen.getByRole('button').className).toContain('bg-primary');
  });

  it('appends additional className when provided', () => {
    render(<CtaButton className="my-custom-class">Click</CtaButton>);
    expect(screen.getByRole('button').className).toContain('my-custom-class');
  });

  it('does not break when className is undefined', () => {
    render(<CtaButton>Click</CtaButton>);
    // className || '' means no crash and class string ends with a space + empty string
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<CtaButton onClick={handleClick}>Click</CtaButton>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when not provided', async () => {
    const user = userEvent.setup();
    // Should not throw if onClick is undefined
    render(<CtaButton>Click</CtaButton>);
    await expect(user.click(screen.getByRole('button'))).resolves.not.toThrow();
  });

  it('renders different children', () => {
    render(<CtaButton>Experience your healing</CtaButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Experience your healing');
  });
});
