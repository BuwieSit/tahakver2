import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../components/ContactForm';

describe('ContactForm', () => {
  describe('initial render', () => {
    it('renders the heading "Have other inquiries?"', () => {
      render(<ContactForm />);
      expect(screen.getByText(/have other inquiries/i)).toBeInTheDocument();
    });

    it('renders Name, Email, and message inputs', () => {
      render(<ContactForm />);
      expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('How can we help?')).toBeInTheDocument();
    });

    it('renders a "Send Message" submit button initially', () => {
      render(<ContactForm />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('does not show success message initially', () => {
      render(<ContactForm />);
      expect(screen.queryByText(/message sent successfully/i)).not.toBeInTheDocument();
    });
  });

  describe('submission flow', () => {
    // These tests use fireEvent to submit the form (bypasses HTML5 required validation
    // in jsdom) so we can control the fake timer without userEvent interaction delays.

    it('shows "Sending..." on the button immediately after submit', () => {
      vi.useFakeTimers();
      render(<ContactForm />);

      const form = screen.getByPlaceholderText('Your Name').closest('form');
      act(() => { fireEvent.submit(form); });

      expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();

      vi.runAllTimers();
      vi.useRealTimers();
    });

    it('shows success message after the 1500ms timeout', () => {
      vi.useFakeTimers();
      render(<ContactForm />);

      const form = screen.getByPlaceholderText('Your Name').closest('form');
      act(() => { fireEvent.submit(form); });
      act(() => { vi.advanceTimersByTime(1500); });

      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();

      vi.useRealTimers();
    });

    it('hides the form after submission success', () => {
      vi.useFakeTimers();
      render(<ContactForm />);

      const form = screen.getByPlaceholderText('Your Name').closest('form');
      act(() => { fireEvent.submit(form); });
      act(() => { vi.advanceTimersByTime(1500); });

      expect(screen.queryByPlaceholderText('Your Name')).not.toBeInTheDocument();

      vi.useRealTimers();
    });
  });
});
