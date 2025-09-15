import {
  BrandsResponse,
  CategoriesResponse,
  ProductsResponse,
  SingleCategoryResponse,
  SingleProductResponse,
} from "../interfaces/interface";

class ApiServices {
  baseURL = "https://ecommerce.routemisr.com/api/v1/";
  async getAllCategories(): Promise<CategoriesResponse> {
    const res = await fetch(this.baseURL + "categories");
    if (!res) {
      throw new Error("Failed to get categories");
    }
    return res.json();
  }

  async getOneCategory(): Promise<SingleCategoryResponse> {
    const res = await fetch(this.baseURL + "categories/{categoryId}");
    if (!res) {
      throw new Error("Failed to fetch category");
    }
    return res.json();
  }

  async getAllProducts(): Promise<ProductsResponse> {
    const res = await fetch(this.baseURL + "products");
    if (!res) {
      throw new Error("Failed to get products");
    }
    return res.json();
  }

  async getAllBrands(): Promise<BrandsResponse> {
    const res = await fetch(this.baseURL + "brands");
    if (!res) {
      throw new Error("Failed to get brands");
    }
    return res.json();
  }

  async getOneProduct(id: string): Promise<SingleProductResponse> {
    const res = await fetch(this.baseURL + `products/${id}`);
    if (!res) {
      throw new Error("Failed to get product details");
    }
    return res.json();
  }
}

export const ApiService = new ApiServices();
