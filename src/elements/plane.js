import {app} from '../app';
import {material} from '../materials/grid';
import {mouse, rbModule} from '../modules';

const plane = new WHS.Plane({
  geometry: [400, 200, 200, 200],
  buffer: true,
  material: new THREE.MeshPhongMaterial({
    map: rbModule.buffers[0].texture,
    displacementMap: rbModule.buffers[0].texture,
    displacementScale: 20
  }),
  rotation: {
    x: -Math.PI / 2
  }
});

plane.addTo(app);
mouse.track(plane);

mouse.on('move', () => {
  material.uniforms.mouse.value.x = 0.5 + mouse.mouse.x;
  material.uniforms.mouse.value.y = 0.5 + mouse.mouse.y;
});
