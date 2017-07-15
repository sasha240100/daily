import {renderingModule} from './modules';

const {width: w, height: h} = renderingModule.renderer.getSize();

export const camera = new WHS.PerspectiveCamera({
  position: [0, 0, 100]
});

export const orthoCamera = new WHS.OrthographicCamera({
  left: -w/2,
  right: w/2,
  top: -h/2,
  bottom: h/2,
  near: 1,
  far: 1000,

  position: [0, 0, -1]
});

orthoCamera.native.lookAt(new THREE.Vector3(0, 0, 0));
camera.native.lookAt(new THREE.Vector3(0, 0, 0));
