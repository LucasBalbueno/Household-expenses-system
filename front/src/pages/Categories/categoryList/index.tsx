import type { CategoryListProps } from '../../../types/categoryTypes';
import { useCategoryContext } from '../../../contexts/CategoryContext';
import { LoadingList } from '../../../components/ui/loadingList';
import { ErrorList } from '../../../components/ui/errorList';
import { GenericList } from '../../../components/ui/genericList';
import CategoryItem from './categoryItem';

export default function CategoryList(_: CategoryListProps) {
  const { categories, loading, error, fetchCategories } = useCategoryContext();

  if (loading) {
    return <LoadingList />;
  }

  if (error) {
    return <ErrorList objectName="pessoas" onRefresh={fetchCategories} />;
  }

  return (
    <>
      <GenericList
        objectNameSingular='categoria'
        objectNamePlural='categorias'
        object={categories}
        onRefresh={fetchCategories}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
          />
        ))}
      </GenericList>
    </>
  );
}
