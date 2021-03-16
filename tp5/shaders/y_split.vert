attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 coords;

void main() {
    coords = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	gl_Position =  coords;
}
