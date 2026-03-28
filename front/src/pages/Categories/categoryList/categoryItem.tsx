import type { CategoryItemProps } from '../../../types/categoryTypes';

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-background rounded-lg min-w-0">
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div className="min-w-8 h-8 sm:min-w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm shrink-0">
          {category.description.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-dark text-sm sm:text-base truncate">{category.description}</p>
          <p className="text-xs sm:text-sm text-dark/60">
            {category.purpose}
          </p>
        </div>
      </div>
    </div>
  );
}
