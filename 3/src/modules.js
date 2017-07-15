export const rendering = new WHS.RenderingModule({
  bgColor: 0x000000,
  pixelRatio: Math.min(window.devicePixelRatio, 1)
});

export const resize = new WHS.ResizeModule();

export const processor = new WHS.PostProcessorModule({
  depthTexture: true
});

export default {
  rendering,
  resize,
  processor
}
