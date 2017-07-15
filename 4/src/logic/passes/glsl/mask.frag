uniform sampler2D readBuffer;
uniform sampler2D maskBuffer;
varying vec2 vUv;

void main() {
  vec3 destColor = vec3(0.0);
  vec3 color = texture2D(maskBuffer, vUv).rgb;
  vec3 origin = texture2D(readBuffer, vUv).rgb;

  if (color == origin) destColor = color;

  gl_FragColor = vec4(destColor, 1.0);
}
