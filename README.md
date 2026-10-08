# react-horizontal-sections

Full-screen sections that slide in **sideways**, one section per scroll gesture. Scrolling down moves the next section in from the right; scrolling up brings the previous one back. Sections always land flush — there is no half-way state.

Works with mouse wheel, trackpad, keyboard, touch swipes and an optional indicator. Below a breakpoint it falls back to ordinary vertical stacking.

## Install

Straight from GitHub — no npm registry account needed:

```bash
npm install github:Choegyel-Norbu/react-horizontal-sections
```

Pin a release tag for stability:

```bash
npm install github:Choegyel-Norbu/react-horizontal-sections#v0.1.0
```

`dist/` is committed, so installing from GitHub needs no build step on your machine.

## Usage

```tsx
import { HorizontalSections } from 'react-horizontal-sections';
import 'react-horizontal-sections/styles.css';

export default function Page() {
  return (
    <HorizontalSections>
      <section>First</section>
      <section>Second</section>
      <section>Third</section>
    </HorizontalSections>
  );
}
```

Each direct child becomes one full-screen section. The stylesheet is required — it carries the layout and the transition.

Next.js App Router works without extra setup; the build ships a `"use client"` directive.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | One element per section |
| `index` | `number` | — | Controlled index; pair with `onChange` |
| `defaultIndex` | `number` | `0` | Starting section when uncontrolled |
| `onChange` | `(index: number) => void` | — | Fires when a section becomes active |
| `duration` | `number` | `950` | Slide duration in ms |
| `easing` | `string` | `cubic-bezier(0.72, 0, 0.18, 1)` | Slide easing |
| `stackBelow` | `number` | `860` | Viewport width (px) under which sections stack vertically |
| `indicator` | `boolean` | `true` | Show the clickable position bars |
| `indicatorLabel` | `(index: number) => string` | `Go to section N` | Accessible label for each indicator button |
| `wheel` | `boolean` | `true` | Advance on wheel / trackpad |
| `keyboard` | `boolean` | `true` | Arrows, Page Up/Down, Space, Home, End |
| `touch` | `boolean` | `true` | Advance on swipe |
| `swipeThreshold` | `number` | `45` | Minimum swipe distance in px |
| `lockBodyScroll` | `boolean` | `true` | Hide page overflow while sections are pinned |
| `reveal` | `boolean` | `true` | Fade and slide each section's content in as it arrives |
| `className` / `style` | — | — | Applied to the root element |

## Imperative control

```tsx
const slider = useRef<HorizontalSectionsHandle>(null);

<button onClick={() => slider.current?.next()}>Next</button>
<HorizontalSections ref={slider}>…</HorizontalSections>
```

The handle exposes `next()`, `prev()`, `goTo(index)` and the current `index`.

## Controlled mode

```tsx
const [index, setIndex] = useState(0);

<HorizontalSections index={index} onChange={setIndex}>…</HorizontalSections>
```

## How the gesture lock works

A scroll gesture is read as a **direction**, not a distance, so one gesture always moves exactly one section. After a step the component ignores further input until the slide has finished *and* wheel events have gone quiet for 160ms. That quiet window matters on trackpads, which keep emitting inertia events after your fingers lift — without it a single flick would skip several sections. The hold is capped at `duration + 600ms` so continuous scrolling can never stall.

## Styling

Every class is prefixed `rhs-`, so you can restyle freely:

`.rhs-root`, `.rhs-viewport`, `.rhs-track`, `.rhs-section`, `.rhs-section__inner`, `.rhs-indicator`, `.rhs-dot`, `.rhs-dot--active`.

Sections carry `data-active="true"` when current. The indicator uses `currentColor`, so set `color` on `.rhs-indicator` to recolor it. To centre section content:

```css
.rhs-section__inner {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Accessibility and caveats

- This component takes over the scroll wheel while it is mounted. Scroll hijacking suits landing pages and presentations; it is a poor fit for long-form reading. Below `stackBelow` it releases the page and stacks normally.
- `prefers-reduced-motion: reduce` drops the slide and the content reveal to near-instant.
- Inactive sections are marked `aria-hidden`; keyboard navigation moves between sections with the arrow keys.
- Section content taller than the viewport is clipped — each section is meant to fit one screen.

## Example

A React demo lives in [`example/`](./example):

```bash
cd example
npm install
npm run dev
```

[`demo/`](./demo) holds the original vanilla HTML/CSS/JS version of the same page — open `demo/index.html` in a browser.

## Developing

```bash
npm install
npm run build     # rebuilds dist/ — commit it, GitHub installs use it directly
npm run typecheck
```

## License

MIT
