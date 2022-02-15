import Layout, { Header } from "antd/lib/layout/layout";
import { Col, Menu, Row } from "antd";
import React, { useEffect, useRef } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const homeRef = useRef(null);
  const techRef = useRef(null);
  const expRef = useRef(null);
  const proRef = useRef(null);
  const conRef = useRef(null);
  const resRef = useRef(null);
  useEffect(() => {
    homeRef.current.props.style["borderBottom"] = "none";
    techRef.current.props.style["borderBottom"] = "none";
    expRef.current.props.style["borderBottom"] = "none";
    proRef.current.props.style["borderBottom"] = "none";
    conRef.current.props.style["borderBottom"] = "none";
    resRef.current.props.style["borderBottom"] = "none";
  }, []);
  const handleHover = (e) => {
    e.target.style.cursor = "none";
    e.target.style.color = "white";
    e.target.style["border-bottom"] = "none";
  };
  return (
    <Layout style={{ backgroundColor: "black" }}>
      <Header>
        <Row style={{ height: "100%", marginTop: "1%" }}>
          <Col xxl={2} xl={2} lg={2} xs={1} md={2} sm={1} />
          <Col xxl={22} xl={22} lg={16} xs={16} md={16} sm={16}>
            <a href="/">
              <svg
                id="logo"
                width="40%"
                height="250"
                viewBox="0 0 1440 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  float: "left",
                  marginTop: "-85px",
                  marginLeft: "-3rem",
                }}
              >
                <path
                  d="M760.832 545.36H673.28L657.152 590H629.504L702.08 390.416H732.32L804.608 590H776.96L760.832 545.36ZM753.344 524.048L717.056 422.672L680.768 524.048H753.344Z"
                  stroke="white"
                  stroke-width="1"
                />
              </svg>
            </a>
            <Menu
              mode="horizontal"
              theme="light"
              style={{
                float: "right",
                width: "60%",
                textAlign: "right",
                backgroundColor: "black",
                border: "none",
              }}
              className="nav"
            >
              <Menu.Item ref={homeRef} className="link" key="home" style={{}}>
                <a
                  style={{ color: "white" }}
                  onMouseOver={handleHover}
                  href="#aboutme"
                >
                  About
                </a>
              </Menu.Item>
              <Menu.Item
                ref={techRef}
                className="link"
                key="techiknow"
                style={{}}
              >
                <a
                  style={{ color: "white" }}
                  onMouseOver={handleHover}
                  href="#techiknow"
                >
                  Tech
                </a>
              </Menu.Item>
              <Menu.Item
                ref={expRef}
                className="link"
                key="experience"
                style={{}}
              >
                <a
                  style={{ color: "white" }}
                  onMouseOver={handleHover}
                  href="#experience"
                >
                  Experience
                </a>
              </Menu.Item>
              <Menu.Item
                ref={proRef}
                className="link"
                key="projects"
                style={{}}
              >
                <a
                  style={{ color: "white" }}
                  onMouseOver={handleHover}
                  href="#projects"
                >
                  Projects
                </a>
              </Menu.Item>
              <Menu.Item ref={conRef} className="link" key="contact" style={{}}>
                <a
                  style={{ color: "white" }}
                  onMouseOver={handleHover}
                  href="#contact"
                >
                  Contact Me
                </a>
              </Menu.Item>
              <Menu.Item ref={resRef} className="link" key="resume" style={{}}>
                <a
                  style={{ color: "white" }}
                  onMouseOver={handleHover}
                  target="_blank"
                  rel="noreferrer"
                  href="https://drive.google.com/file/d/1OGM4pQ47LF2T7cZDHULGugXkUfKuIpML/view"
                >
                  Resume
                </a>
              </Menu.Item>
            </Menu>
          </Col>
          {/* <Col xxl={4} xl={4} lg={4} xs={1} md={2} sm={1} /> */}
        </Row>
      </Header>
    </Layout>
  );
};
