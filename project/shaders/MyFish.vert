attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform highp vec4 lightPosition;

varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

void main(void) {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;
	// Apply lighting effect

	highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
	highp vec3 directionalLightColor = vec3(1, 1, 1);

	highp float directional = max(dot(normalize(lightPosition.xyz), aVertexNormal), 0.0);
	vLighting = ambientLight + (directionalLightColor * directional);
}

