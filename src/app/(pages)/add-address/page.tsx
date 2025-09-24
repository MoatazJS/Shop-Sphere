"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { AddressFormValues } from "@/lib/interfaces/interface";
import { ApiService } from "@/lib/services/ApiServices";

export default function NewAddressPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<AddressFormValues>();

  const onSubmit: SubmitHandler<AddressFormValues> = async (data) => {
    if (!session) return alert("You must be logged in");

    setLoading(true);
    try {
      await ApiService.addUserAddress(data);
      alert("Address added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to add address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-10 px-4">
      <Card className="w-full max-w-md shadow-lg border border-orange-300">
        <CardHeader className=" text-gray-700">
          <CardTitle className="text-center text-2xl font-bold">
            Add New Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-orange-600 font-medium">
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Home, Work, etc."
                className="border-blue-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <Label htmlFor="details" className="text-orange-600 font-medium">
                Details
              </Label>
              <Input
                id="details"
                {...register("details", { required: "Details are required" })}
                placeholder="Address details"
                className="border-blue-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-orange-600 font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                {...register("phone", { required: "Phone is required" })}
                placeholder="01010700700"
                className="border-blue-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <Label htmlFor="city" className="text-orange-600 font-medium">
                City
              </Label>
              <Input
                id="city"
                {...register("city", { required: "City is required" })}
                placeholder="Alexandria"
                className="border-blue-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Address"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
