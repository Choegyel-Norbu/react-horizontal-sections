import { useCallback, useEffect, useRef, useState } from 'react';

interface StepperOptions {
  count: number;
  index?: number;
  defaultIndex: number;
  duration: number;
  stackBelow: number;
  wheel: boolean;
  keyboard: boolean;
  touch: boolean;
  swipeThreshold: number;
  lockBodyScroll: boolean;
  onChange?: (index: number) => void;
}

const QUIET_MS = 160;
const WHEEL_MIN = 6;
const MAX_HOLD_MS = 600;

export function useStepper(options: StepperOptions) {
  const {
    count,
    index,
    defaultIndex,
    duration,
    stackBelow,
    wheel,
    keyboard,
    touch,
    swipeThreshold,
    lockBodyScroll,
    onChange
  } = options;

  const controlled = index !== undefined;
  const [internal, setInternal] = useState(defaultIndex);
  const [stacked, setStacked] = useState(false);

  const active = Math.min(count - 1, Math.max(0, controlled ? index : internal));
  const activeRef = useRef(active);
  activeRef.current = active;

  const locked = useRef(false);
  const lockedAt = useRef(0);
  const release = useRef<ReturnType<typeof setTimeout>>(undefined);
  const touchStart = useRef({ x: 0, y: 0 });
  const stackedRef = useRef(stacked);
  stackedRef.current = stacked;

  const scheduleRelease = useCallback((wait: number) => {
    clearTimeout(release.current);
    release.current = setTimeout(() => {
      locked.current = false;
    }, Math.max(0, wait));
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const target = Math.min(count - 1, Math.max(0, next));
      if (target === activeRef.current) return;
      locked.current = true;
      lockedAt.current = Date.now();
      scheduleRelease(duration);
      if (!controlled) setInternal(target);
      onChange?.(target);
    },
    [controlled, count, duration, onChange, scheduleRelease]
  );

  const step = useCallback((direction: number) => goTo(activeRef.current + direction), [goTo]);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${stackBelow}px)`);
    const sync = () => setStacked(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [stackBelow]);

  useEffect(() => {
    if (stacked || !lockBodyScroll) return;
    const root = document.documentElement;
    const body = document.body;
    const previous = { root: root.style.overflow, body: body.style.overflow };
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous.root;
      body.style.overflow = previous.body;
    };
  }, [stacked, lockBodyScroll]);

  useEffect(() => {
    if (stacked || !wheel) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (locked.current) {
        const elapsed = Date.now() - lockedAt.current;
        scheduleRelease(
          Math.min(Math.max(duration - elapsed, QUIET_MS), Math.max(duration + MAX_HOLD_MS - elapsed, 0))
        );
        return;
      }
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < WHEEL_MIN) return;
      step(delta > 0 ? 1 : -1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [stacked, wheel, duration, step, scheduleRelease]);

  useEffect(() => {
    if (stacked || !keyboard) return;
    const moves: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      PageDown: 1,
      ' ': 1,
      ArrowLeft: -1,
      ArrowUp: -1,
      PageUp: -1
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
        return;
      }
      if (event.key === 'End') {
        event.preventDefault();
        goTo(count - 1);
        return;
      }
      if (!(event.key in moves)) return;
      event.preventDefault();
      if (locked.current) return;
      step(moves[event.key]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stacked, keyboard, count, goTo, step]);

  useEffect(() => {
    if (stacked || !touch) return;
    const onStart = (event: TouchEvent) => {
      touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    };
    const onEnd = (event: TouchEvent) => {
      if (locked.current) return;
      const dx = touchStart.current.x - event.changedTouches[0].clientX;
      const dy = touchStart.current.y - event.changedTouches[0].clientY;
      const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (Math.abs(delta) < swipeThreshold) return;
      step(delta > 0 ? 1 : -1);
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [stacked, touch, swipeThreshold, step]);

  useEffect(() => () => clearTimeout(release.current), []);

  return { active, stacked, goTo, step };
}
