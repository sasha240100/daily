export default class TogglePass {
  constructor(pass, enabled = true) {
    this.pass = pass;
    this.enabled = enabled;

    this.quad = this.pass.quad;
    this.needsSwap = this.pass.needsSwap;
    this.name = this.pass.name;
  }

  initialise(renderer, alpha) {
    this.pass.initialise(renderer, alpha);
  }

  setSize(...data) {
    this.pass.setSize(...data);
  }

  render(renderer, readBuffer, writeBuffer) {
    if (this.enabled)
      this.pass.render(renderer, readBuffer, this.renderToScreen ? null : writeBuffer);
  }

  control(cb) {
    cb(this);
    return this;
  }
}
