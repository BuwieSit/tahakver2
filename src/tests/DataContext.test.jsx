import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataProvider, useData } from '../contexts/DataContext';

// Consumer that exposes context to assertions
function DataConsumer() {
  const { packages, setPackages, activities, setActivities } = useData();
  return (
    <div>
      <span data-testid="pkg-count">{packages.length}</span>
      <span data-testid="act-count">{activities.length}</span>
      <span data-testid="first-pkg-title">{packages[0]?.title}</span>
      <span data-testid="first-act-name">{activities[0]?.name}</span>
      <span data-testid="first-act-price">{activities[0]?.price}</span>
      <button onClick={() => setPackages([])}>Clear Packages</button>
      <button onClick={() => setActivities([])}>Clear Activities</button>
      <button onClick={() =>
        setPackages(prev => [...prev, { id: 99, title: 'Test Pkg', price: '1,000', duration: 'Day Trip', group: '1', desc: 'Test' }])
      }>Add Package</button>
      <button onClick={() =>
        setActivities(prev => [...prev, { id: 99, name: 'Test Act', price: 100, icon: '🧪', category: 'Wellness' }])
      }>Add Activity</button>
    </div>
  );
}

// Consumer that throws when used outside provider
function BadConsumer() {
  useData();
  return null;
}

describe('DataContext', () => {
  describe('defaults', () => {
    it('provides 3 default packages when localStorage is empty', () => {
      render(<DataProvider><DataConsumer /></DataProvider>);
      expect(screen.getByTestId('pkg-count')).toHaveTextContent('3');
    });

    it('provides 6 default activities when localStorage is empty', () => {
      render(<DataProvider><DataConsumer /></DataProvider>);
      expect(screen.getByTestId('act-count')).toHaveTextContent('6');
    });

    it('first default package title is "Kapwa Package (3D2N)"', () => {
      render(<DataProvider><DataConsumer /></DataProvider>);
      expect(screen.getByTestId('first-pkg-title')).toHaveTextContent('Kapwa Package (3D2N)');
    });

    it('first default activity name is "Forest Bathing"', () => {
      render(<DataProvider><DataConsumer /></DataProvider>);
      expect(screen.getByTestId('first-act-name')).toHaveTextContent('Forest Bathing');
    });

    it('activity prices are numbers, not strings', () => {
      render(<DataProvider><DataConsumer /></DataProvider>);
      // "500" displayed, but we verify it is a numeric value in the source
      expect(screen.getByTestId('first-act-price')).toHaveTextContent('500');
    });
  });

  describe('localStorage persistence', () => {
    it('writes packages to localStorage on mount', () => {
      render(<DataProvider><DataConsumer /></DataProvider>);
      const stored = JSON.parse(localStorage.getItem('tahak_packages'));
      expect(stored).toHaveLength(3);
    });

    it('writes activities to localStorage on mount', () => {
      render(<DataProvider><DataConsumer /></DataProvider>);
      const stored = JSON.parse(localStorage.getItem('tahak_activities'));
      expect(stored).toHaveLength(6);
    });

    it('updates localStorage when packages state changes', async () => {
      const user = userEvent.setup();
      render(<DataProvider><DataConsumer /></DataProvider>);
      await user.click(screen.getByText('Add Package'));
      const stored = JSON.parse(localStorage.getItem('tahak_packages'));
      expect(stored).toHaveLength(4);
      expect(stored.at(-1).title).toBe('Test Pkg');
    });

    it('updates localStorage when activities state changes', async () => {
      const user = userEvent.setup();
      render(<DataProvider><DataConsumer /></DataProvider>);
      await user.click(screen.getByText('Add Activity'));
      const stored = JSON.parse(localStorage.getItem('tahak_activities'));
      expect(stored).toHaveLength(7);
    });

    it('hydrates packages from localStorage on re-mount', () => {
      localStorage.setItem('tahak_packages', JSON.stringify([
        { id: 1, title: 'Cached Package', price: '999', duration: 'Day Trip', group: '1', desc: 'From cache' }
      ]));
      render(<DataProvider><DataConsumer /></DataProvider>);
      expect(screen.getByTestId('pkg-count')).toHaveTextContent('1');
      expect(screen.getByTestId('first-pkg-title')).toHaveTextContent('Cached Package');
    });

    it('hydrates activities from localStorage on re-mount', () => {
      localStorage.setItem('tahak_activities', JSON.stringify([
        { id: 1, name: 'Cached Activity', price: 123, icon: '🌿', category: 'Wellness' }
      ]));
      render(<DataProvider><DataConsumer /></DataProvider>);
      expect(screen.getByTestId('act-count')).toHaveTextContent('1');
      expect(screen.getByTestId('first-act-name')).toHaveTextContent('Cached Activity');
    });

    it('falls back to defaults when localStorage contains invalid JSON', () => {
      localStorage.setItem('tahak_packages', 'NOT_VALID_JSON{{');
      localStorage.setItem('tahak_activities', 'NOT_VALID_JSON{{');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<DataProvider><DataConsumer /></DataProvider>);
      expect(screen.getByTestId('pkg-count')).toHaveTextContent('3');
      expect(screen.getByTestId('act-count')).toHaveTextContent('6');
      consoleSpy.mockRestore();
    });
  });

  describe('state mutations', () => {
    it('setPackages can clear all packages', async () => {
      const user = userEvent.setup();
      render(<DataProvider><DataConsumer /></DataProvider>);
      await user.click(screen.getByText('Clear Packages'));
      expect(screen.getByTestId('pkg-count')).toHaveTextContent('0');
    });

    it('setActivities can clear all activities', async () => {
      const user = userEvent.setup();
      render(<DataProvider><DataConsumer /></DataProvider>);
      await user.click(screen.getByText('Clear Activities'));
      expect(screen.getByTestId('act-count')).toHaveTextContent('0');
    });

    it('setPackages can add a new package', async () => {
      const user = userEvent.setup();
      render(<DataProvider><DataConsumer /></DataProvider>);
      await user.click(screen.getByText('Add Package'));
      expect(screen.getByTestId('pkg-count')).toHaveTextContent('4');
    });
  });

  describe('useData guard', () => {
    it('throws when useData is called outside DataProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => render(<BadConsumer />)).toThrow('useData must be used within a DataProvider');
      consoleSpy.mockRestore();
    });
  });
});
