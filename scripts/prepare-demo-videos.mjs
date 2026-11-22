import { createWriteStream, existsSync } from 'node:fs';
import { mkdir, rm } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { spawnSync } from 'node:child_process';
import ffmpeg from '@ffmpeg-installer/ffmpeg';

// These are the output videos committed to the original project repositories.
const videos = [
  ['customer-detection', 'https://raw.githubusercontent.com/Cynamide/customer_detection/14e5ccf6d09c793f94cd3b106ce0cad9032af27b/outputs/demo.avi'],
  ['image-segmentation', 'https://raw.githubusercontent.com/Cynamide/Image-Segmentation/bf1ac5096952bf3478e341629cbc387fabaea483/output_video.avi'],
];
await mkdir('public/videos', { recursive: true });
for (const [name, url] of videos) {
  const output = `public/videos/${name}.mp4`;
  if (existsSync(output)) continue;
  const input = `public/videos/.${name}.avi`;
  try {
    const response = await fetch(url);
    if (!response.ok || !response.body) throw new Error(`Could not download ${name}: ${response.status}`);
    await pipeline(Readable.fromWeb(response.body), createWriteStream(input));
    const result = spawnSync(ffmpeg.path, ['-hide_banner', '-loglevel', 'error', '-y', '-i', input, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', output], { stdio: 'inherit' });
    if (result.status !== 0) { await rm(output, { force: true }); throw result.error || new Error(`Could not convert ${name}`); }
  } finally { await rm(input, { force: true }); }
}
