export const orthoCamera = new WHS.OrthographicCamera({
  position: [0, 0, -10]
});

orthoCamera.native.lookAt(new THREE.Vector3(0, 0, 0));

export const camera = new WHS.PerspectiveCamera({
  position: [0, 0, -6]
});
