import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";

type BlogContentProps = {
  content: SerializedEditorState | null | undefined;
};

const BlogContent = ({ content }: BlogContentProps) => {
  if (!content) return null;

  return (
    <div className="blog-content mx-auto max-w-4xl mt-12 md:mt-16">
      <RichText data={content} />
    </div>
  );
};

export default BlogContent;
