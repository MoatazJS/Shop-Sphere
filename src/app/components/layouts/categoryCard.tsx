import { CategorySectionProps } from "@/lib/interfaces/interface";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CategoryCard({ categories }: CategorySectionProps) {
  return (
    <div className="mt-10 mb-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.data.map((cat) => (
          <Card
            key={cat._id}
            className="rounded-xl border hover:shadow-xl transition-transform hover:scale-105 bg-gray-100 flex flex-col items-center"
          >
            {/* Image */}
            <div className="relative w-full h-32 flex items-center justify-center ">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Details */}
            <CardContent className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-orange-500 capitalize">
                {cat.name}
              </h3>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Explore More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
