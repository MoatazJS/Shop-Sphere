import { CategoriesResponse } from "../interfaces/interface";

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
}

export const ApiService = new ApiServices();
