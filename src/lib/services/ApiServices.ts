import {
  CategoriesResponse,
  ProductsResponse,
  SingleCategoryResponse,
} from "../interfaces/interface";

class ApiServices {
  async getAllCategories(): Promise<CategoriesResponse> {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    if (!res) {
      throw new Error("Failed to get categories");
    }
    return res.json();
  }

  async getOneCategory(): Promise<SingleCategoryResponse> {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/{categoryId}`
    );
    if (!res) {
      throw new Error("Failed to fetch category");
    }
    return res.json();
  }

  async getAllProducts(): Promise<ProductsResponse> {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
    if (!res) {
      throw new Error("Failed to get products");
    }
    return res.json();
  }
}

export const ApiService = new ApiServices();
