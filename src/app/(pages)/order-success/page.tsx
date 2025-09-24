"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const address = searchParams.get("address");
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="max-w-lg w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-green-600 text-2xl">
            🎉 Order Completed Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Delivery Address:</strong> {address}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
