import {app} from '../app';
import {material} from '../materials/lines';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

export const headModel = new WHS.Importer({
  loader: new THREE.OBJLoader(),
  url: './assets/LeePerrySmith2.obj',

  parser(data) {
    return data.children[0];
  },

  useCustomMaterial: true,
  material,

  rotation: [0, Math.PI, 0],
  position: [0, 1, -1]
});

headModel.defer(() => {
  const headModel2 = headModel.clone();

  // console.log(head.geometry);

  headModel2.addTo(app).then(head => {
    head.position.y -= 0.0019;
    head.position.z += 0.0025;

    head.material = new THREE.MeshStandardMaterial({color: 0xffffff});
    head.scale.set(0.998, 0.999, 0.998);
  });
});

headModel.addTo(app).then(head => {
  head.native.frustumCulled = false;
  const loader = new THREE.CubeTextureLoader();

  console.log(head.geometry);

  loader
  .setPath('./assets/envmap/')
  .load([
    'px.jpg',
  	'nx.jpg',
  	'py.jpg',
  	'ny.jpg',
  	'pz.jpg',
  	'nz.jpg'
  ], texture => {
    head.material.uniforms.envMap.value = texture;
    head.material.needsUpdate = true;
  });
});
