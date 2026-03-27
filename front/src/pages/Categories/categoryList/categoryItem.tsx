import type { CategoryItemProps } from '../../../types/categoryTypes';

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="min-w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
          {category.description.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-dark">{category.description}</p>
          <p className="text-sm text-dark">
            {category.purpose}
          </p>
        </div>
      </div>
    </div>
  );
}
