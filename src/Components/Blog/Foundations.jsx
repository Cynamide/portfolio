import React, { useState } from "react";

const hardware = { A100: { compute: 312, bandwidth: 2.039 }, H100: { compute: 989, bandwidth: 3.35 } };

function Roofline() {
  const [intensity, setIntensity] = useState(40);
  const [gpu, setGpu] = useState("A100");
  const { compute, bandwidth } = hardware[gpu];
  const ridge = compute / bandwidth;
  const performance = Math.min(compute, bandwidth * intensity);
  const other = hardware[gpu === "A100" ? "H100" : "A100"];
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
    <p className="ml-lab-foot">For the same intensity, this simplified model gives H100 an ideal limit {(h / a).toFixed(2)}× the A100's. The curve uses dense FP16 Tensor Core peaks and HBM bandwidth. It is a ceiling, not a benchmark. Actual performance depends on the workload and implementation.</p>
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
    <p>A GPU can perform a huge number of calculations each second, but it needs data to work on. If the data cannot reach the compute units fast enough, some of that compute capacity sits idle. This gap between compute capability and the speed of moving data is often called the memory wall.</p>
    <h3>Two limits to check</h3><p>Peak compute tells us how many operations the GPU can perform per second. Memory bandwidth tells us how much data it can move per second. A workload that repeatedly reads a lot of data for relatively little arithmetic is often limited by bandwidth. A workload that reuses data for many calculations is more likely to be limited by compute.</p>
    <p>Arithmetic intensity connects the two. It is the number of floating point operations performed per byte moved. The roofline model compares intensity with the hardware limits. Its ridge point is peak compute divided by memory bandwidth. Below that point, the model's bandwidth ceiling is lower. Above it, the compute ceiling is lower.</p>
    <Roofline />
    <h3>What a GPU upgrade can change</h3><p>The A100 80 GB SXM has about 312 TFLOP/s of dense FP16 Tensor Core compute and 2.039 TB/s of memory bandwidth. The H100 SXM has about 989 TFLOP/s and 3.35 TB/s. That is roughly 3.2 times the compute, but 1.6 times the bandwidth.</p><p>For a workload limited by memory bandwidth on both GPUs, the ideal roofline suggests an improvement closer to the bandwidth ratio. If the workload has enough arithmetic intensity to reach the compute ceiling on both, it can benefit more from the difference in compute. Workloads between the two ridge points can have a different limiting resource on each GPU.</p>
    <h3>Why model weights matter</h3><p>An 8 billion parameter model needs roughly 16 GB for its weights at two bytes per parameter. If a decode step has to read those weights from high bandwidth memory, moving them alone takes about 7.8 ms at 2.039 TB/s or 4.8 ms at 3.35 TB/s under ideal conditions. This ignores cache, other memory traffic, compute, and overhead. It is a useful lower bound for that assumption, not a latency prediction.</p><p>Batching can reuse weights across multiple requests and increase arithmetic intensity, but it also changes memory use and latency. A larger batch does not automatically make every workload compute bound. Profile the actual model and serving setup before choosing hardware.</p>
    <p className="ml-sources">Further reading: <a href="https://developer.nvidia.com/blog/accelerating-hpc-applications-with-nsight-compute-roofline-analysis/">NVIDIA's roofline guide</a>, <a href="https://www.nvidia.com/en-us/data-center/a100/">A100 specifications</a>, <a href="https://www.nvidia.com/en-us/data-center/h100/">H100 specifications</a>.</p>
  </article></details>
  <details className="ml-note" id="note-prefill-decode"><summary><strong>Prefill and decode</strong><span>Why the same request can put pressure on different parts of a GPU.</span></summary><article className="ml-article">
    <p>When a language model responds, it first processes the prompt. It then generates the response one token at a time. These stages have different amounts of work available to run together, so they can stress different resources on the same GPU.</p>
    <PhaseDiagram />
    <h3>Prefill and the first token</h3><p>During prefill, the model processes the input tokens and creates the attention keys and values it can reuse later. A long prompt provides many tokens that can be processed together. This usually makes prefill more compute intensive than decoding a single request.</p><p>Time to first token, or TTFT, measures how long a user waits for the first response token. Prompt processing contributes to that wait, but queuing, scheduling, and other serving overhead can contribute too. A long input can increase this delay.</p>
    <h3>Decode and the rest of the response</h3><p>After the first token, the model repeatedly uses the tokens generated so far to produce the next one. The key value cache stores attention information from earlier tokens so it does not need to be recomputed each time. The cache grows with the sequence and uses additional GPU memory.</p><p>Inter-token latency, or ITL, describes the time between output tokens. For small batches, each decode step may do relatively little arithmetic for the amount of data it reads. Weight and cache traffic can then make memory bandwidth a major constraint. A larger batch can reuse weights across requests and improve throughput, though it also uses more memory and can affect latency.</p>
    <h3>Choosing what to optimize</h3><p>For a long prompt with a short answer, first token latency may matter most. For a longer answer, the time between tokens can matter more to the experience. Real services need to measure both, alongside throughput and the time requests spend waiting in a queue.</p><p>Quantization stores weights in fewer bits, which can reduce memory use and weight traffic. For example, eight billion weights require roughly 16 GB at 16 bits each and 8 GB at 8 bits, before metadata and other allocations. Speed and model quality depend on the quantization method, the hardware, and the available kernels. Quantization can also affect compute performance, so the result should be measured.</p><p>These are useful starting points, not fixed rules. Prompt length, batch size, cache size, model architecture, and serving implementation can change the bottleneck. Speculative decoding is one example of a different approach. A smaller model proposes tokens that a larger model checks together, potentially reducing the number of expensive sequential steps.</p>
    <p className="ml-sources">Further reading: <a href="https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/">NVIDIA on inference and the KV cache</a>, <a href="https://developer.nvidia.com/blog/co-designing-ai-model-attention-for-fast-interactive-long-context-inference/">NVIDIA on prefill and decode tradeoffs</a>.</p>
  </article></details>
 </>;
}
