import cx from 'clsx';
import { ReactNode } from 'react';
import markdownStyles from './markdown-styles.module.css';

type Props = {
  children: ReactNode;
};

export function PostBody({ children }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={cx(
          'prose lg:prose-xl prose-pre:bg-transparent prose-pre:text-black',
          markdownStyles['markdown'],
        )}
      >
        {children}
      </div>
    </div>
  );
}
