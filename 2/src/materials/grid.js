import vertexShader from './glsl/grid.vert';
import fragmentShader from './glsl/grid.frag';

import {app} from '../app';

export const material = new THREE.ShaderMaterial({
  uniforms: {
    color: {value: 0xffffff},
    time: {value: 0}
  },

  vertexShader,
  fragmentShader
});

new WHS.Loop(() => {
  material.uniforms.time.value += 0.01;
}).start(app);
