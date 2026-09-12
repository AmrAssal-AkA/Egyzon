export interface Category {
  _id?: string;
  id?: string;
  categoryName?: string;
  categroyName?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  Products?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryListResponse {
  success: boolean;
  message: string;
  categories?: Category[];

}
