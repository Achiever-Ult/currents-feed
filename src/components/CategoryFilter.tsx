import { NewsCategory } from '@/types/news';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: NewsCategory[];
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ categories, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={category.active ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap
            ${category.active 
              ? 'bg-gradient-primary text-primary-foreground shadow-primary glow' 
              : 'glass hover:bg-primary/20 hover:border-primary/50 hover:text-primary'
            }
          `}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}