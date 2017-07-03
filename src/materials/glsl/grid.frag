varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 mouse;
uniform vec2 tiles;
// uniform bool isOrigin;
uniform float t;
// uniform sampler2D bufferTarget;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: pnoise2 = require(glsl-noise/classic/2d)

vec2 pixelate(vec2 pUv, float xTiles, float yTiles) {
  return vec2(
    floor(pUv.x * xTiles) / xTiles,
    floor(pUv.y * yTiles) / yTiles
  );
}

float ismoothstep(float ex, float ey, float st) {
  return 1.0 - smoothstep(ex, ey, st);
}

void main() {
  float mIntensity = 0.02;

  vec2 vUv2 = vUv;
  vUv2.x *= tiles.x / tiles.y;

  vec2 pUv = pixelate(vUv2, tiles.x, tiles.y);
  float tsin = 60.0 + (t - floor(t)) * 4.0;
  vec2 p2Uv = pixelate(vUv2, tsin * tiles.x / tiles.y, tsin);

  float noisex = snoise2(p2Uv * 200.0) * mIntensity;
  float noisey = snoise2(p2Uv * 200.0 + 10.0) * mIntensity;

  pUv.x += noisex;
  pUv.y += noisey;

  float inten = 0.0;
  float pDist = distance(pUv, vec2(mouse.x * tiles.x / tiles.y, mouse.y));

  inten += ismoothstep(0.0, 0.2, pDist);
  inten -= ismoothstep(0.0, 0.1, pDist);

  inten = max(0.0, inten);

  // vec3 color = vec3(pUv, 0.0);
  vec3 color = vec3(inten);
  // vec4 prevColor = texture2D(bufferTarget, vUv2 * 0.999 + 0.1);

  // if (!isOrigin) color = prevColor.rgb * 0.9;

  gl_FragColor = vec4(color * 2.0, inten);
  // prevColor * 0.5 + vec4(color, 1.0) * 0.1; //prevColor * 0.9 +
}
