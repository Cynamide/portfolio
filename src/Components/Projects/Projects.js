import { Row, Col, Card } from "antd";
import "./Projects.css";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
export const Projects = () => {
  const handleHover = (e) => {
    e.target.style.cursor = "none";
    e.target.style.color = "rgba(255, 255, 255, 0.85)";
    e.target.style["border-bottom"] = "none";
  };

  async function genImage() {
    const model = await tf.loadLayersModel("/tfjs/gan/model.json");
    const noise = tf.randomNormal([1, 1, 1, 128]);
    let image = model.predict(noise);
    image = image.reshape([64, 64, 3]);
    // for (var i in image) {
    //   image[i] = (image[i] + 1) * 0.5 * 255;
    // }
    // image = new Uint8Array(image.buffer);
    setImage(image);
  }

  const [image, setImage] = useState(null);
  useEffect(() => {
    if (image) {
      image.array().then((imageData) => {
        console.log(imageData);
        const canvas = document.querySelector(".canvas");
        const ctx = canvas.getContext("2d");
        for (var i = 0; i < imageData.length; i++) {
          for (var j = 0; j < imageData[i].length; j++) {
            var red = (imageData[j][i][0] + 1) * 0.5 * 255;
            var green = (imageData[j][i][1] + 1) * 0.5 * 255;
            var blue = (imageData[j][i][2] + 1) * 0.5 * 255;
            ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
            ctx.fillRect(i, j, 1, 1);
          }
        }
      });
    }
  }, [image]);

  return (
    <div id="projects">
      <Row style={{ marginTop: "37vh" }}>
        <Col xxl={3} xl={3} lg={3} xs={2} md={3} sm={3} />
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
            className="projects-heading"
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            style={{
              borderBottom: "2px solid rgb(168, 164, 164)",
              margin: "5%",
            }}
          >
            <b>Projects</b>
          </h1>
        </Col>
      </Row>
      <Row style={{ marginTop: "13px" }}>
        <Col xxl={3} xl={3} lg={4} xs={2} md={3} sm={3} />
        <Col xxl={6} xl={6} lg={16} xs={20} md={18} sm={18}>
          <Card
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="card-1"
            style={{ margin: "3%", height: "95%" }}
            bodyStyle={{ backgroundColor: "#141414" }}
            bordered={false}
            hoverable={true}
            title="Customer Detection"
            extra={
              <a
                onMouseOver={handleHover}
                style={{ color: "white" }}
                href="https://github.com/Cynamide/customer_detection"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            }
          >
            <p
              className="description-1"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              A Customer Detection model powered by neural networks, that use
              Image Processing to highlight and log positions of people
              interacting with items caputured in a video footage. This was
              supported with the help of YOLOv4, DeepSORT and Tensorflow
            </p>
            <p
              className="description-1"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              This was built for the Tractor Supply's “Life out Here” AI/ML
              Hackathon hosted on HackerEarth, in only 3 days where my
              submission was among the top 6 solutions across 8 different themes
            </p>
            <p
              className="description-1"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
                marginTop: "27px",
              }}
            >
              Tensorflow YOLOv4 DeepSORT Tesseract
            </p>
          </Card>
        </Col>
        <Col xxl={0} xl={0} lg={3} xs={2} md={3} sm={3} />
        <Col xxl={0} xl={0} lg={4} xs={2} md={3} sm={3} />
        <Col xxl={6} xl={6} lg={16} xs={20} md={18} sm={18}>
          <Card
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="discord-codebot-card"
            style={{ margin: "3%", height: "200px" }}
            bodyStyle={{ backgroundColor: "#141414" }}
            bordered={false}
            hoverable={true}
            title="RL Games"
            extra={
              <a
                onMouseOver={handleHover}
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
                href="https://github.com/Cynamide/RL_Games"
              >
                GitHub
              </a>
            }
          >
            <p
              className="description-2"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              This project was built by me as a Solo contender in the IIT Madras
              Hackathon, Shaastra, where I stood Runner's Up. The problem
              statement was to build an agent with the best policy to a given
              environment using Reinforcement Learning methods
            </p>
            <p
              className="description-2"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              The challenge was to build an agent that would win after having
              the best score averaged over 1000 episodes. The agent was built
              using the Deep Q-Learning algorithm as well as Minimax Algorithm.
            </p>
            <p
              className="description-2"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
                marginTop: "20px",
              }}
            >
              Tensorflow OpenAI Gym Matplotlib
            </p>
          </Card>
        </Col>
        <Col xxl={0} xl={0} lg={3} xs={2} md={3} sm={3} />
        <Col xxl={0} xl={0} lg={4} xs={2} md={3} sm={3} />
        <Col xxl={6} xl={6} lg={16} xs={20} md={18} sm={18}>
          <Card
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="card-3"
            style={{ margin: "3%", height: "95%" }}
            bodyStyle={{ backgroundColor: "#141414" }}
            bordered={false}
            hoverable={true}
            title="Wasserstein GAN with Gradient Penalty"
            extra={
              <a
                onMouseOver={handleHover}
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
                href="https://github.com/Cynamide/GAN/"
                onClick={genImage}
              >
                GitHub
              </a>
            }
          >
            <p
              className="description-3"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              This is my TensorFlow implementations of Wasserstein GANs with
              Gradient Penalty (WGAN-GP) proposed in Improved Training of
              Wasserstein GANs. This project generates images from a latent
              space of 128 dimensions
            </p>
            <p
              className="description-3"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              This project generates faces of Anime characters using 64x64
              pixels of training images, to generate realistic images, of these
              characters. Used a publicly available dataset on Kaggle.
            </p>
            <br />
            <br />
            <p
              className="description-3"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              Tensorflow NumPy PIL Matplotlib
            </p>
            {image && <canvas className="canvas" height="64px" width="64px" />}
          </Card>
        </Col>
        <Col xxl={3} xl={3} lg={3} xs={2} md={3} sm={3} />
      </Row>
      <Row style={{ marginTop: "13px" }}>
        <Col xxl={6} xl={6} lg={4} xs={2} md={3} sm={3} />
        <Col xxl={6} xl={6} lg={16} xs={20} md={18} sm={18}>
          <Card
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="card-4"
            style={{ margin: "3%", height: "95%" }}
            bodyStyle={{ backgroundColor: "#141414" }}
            bordered={false}
            hoverable={true}
            title="Image Segmentation"
            extra={
              <a
                onMouseOver={handleHover}
                style={{ color: "white" }}
                href="https://github.com/Cynamide/Image-Segmentation"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            }
          >
            <p
              className="description-4"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              This is my TensorFlow implementation of Image Segmentation Project
              using U-net model
            </p>
            <p
              className="description-4"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              This deep neural network is implemented with Tensorflow functional
              API, which makes it extremely easy to experiment with different
              interesting architectures.
            </p>
            <p
              className="description-4"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              Output from the network is a 224x224 image which represents mask
              that should be learned. Transfer Learning is used by having
              MobileNetV2 as the Encoding stack of model.
            </p>
            <p
              className="description-4"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
                marginTop: "27px",
              }}
            >
              Tensorflow NumPy PIL Matplotlib
            </p>
          </Card>
        </Col>
        <Col xxl={0} xl={0} lg={3} xs={2} md={3} sm={3} />
        <Col xxl={0} xl={0} lg={4} xs={2} md={3} sm={3} />
        <Col xxl={6} xl={6} lg={16} xs={20} md={18} sm={18}>
          <Card
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-once
            className="card-5"
            style={{ margin: "3%", height: "95%" }}
            bodyStyle={{ backgroundColor: "#141414" }}
            bordered={false}
            hoverable={true}
            title="Lunar Lander"
            extra={
              <a
                onMouseOver={handleHover}
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
                href="https://github.com/Cynamide/Lunar-lander"
              >
                GitHub
              </a>
            }
          >
            <p
              className="description-5"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              This is my TensorFlow implementations of Deep Q learning model
              proposed in "Playing Atari with Deep Reinforcement Learning". The
              task is to land the space-ship between the flags smoothly.
            </p>
            <p
              className="description-5"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              In order to solve the episode you have to get a reward of +200 for
              100 consecutive episodes. I solved both the version under 400
              episodes.
            </p>
            <p
              className="description-5"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              This environment was in my capstone project as part of my
              University of Alberta Specialization which did not use Tensorflow
              to solve the Environment.
            </p>
            <p
              className="description-4"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              Tensorflow NumPy Matplotlib
            </p>
          </Card>
        </Col>
        <Col xxl={0} xl={0} lg={3} xs={2} md={3} sm={3} />
        {/* <Col xxl={0} xl={0} lg={4} xs={2} md={3} sm={3} /> */}
        <Col xxl={6} xl={6} lg={3} xs={2} md={3} sm={3} />
      </Row>
    </div>
  );
};
