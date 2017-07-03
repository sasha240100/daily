import {app} from '../app';
import {rbModule, renderer} from '../modules';

import vertexShader from './glsl/grid.vert';
import fragmentShader from './glsl/grid.frag';

rbModule.defineBuffers([
  rbModule.createRT(),
  rbModule.createRT()
]);

export const material = new THREE.ShaderMaterial({
  uniforms: {
    mouse: {value: new THREE.Vector2(0.5, 0.5)},
    tiles: {value: new THREE.Vector2(160, 80)},
    t: {value: 0},
    isOrigin: {value: false}
  },
  vertexShader,
  fragmentShader,
  transparent: true
});

export const clearShader = new THREE.ShaderMaterial({
  uniforms: {
    texture: {value: rbModule.buffers[0].texture}
  },
  vertexShader,
  fragmentShader:
  `
    precision highp float;
    uniform sampler2D texture;
    varying vec2 vUv;

    void main() {
      vec2 mUv = vUv;
      mUv.y = mUv.y;

      // mUv.y += 0.003;

      mUv -= (mUv - 0.5) * 0.01;

      vec4 c = texture2D( texture, mUv ) - 0.005;
      c.r += 0.04;
      c.g += 0.02;
      gl_FragColor = c;
    }
  `,
  transparent: true,
});

const step = 0.01;

new WHS.Loop(() => {
  material.uniforms.t.value += step;
}).start(app);

rbModule.setup(({scene, camera, geometry, data}) => {
  const plane = new THREE.Mesh(geometry, material);

  const clearPlane = new THREE.Mesh(geometry, clearShader);
  clearPlane.position.set(0, 0, 1); // zIndex
  console.log(clearPlane);

  scene.add(plane);
  scene.add(clearPlane);

  data.plane = plane;
  data.clearShader = clearShader;
});



rbModule.update((
  {plane, clearShader},
  buffers
) => {
  renderer.setClearColor(0x000000, 0);
  plane.visible = true;
  rbModule.renderBuffer(0);

  plane.visible = false;
  clearShader.uniforms.texture.value = buffers[0].texture;
  rbModule.renderBuffer(1);

  rbModule.swapBuffers();
  renderer.setClearColor(0x090909, 1);
});
