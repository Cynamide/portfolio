import { Row, Col } from "antd";

import "./Landing.css";
export const Landing = () => {
  return (
    <div id="landing">
      <Row style={{ marginTop: "clamp(70px, 12vh, 130px)" }}>
        <Col xxl={5} xl={5} lg={4} xs={2} md={3} sm={3} />
        <Col
          xxl={16}
          xl={16}
          lg={19}
          xs={20}
          md={18}
          sm={18}
          style={{
            textAlign: "left",
          }}
        >
          <p
            data-aos="fade"
            data-aos-delay="200"
            data-aos-once
            className="welcome-hi"
          >
            Hi, my name is
          </p>
          <p
            data-aos="fade"
            data-aos-delay="600"
            data-aos-once
            className="name"
          >
            <b>Arjit Agarwal.</b>
          </p>
          <p
            data-aos="fade"
            data-aos-delay="1000"
            data-aos-once
            className="short-desc"
          >
            <b>I build Web Applications and AI</b>
          </p>
          <p
            data-aos="fade"
            data-aos-delay="1400"
            data-aos-once
            className="long-desc"
            style={{ color: "rgb(168, 164, 164)" }}
          >
            I build software across the stack, from AI products and developer tools
            <br />
            to platforms that help researchers do their work.
            <br />
            I completed my Master of Computer Science at North Carolina State University.
          </p>
        </Col>
        <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
      </Row>
    </div>
  );
};
