import {camera} from '../camera';
import {app} from '../app';
import {ambient} from '../lights/dinosaur';
import {lamps} from '../elements/lamps';
import {Tween, Easing} from 'tween.js';

const listener = new THREE.AudioListener();
camera.native.add(listener);

// create a global audio source
export const sound = new THREE.Audio(listener);

export const audioLoader = new THREE.AudioLoader();

const analyser = new THREE.AudioAnalyser(sound, 32);

//Load a sound and set it as the Audio object's buffer
// audioLoader.load('./assets/background.mp3', buffer => {
// 	sound.setBuffer( buffer );
// 	sound.setLoop(true);
// 	sound.setVolume(1);
// 	// sound.play();
// });

const l1 = lamps[0].mesh.material;
const l2 = lamps[1].mesh.material;
const l3 = lamps[2].mesh.material;
const l4 = lamps[3].mesh.material;

const pData = (data, offset) => (data[offset] + data[1 + offset] + data[2 + offset] + data[3 + offset]) / 4;
// const mScalar = scalar => Math.max(0.6, scalar);
const mScalar = scalar => Math.max(0.5, scalar);

export const audioLoop = new WHS.Loop(() => {
  const data = analyser.getFrequencyData();

  // const d1 = mScalar(1 - pData(data, 0) / 400 + 0.2);
  // const d2 = mScalar(1 - pData(data, 4) / 200);
  // const d3 = mScalar(1 - pData(data, 8) / 100);
  // const d4 = mScalar(1 - pData(data, 12) / 10);

  const d1 = pData(data, 0) / 100 - 0.4;
  const d2 = pData(data, 4) / 100;
  const d3 = pData(data, 8) / 50;
  const d4 = pData(data, 12) / 5;
  //
  // l1.color.setScalar(d1);
  // l2.color.setScalar(d2);
  // l3.color.setScalar(d3);
  // l4.color.setScalar(d4);
  l1.color.setScalar(mScalar(d1));
  l2.color.setScalar(mScalar(d2));
  l3.color.setScalar(mScalar(d3));
  l4.color.setScalar(mScalar(d4));

  // ambient.native.intensity = 0.4 + (d1 + d2 + d3 + d4) / 8;
  ambient.native.intensity = Math.min((d1 + d2 + d3 + d4) / 6 - 0.2, 1.0);
});

app.addLoop(audioLoop);

const interval = 300;

export const ambientAudio = () => {};
// setInterval(() => {
//   new Tween(ambient.native).to({
//     intensity: analyser.getAverageFrequency() / 100 - 0.3
//   }, interval)
//   .easing(Easing.Cubic.InOut)
//   .start();
// }, interval);

// .start(app);
