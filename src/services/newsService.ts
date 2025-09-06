import axios from 'axios';
import { NewsArticle } from '@/types/news';

class NewsService {
  private baseURL = 'https://newsapi.org/v2';
  private apiKey = process.env.VITE_NEWS_API_KEY || '';

  // Demo news for when API is not available
  private demoNews: NewsArticle[] = [
    {
      id: '1',
      title: 'Tech Giants Release Revolutionary AI Tools',
      description: 'Major technology companies unveil groundbreaking artificial intelligence tools that promise to transform various industries.',
      content: 'Full article content here...',
      url: 'https://example.com/article1',
      image: '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { name: 'TechCrunch', url: 'https://techcrunch.com' },
      category: 'technology',
      author: 'Tech Reporter'
    },
    {
      id: '2',
      title: 'Global Markets See Significant Upturn',
      description: 'Stock markets worldwide experience unprecedented growth as economic indicators show positive trends.',
      content: 'Full article content here...',
      url: 'https://example.com/article2',
      image: '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { name: 'Bloomberg', url: 'https://bloomberg.com' },
      category: 'business',
      author: 'Financial Analyst'
    },
    {
      id: '3',
      title: 'Breakthrough Discovery in Cancer Research',
      description: 'Scientists at leading research institutions announce a potential breakthrough in cancer treatment methodologies.',
      content: 'Full article content here...',
      url: 'https://example.com/article3',
      image: '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: { name: 'Nature', url: 'https://nature.com' },
      category: 'science',
      author: 'Science Correspondent'
    },
    {
      id: '4',
      title: 'Climate Summit Reaches Historic Agreement',
      description: 'World leaders gather for groundbreaking climate summit, establishing new frameworks for environmental protection.',
      content: 'Full article content here...',
      url: 'https://example.com/article4',
      image: '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      source: { name: 'CNN', url: 'https://cnn.com' },
      category: 'general',
      author: 'Environmental Reporter'
    },
    {
      id: '5',
      title: 'Championship Finals Draw Record Viewership',
      description: 'The most anticipated sporting event of the year attracts billions of viewers worldwide.',
      content: 'Full article content here...',
      url: 'https://example.com/article5',
      image: '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      source: { name: 'ESPN', url: 'https://espn.com' },
      category: 'sports',
      author: 'Sports Journalist'
    },
    {
      id: '6',
      title: 'Space Exploration Milestone Achieved',
      description: 'Private space company successfully launches mission to establish permanent lunar base infrastructure.',
      content: 'Full article content here...',
      url: 'https://example.com/article6',
      image: '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png',
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      source: { name: 'Space News', url: 'https://spacenews.com' },
      category: 'science',
      author: 'Space Correspondent'
    }
  ];

  async getNews(category: string = 'general', query: string = ''): Promise<NewsArticle[]> {
    try {
      // If no API key, return demo data
      if (!this.apiKey) {
        console.log('Using demo news data');
        return this.filterDemoNews(category, query);
      }

      const params: any = {
        apiKey: this.apiKey,
        country: 'us',
        pageSize: 20,
        sortBy: 'publishedAt'
      };

      if (category && category !== 'general') {
        params.category = category;
      }

      if (query) {
        params.q = query;
      }

      const response = await axios.get(`${this.baseURL}/top-headlines`, { params });
      
      return response.data.articles.map((article: any, index: number) => ({
        id: article.url || index.toString(),
        title: article.title || 'No title',
        description: article.description || 'No description available',
        content: article.content || article.description || 'Content not available',
        url: article.url || '#',
        image: article.urlToImage || '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png',
        publishedAt: article.publishedAt || new Date().toISOString(),
        source: {
          name: article.source?.name || 'Unknown Source',
          url: article.source?.url || undefined
        },
        category: category,
        author: article.author || 'Unknown Author'
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      return this.filterDemoNews(category, query);
    }
  }

  private filterDemoNews(category: string, query: string): NewsArticle[] {
    let filtered = this.demoNews;

    if (category && category !== 'general' && category !== 'all') {
      filtered = filtered.filter(article => article.category === category);
    }

    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }

  getDemoNews(): NewsArticle[] {
    return this.demoNews;
  }
}

export const newsService = new NewsService();