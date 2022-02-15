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
      <Row style={{ marginTop: "13px" }}>
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
              textDecoration: "underline",
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
              website
            </li>
            <li className="list">
              The backend of this website was created with Django-Rest-Framework
              and frontend with ReactJS
            </li>
            <li className="list">
              Support for one user to have multiple scripts executing on the
              server by asynchronously running scripts in the background through
              Celery as task queue and RabbitMQ as the message broker
            </li>
            <li className="list">
              The code to be executed will be shown along with real-time
              terminal output.
            </li>
            <li className="list">
              Websockets were used to achieve this seamless output
            </li>
            <li className="list">
              Built using Python, Django-Rest-Framework, Celery, RabbitMQ,
              ReactJS, MongoDB, Websockets
            </li>
          </ul>
        </Col>
        <Col xxl={7} xl={7} lg={3} xs={2} md={3} sm={3} />
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
                RhythmFlows
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
              textDecoration: "underline",
              textDecorationColor: "rgb(168, 164, 164)",
            }}
          >
            <b>Application Developement Intern</b>
          </h1>
          <ul
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{ color: "rgb(168, 164, 164)" }}
          >
            <li className="list">
              Working at RhythmFlows as a Full Stack Development intern
            </li>
            <li className="list">
              Working on a Client approved project, which will be deployed as a
              Web Applicaion
            </li>
            <li className="list">
              This is being developed using BlazingSQL, Angular, and
              Django-Rest-Framework
            </li>
            <li className="list">
              The Web Application is a Transaction Reconcilation Web
              Application.
            </li>
            <li className="list">
              Users can login and upload a source, for example in the form of a
              CSV File. My automation script generates a table using the data
              the user has provided
            </li>
            <li className="list">
              In the current implementation, the user has to manually input the
              source tables, and has to mark the columns for reconcilation, my
              job is to make the procedure more user friendly.
            </li>
            <li className="list">
              I am in the process of writing a script so that the user can
              upload only the sources and the script will generate the tables as
              well as the reconcilation automatically without any manual
              intereference from the user.
            </li>
            <li className="list">
              To ensure very high performance, I am using BlazingSQL which runs
              queries on the GPU rather than taxing the CPU.
            </li>
          </ul>
        </Col>
        <Col xxl={7} xl={7} lg={3} xs={2} md={3} sm={3} />
      </Row>
    </div>
  );
};
