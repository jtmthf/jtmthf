'use client';

import { useEffect, useRef, useState } from 'react';
import { type Heading } from '@/lib/extract-headings';

type Props = {
  headings: Heading[];
};

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const headingElementsRef = useRef<Map<string, IntersectionObserverEntry>>(
    new Map(),
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          headingElementsRef.current.set(entry.target.id, entry);
        }

        const visibleHeadings: IntersectionObserverEntry[] = [];
        for (const entry of headingElementsRef.current.values()) {
          if (entry.isIntersecting) {
            visibleHeadings.push(entry);
          }
        }

        if (visibleHeadings.length > 0) {
          const topmost = visibleHeadings.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: '0px 0px -80% 0px' },
    );

    const ids = headings.map((h) => h.id);
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-sm font-semibold tracking-wide text-foreground uppercase">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.depth === 3 ? '0.75rem' : '0' }}
          >
            <a
              href={`#${heading.id}`}
              className={[
                'block py-0.5 text-sm leading-snug transition-colors duration-150',
                'hover:text-foreground',
                activeId === heading.id
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground',
              ].join(' ')}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
