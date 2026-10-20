import BlogCard from "@/components/ui/BlogCard";
import LinkButton from "@/components/ui/LinkButton";
import Typography from "@/components/ui/Typography";
import { allPages } from "@/constant/pages";
import { BlogCardProps } from "@/types/blog";

type Prop = {
  latestBlogs: BlogCardProps[];
}

const LatestPosts = ({latestBlogs}: Prop) => {
  return (
    <section className="px-5 py-20 md:px-8 md:py-26 lg:py-36">
        {/* Header */}
        <div className="mb-10 flex flex-wrap gap-4 items-center justify-between md:mb-12 lg:mb-14">
          <Typography variant="h2">Latest Stories</Typography>
          <LinkButton title="View All Stories" url={allPages.blog.url} variant="default" />
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20">
          {latestBlogs.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
    </section>
  );
};

export default LatestPosts;
