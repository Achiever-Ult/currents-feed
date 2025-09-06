import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './SearchBar';
import { RefreshCw, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onRefresh: () => void;
  lastUpdated: Date;
  isLoading?: boolean;
}

export function Header({ searchQuery, onSearch, onRefresh, lastUpdated, isLoading }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
              <span className="text-primary-foreground font-bold text-xl">N</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Live NewsHub</h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{format(currentTime, 'HH:mm:ss')}</span>
                </div>
                <span>•</span>
                <span>Updated {format(lastUpdated, 'HH:mm')}</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span>Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-3 flex-1 lg:justify-end">
            <SearchBar
              value={searchQuery}
              onSearch={onSearch}
              placeholder="Search breaking news..."
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="glass hover:bg-primary/20 hover:border-primary/50 hover:text-primary flex-shrink-0"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline ml-2">Refresh</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}