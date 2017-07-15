import {app} from '../app';
import {lamps} from '../elements/lamps';
import {scene} from '../elements/scene';
import {ambient, point} from '../lights/dinosaur';
import {sound, audioLoader} from '../logic/audio';
import {lampData} from './data/lamp-data';
import {soundLoader} from '../modules';

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
    const tweens = [];

    forlamp((lamp, i) => {
      tweens.push(
        new Promise(resolve => {
          new Tween(lamp.position).to({x: i % 2 === 0 ? 10 : -10}, time)
          // .delay(1000)
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

                resolve();

                // setTimeout(() => {
                //   preparingAudio.classList.add('active-text');
                //   sound.setVolume(0.2);
                //   sound.play();
                // }, 2000);
              })
            )
          )
        })
      )
    });

    Promise.all(tweens).then(() => {
      audioLoader.load('./assets/background.mp3', buffer => {
        sound.setBuffer( buffer );
        sound.setLoop(true);

        preparingAudio.classList.add('active-text');
        sound.setVolume(0.2);
        sound.play();

        soundLoader.resolve('sound');
      });
    })

    soundLoader.on('complete', () => {
      setTimeout(() => state.to('app'), 5000);
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
      scene.addTo(app);

      state.set({
        lampOpacity: 1,
        lampOffset: 0,
        lampPosition: {
          config: 'beforeScene',
          time: 0
        }
      });

      let delay = 0;

      forlamp((lamp, i) => {
        lamp.scale.set(0.5, 0.5, 0.5);

        lamp.moveDelay = delay;
        delay += 150;
      });

      state.set({
        lampPosition: {
          config: 'scene',
          time: 2000
        },

        lampLight: 0.1
      });

      new Tween(ambient.native).to({intensity: 0.9}, 1000).delay(3400).start();
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

  lampLight: intensity => {
    forlamp((lamp, i) => {
      setTimeout(() => {
        if (intensity > 0) {
          lamp.blink();
          lamp.fly(true);
        }
      }, lamp.moveDelay + 3000);

      new Tween(lamp.light.native).to({intensity}, 2000).delay(lamp.moveDelay + 1000).start();
    });
  },

  lampPosition: ({config, time}) => {
    const conf = lampData[config];

    forlamp((lamp, i) => {
      const ltime = time.length ? time[i] : time;

      if (ltime == 0) {
        lamp.position.copy(conf.position[i]);
        lamp.mesh.rotation.copy(conf.rotation[i]);

        return;
      }

      new Tween(lamp.position).to(conf.position[i].clone(), ltime)
        .delay(lamp.moveDelay)
        .easing(Easing.Cubic.InOut)
        .start();

        console.log(lamp.mesh.native.rotation);
      new Tween(lamp.mesh.rotation.clone()).to(conf.rotation[i].clone(), ltime)
        .onUpdate(function() {
          lamp.mesh.rotation.set(this.x, this.y, this.z);
        })
        .delay(lamp.moveDelay)
        .easing(Easing.Cubic.InOut)
        .start();
    });
  }
})
