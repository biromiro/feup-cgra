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
uniform float timeFactor;

void main(void) {
    vec4 tmp = aVertexPosition;

    if(tmp.y > 0.15)
    tmp.x = tmp.x + sin(timeFactor + tmp.y) * tmp.y ;
    
    // Transformed Vertex position
    vec4 vertex = uMVMatrix * tmp;
    gl_Position = uPMatrix * vertex;
    vTextureCoord = aTextureCoord;

    vEyeVec = -vec3(vertex.xyz);

    vNormal = vec3(uNMatrix * vec4(aVertexNormal, 1.0));

    vLightDirection = normalize(lightPos.xyz - vertex.xyz);
}

