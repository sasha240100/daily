import {camera} from './camera';
import {mouse, renderingModule, rbModule} from './modules';
import {App} from 'whs';

export const app = new App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', camera),
  renderingModule,
  // new WHS.OrbitControlsModule(),
  new WHS.ResizeModule(),
  mouse,
  rbModule
]);

app.start();
