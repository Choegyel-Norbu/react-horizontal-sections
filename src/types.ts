import type { CSSProperties, ReactNode } from 'react';

export interface HorizontalSectionsHandle {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  index: number;
}

export interface HorizontalSectionsProps {
  children: ReactNode;
  index?: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  duration?: number;
  easing?: string;
  stackBelow?: number;
  indicator?: boolean;
  wheel?: boolean;
  keyboard?: boolean;
  touch?: boolean;
  swipeThreshold?: number;
  lockBodyScroll?: boolean;
  className?: string;
  style?: CSSProperties;
  indicatorLabel?: (index: number) => string;
  reveal?: boolean;
}
