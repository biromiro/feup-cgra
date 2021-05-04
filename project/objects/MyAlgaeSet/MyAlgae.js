import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../../lib/CGF.js'
import { MyStackedPyramid } from '../../primitives/MyStackedPyramid.js';


/**
 * MyAlgae
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyAlgae extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene)

        this.height = Math.random() * (1.5 - 0.5) + 0.5
        this.createTextures()

        this.algae = new MyAlgae(scene, this.algaeAppearance, slices);
    }

    createTextures() {
        this.algaeAppearance = new CGFappearance(this.scene)

        if (this.height > 1.25){
            this.algaeAppearance.setAmbient(0, 0, 0, 1)
            this.algaeAppearance.setDiffuse(0, 0, 0, 1)
            this.algaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
            this.algaeAppearance.setEmission(1, 1, 1, 1)
        }
        else if (this.height > 1.0){
            this.algaeAppearance.setAmbient(0, 0, 0, 1)
            this.algaeAppearance.setDiffuse(0, 0, 0, 1)
            this.algaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
            his.cylinderAppearance.setEmission(1, 1, 1, 1)
        }
        else if(this.height > 0.75) {
            this.algaeAppearance.setAmbient(0, 0, 0, 1)
            this.algaeAppearance.setDiffuse(0, 0, 0, 1)
            this.algaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
            this.algaeAppearance.setEmission(1, 1, 1, 1)
        }
        else{
            this.algaeAppearance.setAmbient(0, 0, 0, 1)
            this.algaeAppearance.setDiffuse(0, 0, 0, 1)
            this.algaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
            this.algaeAppearance.setEmission(1, 1, 1, 1)
        }
    }

    display() {
        this.scene.pushMatrix()

        this.algaeAppearance.apply()

        
        
        this.scene.scale()

        this.algae.display()

        this.scene.defaultAppearance.apply()

        this.scene.popMatrix()
    }

    enableNormalViz() {
        this.algae.enableNormalViz()
    }

    disableNormalViz() {
        this.algae.disableNormalViz()
    }
}