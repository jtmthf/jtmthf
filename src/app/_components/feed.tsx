import { Button } from '@/components/ui/button';
import { Rss } from 'lucide-react';

export function Feed() {
  return (
    <Button asChild variant="link" size="icon">
      <a href="/feed">
        <Rss className="h-6 w-6" />
        <span className="sr-only">RSS Feed</span>
      </a>
    </Button>
  );
}
