export interface SellerFormData {
  shopName: string;
  storeName?: string;
  commercialRegisterNumber: string;
  taxCardNumber: string;
  commercialRegisterImage: File | null;
  taxCardImage: File | null;
}

export interface ImageDropzoneProps {
  id: string;
  label: string;
  description?: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  error?: string;
}

export interface RegisterAsSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: SellerFormData) => void;
}
