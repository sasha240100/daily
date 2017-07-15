export default class RTPass extends POSTPROCESSING.Pass {
  constructor(pass, buffers = {}, fix = () => {}) {
    super();

    this.pass = pass;

    this.buffers = Object.assign({
      read: false,
      write: false
    }, buffers);

    this.quad = this.pass.quad;

    fix(pass);
  }

  initialise(renderer, alpha) {
    const {width, height} = renderer.getSize();

    for (const buffName in this.buffers) {
      const buff = this.buffers[buffName];
      if (buff && buff.setSize) buff.setSize(width, height);
    }

    this.pass.initialise(renderer, alpha);
  }

  dispose(...data) {
    this.pass.dispose(...data);
  }

  setSize(...data) {
    this.pass.setSize(...data);
  }

  render(renderer, readBuffer, writeBuffer) {
    const {read, write} = this.buffers;

    this.pass.render(
      renderer,
      read ? this.buffers['read'] : readBuffer,
      write ? this.buffers['write'] : this.renderToScreen ? null : writeBuffer
    );
  }
}
