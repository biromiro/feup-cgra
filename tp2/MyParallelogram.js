import {CGFobject} from '../lib/CGF.js';

/**
 * My Parallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene){
        super(scene);
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [
            0,0,0, //0
            2,0,0, //1
            1,1,0, //2
            3,1,0, //3
            0,2,0, //4
            1,3,0  //5
        ];
        
        this.indices = [
            0,1,2,
            2,1,0,
            1,2,3,
            3,2,1,
            0,2,4,
            4,2,0,
            2,4,5,
            5,4,2
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}