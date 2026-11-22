import { Row, Col, Card, Button, Modal } from "antd";
import "./Projects.css";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

export const Projects = () => {
  const handleHover = (e) => {
    e.target.style.cursor = "none";
    e.target.style.color = "rgba(255, 255, 255, 0.85)";
    e.target.style["border-bottom"] = "none";
  };

  const [isModalVisibleGan, setIsModalVisibleGan] = useState(false);
  const [isModalVisibleRLGames, setIsModalVisibleRLGames] = useState(false);
  const [isModalVisibleLander, setIsModalVisibleLander] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);

  const [generationError, setGenerationError] = useState("");

  async function genImage() {
    setIsLoading(true);
    setGenerationError("");
    try {
      const loadedModel = model || await tf.loadLayersModel("/tfjs/gan/model.json");
      if (!model) setModel(loadedModel);
      const pixels = tf.tidy(() => loadedModel.predict(tf.randomNormal([1, 1, 1, 128])).reshape([64, 64, 3]).arraySync());
      setImage(pixels);
    } catch (error) {
      setGenerationError("The model could not be loaded. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const showModalGan = () => {
    setIsModalVisibleGan(true);
  };

  const showModalRLGames = () => {
    setIsModalVisibleRLGames(true);
  };

  const showModalLander = () => {
    setIsModalVisibleLander(true);
  };

  const handleCancel = () => {
    setIsModalVisibleGan(false);
    setIsModalVisibleRLGames(false);
    setIsModalVisibleLander(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!image || !isModalVisibleGan) return;
    const canvas = document.querySelector(".canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    for (let y = 0; y < 64; y++) {
      for (let x = 0; x < 64; x++) {
        const [red, green, blue] = image[y][x].map((channel) => Math.max(0, Math.min(255, Math.round((channel + 1) * 127.5))));
        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [image, isModalVisibleGan]);

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
        <Col xxl={3} xl={3} lg={3} xs={2} md={3} sm={3} />
        {[
          { title: "LocalEval", url: "https://github.com/Cynamide/go-exec-sandbox", description: "A benchmark workbench for comparing models on coding tasks. It runs generated code in isolated Docker containers and records results and evidence for each run.", stack: "Go · Next.js · Docker · PostgreSQL" },
          { title: "RAGFlow", url: "https://github.com/Cynamide/llm-context-chatbot", demo: "https://llm-context-chatbot.vercel.app", description: "A document chatbot that lets you upload files and ask questions grounded in their content. It retrieves relevant passages and streams answers to the interface.", stack: "Next.js · Cloudflare Workers · LangChain" },
          { title: "LLM on Call", url: "https://github.com/Cynamide/llm-on-call", description: "A voice agent with a FastAPI backend, a Twilio call flow, and real-time audio through Ultravox.", stack: "Python · FastAPI · Twilio · Ultravox" },
        ].map((project) => (
          <Col key={project.title} xxl={6} xl={6} lg={16} xs={20} md={18} sm={18}>
            <Card data-aos="fade-up" data-aos-once className="card-1" style={{ margin: "3%", height: "95%" }} bodyStyle={{ backgroundColor: "#141414" }} bordered={false} hoverable title={project.title} extra={<a style={{ color: "white" }} href={project.url} target="_blank" rel="noreferrer">GitHub</a>}>
              <p className="description-1" style={{ textAlign: "left", color: "rgb(168, 164, 164)" }}>{project.description}</p>
              <p className="description-1" style={{ textAlign: "left", color: "rgb(168, 164, 164)" }}>{project.stack}</p>
              {project.demo && <Button type="primary" shape="round" href={project.demo} target="_blank" rel="noreferrer">Try the live demo</Button>}
            </Card>
          </Col>
        ))}
        <Col xxl={3} xl={3} lg={3} xs={2} md={3} sm={3} />
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
              The submission as part of the Tractor Supply's “Life out Here”
              AI/ML Hackathon hosted on HackerEarth, it was among the top 6
              solutions across 8 different themes
            </p>
            <p
              className="description-1"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
                marginTop: "47px",
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
            style={{ margin: "3%", height: "95% " }}
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
            <Button type="primary" shape="round" onClick={showModalRLGames}>
              See it in action!
            </Button>
            <Modal
              title="Game example"
              visible={isModalVisibleRLGames}
              onCancel={handleCancel}
              width={1000}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
              ]}
            >
              <p>
                <video width="100%" height="100%" controls>
                  <source src="videos/rl_games.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </p>
            </Modal>
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
            title="WGAN-GP"
            extra={
              <a
                onMouseOver={handleHover}
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
                href="https://github.com/Cynamide/GAN/"
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
              TensorFlow implementation of Wasserstein GANs with Gradient
              Penalty (WGAN-GP) proposed in Improved Training of Wasserstein
              GANs.
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

            <p
              className="description-3"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
                marginTop: "7px",
              }}
            >
              Tensorflow NumPy PIL Matplotlib
            </p>
            <br />
            <br />
            <Button
              style={{ BackgroundColor: "white" }}
              type="primary"
              shape="round"
              onClick={showModalGan}
            >
              Try it out!
            </Button>
            <Modal
              title="Create your own Anime Face"
              visible={isModalVisibleGan}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={isLoading}
                  onClick={genImage}
                >
                  Create
                </Button>,
              ]}
            >
              <p>
                Click on create! (It would take some time the first time you
                click)
              </p>
              {generationError && <p role="alert">{generationError}</p>}
              {image && (
                <canvas className="canvas" height="64px" width="64px" />
              )}
            </Modal>
          </Card>
        </Col>
        <Col xxl={3} xl={3} lg={3} xs={2} md={3} sm={3} />
      </Row>
      <Row style={{ marginTop: "13px" }}>
        <Col xxl={3} xl={3} lg={4} xs={2} md={3} sm={3} />
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
              TensorFlow implementation of Image Segmentation Project using
              U-net model
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
              TensorFlow implementation of Deep Q learning model proposed in
              "Playing Atari with Deep Reinforcement Learning". The task is to
              land the space-ship between the flags smoothly.
            </p>
            <p
              className="description-5"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              Trained with experience replay and epsilon-greedy exploration in the LunarLander simulation.
            </p>
            <br />
            <br />
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button type="primary" shape="round" onClick={showModalLander}>
              See it in action!
            </Button>
            <Modal
              title="Video example"
              visible={isModalVisibleLander}
              onCancel={handleCancel}
              width={800}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
              ]}
            >
              <p>
                <video width="100%" height="100%" controls>
                  <source src="videos/lander.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </p>
            </Modal>
          </Card>
        </Col>
        <Col xxl={0} xl={0} lg={3} xs={2} md={3} sm={3} />
        <Col xxl={0} xl={0} lg={4} xs={2} md={3} sm={3} />
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
            title="NFT Minting Platform"
            extra={
              <>
                <a
                  onMouseOver={handleHover}
                  style={{ color: "white" }}
                  href="https://github.com/Cynamide/minting-svelte"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </>
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
              Platform "Akuna" built using Candy Machine V2 to enable minting of
              custom NFTs through the Solana Blockchain.
            </p>
            <p
              className="description-4"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              The platform supports minting of NFTs with images of anime
              characters that were generated entirely using an AI model to
              maintain uniqueness of the NFTs.
            </p>
            <p
              className="description-4"
              style={{
                textAlign: "left",
                color: "rgb(168, 164, 164)",
                backgroundColor: "#141414",
              }}
            >
              The platform has a dedicated discord server and a twitter handle
              to promote the NFTs.
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
              Svelte, Solana, TypeScript
            </p>
            <br />
            <Button type="primary" shape="round">
              <a
                onMouseOver={handleHover}
                style={{ color: "white" }}
                href="https://minting-svelte.netlify.app/"
                target="_blank"
                rel="noreferrer"
              >
                Visit the website!
              </a>
            </Button>
          </Card>
        </Col>
        <Col xxl={3} xl={3} lg={3} xs={2} md={3} sm={3} />
      </Row>
    </div>
  );
};
