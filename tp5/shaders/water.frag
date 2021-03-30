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
      vec2((timeFactor / 100.0), (timeFactor / 100.0)) + vTextureCoord;

  vec4 color = texture2D(uSampler, factor + vTextureCoord);

  float colorVal = texture2D(uSampler2, factor).b * 0.20;

  color += vec4(colorVal, colorVal, colorVal, 1.0);

  gl_FragColor = color;
}