export class RenderBufferModule {
  constructor(width, height, {
    helper = null,
    scene = new THREE.Scene(),
    camera: cameraObject,
    fixCamera =  true
  }) {
    this.scene = scene;
    this.camera = cameraObject ? cameraObject : new THREE.OrthographicCamera(-width / 2, width / 2, -height / 2, height / 2, -1000, 1000);
    this.geometry = new THREE.PlaneGeometry(width, height);
    this.helper = helper;

    this.app = null;
    this.renderer = null;
    this.buffers = [];
    this.data = {};
    this.size = {width, height};

    const {camera} = this;

    if (fixCamera) {
      camera.position.set(0, 0, -1);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.rotation.z -= Math.PI;
    }

    this.scene.add(this.camera);
  }

  manager(manager) {
    this.renderer = manager.get('renderer');
    this.app = manager.handler;

    const size = this.renderer.getSize()
    if (this.helper) this.helper.setSize(size.width, size.height);
  }

  defineBuffers(buffers = []) {
    if (this.helper)
      buffers.forEach(buff => {
        this.buffers.push(buff);
        this.helper.attach(buff, `renderTarget${this.buffers.length}`)
      });
    else
      this.buffers = this.buffers.concat(buffers);
  }

  setSize(width, height) {
    this.buffers.forEach(buff => {
      buff.setSize(width, height);
    });
  }

  createRT(options) {
    const {width, height} = this.size;

    return new THREE.WebGLRenderTarget(width, height, Object.assign({
      minFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
      depthBuffer: false
    }, options));
  }

  swapBuffers() {
    this.buffers.reverse();
  }

  offsetBuffers(value = 1) {
    for (var i = 0; i < value; i++)
        this.buffers.unshift(this.buffers.pop());
  }

  renderBuffer(bufferIndex) {
    this.renderer.render(this.scene, this.camera, this.buffers[bufferIndex]);
  }

  setup(cb) {
    return new Promise(res => {
      res(cb(this));
    });
  }

  update(cb) {
    new WHS.Loop(() => cb(this.data, this)).start(this.app);
    if (this.helper) new WHS.Loop(() => this.helper.update()).start(this.app);
  }
}
