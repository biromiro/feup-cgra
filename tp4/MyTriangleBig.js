import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			2, 0, 0,	//0
			0, 2, 0,	//1
			-2, 0, 0,	//2
			2, 0, 0,	//3
			0, 2, 0,	//4
			-2, 0, 0	//5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			5, 4, 3
		];

		this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0.00, 0.00, 
			0.50, 0.50,
			1.00, 0.00,
			
			0.00, 0.00, 
			0.50, 0.50,
			1.00, 0.00,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		this.initNormalVizBuffers();

	}
}