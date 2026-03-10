import { type Author } from './author';

export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  tags?: string[];
  preview?: boolean;
};
