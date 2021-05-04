attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;
uniform float maxHeight;

void main() {

  vTextureCoord = aTextureCoord;

  vec3 pos = aVertexPosition + vec3(0.0, texture2D(uSampler2, vTextureCoord).g * 3.0 - 1.0, 0.0);
  
  pos.y = min(pos.y, maxHeight);
  pos.y = max(pos.y, -maxHeight);

  gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
}
