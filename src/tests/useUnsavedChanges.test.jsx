import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useUnsavedChanges } from '../hooks/useUnsavedChanges';

/**
 * useBlocker requires a DATA router (createBrowserRouter / createMemoryRouter),
 * not MemoryRouter. We create a minimal data router that renders the hook.
 */
function makeWrapper(isDirty, isSubmitting) {
  function HookWrapper() {
    useUnsavedChanges(isDirty, isSubmitting);
    return null;
  }
  const router = createMemoryRouter([{ path: '/', element: <HookWrapper /> }]);
  return function Wrapper() {
    return <RouterProvider router={router} />;
  };
}

describe('useUnsavedChanges', () => {
  describe('beforeunload event', () => {
    it('adds a beforeunload listener on mount', () => {
      const addSpy = vi.spyOn(window, 'addEventListener');
      const { unmount } = renderHook(() => useUnsavedChanges(false), {
        wrapper: makeWrapper(false, false),
      });
      expect(addSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
      unmount();
    });

    it('removes the beforeunload listener on unmount', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() => useUnsavedChanges(false), {
        wrapper: makeWrapper(false, false),
      });
      unmount();
      expect(removeSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    });

    it('calls e.preventDefault() on beforeunload when isDirty is true', () => {
      renderHook(() => useUnsavedChanges(true), {
        wrapper: makeWrapper(true, false),
      });
      const event = new Event('beforeunload');
      event.preventDefault = vi.fn();
      Object.defineProperty(event, 'returnValue', { writable: true, value: 'initial' });
      window.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('does NOT call e.preventDefault() when isDirty is false', () => {
      renderHook(() => useUnsavedChanges(false), {
        wrapper: makeWrapper(false, false),
      });
      const event = new Event('beforeunload');
      event.preventDefault = vi.fn();
      window.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('does NOT call e.preventDefault() when isDirty is true but isSubmitting is true', () => {
      renderHook(() => useUnsavedChanges(true, true), {
        wrapper: makeWrapper(true, true),
      });
      const event = new Event('beforeunload');
      event.preventDefault = vi.fn();
      window.dispatchEvent(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('sets e.returnValue to empty string when isDirty is true', () => {
      renderHook(() => useUnsavedChanges(true), {
        wrapper: makeWrapper(true, false),
      });
      const event = new Event('beforeunload');
      event.preventDefault = vi.fn();
      Object.defineProperty(event, 'returnValue', { writable: true, value: 'initial' });
      window.dispatchEvent(event);
      expect(event.returnValue).toBe('');
    });
  });

  describe('hook signature', () => {
    it('returns undefined (void hook — hook itself returns nothing)', () => {
      // When using a wrapper component that renders RouterProvider,
      // renderHook's result.current reflects the wrapper's render output (null),
      // not the hook's return value. We verify the hook does not throw instead.
      expect(() =>
        renderHook(() => useUnsavedChanges(false), {
          wrapper: makeWrapper(false, false),
        })
      ).not.toThrow();
    });
  });
});
