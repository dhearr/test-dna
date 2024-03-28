export interface Artikel {
  title: string;
  urlToImage?: string;
  url: string;
  source: { name: string };
  author?: string;
  publishedAt: string;
  description?: string;
}
