#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

varying highp vec3 vLighting;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 fishColor;

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

void main() {

    vec4 color = texture2D(uSampler, vTextureCoord);

	if(vTextureCoord.t > 0.6){
		gl_FragColor = vec4(fishColor.rgb * vLighting, color.a);
	}
    else{
		gl_FragColor = vec4(color.rgb * vLighting, color.a);
    }
}