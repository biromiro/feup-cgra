attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uNMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying highp vec2 vTextureCoord;
varying highp vec3 vNormal;
varying highp vec3 vEyeVec;
varying highp vec3 vLightDirection;

uniform vec4 lightPos;
uniform sampler2D uSampler2;

void main(void) {

    vTextureCoord = aTextureCoord;

    vec3 pos = aVertexPosition.xyz + aVertexNormal * (0.25 * texture2D(uSampler2, vTextureCoord).g  - 0.125);
    

    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);

    vec4 vertex = uMVMatrix * vec4(pos, 1.0);

    vEyeVec = -vec3(vertex.xyz);

    vNormal = vec3(uNMatrix * vec4(aVertexNormal, 1.0));

    vLightDirection = normalize(lightPos.xyz - vertex.xyz);
 
}