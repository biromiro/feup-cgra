#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 position;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {

  vec3 texColor = texture2D(uSampler, vTextureCoord).rgb;

  gl_FragColor = vec4(texColor, 1.0);
}