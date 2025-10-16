import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { rehypeGithubSlug } from "../utils/rehype-github-slug";
import "highlight.js/styles/github-dark.css";

interface MarkdownViewerProps {
  path: string;
}

const customComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: ({ href, children, ...props }: any) => {
    if (!href) {
      return <a {...props}>{children}</a>;
    }

    if (href.startsWith("http")) {
      return (
        <a href={href} {...props} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    const slugify = (str: string) => str.toLowerCase().replace(/[_]/g, "-");

    if (href.endsWith(".md")) {
      const slug = slugify(href.replace(/\.md$/, ""));
      return (
        <Link to={`/docs/${slug}`} {...props}>
          {children}
        </Link>
      );
    }

    if (href.endsWith(".ts") || href.endsWith(".prisma")) {
      const slug = slugify(href.replace(/\.(ts|prisma)$/, ""));
      return (
        <Link to={`/examples/${slug}`} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
};

export function MarkdownViewer({ path }: MarkdownViewerProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(path)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load content: ${res.statusText}`);
        }
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [path]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error loading content</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeGithubSlug, rehypeHighlight]}
        components={customComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
