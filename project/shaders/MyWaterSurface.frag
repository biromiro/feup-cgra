#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 position;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {

  /*
  vec3 texColor = texture2D(uSampler, vTextureCoord).rgb;

  vec3 colorOffset = texture2D(uSampler2, vTextureCoord).rgb;

  vec4 color = vec4(vec3(texColor * colorOffset), 1.0);
  */

  //gl_FragColor = color;
  gl_FragColor = texture2D(uSampler, vTextureCoord);
}