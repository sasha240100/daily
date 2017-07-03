import {mouse} from './modules';

export const camera = new WHS.PerspectiveCamera({
  position: [0, 100, 100]
});

camera.native.lookAt(new THREE.Vector3(0, 0, 0));

const m = mouse.mouse;
const i = 40;

mouse.on('move', () => {
  camera.x = m.x * i;
  camera.z = m.y * i;
  camera.native.lookAt(new THREE.Vector3(0, 0, 0));
})
