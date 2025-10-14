import { Link } from "react-router-dom";
import { MarkdownViewer } from "../components/MarkdownViewer";

export function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>
          <span className="hero-icon">🤖</span>
          @falai/agent
        </h1>
        <p className="hero-subtitle">
          Build intelligent, conversational AI agents with TypeScript
        </p>
        <div className="hero-tags">
          <span className="tag">Standalone</span>
          <span className="tag">Strongly-Typed</span>
          <span className="tag">Production-Ready</span>
        </div>
        <div className="hero-actions">
          <Link to="/#-quick-start" className="btn btn-primary">
            Quick Start
          </Link>
          <Link to="/docs/getting-started" className="btn btn-secondary">
            Documentation
          </Link>
        </div>
      </div>

      <div className="readme-content">
        <MarkdownViewer path="/content/README.md" />
      </div>
    </div>
  );
}
