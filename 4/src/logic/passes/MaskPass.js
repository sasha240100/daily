import vertexShader from './glsl/mask.vert';
import fragmentShader from './glsl/mask.frag';

const material = new THREE.ShaderMaterial({
  uniforms: {
    readBuffer: new THREE.Uniform(null),
    maskBuffer: new THREE.Uniform(null)
  },

  vertexShader,
  fragmentShader
});

export default class MaskPass extends POSTPROCESSING.ShaderPass {
  constructor(scene, camera, maskLayer = 1) {
    super(material, 'readBuffer');

    // var

    this.maskLayer = maskLayer;
    this.maskScene = scene;
    this.maskCamera = camera;
    this.maskTarget = new THREE.WebGLRenderTarget();
  }

  initialise(renderer, alpha) {
    const size = renderer.getSize();
    this.maskTarget.setSize(size.width, size.height);

    super.initialise(renderer, alpha);
  }

  render(renderer, readBuffer, writeBuffer) {
    this.maskCamera.layers.set(this.maskLayer);

    // this.maskTarget.depthTexture = readBuffer.depthTexture;
    renderer.setRenderTarget(this.maskTarget);
    renderer.clear();
    renderer.render(this.maskScene, this.maskCamera, this.maskTarget);

    this.maskCamera.layers.set(0);

    if (material.uniforms.maskBuffer)
      material.uniforms.maskBuffer.value = this.maskTarget.texture;

    super.render(renderer, readBuffer, writeBuffer);
  }
}
