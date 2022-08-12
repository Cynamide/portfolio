import { Row, Col } from "antd";
import "./Experience.css";
export const Experience = () => {
  const handleHover = (e) => {
    e.target.style.cursor = "none";
    e.target.style.color = "rgba(255, 255, 255, 0.85)";
    e.target.style["border-bottom"] = "none";
  };
  return (
    <div id="experience">
      <Row style={{ marginTop: "37vh" }}>
        <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
        <Col
          xxl={6}
          xl={6}
          lg={18}
          xs={20}
          md={18}
          sm={18}
          style={{ textAlign: "left" }}
        >
          <h1
            className="experience-heading"
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{ borderBottom: "2px solid rgb(168, 164, 164)" }}
          >
            <b>Experience</b>
          </h1>
        </Col>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
        <Col
          xxl={5}
          xl={5}
          lg={18}
          xs={10}
          md={18}
          sm={18}
          style={{ textAlign: "left" }}
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{
              textDecoration: "underline",
              textDecorationColor: "rgb(168, 164, 164)",
            }}
            className="heading-1"
          >
            <b>
              <a
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
                href="https://www.ciena.com/"
                target="_blank"
                rel="noreferrer"
                onMouseOver={handleHover}
              >
                Ciena
              </a>
            </b>
          </h1>
        </Col>
        <Col lg={4} />
      </Row>
      <Row>
        <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
        <Col
          xxl={12}
          xl={12}
          lg={18}
          xs={20}
          md={18}
          sm={18}
          style={{ textAlign: "left" }}
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="role-heading"
            style={{
              fontSize: "1.2rem",
              textDecorationColor: "rgb(168, 164, 164)",
            }}
          >
            <b>Summer Intern Python Automation</b>
          </h1>
          <ul
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{ color: "rgb(168, 164, 164)" }}
          >
            <li className="list">
              Created a proof of concept website from scratch where a user can
              login and run python scripts remotely on a device through the
              website using ReactJS and Django. The code to be executed will be
              shown along with real-time terminal output using WebSockets
            </li>
            <li className="list">
              Support for user to have multiple scripts executing on the server
              by asynchronously running scripts in the background through Celery
              as task queue and RabbitMQ as message broker.
            </li>
          </ul>
        </Col>
        <Col xxl={7} xl={7} lg={3} xs={2} md={3} sm={3} />
      </Row>
      <Row style={{ marginTop: "80px" }}>
        <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
        <Col
          xxl={5}
          xl={5}
          lg={18}
          xs={10}
          md={18}
          sm={18}
          style={{ textAlign: "left" }}
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{
              textDecoration: "underline",
              textDecorationColor: "rgb(168, 164, 164)",
            }}
            className="heading-2"
          >
            <b>
              <a
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
                href="https://rhythmflows.com/"
                target="_blank"
                rel="noreferrer"
                onMouseOver={handleHover}
              >
                RhythmFlows Solutions
              </a>
            </b>
          </h1>
        </Col>
        <Col lg={4} />
      </Row>
      <Row>
        <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
        <Col
          xxl={12}
          xl={12}
          lg={18}
          xs={20}
          md={18}
          sm={18}
          style={{ textAlign: "left" }}
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="role-heading"
            style={{
              fontSize: "1.2rem",
              textDecorationColor: "rgb(168, 164, 164)",
            }}
          >
            <b>Software Developer</b>
          </h1>
          <ul
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{ color: "rgb(168, 164, 164)" }}
          >
            <li className="list">
              Worked on file reconciliation system using BlazingSQL which
              executes the ETL phase of workload 20x faster than Apache Spark.
            </li>

            <li className="list">
              Extended the functionality of their OTT platform to send periodic
              emails to over 150,000+ subscribers using Celery Beat.
            </li>
            <li className="list">
              Created a middleware server to handle the requests from different
              sources (XML, JSON), extract useful information and create new
              request for APIs.
            </li>
          </ul>
        </Col>
        <Col xxl={7} xl={7} lg={3} xs={2} md={3} sm={3} />
      </Row>
      <Row style={{ marginTop: "80px" }}>
        <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
        <Col
          xxl={5}
          xl={5}
          lg={18}
          xs={10}
          md={18}
          sm={18}
          style={{ textAlign: "left" }}
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{
              textDecoration: "underline",
              textDecorationColor: "rgb(168, 164, 164)",
            }}
            className="heading-2"
          >
            <b>
              <a
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
                href="https://rhythmflows.com/"
                target="_blank"
                rel="noreferrer"
                onMouseOver={handleHover}
              >
                Bitglaze Technologies
              </a>
            </b>
          </h1>
        </Col>
        <Col lg={4} />
      </Row>
      <Row>
        <Col xxl={5} xl={5} lg={3} xs={2} md={3} sm={3} />
        <Col
          xxl={12}
          xl={12}
          lg={18}
          xs={20}
          md={18}
          sm={18}
          style={{ textAlign: "left" }}
        >
          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="role-heading"
            style={{
              fontSize: "1.2rem",
              textDecorationColor: "rgb(168, 164, 164)",
            }}
          >
            <b>Frontend Developer Intern</b>
          </h1>
          <ul
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{ color: "rgb(168, 164, 164)" }}
          >
            <li className="list">
              Created a React UI component library written in TypeScript using
              TailwindCSS called GlazeUI.
            </li>

            <li className="list">
              The Library contains over 50 UI components and variations and the
              same will be used by upcoming Bitglaze solutions/products.
            </li>
          </ul>
        </Col>
        <Col xxl={7} xl={7} lg={3} xs={2} md={3} sm={3} />
      </Row>
    </div>
  );
};
