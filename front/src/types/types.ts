import type { ReactNode } from "react";
import type { UseFormRegister } from "react-hook-form";

export type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export type ErrorListProps = {
  objectName: string;
  onRefresh: () => Promise<void>;
};

export type SubmitButtonProps = {
  loading: boolean;
  isEditing?: boolean;
  entityName: string;
}

export type EditButtonProps = {
  onEdit: (object: any) => void;
};

export type DeleteButtonProps = {
  onDelete: (object: any) => void;
};

export type InputProps = {
  label: string;
  type: 'text' | 'number';
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  maxLength?: number;
  min?: number;
  max?: number;
}

export type SelectInputProps = {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  register?: UseFormRegister<any>;
  name?: string;
}