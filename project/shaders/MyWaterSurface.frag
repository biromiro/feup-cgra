#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 position;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {

  vec2 factor =
      vec2((timeFactor / 1000.0), (timeFactor / 1000.0)) + vTextureCoord;

  float distRS = texture2D(uSampler2, factor).r; // Distortion in S
  float distGT = texture2D(uSampler2, factor).g; // Distortion in T

  vec2 distCoords = vTextureCoord + (vec2(distRS - 0.5, distGT - 0.5) / 5.0);

  distCoords.s = clamp(distCoords.s, 0.01, 0.99);
  distCoords.t = clamp(distCoords.t, 0.01, 0.99);

  gl_FragColor = texture2D(uSampler, distCoords);
}