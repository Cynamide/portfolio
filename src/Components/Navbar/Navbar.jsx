import React, { useState } from "react";
import "./Navbar.css";

const links = [
  ["About", "#aboutme"], ["Tech", "#techiknow"], ["Experience", "#experience"],
  ["Projects", "#projects"], ["Blog", "#blog"], ["Contact", "#contact"],
];
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-logo" href="#landing" aria-label="Arjit Agarwal, home" onClick={() => setOpen(false)}>
          <svg id="logo" viewBox="620 380 195 220" aria-hidden="true"><path d="M760.832 545.36H673.28L657.152 590H629.504L702.08 390.416H732.32L804.608 590H776.96L760.832 545.36ZM753.344 524.048L717.056 422.672L680.768 524.048H753.344Z" stroke="white" strokeWidth="1" /></svg>
        </a>
        <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="site-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><span/><span/><span/></button>
        <nav id="site-navigation" className={`site-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="https://links.arjitagarwal.me/resume" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Resume</a>
        </nav>
      </div>
    </header>
  );
};
