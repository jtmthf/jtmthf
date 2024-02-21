import cx from 'clsx';
import markdownStyles from './markdown-styles.module.css';

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={cx(
          'prose lg:prose-xl prose-pre:bg-transparent prose-pre:text-black',
          markdownStyles['markdown'],
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
