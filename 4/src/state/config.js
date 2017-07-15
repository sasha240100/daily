import {app} from '../app';

const state = app.use('state');

state.default({
  loaded: false,
  soundLoaded: false,
  lampOpacity: 1,
  lampOnScene: false,
  lampLight: 0
});

state.config({
  preparingAudio: {
    loaded: true
  },

  app: {
    soundLoaded: true,
    lampOpacity: 0
  }
});
