import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MarkdownViewer } from "../components/MarkdownViewer";
import 'animate.css';

export function HomePage() {
  const [heroAnimation, setHeroAnimation] = useState('');
  const [containerAnimation, setContainerAnimation] = useState('');
  const [containerPosition, setContainerPosition] = useState('absolute');
  const [visibility, setVisibility] = useState('hidden');

  useEffect(() => {
    // Após 2s, inicia a animação zoomInUp no hero
    const timer1 = setTimeout(() => {
      setHeroAnimation('animate__zoomInUp');
    }, 2000);

    // Aguarda o fim da primeira animação e inicia a segunda
    const timer2 = setTimeout(() => {
      
      setContainerAnimation('animate__lightSpeedInRight');
      setVisibility('visible');
      const heroContainer = document.getElementById('hero-container');
      heroContainer?.classList.remove('hero-container');

      // Após iniciar a segunda animação, muda para position relative
      setTimeout(() => {
        setContainerPosition('relative');
      }, 100); // Pequeno delay para garantir que a animação começou
    }, 3000); // 2s inicial + ~2s da animação zoomInUp

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="home-page">
      <div className={`min-h-screen hero animate__animated animate__zoomInUp`}>
        <div id="hero=container"
          className={`hero-container animate__animated ${containerAnimation}`}
        >
          <div className="hero-content h-[80vh]">
            <img src="/logo-120.png" alt="Falai Agent" className="" />
          </div>
          <h1 className="text-4xl font-bold text-center font-comfortaa-bold gradient-animated">@falai/agent</h1>
          <p className="hero-subtitle">
            Build intelligent, conversational AI agents with TypeScript
          </p>
          <div className="hero-tags">
            <span className="tag">Standalone</span>
            <span className="tag">Strongly-Typed</span>
            <span className="tag">Production-Ready</span>
          </div>
          <div className="hero-actions">
            <a href="#-quick-start" className="btn gradient-animated">
              Quick Start
            </a>
            <Link to="/docs/getting-started" className="btn btn-secondary">
              Documentation
            </Link>
          </div>
        </div>

      </div>
      <div className="readme-content">
        <MarkdownViewer path="/content/README.md" />
      </div>
    </div>
  );
}
