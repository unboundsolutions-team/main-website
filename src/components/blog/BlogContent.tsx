interface BlogContentProps {
  html: string;
  className?: string;
}

const BlogContent = ({ html, className = "" }: BlogContentProps) => (
  <div
    className={`blog-content ${className}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default BlogContent;
