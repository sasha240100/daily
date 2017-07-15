uniform sampler2D readBuffer;
varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(readBuffer, vUv) - 0.01;
  // gl_FragColor = vec4(0.5);
}
