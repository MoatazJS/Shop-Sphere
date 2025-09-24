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
export interface AddtoCartProps {
  productId: string;
  productName: string;
}

export interface CartResponseData {
  products: CartProduct[];
  totalCartPrice: number;
  numOfCartItems: number;
}

export interface GetCartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
export interface CartProduct {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface WishlistItem {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  description?: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
  };
  ratingsAverage?: number;
  id: string;
}

export interface WishlistResponse {
  status: string;
  count: number;
  wdata: WishlistItem[];
}

export interface AddToWishlistResponse {
  status: string;
  message: string;
  data: WishlistItem[];
}

// DELETE /wishlist (remove product) response
export interface RemoveFromWishlistResponse {
  status: string;
  message: string;
  data: WishlistItem[];
}
// Wishlist product brand
export interface WishlistBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Wishlist product category
export interface WishlistCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Wishlist product subcategory
export interface WishlistSubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Wishlist product
export interface WishlistProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: WishlistCategory;
  brand: WishlistBrand;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

// Wishlist API response
export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}
export interface AddressFormValues {
  name: string;
  details: string;
  phone: string;
  city: string;
}
export interface CheckoutProduct {
  _id: string;
  title: string;
  quantity: number;
  price: number;
  imageCover: string;
}

export interface CheckoutAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface CheckoutCartResponse {
  cartId: string;
  products: CheckoutProduct[];
  totalCartPrice: number;
}

export interface PlaceOrderPayload {
  cartId: string;
  addressId: string;
  paymentMethod: "COD" | "CARD"; // adjust if your API supports more
}
