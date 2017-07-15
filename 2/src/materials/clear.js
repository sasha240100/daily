import vertexShader from './glsl/clear.vert';
import fragmentShader from './glsl/clear.frag';

import {rbModule} from '../app';

// rbModule.defineBuffers([
//   rbModule.createRT(),
//   rbModule.createRT()
// ]);

// console.log(rbModule.buffers);

export const material = new THREE.ShaderMaterial({
  uniforms: {
    readBuffer: {value: rbModule.buffers[0].texture}
  },

  vertexShader,
  fragmentShader
})
