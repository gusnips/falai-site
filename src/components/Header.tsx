import { Link } from "react-router-dom";
import contentMetadata from "../content-metadata.json";

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">
            @falai/agent
            <span className="version-badge">v{contentMetadata.version}</span>
          </span>
        </Link>
        <nav className="header-nav">
          <Link to="/#-quick-start">Quick Start</Link>
          <Link to="/docs/api-reference">API</Link>
          <Link to="/#-examples">Examples</Link>
          <a
            href="https://github.com/gusnips/falai"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
