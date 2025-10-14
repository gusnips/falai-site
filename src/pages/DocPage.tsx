import { useParams, Navigate } from "react-router-dom";
import { MarkdownViewer } from "../components/MarkdownViewer";
import contentMetadata from "../content-metadata.json";

export function DocPage() {
  const { slug } = useParams<{ slug: string }>();

  const doc = contentMetadata.docs.find((d) => d.slug === slug);

  if (!doc) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="doc-page">
      <MarkdownViewer path={doc.path} />
    </div>
  );
}
