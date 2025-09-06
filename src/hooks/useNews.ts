import { useState, useEffect, useCallback } from 'react';
import { NewsArticle, NewsCategory } from '@/types/news';
import { newsService } from '@/services/newsService';

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const categories: NewsCategory[] = [
    { id: 'all', name: 'general', label: 'All', active: true },
    { id: 'technology', name: 'technology', label: 'Technology & Innovation', active: false },
    { id: 'business', name: 'business', label: 'Finance & Economy', active: false },
    { id: 'sports', name: 'sports', label: 'Sports & Competition', active: false },
    { id: 'science', name: 'science', label: 'Science & Research', active: false },
    { id: 'general', name: 'general', label: 'Global Affairs', active: false },
  ];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchNews = useCallback(async (category: string = 'all', query: string = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await newsService.getNews(category === 'all' ? 'general' : category, query);
      setArticles(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      // Set fallback demo data
      setArticles(newsService.getDemoNews());
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshNews = useCallback(() => {
    fetchNews(activeCategory, searchQuery);
  }, [fetchNews, activeCategory, searchQuery]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    fetchNews(categoryId, searchQuery);
  }, [fetchNews, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    fetchNews(activeCategory, query);
  }, [fetchNews, activeCategory]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    articles,
    loading,
    error,
    lastUpdated,
    categories: categories.map(cat => ({ ...cat, active: cat.id === activeCategory })),
    activeCategory,
    searchQuery,
    refreshNews,
    handleCategoryChange,
    handleSearch,
  };
};