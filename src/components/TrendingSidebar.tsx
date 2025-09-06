import { NewsArticle } from '@/types/news';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TrendingSidebarProps {
  articles: NewsArticle[];
}

export function TrendingSidebar({ articles }: TrendingSidebarProps) {
  const trendingArticles = articles.slice(0, 4);

  const handleReadMore = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary animate-float" />
        <h2 className="text-lg font-bold gradient-text">Trending</h2>
      </div>

      {/* Trending Articles */}
      <div className="space-y-4">
        {trendingArticles.map((article, index) => (
          <div 
            key={article.id}
            className="group relative p-4 rounded-xl bg-gradient-card border border-border/50 card-hover animate-slide-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Article Image */}
            <div className="flex gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-16 w-16 rounded-lg object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png';
                  }}
                />
                <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-2">
                <h3 className="text-sm font-semibold leading-tight text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="truncate">{article.source.name}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
                  </div>
                </div>

                {article.category && (
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                )}
              </div>
            </div>

            {/* Read More Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReadMore(article.url)}
              className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20 hover:text-primary"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}