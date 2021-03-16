#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	vec4 colorSepia = color;
	colorSepia.r = color.r * 0.393 + color.g *0.769 + color.b * 0.189;
	colorSepia.g = color.r * 0.349 + color.g *0.686 + color.b * 0.168;
	colorSepia.b = color.r * 0.272 + color.g *0.534 + color.b * 0.131;

	gl_FragColor = colorSepia;
}