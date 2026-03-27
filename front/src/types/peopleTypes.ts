export type Person = {
  id: number;
  name: string;
  age: number;
};

export type PersonData = {
  name: string;
  age: number;
};

export type PersonFormProps = {
  initialValues?: Partial<Person>;
  isEditing?: boolean;
  personId?: number;
  onSuccess?: () => void;
};

export type PersonItemProps = {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (person: Person) => void;
};

export type PersonListProps = object;
