import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

import { CodeBlock } from '@/components/code-block';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        src={props.src!}
        alt={props.alt!}
        width={0}
        height={0}
        sizes="(max-width: 672px) 100vw, 672px"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    ),
    Image,
    pre: (props) => <CodeBlock {...props} />,
    ...components,
  };
}
