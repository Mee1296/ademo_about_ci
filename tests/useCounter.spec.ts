import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCounter from '../src/hooks/features/homepage/useCounter';

describe('useCounter', () => {
  it('should initialize count to 0 and val to 1', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('should increment count by val', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('should update val and increment by new val', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(5);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(5);
  });

  it('should increment multiple times', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(2);
  });

  it('should set val to negative and increment', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(-3);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(-3);
  });

  it('should set val to 0 and increment (no change)', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(0);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(0);
  });

  it('should update val multiple times and increment by latest val', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(2);
      result.current.setVal(10);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(10);
  });

  it('should not increment if increment is not called', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should allow val to be set back to 1 and increment', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(5);
    });
    act(() => {
      result.current.setVal(1);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });
});