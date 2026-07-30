import { useEffect, useState } from 'react';

/** One-off canvas-generated grain tile — no image request, no repeat seams. */
const makeNoise = (size = 180) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 255;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
};

export function Grain() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const idle = 'requestIdleCallback' in window;
    const run = () => setUrl(makeNoise());
    const id = idle ? window.requestIdleCallback(run) : window.setTimeout(run, 240);
    return () => {
      if (idle) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  return (
    <>
      <div className="vignette" aria-hidden="true" />
      <div
        className="grain"
        aria-hidden="true"
        style={url ? { backgroundImage: `url(${url})` } : undefined}
      />
    </>
  );
}
