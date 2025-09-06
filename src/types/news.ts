export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: {
    name: string;
    url?: string;
  };
  category?: string;
  author?: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  label: string;
  active: boolean;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  status: string;
}