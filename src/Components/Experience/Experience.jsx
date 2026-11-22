import { Row, Col } from "antd";
import "./Experience.css";

const roles = [
  { company: "QuiverAI", title: "Product Engineer", dates: "Apr 2026 – Jul 2026", notes: ["Built the Explore feed and improved the reliability of long-running AI generation workflows.", "Worked on the SVG renderer, fixing streaming interruptions and style collisions. Optimized the final display stage from 10–15 seconds to nearly instant."] },
  { company: "North Carolina State University", title: "Full Stack Developer", dates: "May 2025 – Apr 2026", notes: ["Built a web platform that brings legacy risk analysis tools together for researchers.", "Created interactive event tree visualizations and added automated tests with Playwright and Jest."] },
  { company: "Ciena", title: "Software Engineering Intern, Co-op", dates: "May 2024 – Dec 2024", notes: ["Built a Python testing framework for throughput and packet-loss checks at up to 200 Gbps.", "Automated deployments and nightly stress tests using Kubernetes, Helm, PostgreSQL and Grafana."] },
  { company: "Bitglaze Technologies", title: "Founding Engineer", dates: "Apr 2021 – Jun 2023", notes: ["Built a no-code MLOps platform with React, TypeScript, Node.js and NestJS for model training and evaluation pipelines.", "Built a Python library that let customers run models they created on the platform."] },
];

export const Experience = () => (
  <div id="experience">
    <Row style={{ marginTop: "clamp(100px, 13vh, 150px)" }}>
      <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
      <Col xxl={6} xl={6} lg={18} xs={20} md={18} sm={18} style={{ textAlign: "left" }}>
        <h1 className="experience-heading" data-aos="fade-up" data-aos-once style={{ borderBottom: "2px solid rgb(168, 164, 164)" }}><b>Experience</b></h1>
      </Col>
    </Row>
    {roles.map((role, index) => (
      <div key={role.company}>
        <Row style={{ marginTop: index === 0 ? "28px" : "64px" }}>
          <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
          <Col xxl={14} xl={14} lg={18} xs={20} md={18} sm={18} style={{ textAlign: "left" }}>
            <h1 className="heading-2" data-aos="fade-up" data-aos-once style={{ textDecoration: "underline", textDecorationColor: "rgb(168, 164, 164)" }}><b>{role.company}</b></h1>
          </Col>
        </Row>
        <Row>
          <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
          <Col xxl={12} xl={12} lg={18} xs={20} md={18} sm={18} style={{ textAlign: "left" }}>
            <h2 className="role-heading" data-aos="fade-up" data-aos-once style={{ fontSize: "1.2rem" }}><b>{role.title}</b></h2>
            <p style={{ color: "rgb(168, 164, 164)" }}>{role.dates}</p>
            <ul data-aos="fade-up" data-aos-once style={{ color: "rgb(168, 164, 164)" }}>{role.notes.map((note) => <li className="list" key={note}>{note}</li>)}</ul>
          </Col>
        </Row>
      </div>
    ))}
  </div>
);
