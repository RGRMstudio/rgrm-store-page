export const applyGlitch = (ctx, width, height, severity = 0.2) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // 1. Chromatic Aberration (RGB Split)
  const offset = Math.floor(severity * 40);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i + offset * 4] || data[i];     // Red shift
    data[i + 2] = data[i - offset * 4] || data[i + 2]; // Blue shift
  }

  // 2. Industrial Scanlines & Grain
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      
      // Horizontal Scanlines every 4th pixel
      if (y % 4 === 0) {
        data[i] *= 0.7; 
        data[i + 1] *= 0.7; 
        data[i + 2] *= 0.7;
      }
      
      // Random Digital Noise (Grain)
      if (Math.random() < 0.05) {
        const noise = Math.random() * 50;
        data[i] += noise;
        data[i+1] += noise;
        data[i+2] += noise;
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
};
