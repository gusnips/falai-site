import { useParams, Navigate } from "react-router-dom";
import { MarkdownViewer } from "../components/MarkdownViewer";
import contentMetadata from "../content-metadata.json";

export function DocPage() {
  const { categorySlug, itemSlug } = useParams<{ categorySlug?: string; itemSlug?: string }>();

  // If no category/item specified, redirect to docs overview
  if (!categorySlug || !itemSlug) {
    return <Navigate to="/docs" replace />;
  }

  // Find the category and doc
  const category = contentMetadata.docs.find((c) => c.slug === categorySlug);
  const doc = category?.items.find((d) => d.slug === itemSlug);

  if (!doc) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="doc-page">
      <MarkdownViewer path={doc.path} />
    </div>
  );
}
