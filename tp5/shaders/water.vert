attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {

  vec3 offset = vec3(0.0, 0.0, 0.0);

  vTextureCoord = aTextureCoord;

  vec2 factor = vec2(0.0, (timeFactor / 100.0)) + vTextureCoord;

  if (factor.y > 1.0) {
    factor.y -= 1.0;
  }

  offset.z = texture2D(uSampler2, factor).b * 0.08;

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
