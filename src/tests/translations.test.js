import { describe, it, expect } from 'vitest';
import { translations } from '../contexts/translations';

const LOCALES = ['EN', 'UK', 'FR', 'KO', 'JA'];
const REQUIRED_KEYS = ['home', 'ourStory', 'packages', 'create', 'partners', 'faqs', 'signIn'];

describe('translations', () => {
  it('exports all five locale codes', () => {
    LOCALES.forEach(code => {
      expect(translations).toHaveProperty(code);
    });
  });

  it.each(LOCALES)('locale %s contains every required key', (locale) => {
    REQUIRED_KEYS.forEach(key => {
      expect(translations[locale]).toHaveProperty(key);
      expect(typeof translations[locale][key]).toBe('string');
      expect(translations[locale][key].length).toBeGreaterThan(0);
    });
  });

  it('EN and UK are identical translations', () => {
    expect(translations.EN).toEqual(translations.UK);
  });

  it('EN signIn is "Sign In"', () => {
    expect(translations.EN.signIn).toBe('Sign In');
  });

  it('FR signIn is "Connexion"', () => {
    expect(translations.FR.signIn).toBe('Connexion');
  });

  it('FR home is "Accueil"', () => {
    expect(translations.FR.home).toBe('Accueil');
  });

  it('KO signIn is "로그인"', () => {
    expect(translations.KO.signIn).toBe('로그인');
  });

  it('JA signIn is "ログイン"', () => {
    expect(translations.JA.signIn).toBe('ログイン');
  });

  it('no locale has an undefined or null value', () => {
    LOCALES.forEach(locale => {
      REQUIRED_KEYS.forEach(key => {
        expect(translations[locale][key]).not.toBeNull();
        expect(translations[locale][key]).not.toBeUndefined();
      });
    });
  });

  it('non-EN locales differ from EN on at least one key', () => {
    const differentLocales = ['FR', 'KO', 'JA'];
    differentLocales.forEach(locale => {
      const differs = REQUIRED_KEYS.some(
        key => translations[locale][key] !== translations.EN[key]
      );
      expect(differs).toBe(true);
    });
  });
});
