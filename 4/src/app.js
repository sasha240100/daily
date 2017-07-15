import {camera} from './camera';
import modules from './modules';

import TWEEN from 'tween.js';

export const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', camera),
  new WHS.RenderingModule(),
  new WHS.OrbitControlsModule(),
  new WHS.StateModule(),
  new WHS.ResizeModule(),
  modules.processor
]);

window.state = app.use('state');

new WHS.Loop(() => TWEEN.update()).start(app);

app.start();
