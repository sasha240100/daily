import {processor} from '../modules';
import {app} from '../app';
import RTPass from './passes/RTPass';
import MaskPass from './passes/MaskPass';
import CombinePass from './passes/CombinePass';

const mask = new MaskPass(app.get('scene'), app.get('camera').native);
const maskRT = new THREE.WebGLRenderTarget();
const bloomRT = new THREE.WebGLRenderTarget();

processor
  .render()
  .pass(
    new RTPass(
      new MaskPass(
        app.get('scene'),
        app.get('camera').native,
        1
      ),
      {write: maskRT}
    )
  )
  .pass(
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
  )
  .pass(new CombinePass(bloomRT))
  .renderToScreen();
