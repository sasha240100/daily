uniform float time;
varying float depth;

#pragma glslify: snoise2 = require('glsl-noise/simplex/2d');
#pragma glslify: ease = require(glsl-easings/quadratic-in-out)

void main() {
  vec4 vPosition = vec4(position, 1.0);

  // vPosition.z = sin(uv.x * 10.0 + time) * 2.0 * sin(uv.y * 10.0 + time) * 2.0;
  vec2 vUv = uv;
  vPosition.z = snoise2(vUv + time / 2.0) * 10.0;
  depth = vPosition.z;

  float intensity = 0.02 * length(vPosition) / pow(5.0, 0.5);
  float progress = sin(time * 0.5) / 2.0 + 0.5;
  progress = sin(ease(progress) * 4.0);

  vPosition.x *= progress * intensity + 1.0;
  vPosition.y *= progress * intensity + 1.0;

  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vPosition;
}
