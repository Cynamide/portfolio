import { Row, Col } from "antd";
import "./AboutMe.css";
export const AboutMe = () => {
  return (
    <div id="aboutme">
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
            I am a Third Year Student from Pune Institute of Computer
            Technology, pursuing my B.E in Information Technology
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="about-second"
          >
            I am an aspiring Deep Learning Engineer, I really enjoy building AI
            applications and integrating them with the Web. I'm always eager to
            learn new concepts and apply them in my projects. Currently I am
            actively looking for new internship opportunities
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="about-third"
          >
            I am a dedicated team player, and I get along well with any team
            environment. I do well under pressure which I feel makes me a good
            addition to any team. I also have strong command over Deep Learning
            and the various Technologies associated with it.
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
                <img className="image" src="profile.webp" alt="MyFace" />
              </div>
            </div>
          </section>
        </Col>
        <Col lg={3} xs={2} md={3} sm={3} />
      </Row>
    </div>
  );
};
