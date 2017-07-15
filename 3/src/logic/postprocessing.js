import {processor, rendering} from '../modules';

import vertexShader from './glsl/effect.vert';
import fragmentShader from './glsl/effect.frag';

class RTPass extends POSTPROCESSING.Pass {
  constructor(pass, buffers = {}) {
    super();

    this.pass = pass;

    this.buffers = Object.assign({
      read: false,
      write: false
    }, buffers);

    this.quad = this.pass.quad;
    // this.renderBuffer = renderTarget;
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

    // if (this.buffers.depth) {
    //   this.renderBuffer.depthTexture = readBuffer.depthTexture;
    // }

    this.pass.render(
      renderer,
      read ? this.buffers['read'] : readBuffer,
      write ? this.buffers['write'] : this.renderToScreen ? null : writeBuffer
    );
  }
}

const depthTarget = new THREE.WebGLRenderTarget();
const clipTarget = new THREE.WebGLRenderTarget();
const bloomTarget = new THREE.WebGLRenderTarget();
// renderTarget.depthTexture = depthTarget.texture;

const effect = new THREE.ShaderMaterial({
  uniforms: {
    depthBuffer: {
      value: depthTarget.texture
    },
    readBuffer: {value: null}
  },
  vertexShader,
  fragmentShader
});

// effect.needsSwap = true;

const bloomPass = new POSTPROCESSING.BloomPass({
  // resolutionScale: 10
  // kernelSize: KernelSize.VERY_SMALL
  intensity: 2,
  // screenMode: true,
  resolutionScale: 0.14,
  strength: 1.0,
  distinction: 4.0,
  screenMode: true
});

bloomPass.combineMaterial.defines.SCREEN_MODE = 0;
bloomPass.combineMaterial.uniforms.opacity1.value = 0;
// console.log(bloomPass.combineMaterial.uniforms.opacity1.value);

// const combineEffect = new POSTPROCESSING.CombineMaterial();

// combineEffect.texture1

class CombinePass extends POSTPROCESSING.Pass {
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

processor
  .render()
  .pass(
    new RTPass(
      new POSTPROCESSING.DepthPass(),
      {write: depthTarget}
    )
  )
  .pass(
    new RTPass(
      new POSTPROCESSING.ShaderPass(effect, 'readBuffer'),
      {write: clipTarget},
    )
  )
  .pass(
    new RTPass(
      bloomPass,
      {read: clipTarget, write: bloomTarget}
    )
  )
  .pass(
    new POSTPROCESSING.SMAAPass(window.Image)
  )
  .pass(new CombinePass(bloomTarget))
  .renderToScreen();
