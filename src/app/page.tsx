import { CategoriesResponse } from "@/lib/interfaces/interface";
import { CategorySection } from "./components/layouts/category-section";
import Hero from "./components/layouts/hero";
import { ApiService } from "@/lib/services/ApiServices";

const categories: CategoriesResponse = await ApiService.getAllCategories();
export default async function Home() {
  return (
    <>
      <Hero />
      <CategorySection categories={categories} />
    </>
  );
}
