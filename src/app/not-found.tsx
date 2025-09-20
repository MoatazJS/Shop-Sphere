import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gray-50">
      <div className="max-w-md">
        {/* Icon */}
        <ShoppingBag className="w-20 h-20 text-orange-500 mx-auto mb-6" />

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-2">
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mt-4">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
              Go Home
            </Button>
          </Link>
          <Link href="/products">
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
