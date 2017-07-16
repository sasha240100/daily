import {processor} from '../modules';
import {app, dat} from '../app';
import RTPass from './passes/RTPass';
import MaskPass from './passes/MaskPass';
import CombinePass from './passes/CombinePass';
import TogglePass from './passes/TogglePass';

const mask = new MaskPass(app.get('scene'), app.get('camera').native);
const maskRT = new THREE.WebGLRenderTarget();
const bloomRT = new THREE.WebGLRenderTarget();

const dof = new POSTPROCESSING.Bokeh2Pass(app.get('camera').native, {
  rings: 3,
	samples: 1,
	showFocus: false,
	manualDoF: false,
	vignette: false,
	pentagon: true,
	shaderFocus: false,
	noise: false
});

const perf = app.use('performance');

class ScreenPass extends POSTPROCESSING.Pass {
  constructor() {
    super();
    this.quad.material = new POSTPROCESSING.CopyMaterial();
  }

  render(renderer, readBuffer, writeBuffer) {
    this.quad.material.uniforms.tDiffuse.value = readBuffer.texture;
    renderer.render(this.scene, this.camera, null);
  }
}

const rspan = document.querySelector('.render-quality span');

function toggleSpan(self) {
  self.enabled = !self.enabled;
  rspan.classList.toggle('hq');
}

processor
  .render()
  .pass(
    // dof
    new TogglePass(dof).control(self => {
      perf.on('dof', val => {
        self.enabled = val;
      });

      rspan.addEventListener('click', () => toggleSpan(self));
    })
  )
  .pass(
    new TogglePass(
      new RTPass(
        new MaskPass(
          app.get('scene'),
          app.get('camera').native,
          1
        ),
        {write: maskRT}
      )
    ).control(self => {
      perf.on('bloom', val => {
        console.log('bloom');
        console.log(val);
        self.enabled = val;
      });
    })
  )
  .pass(
    new TogglePass(
      new RTPass(
        new POSTPROCESSING.BloomPass({
          intensity: 1,
          resolutionScale: 0.14,
          strength: 1.0,
          distinction: 4.0,
          screenMode: true
        }),
        {read: maskRT, write: bloomRT},
        bloom => {
          bloom.combineMaterial.uniforms.opacity1.value = 0;
        }
      )
    ).control(self => {
      perf.on('bloom', val => {
        self.enabled = val;
      });
    })
  )
  .pass(
    new TogglePass(
      new CombinePass(bloomRT)
    ).control(self => {
      perf.on('bloom', val => {
        self.enabled = val;
      });
    })
  )
  // .render()
  .pass(new ScreenPass())
  .renderToScreen();

dof.bokehMaterial.uniforms.ditherStrength.value = 0.01;
dof.bokehMaterial.uniforms.bias.value = 1.1;
dof.bokehMaterial.uniforms.focalStop.value = 60;
dof.bokehMaterial.uniforms.focalDepth.value = 0.4;
