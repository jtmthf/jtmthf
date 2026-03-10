'use client';

import { Check, Copy } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? '';
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label={copied ? 'Copied!' : 'Copy code'}
        onClick={handleCopy}
        className={cn(
          'absolute top-2 right-2 z-10 size-8',
          'text-muted-foreground hover:text-foreground',
          'opacity-0 transition-opacity',
          'group-hover:opacity-100 focus-visible:opacity-100',
        )}
      >
        {copied ? (
          <Check className="size-4" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
      </Button>
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
