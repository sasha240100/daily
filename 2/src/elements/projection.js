import {app} from '../app';
import {size, rbModule} from '../modules';

export const projection = new WHS.Plane({
  geometry: [size.width, size.height],
  material: new THREE.MeshBasicMaterial({
    map: new THREE.Texture()
  })
});

projection.visibile = false;

projection.addTo(app);
