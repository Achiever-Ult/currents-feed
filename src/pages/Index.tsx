import { useState } from 'react';
import { useNews } from '@/hooks/useNews';
import { Header } from '@/components/Header';
import { CategoryFilter } from '@/components/CategoryFilter';
import { NewsCard } from '@/components/NewsCard';
import { TrendingSidebar } from '@/components/TrendingSidebar';
import { LoadingGrid } from '@/components/LoadingGrid';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const Index = () => {
  const {
    articles,
    loading,
    error,
    lastUpdated,
    categories,
    searchQuery,
    refreshNews,
    handleCategoryChange,
    handleSearch,
  } = useNews();

  const [showMore, setShowMore] = useState(false);
  const displayedArticles = showMore ? articles : articles.slice(0, 9);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onRefresh={refreshNews}
        lastUpdated={lastUpdated}
        isLoading={loading}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main News Section */}
          <div className="xl:col-span-3 space-y-6">
            {/* Category Filters */}
            <section className="animate-fade-in">
              <h2 className="text-xl font-bold text-foreground mb-4">Categories</h2>
              <CategoryFilter
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />
            </section>

            {/* Error State */}
            {error && (
              <Alert variant="destructive" className="animate-scale-in">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>{error}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshNews}
                    className="ml-4"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {loading && <LoadingGrid />}

            {/* Articles Grid */}
            {!loading && articles.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Latest News</h2>
                  <span className="text-sm text-muted-foreground">
                    {articles.length} article{articles.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedArticles.map((article, index) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {articles.length > 9 && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="glass"
                      onClick={() => setShowMore(!showMore)}
                      className="animate-scale-in"
                    >
                      {showMore ? 'Show Less' : `Load More (${articles.length - 9} remaining)`}
                    </Button>
                  </div>
                )}
              </section>
            )}

            {/* Empty State */}
            {!loading && articles.length === 0 && !error && (
              <div className="text-center py-12 animate-fade-in">
                <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? `No results for "${searchQuery}". Try a different search term.`
                    : 'No articles available for this category.'
                  }
                </p>
                <Button variant="outline" onClick={refreshNews}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh News
                </Button>
              </div>
            )}
          </div>

          {/* Trending Sidebar */}
          <aside className="xl:col-span-1">
            <div className="sticky top-24 space-y-6">
              {!loading && articles.length > 0 && (
                <div className="glass p-6 rounded-2xl border border-border/50 animate-slide-in">
                  <TrendingSidebar articles={articles} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Refresh Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="glow"
          size="icon"
          onClick={refreshNews}
          disabled={loading}
          className="h-12 w-12 rounded-full shadow-lg animate-float"
          title="Refresh News"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default Index;