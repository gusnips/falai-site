import { Link } from "react-router-dom";
import contentMetadata from "../content-metadata.json";

export function ExamplesOverviewPage() {
  return (
    <div className="examples-overview-page">
      <div className="overview-header">
        <h1>Examples</h1>
        <p>Code examples and practical implementations using @falai/agent</p>
      </div>

      <div className="categories-grid">
        {contentMetadata.examples.map((category) => (
          <div key={category.slug} className="category-card">
            <h2>{category.title}</h2>
            <ul className="category-items">
              {category.items.map((example) => (
                <li key={example.slug}>
                  <Link to={`/examples/${category.slug}/${example.slug}`}>
                    {example.title}
                    {'language' in example && (
                      <span className="language-badge">{example.language}</span>
                    )}
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