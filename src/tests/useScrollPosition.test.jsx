import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from '../hooks/useScrollPosition';

describe('useScrollPosition', () => {
  beforeEach(() => {
    // Reset window scroll position before each test
    Object.defineProperty(window, 'scrollX', { writable: true, configurable: true, value: 0 });
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
  });

  it('returns { scrollX: 0, scrollY: 0 } on initial mount', () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current.scrollX).toBe(0);
    expect(result.current.scrollY).toBe(0);
  });

  it('updates scrollY when window scroll event fires', () => {
    const { result } = renderHook(() => useScrollPosition());
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 200 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.scrollY).toBe(200);
  });

  it('updates scrollX when window scroll event fires', () => {
    const { result } = renderHook(() => useScrollPosition());
    act(() => {
      Object.defineProperty(window, 'scrollX', { writable: true, configurable: true, value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.scrollX).toBe(100);
  });

  it('removes the scroll event listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollPosition());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('adds a scroll event listener on mount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() => useScrollPosition());
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('returns an object with scrollX and scrollY keys', () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current).toHaveProperty('scrollX');
    expect(result.current).toHaveProperty('scrollY');
  });

  it('reflects multiple scroll events correctly', () => {
    const { result } = renderHook(() => useScrollPosition());
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.scrollY).toBe(100);

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 350 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.scrollY).toBe(350);
  });
});
