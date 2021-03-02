import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangleBigL = new MyTriangleBig(scene);
        this.triangleBigR = new MyTriangleBig(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmallT = new MyTriangleSmall(scene);
        this.triangleSmallB = new MyTriangleSmall(scene);
        this.triangle = new MyTriangle(scene);
    }

    display() {

        const toRadians = (angle) => {
            return Math.PI * 2 * angle / 360;
          };
      
      
          const rotateZAxis = (angle) => {
            return [
              Math.cos(toRadians(angle)), Math.sin(toRadians(angle)), 0, 0,
              -Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1
            ];
          };
      
          const translate = (x, y, z) => {
            return [
              1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              x, y, z, 1
            ];
          };
      
          const scale = (x, y, z) => {
            return [
              x, 0, 0, 0,
              0, y, 0, 0,
              0, 0, z, 0,
              0, 0, 0, 1
            ];
          };
      

        //main square

        this.scene.pushMatrix();

        this.scene.multMatrix(scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2));

        this.scene.multMatrix(rotateZAxis(45));

        this.diamond.display();

        this.scene.popMatrix();

        //big triangle left

        this.scene.pushMatrix();

        this.scene.multMatrix(translate(-0.5, 1, 0));

        this.scene.multMatrix(scale(3 / 4, 3 / 4, 3 / 4));

        this.scene.multMatrix(rotateZAxis(90));

        this.triangleBigL.display();

        this.scene.popMatrix();

        //big triangle right

        this.scene.pushMatrix();

        this.scene.multMatrix(translate(0.5, -1, 0));

        this.scene.multMatrix(scale(3 / 4, 3 / 4, 3 / 4));

        this.scene.multMatrix(rotateZAxis(-90));

        this.triangleBigR.display();

        this.scene.popMatrix();

        //small triangle top

        this.scene.pushMatrix();

        this.scene.multMatrix(translate(0.5, 1, 0));

        this.scene.multMatrix(rotateZAxis(45));

        this.scene.multMatrix(scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2));

        this.triangleSmallT.display();

        this.scene.popMatrix();

        //small triangle bottom

        this.scene.pushMatrix();

        this.scene.multMatrix(translate(-0.5, -1, 0));

        this.scene.multMatrix(rotateZAxis(-135));

        this.scene.multMatrix(scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2));

        this.triangleSmallB.display();

        this.scene.popMatrix();

        //parallelogram

        this.scene.pushMatrix();

        this.scene.multMatrix(translate(0, -0.5, 0));

        this.scene.multMatrix(scale(Math.sqrt(2) / 2, -1 * Math.sqrt(2) / 2, 1));

        this.scene.multMatrix(rotateZAxis(135));

        this.parallelogram.display();

        this.scene.popMatrix();

        //triangle 

        this.scene.pushMatrix();

        this.scene.multMatrix(translate(1, 0.5, 0));

        this.scene.multMatrix(rotateZAxis(-135));

        this.scene.multMatrix(scale(Math.sqrt(2) / 2, Math.sqrt(2) / 2, Math.sqrt(2) / 2));

        this.triangle.display();

        this.scene.popMatrix();
    }

}