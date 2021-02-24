import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitQuadCube
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
    }

    display() {
    
        //main square

    

        this.scene.pushMatrix();
        
            this.scene.translate(0, 0, 0.5);
            
            this.quad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        
            this.scene.translate(0,0,-0.5);
            
            this.quad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
            
        this.scene.pushMatrix();
            
        this.scene.translate(0,-0.5,0);

        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.quad.display();
    
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0,0.5,0);

        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.quad.display();

        this.scene.popMatrix()
          
        this.scene.popMatrix();

        this.scene.pushMatrix();
            
        this.scene.pushMatrix();
            
        this.scene.translate(-0.5,0,0);

        this.scene.rotate(Math.PI/2, 0, 1, 0);

        this.quad.display();
    
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0.5,0,0);

        this.scene.rotate(Math.PI/2, 0, 1, 0);

        this.quad.display();

        this.scene.popMatrix()
      
      this.scene.popMatrix();
        }
}