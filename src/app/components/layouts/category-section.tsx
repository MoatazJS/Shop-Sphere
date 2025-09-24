import { Card, CardContent } from "@/components/ui/card";
import { CategorySectionProps } from "@/lib/interfaces/interface";
import Image from "next/image";

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Find exactly what you’re looking for across our diverse range of
          categories.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.data.map((cat) => (
            <Card
              key={cat.name}
              className="hover:shadow-lg transition cursor-pointer"
            >
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="relative w-full h-80 sm:h-52 md:h-80 overflow-hidden rounded-lg">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 font-medium">{cat.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
