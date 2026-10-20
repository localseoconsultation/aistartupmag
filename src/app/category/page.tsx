import { allPages } from "@/constant/pages";
import { redirect } from "next/navigation";

const CategoryPage = () => {
  redirect(allPages.blog.url);
};

export default CategoryPage;
