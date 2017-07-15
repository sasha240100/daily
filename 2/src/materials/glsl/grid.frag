varying float depth;

void main() {
  vec4 blue = vec4(0.0, 1.0, 1.0, 1.0);
  vec4 white = vec4(1.0);

  gl_FragColor = mix(blue, white, smoothstep(0.0, 10.0, depth))
    * vec4(vec3(smoothstep(0.0, 10.0, depth)), 1.0);
}
