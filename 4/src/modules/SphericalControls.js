export default class SphericalControls {
  constructor(params = {}, patchEvents = true) {
    this.params = Object.assign({
      vmouse: null,
      origin: null
    }, params);

    this.patchEvents = patchEvents;
    this.mouse = this.params.vmouse;
    this.enabled = true;
    this.distance = 10;
    this.magnification = 2;
    this.intensity = 0.4;
  }

  manager(manager) {
    this.camera = manager.get('camera');
    this.mouse = manager.use('mouse');
  }

  integrate(self) {
    const {camera, mouse} = self;

    // const radius = 3;
    const spherical = new THREE.Spherical(self.distance);
    spherical.setFromVector3(new THREE.Vector3(0, 0, self.distance));

    const sphericalOrigin = spherical.clone();

    self.update = () => {
      spherical.radius = self.distance + mouse.mouse.length() * self.magnification;
      spherical.theta = sphericalOrigin.theta + mouse.x*self.intensity;
      spherical.phi = sphericalOrigin.phi - (mouse.y + 0.3)*self.intensity;

      camera.position.setFromSpherical(spherical);

      camera.native.lookAt(new THREE.Vector3(0, 0, -10));
    }

    mouse.on('move', () => {
      if (!self.enabled) return;

      self.update();
    });
  }
}
