import { useRef, useState } from 'react';
import { HorizontalSections, type HorizontalSectionsHandle } from 'react-horizontal-sections';
import { COMPONENTS, ICONS } from './icons';

const CARDS = [
  {
    name: 'Radix UI',
    glyph: '<path d="M6 3v18M12 3a5 5 0 010 10H6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="16" cy="18" r="2.6" fill="currentColor"/>',
    body: 'Our recommendation. Every block is authored against the Radix UI wrappers first, so this is the most battle-tested path and what most existing Next.js projects run.',
    style: '"style": "radix-vega"',
    link: 'Radix UI blocks'
  },
  {
    name: 'Base UI',
    glyph: '<path d="M9 3v18c5 0 8-4 8-9s-3-9-8-9z" fill="currentColor"/>',
    body: 'Headless components from the MUI team, and now the shadcn/ui default for new projects. Blocks that touch primitive APIs ship a dedicated Base UI build, typechecked against the Base UI wrappers.',
    style: '"style": "base-vega"',
    link: 'Base UI blocks'
  },
  {
    name: 'React Aria',
    tag: 'BETA',
    glyph: '<path d="M6 21V4h6a4 4 0 010 8H8m5 0l5 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    body: "Adobe's accessibility-first React Aria Components. Every block resolves for React Aria; where shadcn's preset is missing a wrapper we ship our own, which is why this one is still in beta.",
    style: '"style": "aria-vega"',
    link: 'React Aria blocks'
  }
];

function Glyph({ markup }: { markup: string }) {
  return <svg viewBox="0 0 24 24" fill="none" dangerouslySetInnerHTML={{ __html: markup }} />;
}

export default function App() {
  const slider = useRef<HorizontalSectionsHandle>(null);
  const [active, setActive] = useState(0);

  return (
    <>
      <header className={`nav${active > 0 ? ' is-stuck' : ''}`}>
        <a className="brand" href="#">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 3v18M9 3v18M14 7v14M19 11v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span>Shadcnblocks.com</span>
        </a>
        <nav className="nav-links">
          {['New', 'Components', 'Blocks', 'Pages', 'Templates', 'Themes', 'Admin Kit', 'Features'].map((item) => (
            <a key={item} href="#">{item}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="btn btn-ghost" href="#">Sign in</a>
          <a className="btn btn-dark" href="#">
            Get All Access
            <span className="dots"><i /><i /><i /></span>
          </a>
        </div>
      </header>

      <HorizontalSections ref={slider} onChange={setActive}>
        <div className="inner hero">
          <a className="pill" href="#">
            <span>139 New Blocks</span><em />
            <span>Sep 29, 2026</span><em />
            <span className="pill-link">Changelog &rsaquo;</span>
          </a>
          <h1>The ultimate block set for<br />Shadcn UI &amp; Tailwind</h1>
          <p className="lede">
            Explore a premium collection of 2150 blocks and 2151 components and 21 templates, custom-built for
            shadcn/ui, Tailwind, and React. Designed and developed by our team these high-quality, interactive, and
            fully responsive components are ready to copy and paste seamlessly into your project or install via the
            Shadcn CLI.
          </p>
          <div className="cta">
            <button type="button" className="btn btn-dark btn-lg" onClick={() => slider.current?.next()}>
              Browse Blocks
            </button>
            <a className="btn btn-outline btn-lg" href="#">Browse Templates</a>
          </div>
        </div>

        <div className="inner primitives">
          <h2>A React UI library for every primitive</h2>
          <p className="lede">
            Shadcnblocks is a React UI library built on shadcn/ui and Tailwind CSS. All 2150 blocks and 2151
            components are React components that work with Next.js, Vite, Astro and Remix, and every one of them is
            published for Radix UI, Base UI and React Aria. Pick the primitive library in <code>components.json</code>{' '}
            and the shadcn CLI installs the matching build.
          </p>
          <div className="cards">
            {CARDS.map((card) => (
              <article className="card" key={card.name}>
                <header>
                  <span className="glyph"><Glyph markup={card.glyph} /></span>
                  <h3>{card.name}</h3>
                  {card.tag && <span className="tag">{card.tag}</span>}
                </header>
                <p>{card.body}</p>
                <code className="snippet">{card.style}</code>
                <a className="card-link" href="#">{card.link} <span>&rarr;</span></a>
              </article>
            ))}
          </div>
          <p className="footnote">
            One block id, three builds. <a href="#">How the registry picks a library</a>
          </p>
        </div>

        <div className="inner components">
          <h2>2151 Shadcn UI Components</h2>
          <p className="lede narrow">
            Browse our collection of Shadcn UI components. Each component is fully documented with installation
            instructions and usage examples.
          </p>
          <div className="grid">
            {COMPONENTS.map(([label, icon]) => (
              <a className="cell" href="#" key={label}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dangerouslySetInnerHTML={{ __html: ICONS[icon] }}
                />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </HorizontalSections>
    </>
  );
}
