import { Button } from '@/components/ui/button';
import { slugifyTag } from '@/lib/api';
import Link from 'next/link';

type Props = {
  tag: string;
};

export function TagChip({ tag }: Props) {
  return (
    <Button variant="outline" size="sm" asChild className="h-7 px-2 text-xs">
      <Link href={`/tags/${slugifyTag(tag)}`}>{tag}</Link>
    </Button>
  );
}
