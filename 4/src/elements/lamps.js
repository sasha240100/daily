import {Lamp} from '../components/lamp';
import {app} from '../app';

const path = new THREE.CurvePath();

path.add(new THREE.LineCurve3(
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(10, 0, 0)
));

path.add(new THREE.CubicBezierCurve3(
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(15, 0, 0),
  new THREE.Vector3(20, 2, 0),
  new THREE.Vector3(20, 300, -200),
));

// path.closePath();

const colors = [
  0xffffff,
  0xbbbbbb,
  0xffffff,
  0xbbbbbb
];

export const lamps = [];

for (let i = 0; i < 4; i++) {
  const y = -8 + i * 4;

  const lamp = new Lamp({
    curve: path,

    color: 0xffffff,
    sideWidth: 7,
    width: 5.4,

    position: [0, y, 0]
  });

  lamps.push(lamp);

  lamp.addTo(app);

}
