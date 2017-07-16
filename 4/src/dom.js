import {app} from './app';
import {audioLoop, sound} from './logic/audio';
import {lamps} from './elements/lamps';
import {ambient} from './lights/dinosaur';
import {Tween, Easing} from 'tween.js';

const sliders = document.querySelectorAll('.turner');
const turner = document.querySelector('.sound-turner');
const loops = [];

let active = false;

sliders.forEach(slider => {
  let i = 0;
  const offset = +slider.style.height.slice(0, 2);

  const loop = new WHS.Loop(() => {
    slider.style.height = `${(Math.sin(i + offset) + 1) * 10}px`;
    i += 0.075;
  });

  loops.push(loop);
  app.addLoop(loop);
});

export function toggleSound(action = true) {
  loops.forEach(loop => active ? loop.stop() : loop.start());

  if (active && action) {
    audioLoop.stop();

    lamps.forEach(lamp => {
      new Tween(lamp.mesh.material.color).to(new THREE.Color(1, 1, 1), 1000).start();
    });

    new Tween(ambient.native).to({intensity: 0.9}, 1000).start();

    new Tween({vol: 0.2}).to({vol: 0}, 1000).onUpdate(function() {
      sound.setVolume(this.vol)
    }).start();
  } else if (action) {
    new Tween(ambient.native).to({intensity: 0}, 1000).onComplete(() => {
      audioLoop.start();
    }).start();

    new Tween({vol: 0}).to({vol: 0.2}, 1000).onUpdate(function() {
      sound.setVolume(this.vol)
    }).start();
  }

  active = !active;
}

turner.addEventListener('click', toggleSound);

export function turnerWake() {
  sliders.forEach(slider => {
    const offset = +slider.style.height.slice(0, 2);

    new Tween({height: 0}).to({height: offset}, 600)
    .easing(Easing.Cubic.InOut)
    .onUpdate(function() {
      slider.style.transform = `scaleY(${this.height / offset}) translateY(${((offset / this.height) / 2 - 0.5) * 100}%)`; // 300 / 2 - 30
    })
    .onComplete(() => {
      document.querySelector('.render-quality').classList.add('active');
    }).start();
  });
};
