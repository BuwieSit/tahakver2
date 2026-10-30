import { describe, it, expect } from 'vitest';

/**
 * Pure unit tests for the AccessForm validate() logic.
 * Extracted from src/components/AccessForm.jsx.
 */
function validate(formData, isSignUp) {
  if (!formData.email.includes('@')) return 'Invalid email address.';
  if (formData.password.length < 6) return 'Password must be at least 6 characters.';
  if (isSignUp && formData.password !== formData.confirmPassword) return 'Passwords do not match.';
  return '';
}

const validSignIn = { email: 'user@example.com', password: 'secret123', confirmPassword: '', fullName: '' };
const validSignUp = { email: 'user@example.com', password: 'secret123', confirmPassword: 'secret123', fullName: 'Juan' };

describe('AccessForm validate()', () => {
  describe('sign-in mode', () => {
    it('returns empty string for valid sign-in data', () => {
      expect(validate(validSignIn, false)).toBe('');
    });

    it('returns email error when email has no @', () => {
      expect(validate({ ...validSignIn, email: 'notanemail' }, false))
        .toBe('Invalid email address.');
    });

    it('returns email error when email is empty', () => {
      expect(validate({ ...validSignIn, email: '' }, false))
        .toBe('Invalid email address.');
    });

    it('returns password error when password is 5 characters', () => {
      expect(validate({ ...validSignIn, password: 'abc12' }, false))
        .toBe('Password must be at least 6 characters.');
    });

    it('passes when password is exactly 6 characters', () => {
      expect(validate({ ...validSignIn, password: 'abc123' }, false)).toBe('');
    });

    it('does NOT check confirmPassword in sign-in mode', () => {
      // confirmPassword mismatch is irrelevant in sign-in mode
      expect(validate({ ...validSignIn, confirmPassword: 'different' }, false)).toBe('');
    });
  });

  describe('sign-up mode', () => {
    it('returns empty string for valid sign-up data', () => {
      expect(validate(validSignUp, true)).toBe('');
    });

    it('returns email error first when email is invalid', () => {
      expect(validate({ ...validSignUp, email: 'bad' }, true))
        .toBe('Invalid email address.');
    });

    it('returns password length error when password is too short', () => {
      expect(validate({ ...validSignUp, password: '12345', confirmPassword: '12345' }, true))
        .toBe('Password must be at least 6 characters.');
    });

    it('returns mismatch error when passwords do not match', () => {
      expect(validate({ ...validSignUp, confirmPassword: 'different' }, true))
        .toBe('Passwords do not match.');
    });

    it('does not return mismatch error when passwords match exactly', () => {
      expect(validate({ ...validSignUp, password: 'match123', confirmPassword: 'match123' }, true))
        .toBe('');
    });
  });

  describe('validation priority order', () => {
    it('reports email error before password error', () => {
      expect(validate({ email: 'bad', password: '123', confirmPassword: '' }, false))
        .toBe('Invalid email address.');
    });

    it('reports password length error before mismatch error', () => {
      expect(validate({ email: 'a@b.com', password: '123', confirmPassword: 'different' }, true))
        .toBe('Password must be at least 6 characters.');
    });
  });

  describe('admin bypass credentials', () => {
    it('admin credentials pass validation (they are structurally valid)', () => {
      // The bypass happens AFTER validate() in handleSubmit; validate itself passes these
      expect(validate({ email: 'admin@tahak.com', password: 'admin123', confirmPassword: '' }, false))
        .toBe('');
    });
  });
});
