import { Link } from "react-router-dom";
import contentMetadata from "../content-metadata.json";

export function DocsOverviewPage() {
  return (
    <div className="docs-overview-page">
      <div className="overview-header">
        <h1>Documentation</h1>
        <p>Comprehensive guides and API documentation for @falai/agent</p>
      </div>

      <div className="categories-grid">
        {contentMetadata.docs.map((category) => (
          <div key={category.slug} className="category-card">
            <h2>{category.title}</h2>
            <ul className="category-items">
              {category.items.map((doc) => (
                <li key={doc.slug}>
                  <Link to={`/docs/${category.slug}/${doc.slug}`}>
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}