export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
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
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Brand[];
}
export interface BrandsProps {
  brands: BrandsResponse;
}
export interface ProductDetailsProps {
  params: { id: string };
}

export interface Product {
  sold: number;
  images: string[];
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: [];
  id: string;
}
export interface SingleProductResponse {
  data: Product;
}
export interface SingleBrandResponse {
  data: Brand;
}
