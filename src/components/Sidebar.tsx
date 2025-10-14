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
          <ul>
            {contentMetadata.docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  to={`/docs/${doc.slug}`}
                  className={isActive(`/docs/${doc.slug}`) ? "active" : ""}
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-section">
        <h3>Examples</h3>
        <nav>
          <ul>
            {contentMetadata.examples.map((example) => (
              <li key={example.slug}>
                <Link
                  to={`/examples/${example.slug}`}
                  className={
                    isActive(`/examples/${example.slug}`) ? "active" : ""
                  }
                >
                  {example.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
