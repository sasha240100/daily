import {app} from '../app';
import {lamps} from '../elements/lamps';
import {scene} from '../elements/scene';
import {ambient, point} from '../lights/dinosaur';
import {sound} from '../logic/audio';

import {Tween, Easing} from 'tween.js';

const state = app.use('state');

let pageLoaded = false, soundLoaded = false;
const preparingAudio = document.querySelector('.preparing-audio');

const forlamp = cb => {
  for (let i = 0; i < lamps.length; i++) cb(lamps[i], i);
};

state.update({
  loaded: loaded => {
    if (pageLoaded || loaded == false) return;
    pageLoaded = true;

    const time = 1200;

    forlamp((lamp, i) => {
      new Tween(lamp.position).to({x: i % 2 === 0 ? 10 : -10}, time)
      .delay(1000)
      .easing(Easing.Cubic.InOut)
      .start()
      .chain(
        new Tween(lamp.mesh.rotation).to({z: i === 3 || i === 0 ? Math.PI / 4 : -Math.PI / 4}, time)
        .easing(Easing.Cubic.InOut)
        .onStart(() => {
          new Tween(lamp.position).to({y: lamp.position.y + (i === 3 || i === 2 ? 4 : -4)}, time)
          .easing(Easing.Cubic.InOut)
          .start()
        })
        .chain(
          new Tween(lamp.position).to(
            {
              y: lamp.position.y + (i === 3 || i === 2 ? 4 : -4) + (i % 2 === 0 ? 2 : -2),
              x: i % 2 === 0 ? 8 : -8
            },
            time
          )
          .easing(Easing.Cubic.InOut)
          .onComplete(() => {
            lamp.blink();
            preparingAudio.classList.add('active');

            setTimeout(() => {
              preparingAudio.classList.add('active-text');
              sound.play();
            }, 2000);
          })
        )
      )
    });
  },

  soundLoaded: loaded => {
    if (soundLoaded || loaded == false) return;
    soundLoaded = true;

    const lampAnimation = [];

    forlamp(lamp => {
      lampAnimation.push(
        new Promise(resolve => {
          const lstate = lamp.manager.use('state');

          new Tween(lamp.params).to(
            {offset: 0.5},
            1000
          )
          .onUpdate(function() {
            lstate.set({offset: this.offset});
          })
          .easing(Easing.Quartic.InOut)
          .onStart(() => {
            preparingAudio.classList.remove('active');
            preparingAudio.classList.remove('active-text');

            preparingAudio.classList.add('inactive');
          })
          .onComplete(() => resolve())
          .start()
        })
      );
    });

    Promise.all(lampAnimation).then(() => {
      state.set({
        lampOpacity: 1,
        lampOffset: 0,
        lampPosition: 'scene'
      });

      forlamp(lamp => {
        lamp.blink();
      });
    });
  },

  lampOpacity: opacity => {
    forlamp(lamp => {
      new Tween(lamp.lampMaterial).to({opacity}, 1000)
        .onUpdate(function () {
          lamp.sideMaterial.opacity = this.opacity;
        })
        .easing(Easing.Quartic.InOut)
        .start();
    });
  },

  lampOffset: offset => {
    forlamp(lamp => {
      const lstate = lamp.manager.use('state');
      lstate.set({offset});
    });
  },

  lampPosition: name => {
    const dataConfig = {
      'scene'
    };

  }
})
