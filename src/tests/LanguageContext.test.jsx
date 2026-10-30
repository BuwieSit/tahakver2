import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

// Helper component that surfaces the context values
function LanguageConsumer() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="signIn">{t.signIn}</span>
      <span data-testid="home">{t.home}</span>
      <button onClick={() => setLanguage('FR')}>Switch to FR</button>
      <button onClick={() => setLanguage('KO')}>Switch to KO</button>
      <button onClick={() => setLanguage('JA')}>Switch to JA</button>
    </div>
  );
}

describe('LanguageContext', () => {
  it('defaults to EN language', () => {
    render(<LanguageProvider><LanguageConsumer /></LanguageProvider>);
    expect(screen.getByTestId('language')).toHaveTextContent('EN');
  });

  it('provides correct EN translation for signIn', () => {
    render(<LanguageProvider><LanguageConsumer /></LanguageProvider>);
    expect(screen.getByTestId('signIn')).toHaveTextContent('Sign In');
  });

  it('provides correct EN translation for home', () => {
    render(<LanguageProvider><LanguageConsumer /></LanguageProvider>);
    expect(screen.getByTestId('home')).toHaveTextContent('Home');
  });

  it('switches language to FR and updates translations', async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><LanguageConsumer /></LanguageProvider>);
    await user.click(screen.getByText('Switch to FR'));
    expect(screen.getByTestId('language')).toHaveTextContent('FR');
    expect(screen.getByTestId('signIn')).toHaveTextContent('Connexion');
    expect(screen.getByTestId('home')).toHaveTextContent('Accueil');
  });

  it('switches language to KO and updates translations', async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><LanguageConsumer /></LanguageProvider>);
    await user.click(screen.getByText('Switch to KO'));
    expect(screen.getByTestId('language')).toHaveTextContent('KO');
    expect(screen.getByTestId('signIn')).toHaveTextContent('로그인');
  });

  it('switches language to JA and updates translations', async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><LanguageConsumer /></LanguageProvider>);
    await user.click(screen.getByText('Switch to JA'));
    expect(screen.getByTestId('language')).toHaveTextContent('JA');
    expect(screen.getByTestId('signIn')).toHaveTextContent('ログイン');
  });

  it('t object is re-computed when language changes', async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><LanguageConsumer /></LanguageProvider>);
    expect(screen.getByTestId('signIn')).toHaveTextContent('Sign In');
    await user.click(screen.getByText('Switch to FR'));
    expect(screen.getByTestId('signIn')).toHaveTextContent('Connexion');
  });
});
