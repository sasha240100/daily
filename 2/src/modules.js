export const renderingModule = new WHS.RenderingModule({
  renderer: {
    antialias: true,
    // alpha: true
  },

  // bgColor: 0x070707,
  pixelRatio: window.devicePixelRatio
});

export const resizeModule = new WHS.ResizeModule();
export const size = renderingModule.renderer.getSize();
export const renderer = renderingModule.renderer;

// renderer.gammaInput = true;
// renderer.gammaOutput = true;
