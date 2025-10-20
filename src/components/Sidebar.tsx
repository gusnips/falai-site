import { Link, useLocation } from "react-router-dom";
import contentMetadata from "../content-metadata.json";

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };



  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Documentation</h3>
        <nav>
          {contentMetadata.docs.map((category) => (
            <div key={category.slug} className="sidebar-category">
              <h4 className="sidebar-category-title">{category.title}</h4>
              <ul>
                {category.items.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      to={`/docs/${category.slug}/${doc.slug}`}
                      className={isActive(`/docs/${category.slug}/${doc.slug}`) ? "active" : ""}
                    >
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <h3>Examples</h3>
        <nav>
          {contentMetadata.examples.map((category) => (
            <div key={category.slug} className="sidebar-category">
              <h4 className="sidebar-category-title">{category.title}</h4>
              <ul>
                {category.items.map((example) => (
                  <li key={example.slug}>
                    <Link
                      to={`/examples/${category.slug}/${example.slug}`}
                      className={isActive(`/examples/${category.slug}/${example.slug}`) ? "active" : ""}
                    >
                      {example.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
