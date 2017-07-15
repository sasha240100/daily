varying vec2 vUv;
uniform sampler2D depthBuffer;
uniform sampler2D readBuffer;

void main() {
  float depth = 1.0 - texture2D(depthBuffer, vUv).r;
  vec4 color = texture2D(readBuffer, vUv);

  gl_FragColor = vec4(color.rgb * depth, color.a);
}
