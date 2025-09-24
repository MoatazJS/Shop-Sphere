"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ApiService } from "@/lib/services/ApiServices";
import {
  CheckoutCartResponse,
  CheckoutAddress,
  CartProduct,
  AddressFormValues,
} from "@/lib/interfaces/interface";

interface CheckoutFormValues {
  addressId: string;
  paymentMethod: "COD" | "CARD";
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CheckoutCartResponse | null>(null);
  const [addresses, setAddresses] = useState<CheckoutAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);

  const { register, handleSubmit, setValue } = useForm<CheckoutFormValues>();
  const {
    register: registerNewAddress,
    handleSubmit: handleSubmitNewAddress,
    reset: resetNewAddress,
  } = useForm<AddressFormValues>();

  // Fetch cart and addresses on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await ApiService.getUserCart();
        if (cartData?.data) {
          setCart({
            cartId: cartData.cartId,
            totalCartPrice: cartData.data.totalCartPrice,
            products: cartData.data.products.map((p: CartProduct) => ({
              _id: p._id,
              title: p.product.title,
              price: p.price,
              quantity: p.count,
              imageCover: p.product.imageCover,
            })),
          });
        } else {
          setCart({ cartId: "", totalCartPrice: 0, products: [] });
        }

        const addressData = await ApiService.getAddresses();
        setAddresses(addressData || []);
        if (addressData?.length) setValue("addressId", addressData[0]._id);
      } catch (err) {
        alert("Failed to fetch checkout data:" + { err });
        setCart({ cartId: "", totalCartPrice: 0, products: [] });
        setAddresses([]);
      }
    };
    fetchData();
  }, [setValue]);

  // Add new address
  const onSubmitNewAddress: SubmitHandler<AddressFormValues> = async (data) => {
    try {
      await ApiService.addUserAddress(data);
      alert("Address added!");
      resetNewAddress();
      setShowNewAddress(false);

      const updatedAddresses = await ApiService.getAddresses();
      setAddresses(updatedAddresses || []);
      if (updatedAddresses?.length)
        setValue("addressId", updatedAddresses[0]._id);
    } catch (err) {
      alert("Failed to add address." + { err });
    }
  };

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    if (!cart) return;
    setLoading(true);

    const selectedAddress = addresses.find((a) => a._id === data.addressId);
    const shippingAddress = {
      details: selectedAddress?.details || "",
      phone: selectedAddress?.phone || "",
      city: selectedAddress?.city || "",
    };

    try {
      if (data.paymentMethod === "COD") {
        const res = await ApiService.createCashOrder(
          cart.cartId,
          shippingAddress
        );

        alert("✅ Cash order placed successfully!");
        if (res) {
          alert("Checkout completed.");
        }
      } else if (data.paymentMethod === "CARD") {
        const res = await ApiService.createCheckoutSession(
          cart.cartId,
          shippingAddress,
          "http://localhost:3000" // return URL after Stripe
        );

        if (res?.session?.url) {
          window.location.href = res.session.url;
        } else {
          alert("⚠️ Failed to start Stripe payment session.");
        }
      }
    } catch (err) {
      alert("❌ Failed to place order." + { err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl space-y-6"
      >
        {/* Cart Summary */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(cart?.products ?? []).map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.imageCover}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                    width={64}
                    height={64}
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">${item.price}</p>
              </div>
            ))}
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total:</span>
              <span>${cart?.totalCartPrice ?? 0}</span>
            </div>
          </CardContent>
        </Card>

        {/* Address Selection */}
        <Card className="shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Select Delivery Address</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowNewAddress(!showNewAddress)}
            >
              {showNewAddress ? "Cancel" : "Add Address"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              onValueChange={(val: string) => setValue("addressId", val)}
              defaultValue={addresses[0]?._id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Address" />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((addr) => (
                  <SelectItem key={addr._id} value={addr._id}>
                    {addr.name} - {addr.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {showNewAddress && (
              <div className="space-y-2 mt-2">
                {["name", "details", "phone", "city"].map((field) => (
                  <div key={field}>
                    <Label htmlFor={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      id={field}
                      {...registerNewAddress(field as keyof AddressFormValues, {
                        required: true,
                      })}
                      placeholder={
                        field === "name"
                          ? "Home, Work, etc."
                          : field === "phone"
                          ? "01010700700"
                          : field === "city"
                          ? "Giza"
                          : "Address details"
                      }
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleSubmitNewAddress(onSubmitNewAddress)}
                >
                  Add Address
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["COD", "CARD"].map((method) => (
              <div key={method}>
                <Label>
                  <input
                    type="radio"
                    value={method}
                    {...register("paymentMethod")}
                    defaultChecked={method === "COD"}
                  />{" "}
                  {method === "COD" ? "Cash on Delivery" : "Card Payment"}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
}
