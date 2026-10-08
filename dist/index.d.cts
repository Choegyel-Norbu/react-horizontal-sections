import * as react from 'react';
import { ReactNode, CSSProperties } from 'react';

interface HorizontalSectionsHandle {
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
    index: number;
}
interface HorizontalSectionsProps {
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

declare const HorizontalSections: react.ForwardRefExoticComponent<HorizontalSectionsProps & react.RefAttributes<HorizontalSectionsHandle>>;

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
declare function useStepper(options: StepperOptions): {
    active: number;
    stacked: boolean;
    goTo: (next: number) => void;
    step: (direction: number) => void;
};

export { HorizontalSections, type HorizontalSectionsHandle, type HorizontalSectionsProps, useStepper };
