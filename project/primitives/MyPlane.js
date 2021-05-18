import { CGFobject } from '../../lib/CGF.js';
/**
* MyPlane
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param size - the size of the plane
 * @param minS - minimum texture coordinate in S
 * @param maxS - maximum texture coordinate in S
 * @param minT - minimum texture coordinate in T
 * @param maxT - maximum texture coordinate in T
*/
export class MyPlane extends CGFobject {
	constructor(scene, nrDivs, size, minS, maxS, minT, maxT) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.size = size || 1;
		this.patchLength = this.size / nrDivs;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / nrDivs * Math.floor(nrDivs / 20);
		this.w = (this.maxT - this.minT) / nrDivs * Math.floor(nrDivs / 20);
		this.initBuffers();
	}
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var zCoord = this.size / 2;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -this.size / 2;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, 0, zCoord);
				this.normals.push(0, 1, 0);
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
				xCoord += this.patchLength;
			}
			zCoord -= this.patchLength;
		}
		// Generating indices
		this.indices = [];

		var ind = 0;
		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind + this.nrDivs + 1);
				this.indices.push(ind);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() {
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() {
		this.primitiveType = this.scene.gl.LINES;
	};

}
