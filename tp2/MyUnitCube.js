import { CGFobject } from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, -0.5, -0.5,	//0
            0.5, -0.5, -0.5,	//1
            -0.5, 0.5, -0.5,	//2
            0.5, 0.5, -0.5,	//3
            -0.5, -0.5, 0.5,    //4
            0.5, -0.5, 0.5,    //5
            -0.5, 0.5, 0.5,    //6
            0.5, 0.5, 0.5     //7
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,  // XY Bottom
            1, 3, 2,  // XY bottom

            2, 1, 0,  // XY Bottom
            2, 3, 1,  // XY bottom

            0, 1, 5,  // XZ 1
            0, 4, 5,  // XZ 1

            5, 1, 0,  // XZ 1
            5, 4, 0,  // XZ 1

            1, 3, 5,  // YZ 1
            3, 5, 7,  // YZ 1

            5, 3, 1,  // YZ 1
            7, 5, 3,  // YZ 1

            0, 2, 6,  // YZ 2
            0, 4, 6,  // YZ 2

            6, 2, 0,  // YZ 2
            6, 4, 0,  // YZ 2


            2, 3, 7,  // XZ 2
            2, 6, 7,  // XZ 2

            7, 3, 2,  // XZ 2
            7, 6, 2,  // XZ 2

            4, 5, 6,    // XY top
            5, 6, 7,     // XY top

            6, 5, 4,    // XY top
            7, 6, 5     // XY top

        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}