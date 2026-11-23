import React from "react";
import { posts } from "../../blog/posts";
import "./Blog.css";

export const Blog = () => (
  <section id="blog" className="blog-section" aria-labelledby="blog-heading">
    <div className="blog-inner">
      <h1 id="blog-heading" className="blog-heading" data-aos="fade-up" data-aos-once><b>Blog</b></h1>
      <p className="blog-intro">Notes on what I’m learning and building.</p>
      <a className="blog-series-card" href="/blog/ml-systems">
        <span className="blog-series-label">LEARNING NOTES</span>
        <span className="blog-series-title">ML Systems</span>
        <span className="blog-series-description">A collection of notes as I explore how machine learning systems are designed and built.</span>
        <span className="blog-series-link">Explore notes <span aria-hidden="true">↗</span></span>
      </a>
      {posts.length > 0 && <div className="blog-posts">{[...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
        <details className="blog-post" key={post.slug} id={`post-${post.slug}`}>
          <summary><span className="blog-post-main"><strong>{post.title}</strong><span>{post.summary}</span></span><time dateTime={post.date}>{post.date}</time></summary>
          <div className="blog-post-content">{post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        </details>
      ))}</div>}
    </div>
  </section>
);
