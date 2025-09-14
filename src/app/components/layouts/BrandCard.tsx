import { BrandsProps } from "@/lib/interfaces/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function BrandCard({ brands }: BrandsProps) {
  return (
    <div className="mt-10 mb-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {brands.data.map((brand) => (
          <Card
            key={brand._id}
            className="rounded-xl border hover:shadow-xl transition-transform hover:scale-105 bg-gradient-to-b from-orange-100 to-white flex flex-col items-center"
          >
            {/* Image */}
            <div className="relative w-full h-32 flex items-center justify-center ">
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            {/* Details */}
            <CardContent className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-orange-500 capitalize">
                {brand.name}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
