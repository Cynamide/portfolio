import React, { useEffect, useRef, useState } from "react";
import { Foundations } from "./Foundations";
import { Optimization } from "./Optimization";
import "./Blog.css";

const base = "/blog/ml-systems";
const groups = [
  { title: "Foundations", slug: "foundations", notes: [
    { slug: "getting-started-with-the-roofline", title: "Getting started with the roofline", description: "Use operations and data movement to estimate what limits a workload." },
    { slug: "the-memory-wall", title: "The memory wall", description: "Why more GPU compute does not always mean a faster model." },
    { slug: "prefill-and-decode", title: "Prefill and decode", description: "Why a request places different demands on a GPU." },
    { slug: "kv-cache-and-paged-attention", title: "KV cache and paged attention", description: "How cache size and allocation affect serving." },
  ] },
  { title: "Optimization", slug: "optimization", notes: [
    { slug: "when-the-gpu-waits-for-data", title: "When the GPU waits for data", description: "Find the bottleneck between storage, preprocessing, and compute." },
    { slug: "quantization-and-performance", title: "Quantization and performance", description: "How precision changes memory use and performance." },
  ] },
];
const notes = groups.flatMap(group => group.notes.map(note => ({ ...note, group: group.title, groupSlug: group.slug, href: `${base}/${group.slug}/${note.slug}` })));
const fallback = notes[0];
function noteFromPath() {
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path === base) return fallback;
  return notes.find(note => note.href === path) || null;
}

export const MLSystems = () => {
  const [note, setNote] = useState(noteFromPath);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState({ foundations: true, optimization: true });
  const [fading, setFading] = useState(false);
  const timer = useRef(null);
  const heading = useRef(null);

  useEffect(() => {
    if (window.location.pathname.replace(/\/+$/, "") === base) window.history.replaceState({}, "", fallback.href);
    const onPop = () => { const next = noteFromPath(); clearTimeout(timer.current); setFading(false); setNote(next); if (next) setExpanded(value => ({ ...value, [next.groupSlug]: true })); setDrawerOpen(false); };
    window.addEventListener("popstate", onPop);
    return () => { window.removeEventListener("popstate", onPop); clearTimeout(timer.current); document.title = "Arjit Agarwal | Software Engineer"; };
  }, []);
  useEffect(() => { document.title = `${note ? note.title : "Page not found"} | ML Systems | Arjit Agarwal`; }, [note]);

  const navigate = (event, next) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setDrawerOpen(false);
    if (note?.href === next.href) return;
    clearTimeout(timer.current);
    setFading(true);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => {
      window.history.pushState({}, "", next.href);
      setNote(next);
      setFading(false);
      setExpanded(value => ({ ...value, [next.groupSlug]: true }));
      window.scrollTo({ top: 0, behavior: "auto" });
      if (heading.current) heading.current.focus({ preventScroll: true });
    }, reduce ? 0 : 150);
  };

  return <main className="ml-notes-page ml-reader-page">
    <div className="ml-reader-shell">
      <header className="ml-reader-header">
        <a className="ml-home-link" href="/" aria-label="Arjit Agarwal, home">A<span>.</span></a>
        <a className="ml-reader-brand" href={base} onClick={event => navigate(event, fallback)}>ML Systems <span>Learning notes</span></a>
        <a className="ml-back-link" href="/#blog">Back to blog</a>
      </header>
      <div className="ml-mobile-navigation"><button type="button" className="ml-menu-button" aria-expanded={drawerOpen} aria-controls="ml-sidebar" onClick={() => setDrawerOpen(!drawerOpen)}><span aria-hidden="true">☰</span> {drawerOpen ? "Hide topics" : "Browse topics"}</button><span>{note?.title || "Page not found"}</span></div>
      <div className="ml-reader-layout">
        <aside id="ml-sidebar" className={`ml-reader-sidebar ${drawerOpen ? "is-open" : ""}`} aria-label="ML Systems topics">
          <p className="ml-sidebar-label">EXPLORE THE NOTES</p>
          <nav aria-label="Notes by topic">{groups.map(group => <div className="ml-nav-group" key={group.slug}>
            <button type="button" className="ml-group-toggle" aria-expanded={expanded[group.slug]} onClick={() => setExpanded(value => ({ ...value, [group.slug]: !value[group.slug] }))}>{group.title}<span aria-hidden="true" className={expanded[group.slug] ? "expanded" : ""}>⌄</span></button>
            {expanded[group.slug] && <ul>{group.notes.map(item => { const target = notes.find(n => n.slug === item.slug); return <li key={item.slug}><a href={target.href} aria-current={note?.slug === item.slug ? "page" : undefined} onClick={event => navigate(event, target)}>{item.title}</a></li>; })}</ul>}
          </div>)}</nav>
          <a className="ml-sidebar-home" href="/#blog">← All blog notes</a>
        </aside>
        <div className={`ml-reading-pane ${fading ? "is-fading" : ""}`}>
          <div className="ml-reading-breadcrumb"><a href="/#blog">Blog</a><span aria-hidden="true">/</span><a href={base} onClick={event => navigate(event, fallback)}>ML Systems</a>{note && <><span aria-hidden="true">/</span><span>{note.group}</span></>}</div>
          <p className="ml-reading-eyebrow">{note ? note.group.toUpperCase() : "ML SYSTEMS"}</p>
          <h1 ref={heading} tabIndex="-1" className="ml-reading-title">{note?.title || "Page not found"}<span>.</span></h1>
          {note ? <><p className="ml-reading-description">{note.description}</p><div className="ml-reading-rule" /><div className="ml-reader-content"><Foundations selected={note.slug} /><Optimization selected={note.slug} /></div></> : <p className="ml-reading-description">This note could not be found. Choose a topic from the navigation to continue.</p>}
          {note && <nav className="ml-note-pagination" aria-label="Adjacent notes">{notes.indexOf(note) > 0 && <a href={notes[notes.indexOf(note)-1].href} onClick={event => navigate(event, notes[notes.indexOf(note)-1])}><span>PREVIOUS</span><strong>{notes[notes.indexOf(note)-1].title}</strong></a>}{notes.indexOf(note) < notes.length-1 && <a href={notes[notes.indexOf(note)+1].href} onClick={event => navigate(event, notes[notes.indexOf(note)+1])}><span>NEXT</span><strong>{notes[notes.indexOf(note)+1].title}</strong></a>}</nav>}
        </div>
      </div>
      <footer className="ml-reader-footer"><span>Arjit Agarwal</span><a href="/#blog">Back to blog</a></footer>
    </div>
  </main>;
};
