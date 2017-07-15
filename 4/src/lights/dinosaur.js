import {app} from '../app';

export const ambient = new WHS.AmbientLight({
  intensity: 0
});

ambient.addTo(app);

export const point = new WHS.PointLight({
  intensity: 0,

  position: [
    0, 10, 0
  ]
});

point.addTo(app);
