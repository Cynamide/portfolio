import { Row, Col } from "antd";
import "./AboutMe.css";
export const AboutMe = () => {
  return (
    <div id="aboutme">
      <Row style={{ marginTop: "clamp(100px, 13vh, 150px)" }}>
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
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="about-heading"
          >
            <b>About Me</b>
          </h1>
          <br />
          <p
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="about-first"
          >
            I completed my Master of Computer Science at North Carolina State University. I have worked on AI products, research software, and network testing infrastructure.
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="about-second"
          >
            I enjoy building AI applications and bringing them to the web. I like learning new concepts and applying them to projects.
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="about-third"
          >
            My projects include work in computer vision, reinforcement learning, and evaluating language models.
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="about-fourth"
          >
            In my free time, I enjoy hitting the gym and going for walks, if not
            these, you'll find me reading a book or playing video games with
            friends
          </p>
        </Col>
        <Col xxl={1} xl={1} lg={7} xs={2} />
        <Col
          data-aos="fade"
          data-aos-delay="500"
          data-aos-once
          xxl={9}
          xl={9}
          lg={9}
          style={{ display: "flex", alignItems: "center" }}
        >
          <section className="main">
            <div className="container">
              <div className="img-container">
                <img className="image" src="profile.webp" alt="Arjit Agarwal" />
              </div>
            </div>
          </section>
        </Col>
        <Col lg={3} xs={2} md={3} sm={3} />
      </Row>
    </div>
  );
};
