import {PointGrid} from '../components/PointGrid';
import {app} from '../app';

import {material} from '../materials/grid';

export const grid = new PointGrid({
  geometry: [100, 100, 30, 30],
  material
});

grid.native.visible = false;

grid.addTo(app);

new WHS.Loop(() => {
  grid.rotation.y += Math.PI + 0.01;
}).start(app);
