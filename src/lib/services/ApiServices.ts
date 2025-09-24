import { getSession } from "next-auth/react";
import {
  BrandsResponse,
  CategoriesResponse,
  ProductsResponse,
  SingleBrandResponse,
  SingleCategoryResponse,
  SingleProductResponse,
  CartResponse,
  WishlistResponse,
  AddToWishlistResponse,
  RemoveFromWishlistResponse,
  CheckoutAddress,
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
  async updateCartQuantity(productId: string, newCount: number) {
    const headers = await this.getAuthHeaders();
    const res = await fetch(this.baseURL + `api/v1/cart/${productId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ count: newCount }),
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || "Failed to update cart quantity");
    }
    return res.json();
  }

  async removeCartItem(cartItemId: string) {
    const headers = await this.getAuthHeaders();
    const res = await fetch(this.baseURL + `api/v1/cart/${cartItemId}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      console.error("Remove cart item failed:", res.status, errorBody);
      throw new Error(errorBody.message || "Failed to remove cart item");
    }
    return res.json();
  }
  async clearCart(): Promise<CartResponse> {
    const headers = await this.getAuthHeaders();
    const session = await getSession();
    if (!session?.accessToken) throw new Error("Not authenticated");

    const res = await fetch(this.baseURL + "api/v1/cart", {
      method: "DELETE",
      headers,
    });

    if (!res.ok) throw new Error("Failed to clear cart");
    return res.json();
  }
  async addToWishlist(productId: string): Promise<AddToWishlistResponse> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${this.baseURL}api/v1/wishlist`, {
      method: "POST",
      headers,
      body: JSON.stringify({ productId }),
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.message || "Failed to add to wishlist");
    }
    return res.json();
  }

  async removeFromWishlist(
    productId: string
  ): Promise<RemoveFromWishlistResponse> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${this.baseURL}api/v1/wishlist/${productId}`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ productId }),
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.message || "Failed to remove from wishlist");
    }
    return res.json();
  }

  async getUserWishlist(): Promise<WishlistResponse> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${this.baseURL}api/v1/wishlist`, {
      method: "GET",
      headers,
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.message || "Failed to fetch wishlist");
    }
    return res.json();
  }

  async sendResetCode(email: string) {
    const res = await fetch(`${this.baseURL}api/v1/auth/forgotPasswords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to send reset code");
    }

    return res.json();
  }

  async verifyResetCode(email: string, code: string) {
    const res = await fetch(`${this.baseURL}api/v1/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, resetCode: code }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Invalid reset code");
    }

    return res.json();
  }

  async resetPassword(email: string, newPassword: string) {
    const res = await fetch(`${this.baseURL}api/v1/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to reset password");
    }

    return res.json();
  }

  async addUserAddress(address: object) {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${this.baseURL}api/v1/addresses`, {
      method: "POST",
      headers,
      body: JSON.stringify(address),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to add new address");
    }
    console.log(address);
    console.log(res);
    return res.json();
  }
  // Get user addresses
  async getAddresses(): Promise<CheckoutAddress[]> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${this.baseURL}api/v1/addresses`, {
      headers,
    });
    const data = await res.json();
    return data.data;
  }

  async createCashOrder(cartId: string, shippingAddress: object) {
    const headers = await this.getAuthHeaders();
    const res = await fetch(`${this.baseURL}api/v1/orders/${cartId}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ shippingAddress }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create cash order");
    }

    return res.json();
  }

  async createCheckoutSession(
    cartId: string,
    shippingAddress: object,
    returnUrl: string
  ) {
    const headers = await this.getAuthHeaders();
    const res = await fetch(
      `${this.baseURL}api/v1/orders/checkout-session/${cartId}?url=${returnUrl}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ shippingAddress }),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create checkout session");
    }

    return res.json();
  }
}

export const ApiService = new ApiServices();
