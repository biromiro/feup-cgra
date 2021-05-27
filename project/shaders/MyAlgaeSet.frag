#ifdef GL_ES
precision highp float;
#endif

varying highp vec3 vNormal;
varying highp vec3 vEyeVec;
varying vec2 vTextureCoord;
varying vec3 vLightDirection;

struct materialProperties {
    vec4 ambient;                   // Default: (0, 0, 0, 1)
    vec4 diffuse;                   // Default: (0, 0, 0, 1)
    vec4 specular;                  // Default: (0, 0, 0, 1)
    vec4 emission;                  // Default: (0, 0, 0, 1)
    float shininess;                // Default: 0 (possible values [0, 128])
};

uniform materialProperties uFrontMaterial;
uniform sampler2D uSampler;
uniform mat4 uMVMatrix;


void main() {

    // Normalize light to calculate lambertTerm
	vec3 L = normalize(vLightDirection.xyz);

    // Transformed normal position
	vec3 N = normalize(vNormal);

    // Lambert's cosine law
	float lambertTerm = dot(N, L);

    vec4 Ia = vec4(0.1, 0.1, 0.1, 1.0);

    vec4 Id = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 Is = vec4(0.0, 0.0, 0.0, 1.0);

    if (lambertTerm > 0.0) {
        Id = vec4(1.0) * uFrontMaterial.diffuse * lambertTerm;

        vec3 E = normalize(vEyeVec);
        vec3 R = reflect(L, N);
        float specular = pow( max( dot(R, E), 0.0 ), 10.0);

        Is = vec4(1.0) * uFrontMaterial.specular * specular;
    }

	vec4 vLighting = Ia + Id + Is;

	gl_FragColor = vLighting;
}