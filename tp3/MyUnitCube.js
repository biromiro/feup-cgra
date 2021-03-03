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
            0.5, 0.5, -0.5,	    //3
            -0.5, -0.5, 0.5,    //4
            0.5, -0.5, 0.5,     //5
            -0.5, 0.5, 0.5,     //6
            0.5, 0.5, 0.5,      //7

            -0.5, -0.5, -0.5,	//8
            0.5, -0.5, -0.5,	//9
            -0.5, 0.5, -0.5,	//10
            0.5, 0.5, -0.5,	    //11
            -0.5, -0.5, 0.5,    //12
            0.5, -0.5, 0.5,     //13
            -0.5, 0.5, 0.5,     //14
            0.5, 0.5, 0.5,      //15

            -0.5, -0.5, -0.5,	//16
            0.5, -0.5, -0.5,	//17
            -0.5, 0.5, -0.5,	//18
            0.5, 0.5, -0.5,	    //19
            -0.5, -0.5, 0.5,    //20
            0.5, -0.5, 0.5,     //21
            -0.5, 0.5, 0.5,     //22
            0.5, 0.5, 0.5,      //23

        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            2, 1, 0,  // XY Bottom
            2, 3, 1,  // XY bottom

            8, 9, 13,  // XZ 1
            13, 12, 8,  // XZ 1

            17, 19, 21,  // YZ 1
            23, 21, 19,  // YZ 1

            16, 20, 22,  // YZ 2
            22, 18, 16,  // YZ 2

            10, 14, 15,  // XZ 2
            15, 11, 10,  // XZ 2

            4, 5, 6,    // XY top
            7, 6, 5     // XY top


        ];

        this.normals = [

            0, 0, -1,  //XY Plane
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,

            -1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            1, 0, 0,

        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}