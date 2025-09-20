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
  baseURL = "https://ecommerce.routemisr.com/api/v1/";
  async getAllCategories(): Promise<CategoriesResponse> {
    const res = await fetch(this.baseURL + "categories");
    if (!res) {
      throw new Error("Failed to get categories");
    }
    return res.json();
  }

  async getOneCategory(categoryId: string): Promise<SingleCategoryResponse> {
    const res = await fetch(this.baseURL + `categories/${categoryId}`);
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
  async getSingleBrand(brandId: string): Promise<SingleBrandResponse> {
    const res = await fetch(this.baseURL + `brands/${brandId}`);
    if (!res) {
      throw new Error("Failed to get brand details");
    }
    return res.json();
  }
  async LoginApi(email: string, password: string) {
    const res = await fetch(this.baseURL + "auth/signin", {
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
    const res = await fetch(this.baseURL + `auth/signup`, {
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
}

export const ApiService = new ApiServices();
