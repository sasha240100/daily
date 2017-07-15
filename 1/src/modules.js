import {RenderBufferModule} from '../../modules/RenderBufferModule';

export const renderingModule = new WHS.RenderingModule({
  renderer: {
    antialias: true,
    // alpha: true
  },

  // bgColor: 0x070707,
  pixelRatio: window.devicePixelRatio
});

export const renderer = renderingModule.renderer;
// renderer.setClearColor(0x070707, 0.01);
renderer.gammaInput = true;
renderer.gammaOutput = true;

export const mouse = new WHS.VirtualMouseModule();
export const rbModule = new RenderBufferModule(400, 400, {
  helper: PRODUCTION ? null : new FBOHelper(renderingModule.renderer)
});
