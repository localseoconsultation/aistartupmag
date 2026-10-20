import Typography from "@/components/ui/Typography";
import FeaturedBlogListItem from "./FeaturedBlogsListItem";
import { BlogCardProps } from "@/types/blog";
import FeaturedBlogCard from "./FeaturedBlogCard";

type Props = {
  featuedBlogs: BlogCardProps[];
};

const FeaturedBlogs = ({ featuedBlogs }: Props) => {
  const [featuredBlog, ...otherBlogs] = featuedBlogs;

  return (
    <section className="bg-secondary-backgound/60 px-5 py-20 md:px-8 md:py-26 lg:py-36">
      <div className="mb-10 md:mb-12 lg:mb-14">
        <Typography variant="h2">Featured Stories</Typography>
      </div>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,1fr)] xl:gap-12">
        <FeaturedBlogCard {...featuredBlog} />

        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-2 md:gap-x-7 md:gap-y-16 xl:flex xl:flex-col xl:gap-0">
          {otherBlogs.slice(0, 3).map((blog) => (
            <FeaturedBlogListItem key={blog.id} {...blog} />
          ))}

          {otherBlogs.slice(3, 4).map((blog) => (
            <div key={blog.id} className="2xl:hidden 3xl:block">
              <FeaturedBlogListItem {...blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
