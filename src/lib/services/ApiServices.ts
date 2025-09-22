import { getSession } from "next-auth/react";
import {
  BrandsResponse,
  CategoriesResponse,
  ProductsResponse,
  SingleBrandResponse,
  SingleCategoryResponse,
  SingleProductResponse,
} from "../interfaces/interface";
import { registerFormValues } from "../validations/authSchemas";

class ApiServices {
  baseURL = "https://ecommerce.routemisr.com/";
  private async getAuthHeaders() {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error("No token found, user not logged in");
    }
    return {
      "Content-Type": "application/json",
      token: session.accessToken,
    };
  }
  async getAllCategories(): Promise<CategoriesResponse> {
    const res = await fetch(this.baseURL + "api/v1/categories");
    if (!res) {
      throw new Error("Failed to get categories");
    }
    return res.json();
  }

  async getOneCategory(categoryId: string): Promise<SingleCategoryResponse> {
    const res = await fetch(this.baseURL + `api/v1/categories/${categoryId}`);
    if (!res) {
      throw new Error("Failed to fetch category");
    }
    return res.json();
  }

  async getAllProducts(): Promise<ProductsResponse> {
    const res = await fetch(this.baseURL + "api/v1/products");
    if (!res) {
      throw new Error("Failed to get products");
    }
    return res.json();
  }

  async getAllBrands(): Promise<BrandsResponse> {
    const res = await fetch(this.baseURL + "api/v1/brands");
    if (!res) {
      throw new Error("Failed to get brands");
    }
    return res.json();
  }

  async getOneProduct(id: string): Promise<SingleProductResponse> {
    const res = await fetch(this.baseURL + `api/v1/products/${id}`);
    if (!res) {
      throw new Error("Failed to get product details");
    }
    return res.json();
  }
  async getSingleBrand(brandId: string): Promise<SingleBrandResponse> {
    const res = await fetch(this.baseURL + `api/v1/brands/${brandId}`);
    if (!res) {
      throw new Error("Failed to get brand details");
    }
    return res.json();
  }
  async LoginApi(email: string, password: string) {
    const res = await fetch(this.baseURL + "api/v1/auth/signin", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      method: "post",
    });
    if (!res) {
      throw new Error("Failed to login");
    }
    return res.json();
  }
  async registerApi(values: registerFormValues) {
    const res = await fetch(this.baseURL + `api/v1/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.username,
        email: values.email,
        password: values.password,
        rePassword: values.repassword,
        phone: values.phone,
      }),
      method: "post",
    });
    if (!res) {
      throw new Error("Failed to register");
    }
    return res.json();
  }
  async addToCart(productId: string) {
    const headers = await this.getAuthHeaders();

    const res = await fetch(this.baseURL + "api/v1/cart", {
      method: "POST",
      headers,
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || "Failed to add to cart");
    }
    return res.json();
  }
  async getUserCart() {
    const headers = await this.getAuthHeaders();

    const res = await fetch(this.baseURL + "api/v1/cart", {
      method: "GET",
      headers: headers,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      console.error("Get user cart failed:", res.status, errorBody);
      throw new Error(errorBody.message || "Failed to get user cart");
    }

    return res.json();
  }
}

export const ApiService = new ApiServices();
