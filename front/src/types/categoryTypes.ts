export const CategoryPurpose = {
  DESPESA: 'Despesa',
  RECEITA: 'Receita',
  AMBAS: 'Ambas'
} as const;

export type CategoryPurpose = typeof CategoryPurpose[keyof typeof CategoryPurpose];

export type Category = {
  id: number;
  description: string;
  purpose: CategoryPurpose;
};

export type CategoryData = {
  description: string;
  purpose: number;
};

export type CategoryFormProps = {
  initialValues?: Partial<Category>;
};

export type CategoryItemProps = {
  category: Category;
};

export type CategoryListProps = object;

export type CategoryContextType = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (category: CategoryData) => Promise<void>;
}