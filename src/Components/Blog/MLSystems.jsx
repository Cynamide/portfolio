import React, { useEffect } from "react";
import { Foundations } from "./Foundations";
import "./Blog.css";

export const MLSystems = () => {
  useEffect(() => {
    document.title = "ML Systems | Arjit Agarwal";
    return () => { document.title = "Arjit Agarwal | Software Engineer"; };
  }, []);
  return (
    <main className="ml-notes-page">
      <div className="ml-notes-wrap">
        <header className="ml-notes-header">
          <a className="ml-home-link" href="/" aria-label="Arjit Agarwal, home">A<span>.</span></a>
          <a className="ml-back-link" href="/#blog">Back to blog</a>
        </header>
        <div className="ml-notes-main">
          <nav className="ml-breadcrumb" aria-label="Breadcrumb"><a href="/#blog">Blog</a><span aria-hidden="true">/</span><span>ML Systems</span></nav>
          <p className="ml-eyebrow">LEARNING NOTES</p>
          <h1>ML Systems<span className="ml-title-dot">.</span></h1>
          <p className="ml-intro">Notes on the concepts behind building machine learning systems.</p>
          <div className="ml-divider" />
          <div className="ml-section-header"><h2>Topics</h2><p>Explore the notes by topic.</p></div>
          <details className="ml-topic" id="foundations">
            <summary className="ml-topic-summary">
              <span className="ml-topic-icon" aria-hidden="true"><span /><span /><span /><span /></span>
              <span className="ml-topic-copy"><strong>Foundations</strong><span>The building blocks of machine learning systems.</span></span>
              <span className="ml-topic-toggle" aria-hidden="true" />
            </summary>
            <div className="ml-topic-content">
              <Foundations />
            </div>
          </details>
        </div>
        <footer className="ml-notes-footer"><span>Arjit Agarwal</span><a href="/#blog">Back to blog</a></footer>
      </div>
    </main>
  );
};
