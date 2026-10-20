import BlogContent from "./BlogContent";
import BlogPostHero from "./BlogPostHero";
import type { BlogPost as BlogPostData } from "@/types/blogContent";

type BlogPostProps = {
  blog: BlogPostData;
};

const BlogPost = ({ blog }: BlogPostProps) => {
  return (
    <div className="border-b border-border/40 px-5 pt-16 pb-20 md:px-8 md:pt-20 md:pb-26 lg:pt-22 lg:pb-32">
      <BlogPostHero
        title={blog.title}
        categories={blog.categories}
        publishedAt={blog.publishedAt}
        readingTime={blog.readingTime}
        author={blog.author}
        excerpt={blog.excerpt}
        featuredImage={blog.featuredImage}
      />

      <BlogContent content={blog.content}/>
    </div>
  );
};

export default BlogPost;