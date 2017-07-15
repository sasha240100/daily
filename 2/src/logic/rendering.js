import {app, rbModule, controls} from '../app';
import {camera} from '../camera';
import {resizeModule} from '../modules';
import {grid} from '../elements/grid';
import {projection} from '../elements/projection';
import {material as clearMaterial} from '../materials/clear';

rbModule.setup(({scene, data, geometry}) => {
  const size = 3.08;

  const clearPlane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(size, size, 1, 1),
    clearMaterial
    // new THREE.MeshBasicMaterial({color: 0xff0000})
  );

  clearPlane.position.set(0, 0, 0);
  scene.add(clearPlane);

  data.clearPlane = clearPlane;
});

const switchVisible = (isActive) => (...meshes) => {
  meshes.forEach(mesh => {
    mesh.visible = isActive;
  })
};

const activate = switchVisible(true);
const deactivate = switchVisible(false);

rbModule.renderer.render(
  rbModule.scene,
  rbModule.camera,
);

rbModule.update(({
  clearPlane
}, self) => {
  activate(
    grid.native,
    clearPlane
  );

  deactivate(projection.native);

  self.renderBuffer(0);

  clearMaterial.uniforms.readBuffer.value = self.buffers[0];
  projection.material.map = self.buffers[0];

  // activate()
  deactivate(clearPlane);
  self.renderBuffer(1);

  self.swapBuffers();

  deactivate(grid.native);
  activate(projection.native);
});

window.grid = grid;

const plane = rbModule.data.clearPlane;

function updatePlaneSize() {
  plane.position.copy(camera.position.clone().negate());
  plane.lookAt(camera.position);

  // console.log(camera.native.getEffectiveFOV())
  const aspect = window.innerWidth / window.innerHeight;

  const distance = camera.position.length();

  plane.scale.set(
    distance * aspect,
    distance,
    1
  );
}

controls.addEventListener('change', updatePlaneSize);
resizeModule.addCallback(() => {
  updatePlaneSize();
});

updatePlaneSize();
