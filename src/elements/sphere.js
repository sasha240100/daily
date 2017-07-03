import {app} from '../app';

const sphere = new WHS.Sphere({
  material: new THREE.MeshBasicMaterial({color: 0xffffff})
});

sphere.addTo(app);
