import {camera} from './camera';
import modules from './modules';

import SphericalControls from './modules/SphericalControls';
import TWEEN from 'tween.js';

export const controls = new SphericalControls();

import fps from 'fps';
import Events from 'minivents';

class PerformanceModule extends Events {
  constructor(config, iterationStart = 60, framesToUpdate = 60, blockTimeout = 3000) {
    super();

    this.config = config;
    this.enabled = {};
    this.iterationStart = iterationStart;
    this.framesToUpdate = framesToUpdate;
    this.blockTimeout = blockTimeout;
    this.iteration = 0;
    this.avgRate = 60;
    this.block = false;

    for (let key in config) {
      this.enabled[key] = true;
    }

    this.ticker = fps();
    this.rate = 60;
  }

  manager(manager) {
    manager.define('performance');
    const renderer = manager.get('renderer');
    const {ticker, config} = this;

    this.app = manager.handler;

    this.loop = new WHS.Loop(() => {
      ticker.tick();
      this.rate = ticker.rate;

      this.avgRate = (this.iteration * this.avgRate + this.rate) / (this.iteration + 1);

      if (this.iteration % this.framesToUpdate == 0 && this.iteration > this.iterationStart && !this.block) {
        for (let key in config) {
          const erate = config[key];

          if (this.enabled[key] && erate > this.avgRate) {
            this.disable(key);
            this.block = true;

            setTimeout(() => {
              this.block = false;
            }, this.blockTimeout);

            delete config[key];
          }

          break;
        }
      }

      this.iteration++;
    })
  }

  start() {
    this.loop.start(this.app);
  }

  disable(key) {
    this.enabled[key] = false;
    this.emit(key, false);
  }

  enable(key) {
    this.enabled[key] = true;
    this.emit(key, true);
  }
}

// import StatsModule from 'whs/modules/StatsModule';

export const app = new WHS.App([
  new WHS.ElementModule(),
  new WHS.SceneModule(),
  new WHS.DefineModule('camera', camera),
  new WHS.RenderingModule(),
  new PerformanceModule({
    dof: 50,
    bloom: 50
  }),
  new WHS.VirtualMouseModule(),
  controls,
  new WHS.StateModule(),
  new WHS.ResizeModule(),
  modules.processor,
  // new StatsModule()
]);

const cameraGroup = new WHS.Group(camera);
cameraGroup.position.set(0, 2, 10);
cameraGroup.addTo(app);

controls.distance = 5;
controls.enabled = false;
controls.intensity = 0.6;

window.state = app.use('state');

new WHS.Loop(() => TWEEN.update()).start(app);

app.start();
