#ifdef GL_ES
precision highp float;
#endif

varying highp vec3 vNormal;
varying highp vec3 vEyeVec;
varying vec2 vTextureCoord;
varying vec3 vLightDirection;

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
        Id = vec4(1.0) * lambertTerm;

        vec3 E = normalize(vEyeVec);
        vec3 R = reflect(L, N);
        float specular = pow( max( dot(R, E), 0.0 ), 10.0);

        Is = vec4(1.0) * specular;
    }
    
    vec4 vLighting = Ia + Id + Is;

    vec4 color = texture2D(uSampler, vTextureCoord);

	gl_FragColor = vec4(color.rgb * vLighting.rgb, color.a);
}