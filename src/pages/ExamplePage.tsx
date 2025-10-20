import { useParams, Navigate } from "react-router-dom";
import { CodeViewer } from "../components/CodeViewer";
import contentMetadata from "../content-metadata.json";

export function ExamplePage() {
  const { categorySlug, itemSlug } = useParams<{ categorySlug?: string; itemSlug?: string }>();

  // If no category/item specified, redirect to examples overview
  if (!categorySlug || !itemSlug) {
    return <Navigate to="/examples" replace />;
  }

  // Find the category and example
  const category = contentMetadata.examples.find((c) => c.slug === categorySlug);
  const example = category?.items.find((e) => e.slug === itemSlug);

  if (!example || !('language' in example)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="example-page">
      <CodeViewer
        path={example.path}
        language={example.language}
        title={example.title}
      />
    </div>
  );
}
