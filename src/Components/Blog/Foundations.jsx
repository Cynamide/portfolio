import React, { useState } from "react";

const hardware = { A100: { compute: 312, bandwidth: 2.039 }, H100: { compute: 989, bandwidth: 3.35 } };

function Roofline() {
  const [intensity, setIntensity] = useState(40);
  const [gpu, setGpu] = useState("A100");
  const { compute, bandwidth } = hardware[gpu];
  const ridge = compute / bandwidth;
  const performance = Math.min(compute, bandwidth * intensity);
  const a = Math.min(hardware.A100.compute, hardware.A100.bandwidth * intensity);
  const h = Math.min(hardware.H100.compute, hardware.H100.bandwidth * intensity);
  const x = 32 + (intensity / 500) * 420;
  const y = 220 - (performance / 1000) * 185;
  const peakX = 32 + (ridge / 500) * 420;
  const peakY = 220 - (compute / 1000) * 185;
  return <div className="ml-lab">
    <p className="ml-lab-label">INTERACTIVE EXPLAINER</p><h4>Explore the roofline</h4>
    <p>Choose a GPU and change how much work it does per byte moved from memory.</p>
    <div className="ml-switch" aria-label="Choose GPU">{Object.keys(hardware).map(name => <button key={name} type="button" aria-pressed={gpu === name} onClick={() => setGpu(name)}>{name} SXM</button>)}</div>
    <label className="ml-range-label" htmlFor="intensity">Arithmetic intensity <strong>{intensity} FLOP/byte</strong></label>
    <input id="intensity" type="range" min="1" max="500" value={intensity} onChange={e => setIntensity(Number(e.target.value))} />
    <svg className="ml-chart" viewBox="0 0 480 255" role="img" aria-label={`${gpu} roofline. At ${intensity} FLOP per byte, the ideal limit is ${performance.toFixed(0)} teraflops per second.`}>
      <line x1="32" y1="220" x2="452" y2="220" stroke="#62758b"/><line x1="32" y1="220" x2="32" y2="28" stroke="#62758b"/>
      <polyline points={`32,220 ${peakX},${peakY} 452,${peakY}`} fill="none" stroke="#88b9f1" strokeWidth="4" strokeLinejoin="round"/>
      <line x1={x} y1="220" x2={x} y2={y} stroke="#9db1c8" strokeDasharray="4 5"/><circle cx={x} cy={y} r="6" fill="#e6b87c"/>
      <text x="35" y="17" fill="#b7c7db" fontSize="12">TFLOP/s</text><text x="452" y="244" textAnchor="end" fill="#b7c7db" fontSize="12">Arithmetic intensity →</text>
      <text x="40" y="212" fill="#b7c7db" fontSize="11">0</text><text x="40" y="34" fill="#b7c7db" fontSize="11">1,000</text>
    </svg>
    <div className="ml-results" aria-live="polite"><div><span>Ideal limit</span><strong>{performance.toFixed(0)} TFLOP/s</strong></div><div><span>Limiting resource</span><strong>{intensity < ridge ? "Memory bandwidth" : "Compute"}</strong></div><div><span>{gpu} ridge point</span><strong>{ridge.toFixed(0)} FLOP/byte</strong></div></div>
    <p className="ml-lab-foot">At this intensity, the H100 roofline is {(h / a).toFixed(2)}× the A100 roofline. The calculation uses peak dense FP16 compute and HBM bandwidth.</p>
  </div>;
}

function PhaseDiagram() {
  const [phase, setPhase] = useState("prefill");
  return <div className="ml-lab"><p className="ml-lab-label">INTERACTIVE EXPLAINER</p><h4>Follow a request</h4><p>Select a phase to see what happens as the model responds.</p>
    <div className="ml-switch" aria-label="Choose inference phase"><button type="button" aria-pressed={phase === "prefill"} onClick={() => setPhase("prefill")}>Prefill</button><button type="button" aria-pressed={phase === "decode"} onClick={() => setPhase("decode")}>Decode</button></div>
    <div className="ml-flow" aria-live="polite">{phase === "prefill" ? <><div><small>INPUT</small><strong>Whole prompt</strong><span>Many tokens processed together</span></div><span className="ml-flow-arrow" aria-hidden="true">→</span><div><small>MODEL</small><strong>Prefill</strong><span>Builds the KV cache</span></div><span className="ml-flow-arrow" aria-hidden="true">→</span><div><small>OUTPUT</small><strong>First token</strong><span>Part of time to first token</span></div></> : <><div><small>INPUT</small><strong>Latest token</strong><span>Uses the existing KV cache</span></div><span className="ml-flow-arrow" aria-hidden="true">→</span><div><small>MODEL</small><strong>Decode step</strong><span>Reads weights and cache</span></div><span className="ml-flow-arrow" aria-hidden="true">→</span><div><small>OUTPUT</small><strong>Next token</strong><span>Repeats until the response ends</span></div></>}</div>
    <p className="ml-lab-foot">{phase === "prefill" ? "A long prompt gives the model more work to process together. This often makes prefill compute intensive." : "A single request has less work per step. Moving weights and the growing cache can become the limiting factor."}</p>
  </div>;
}

export function Foundations() {
 return <>
  <details className="ml-note" id="note-memory-wall"><summary><strong>The memory wall</strong><span>Why more GPU compute does not always mean a faster model.</span></summary><article className="ml-article">
    <p>A GPU needs data before it can perform calculations. If memory cannot supply that data fast enough, some compute capacity sits idle. This gap between compute speed and data movement is called the memory wall.</p>
    <h3>Two limits to check</h3>
    <div className="ml-table-wrap"><table className="ml-table"><caption>What can limit a workload?</caption><thead><tr><th scope="col">Resource</th><th scope="col">What it measures</th><th scope="col">When it matters</th></tr></thead><tbody><tr><th scope="row">Compute</th><td>Operations per second</td><td>Many calculations per byte of data</td></tr><tr><th scope="row">Memory bandwidth</th><td>Bytes moved per second</td><td>Lots of data moved for each calculation</td></tr></tbody></table></div>
    <p>Arithmetic intensity tells us how many floating point operations a workload performs per byte moved. The ridge point is peak compute divided by memory bandwidth. Below it, bandwidth sets the lower ceiling. Above it, compute does.</p>
    <Roofline />
    <h3>Comparing two GPUs</h3><p>The H100 has a larger advantage in compute than in memory bandwidth.</p>
    <div className="ml-table-wrap"><table className="ml-table"><caption>Peak specifications for SXM GPUs</caption><thead><tr><th scope="col">Specification</th><th scope="col">A100 80 GB</th><th scope="col">H100</th><th scope="col">H100 / A100</th></tr></thead><tbody><tr><th scope="row">Dense FP16 compute</th><td>312 TFLOP/s</td><td>989 TFLOP/s</td><td>3.2×</td></tr><tr><th scope="row">Memory bandwidth</th><td>2.039 TB/s</td><td>3.35 TB/s</td><td>1.6×</td></tr><tr><th scope="row">Ridge point</th><td>153 FLOP/byte</td><td>295 FLOP/byte</td><td>1.9×</td></tr></tbody></table></div>
    <p>If both GPUs are limited by bandwidth, the roofline estimate follows the 1.6× bandwidth difference. If both are limited by compute, it follows the 3.2× compute difference. Between the ridge points, the two GPUs can face different limits.</p>
    <h3>What happens when we read model weights?</h3><p>A model with 8 billion parameters needs about 16 GB for its weights at 16 bits per parameter. If a decode step reads all those weights from GPU memory, the transfer alone takes:</p>
    <div className="ml-math-flow" aria-label="Weight transfer examples"><div><span>A100</span><strong>16 GB ÷ 2.039 TB/s</strong><b>≈ 7.8 ms</b></div><div><span>H100</span><strong>16 GB ÷ 3.35 TB/s</strong><b>≈ 4.8 ms</b></div></div>
    <p>These are ideal transfer times for the weights alone. Batching can reuse weights across requests, increasing the work done per byte. It also changes memory use and latency.</p>
    <p className="ml-sources">Further reading: <a href="https://developer.nvidia.com/blog/accelerating-hpc-applications-with-nsight-compute-roofline-analysis/">NVIDIA's roofline guide</a>, <a href="https://www.nvidia.com/en-us/data-center/a100/">A100 specifications</a>, <a href="https://www.nvidia.com/en-us/data-center/h100/">H100 specifications</a>.</p>
  </article></details>
  <details className="ml-note" id="note-prefill-decode"><summary><strong>Prefill and decode</strong><span>Why the same request can put pressure on different parts of a GPU.</span></summary><article className="ml-article">
    <p>A language model first processes the prompt. It then generates a response one token at a time. These two stages put different demands on the GPU.</p>
    <PhaseDiagram />
    <div className="ml-table-wrap"><table className="ml-table"><caption>How the two phases compare</caption><thead><tr><th scope="col"> </th><th scope="col">Prefill</th><th scope="col">Decode</th></tr></thead><tbody><tr><th scope="row">What happens</th><td>Processes the prompt</td><td>Generates subsequent tokens</td></tr><tr><th scope="row">Common bottleneck</th><td>Compute for long prompts</td><td>Memory bandwidth for small batches</td></tr><tr><th scope="row">Latency metric</th><td>Time to first token (TTFT)</td><td>Inter-token latency (ITL)</td></tr></tbody></table></div>
    <h3>Prefill and the first token</h3><p>During prefill, the model processes the prompt and saves attention keys and values for later use. A long prompt gives the GPU more tokens to process together, so prefill is often compute intensive.</p><p>TTFT measures the wait for the first token. It includes prompt processing, time spent in a queue, and other serving overhead.</p>
    <h3>Decode and the KV cache</h3><p>During decode, the model generates the next token using the earlier tokens. The key value cache stores attention data from those tokens so the model can reuse it. The cache grows as the sequence gets longer.</p><p>ITL measures the time between output tokens. For a small batch, each step may read many weights and cache entries while doing relatively little arithmetic. Memory bandwidth can become the bottleneck. Batching can reuse weights across requests and improve throughput, but it also increases memory use and can affect latency.</p>
    <h3>Which latency matters?</h3><div className="ml-scenarios"><div><span>LONG PROMPT · SHORT ANSWER</span><strong>Time to first token</strong><p>Most of the wait may come before the response starts.</p></div><div><span>SHORT PROMPT · LONG ANSWER</span><strong>Time between tokens</strong><p>Decode can account for more of the response time.</p></div></div>
    <h3>Reducing weight traffic</h3><p>Quantization stores weights using fewer bits. For 8 billion parameters, the weight storage changes like this:</p>
    <div className="ml-quant" aria-label="Model weight storage comparison"><div><span>16 bits</span><div className="ml-quant-track"><div className="ml-quant-bar ml-quant-full" /></div><strong>≈ 16 GB</strong></div><div><span>8 bits</span><div className="ml-quant-track"><div className="ml-quant-bar ml-quant-half" /></div><strong>≈ 8 GB</strong></div></div>
    <p>Smaller weights can reduce memory traffic during decode. Quantization can also affect model quality and compute speed, depending on the method and hardware.</p><p>Speculative decoding takes another approach. A smaller model proposes tokens, and a larger model checks them together. This can reduce the number of sequential steps needed to generate a response.</p>
    <p className="ml-sources">Further reading: <a href="https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/">NVIDIA on inference and the KV cache</a>, <a href="https://developer.nvidia.com/blog/co-designing-ai-model-attention-for-fast-interactive-long-context-inference/">NVIDIA on prefill and decode tradeoffs</a>.</p>
  </article></details>
 </>;
}
