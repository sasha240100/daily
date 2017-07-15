import {camera, orthoCamera} from './camera';
import {renderingModule, resizeModule} from './modules';
import {RenderBufferModule} from '../../modules/RenderBufferModule';

export const controlsModule = new WHS.OrbitControlsModule({
  object: camera
});

export const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', orthoCamera), // orthoCamera
  renderingModule,
  controlsModule,
  resizeModule
]);

export const {controls} = controlsModule;

controls.autoRotate = true;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

resizeModule.camera = camera;

const getSize = () => renderingModule.renderer.getSize();
const size = getSize();

export const rbModule = new RenderBufferModule(size.width, size.height, {
  helper: PRODUCTION ? null : new FBOHelper(renderingModule.renderer),
  scene: app.get('scene'),
  camera: camera.native,
  fixCamera: false
});

const options = {
  depthBuffer: true
};

rbModule.defineBuffers([
  rbModule.createRT(options),
  rbModule.createRT(options)
]);

resizeModule.addCallback(() => {
  const {width, height} = getSize();
  rbModule.setSize(width, height);
});

app.applyModule(rbModule);

app.start();
