export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface CategoriesResponse {
  results: number;
  metadata: Metadata;
  data: Category[];
}

export interface CategorySectionProps {
  categories: CategoriesResponse;
}

export interface SingleCategoryResponse {
  data: Category;
}
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Product {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  id: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; // sometimes optional
}

export interface ProductsResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface ProductsProps {
  products: ProductsResponse;
}
