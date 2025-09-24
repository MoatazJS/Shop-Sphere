"use client";

import React, { useEffect, useState } from "react";
import { ApiService } from "@/lib/services/ApiServices";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export default function UserAddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await ApiService.getAddresses();
        setAddresses(data);
      } catch (err) {
        console.error("Failed to load addresses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await ApiService.deleteAddress(id);
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete address. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading addresses...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Addresses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {addresses.length === 0 ? (
              <p className="text-gray-500">No addresses found.</p>
            ) : (
              addresses.map((addr) => (
                <div
                  key={addr._id}
                  className="flex justify-between items-center border p-4 rounded-lg bg-white shadow-sm"
                >
                  <div>
                    <p className="font-semibold">{addr.name}</p>
                    <p className="text-sm text-gray-600">{addr.details}</p>
                    <p className="text-sm text-gray-600">
                      {addr.city} - {addr.phone}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(addr._id)}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Link href="/add-address">
            <Button
              className="bg-orange-500 text-white hover:bg-orange-600"
              variant="outline"
            >
              Add Address
            </Button>
          </Link>
          <Link href="/products">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Go to Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
