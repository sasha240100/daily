export default class CombinePass extends POSTPROCESSING.Pass {
  constructor(renderTarget) {
    super();

    this.material = new POSTPROCESSING.CombineMaterial();
    this.material.uniforms.texture2.value = renderTarget.texture;

    this.quad.material = this.material;
  }

  render(renderer, readBuffer, writeBuffer) {
    const {scene, camera, material} = this;
    material.uniforms.texture1.value = readBuffer;

    renderer.render(scene, camera, this.renderToScreen ? null : writeBuffer);
  }
}
