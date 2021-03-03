import { CGFobject } from '../lib/CGF.js';

/**
 * My Parallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,  //0
            2, 0, 0,  //1
            3, 1, 0,  //2
            1, 1, 0,  //3

            0, 0, 0,  //4
            2, 0, 0,  //5
            3, 1, 0,  //6
            1, 1, 0,  //7

        ];

        this.indices = [
            0, 1, 2,
            2, 3, 0,
            7, 6, 4,
            6, 5, 4
        ];

        this.normals = [
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
        this.initNormalVizBuffers();

    }
}