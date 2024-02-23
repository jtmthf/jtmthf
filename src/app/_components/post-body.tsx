import { ReactNode } from 'react';
import markdownStyles from './markdown-styles.module.css';

type Props = {
  children: ReactNode;
};

export function PostBody({ children }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className={markdownStyles['markdown']}>{children}</div>
    </div>
  );
}
