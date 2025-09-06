export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div 
          key={index} 
          className="animate-scale-in bg-gradient-card border border-border/50 rounded-2xl overflow-hidden"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Image Skeleton */}
          <div className="h-48 loading-shimmer" />
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-4 loading-shimmer rounded w-full" />
              <div className="h-4 loading-shimmer rounded w-3/4" />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 loading-shimmer rounded w-full" />
              <div className="h-3 loading-shimmer rounded w-full" />
              <div className="h-3 loading-shimmer rounded w-1/2" />
            </div>
            
            {/* Meta */}
            <div className="flex gap-4">
              <div className="h-3 loading-shimmer rounded w-20" />
              <div className="h-3 loading-shimmer rounded w-16" />
            </div>
            
            {/* Button */}
            <div className="h-9 loading-shimmer rounded-full w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}