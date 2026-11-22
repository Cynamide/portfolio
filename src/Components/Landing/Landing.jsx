import React from "react";
import "./Landing.css";

export const Landing = () => (
  <section id="landing" className="landing" aria-label="Introduction">
    <div className="landing-inner">
      <div className="landing-copy">
        <p data-aos="fade" data-aos-delay="200" data-aos-once className="welcome-hi">Hi, my name is</p>
        <h1 data-aos="fade" data-aos-delay="400" data-aos-once className="name">Arjit Agarwal.</h1>
        <p data-aos="fade" data-aos-delay="600" data-aos-once className="short-desc">I build Web Applications and AI</p>
        <p data-aos="fade" data-aos-delay="800" data-aos-once className="long-desc">I build software across the stack, from AI products and developer tools to platforms that help researchers do their work. I completed my Master of Computer Science at North Carolina State University.</p>
        <div className="landing-links" data-aos="fade" data-aos-delay="900" data-aos-once><a href="#projects">Explore my projects</a><a href="#contact">Get in touch</a></div>
      </div>
      <div className="landing-photo" data-aos="fade" data-aos-delay="500" data-aos-once><img src="/profile-current.jpeg" alt="Arjit Agarwal standing by the coast" /><span className="photo-caption">SOFTWARE · AI · CURIOSITY</span></div>
    </div>
  </section>
);
