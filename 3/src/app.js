import {camera} from './camera';
import modules from './modules';

import StatsModule from 'whs/modules/StatsModule';

const controlsModule = new WHS.OrbitControlsModule();

export const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', camera),
  modules.rendering,
  controlsModule,
  PRODUCTION ? null : new StatsModule(),
  modules.resize,
  modules.processor
]);

app.start();

new WHS.AmbientLight({
  intensity: 0.5
}).addTo(app);

new WHS.SpotLight({
  intensity: 1,

  position: [0, 0, -10]
}).addTo(app);

controlsModule.controls.autoRotate = true;
