import { Link } from "react-router-dom";
import { MarkdownViewer } from "../components/MarkdownViewer";

export function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-content">
          <img src="/logo.png" alt="Falai Agent" className="w-10 h-auto" />
        </div>
        <p className="hero-subtitle">
          Build intelligent, conversational AI agents with TypeScript
        </p>
        <div className="hero-tags">
          <span className="tag">Standalone</span>
          <span className="tag">Strongly-Typed</span>
          <span className="tag">Production-Ready</span>
        </div>
        <div className="hero-actions">
          <a href="#-quick-start" className="btn btn-primary">
            Quick Start
          </a>
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
