import { Children, forwardRef, useImperativeHandle, type CSSProperties } from 'react';
import { useStepper } from './useStepper';
import type { HorizontalSectionsHandle, HorizontalSectionsProps } from './types';

export const HorizontalSections = forwardRef<HorizontalSectionsHandle, HorizontalSectionsProps>(
  function HorizontalSections(
    {
      children,
      index,
      defaultIndex = 0,
      onChange,
      duration = 950,
      easing = 'cubic-bezier(0.72, 0, 0.18, 1)',
      stackBelow = 860,
      indicator = true,
      wheel = true,
      keyboard = true,
      touch = true,
      swipeThreshold = 45,
      lockBodyScroll = true,
      reveal = true,
      className,
      style,
      indicatorLabel = (i) => `Go to section ${i + 1}`
    },
    ref
  ) {
    const items = Children.toArray(children);
    const count = items.length;

    const { active, stacked, goTo, step } = useStepper({
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
    });

    useImperativeHandle(
      ref,
      () => ({
        index: active,
        goTo,
        next: () => step(1),
        prev: () => step(-1)
      }),
      [active, goTo, step]
    );

    const rootStyle = {
      ...style,
      '--rhs-duration': `${duration}ms`,
      '--rhs-easing': easing
    } as CSSProperties;

    const trackStyle: CSSProperties = stacked
      ? {}
      : {
          width: `${count * 100}%`,
          transform: `translate3d(${-active * (100 / count)}%, 0, 0)`
        };

    return (
      <div
        className={['rhs-root', stacked ? 'rhs-root--stacked' : '', className].filter(Boolean).join(' ')}
        style={rootStyle}
      >
        <div className="rhs-viewport">
          <div className="rhs-track" style={trackStyle}>
            {items.map((child, i) => (
              <section
                key={i}
                className={['rhs-section', reveal ? '' : 'rhs-section--plain'].filter(Boolean).join(' ')}
                style={stacked ? undefined : { flexBasis: `${100 / count}%` }}
                data-active={stacked || i === active}
                aria-hidden={!stacked && i !== active}
              >
                <div className="rhs-section__inner">{child}</div>
              </section>
            ))}
          </div>
        </div>

        {indicator && !stacked && (
          <div className="rhs-indicator">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={['rhs-dot', i === active ? 'rhs-dot--active' : ''].filter(Boolean).join(' ')}
                aria-label={indicatorLabel(i)}
                aria-current={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
