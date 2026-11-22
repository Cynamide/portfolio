import React, { useEffect } from "react";

import AOS from "aos";

import { Cursor } from "./Components/Cursor/Cursor";
import { Navbar } from "./Components/Navbar/Navbar";
import { Landing } from "./Components/Landing/Landing";
import { AboutMe } from "./Components/AboutMe/AboutMe";
import { TechIKnow } from "./Components/TechIKnow/TechIKnow";
import { Experience } from "./Components/Experience/Experience";
import { Projects } from "./Components/Projects/Projects";
import { Blog } from "./Components/Blog/Blog";
import { MLSystems } from "./Components/Blog/MLSystems";
import { Contact } from "./Components/Contact/Contact";

import "aos/dist/aos.css";
import "./antd.css";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  if (window.location.pathname.replace(/\/$/, "") === "/blog/ml-systems") {
    return <div className="App"><Cursor /><MLSystems /></div>;
  }
  return (
    <div className="App">
      <Cursor />
      <Navbar />
      <Landing />
      <AboutMe />
      <TechIKnow />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
    </div>
  );
}

export default App;
