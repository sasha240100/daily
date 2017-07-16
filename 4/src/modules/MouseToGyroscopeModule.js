export default class MouseToGyroscopeModule {
  constructor(enabled) {
    this.enabled = enabled;
  }

  manager(manager) {
    const mouse = manager.use('mouse');

    window.addEventListener('deviceorientation', ({beta, gamma}) => {
      mouse.mouse.x = gamma / 45;
      mouse.mouse.y = (1 - beta / 90) - 0.5;
      mouse.emit('move');
    });
  }
}
