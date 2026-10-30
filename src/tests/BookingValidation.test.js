import { describe, it, expect } from 'vitest';

/**
 * Pure unit tests for the Booking form's validate() logic.
 * Extracted from src/pages/TouristPages/Booking.jsx so it can be
 * tested independently of React Router and other component dependencies.
 */
function validate(formData) {
  if (!formData.fullName || formData.fullName.length < 3)
    return 'Please enter a valid full name.';
  if (!formData.email.includes('@'))
    return 'Please enter a valid email address.';
  if (!formData.phone || formData.phone.length < 7)
    return 'Please enter a valid phone number.';
  if (!formData.date)
    return 'Please select a travel date.';
  return '';
}

const validData = {
  fullName: 'Juan Dela Cruz',
  email: 'juan@example.com',
  phone: '09171234567',
  date: '2027-01-15',
  guests: '2',
  requests: '',
};

describe('Booking validate()', () => {
  describe('valid data', () => {
    it('returns empty string for fully valid data', () => {
      expect(validate(validData)).toBe('');
    });
  });

  describe('fullName validation', () => {
    it('returns error when fullName is empty', () => {
      expect(validate({ ...validData, fullName: '' }))
        .toBe('Please enter a valid full name.');
    });

    it('returns error when fullName is only 2 characters', () => {
      expect(validate({ ...validData, fullName: 'Jo' }))
        .toBe('Please enter a valid full name.');
    });

    it('passes when fullName is exactly 3 characters', () => {
      expect(validate({ ...validData, fullName: 'Ana' })).toBe('');
    });

    it('returns error when fullName is null', () => {
      expect(validate({ ...validData, fullName: null }))
        .toBe('Please enter a valid full name.');
    });
  });

  describe('email validation', () => {
    it('returns error when email has no @', () => {
      expect(validate({ ...validData, email: 'invalidemail.com' }))
        .toBe('Please enter a valid email address.');
    });

    it('passes when email contains @', () => {
      expect(validate({ ...validData, email: 'a@b' })).toBe('');
    });

    it('returns error when email is empty string', () => {
      expect(validate({ ...validData, email: '' }))
        .toBe('Please enter a valid email address.');
    });
  });

  describe('phone validation', () => {
    it('returns error when phone is empty', () => {
      expect(validate({ ...validData, phone: '' }))
        .toBe('Please enter a valid phone number.');
    });

    it('returns error when phone is only 6 characters', () => {
      expect(validate({ ...validData, phone: '123456' }))
        .toBe('Please enter a valid phone number.');
    });

    it('passes when phone is exactly 7 characters', () => {
      expect(validate({ ...validData, phone: '1234567' })).toBe('');
    });

    it('returns error when phone is null', () => {
      expect(validate({ ...validData, phone: null }))
        .toBe('Please enter a valid phone number.');
    });
  });

  describe('date validation', () => {
    it('returns error when date is empty string', () => {
      expect(validate({ ...validData, date: '' }))
        .toBe('Please select a travel date.');
    });

    it('returns error when date is null', () => {
      expect(validate({ ...validData, date: null }))
        .toBe('Please select a travel date.');
    });

    it('passes when a date string is provided', () => {
      expect(validate({ ...validData, date: '2027-06-01' })).toBe('');
    });
  });

  describe('validation priority order', () => {
    it('reports fullName error before email error', () => {
      expect(validate({ ...validData, fullName: '', email: 'bademail' }))
        .toBe('Please enter a valid full name.');
    });

    it('reports email error before phone error', () => {
      expect(validate({ ...validData, email: 'bademail', phone: '' }))
        .toBe('Please enter a valid email address.');
    });

    it('reports phone error before date error', () => {
      expect(validate({ ...validData, phone: '', date: '' }))
        .toBe('Please enter a valid phone number.');
    });
  });
});
