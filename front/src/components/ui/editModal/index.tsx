import type { EditModalProps } from '../../../types/types';

export default function EditModal({ isOpen, onClose, children }: EditModalProps) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div onClick={(e) => e.stopPropagation()} className="p-6 w-[30vw]">
            {children}
        </div>
    </div>
  );
}
