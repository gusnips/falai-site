import { useParams, Navigate } from "react-router-dom";
import { CodeViewer } from "../components/CodeViewer";
import contentMetadata from "../content-metadata.json";

export function ExamplePage() {
  const { slug } = useParams<{ slug: string }>();

  const example = contentMetadata.examples.find((e) => e.slug === slug);

  if (!example) {
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
