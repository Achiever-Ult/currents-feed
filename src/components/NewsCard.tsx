import { NewsArticle } from '@/types/news';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export function NewsCard({ article, index }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  const handleReadMore = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border/50 card-hover animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/lovable-uploads/53728d8c-5f40-4d63-b647-f14334b87eb2.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        {article.category && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 glass font-medium capitalize"
          >
            {article.category}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold leading-tight text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {article.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{article.source.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Read More Button */}
        <Button 
          onClick={handleReadMore}
          variant="outline"
          size="sm"
          className="w-full glass hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn"
        >
          <span>Read More</span>
          <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}