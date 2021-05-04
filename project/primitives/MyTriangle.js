import { CGFobject } from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene, appearance) {
		super(scene);
		this.appearance = appearance
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			0, 0, 1,	//1
			1, 0, 1,	//2

			0, 0, 0,	//3
			0, 0, 1,	//4
			1, 0, 1,	//5

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			5, 4, 3
		];

		this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		this.initNormalVizBuffers();

	}

	display() {
		this.appearance.apply()
		super.display()
		this.scene.defaultAppearance.apply()
	}
}
