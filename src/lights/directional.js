import {app} from '../app';

new WHS.DirectionalLight({
  intensity: 1,
  distance: 200,
  position: [0, 100, 0],
  target: [0, 0, 0]
}).addTo(app);
