import {app} from '../app';

const state = app.use('state');
let stateNum = 0;

const states = [
  'preparingAudio',
  'app'
];

window.addEventListener('click', () => {
  if (typeof states[stateNum] == 'undefined') return;
  console.log(states[stateNum]);
  state.to(states[stateNum]);
  stateNum++;
});
