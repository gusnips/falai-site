import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface CodeViewerProps {
  path: string;
  language: string;
  title: string;
}

export function CodeViewer({ path, language, title }: CodeViewerProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(path)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load example: ${res.statusText}`);
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
        <p>Loading example...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error loading example</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Wrap the code in markdown code block format for syntax highlighting
  const markdownCode = `\`\`\`${language}\n${content}\n\`\`\``;

  return (
    <div className="code-viewer">
      <div className="code-header">
        <h2>{title}</h2>
      </div>
      <div className="code-content">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {markdownCode}
        </ReactMarkdown>
      </div>
    </div>
  );
}
