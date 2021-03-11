import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, purple) {
		super(scene);
		this.initBuffers(purple);
	}

	initBuffers(purple) {
		this.vertices = [
			1, 0, 0,	//0
			0, 1, 0,	//1
			-1, 0, 0,	//2
			1, 0, 0,	//3
			0, 1, 0,	//4
			-1, 0, 0	//5
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

		if(purple == 0){
			this.texCoords = [
				0.25, 0.75,
				0.50, 0.50,
				0.75, 0.75,
				0.25, 0.75,
				0.50, 0.50,
				0.75, 0.75,
			];
		}
		else {
			this.texCoords = [
				0.00, 0.00, 
				0.25, 0.25,
				0.00, 0.50,
				
				0.00, 0.00, 
				0.25, 0.25,
				0.00, 0.50,
			];
		}
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		this.initNormalVizBuffers();

	}
}