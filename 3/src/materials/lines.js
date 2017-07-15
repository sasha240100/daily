import vertexShader from './glsl/lines.vert';
import fragmentShader from './glsl/lines.frag';

import {app} from '../app';

const lineWidth = 0.04;

const lines = [];
let linesCount = 0;

function addLine(length, lOffset, xOffset = 0) {
  const ll = lOffset + length;

  lines.push(xOffset + lOffset)
  lines.push(lOffset);

  lines.push(xOffset + ll);
  lines.push(ll);

  linesCount += 1;
}

function addTwoLines(xOffset) {
  const l1 = 0.5; // Math.random()
  const d = 0.1;
  const start = 0;

  addLine(l1, start, xOffset);
  addLine(1 - l1 - d, start + l1 + d, xOffset);
}

function addThreeLines(xOffset) {
  const l1 = 0.3; // Math.random() * 0.5
  const l2 = 0.7; // Math.random() * 0.5 + 0.5
  const d = 0.1;

  addLine(l1, 0, xOffset);
  addLine(l2 - l1 - d, l1 + d, xOffset);
  addLine(1 - l2 - d, l2 + d, xOffset);
}

const lineMap = [];

export const material = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.merge([
    THREE.ShaderLib['standard'].uniforms,
    // THREE.UniformsLib.
    {
      resolution: {value: new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      )},

      diffuse: {value: new THREE.Color(0xD4AF37)}, // 0xDAA520

      envMap: {value: null},
      aoMap: {value: WHS.TextureModule.load('./assets/aoMap.jpg')},
      envMapColor: {value: new THREE.Color(0xffffff)},
      envMapIntensity: {value: 2}, // 2
      aoMapIntensity: {value: 0.5},
      // reflectivity: {value: 1},

      lines: {value: lines},
      lineWidth: {value: lineWidth},

      color1: {value: new THREE.Color(0xff0000)},
      color2: {value: new THREE.Color(0x00ff00)},
      time: {value: 0}
    }
  ]),

  vertexShader,
  fragmentShader,
  transparent: true,
  depthFunc: THREE.LessDepth,
  // blending: THREE.MultiplyBlending,
  // depthTest: false,
  // side: THREE.DoubleSide,
  lights: true,
  alphaTest: 0.9,
  overdraw: 2
});

// console.log(WHS.TextureModule.load('/assets/envmap.jpg'));

// console.image(WHS.TextureModule.load('/assets/envmap.jpg').image);

material.defines = {
  'STANDARD': '',
  // PHYSICAL: true,
  linesCount: linesCount,
  USE_ENVMAP: true,
  USE_AOMAP: true,
  ENVMAP_TYPE_CUBE: true
  // USE_COLOR: true
};

new WHS.Loop(() => {
  material.uniforms.time.value += 0.01;
}).start(app);

for (let i = 0; i < 22; i++) {
  if (i - Math.floor(i / 2) * 2 > 0.5) {
    addTwoLines(-1 + i/10);
  } else {
    addThreeLines(-1 + i/10);
  }

  material.uniforms.lines.value = lines;
  material.defines.linesCount = linesCount;
  console.log(linesCount);
}
