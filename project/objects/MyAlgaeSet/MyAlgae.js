import { CGFappearance, CGFobject, CGFshader } from '../../../lib/CGF.js'
import { MyStackedPyramid } from '../../primitives/MyStackedPyramid.js';


/**
 * MyAlgae
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyAlgae extends CGFobject {
    constructor(scene, max, min) {
        super(scene)

        this.algae = new MyStackedPyramid(scene, 4, 8);
        this.algaeVec = []
        this.populateAlgae(Math.ceil(Math.random() * (max - min)) + min)
        this.createTextures()


    }

    getHeight = () => Math.random() * (1.5 - 0.5) + 0.5

    populateAlgae(algaeNr) {
        for (let i = 0; i < algaeNr; i++) {
            this.algaeVec.push(this.getHeight())
        }
    }

    createTextures() {
        this.smallAlgaeAppearance = new CGFappearance(this.scene)
        this.smallAlgaeAppearance.setAmbient(0, 0, 0, 1)
        this.smallAlgaeAppearance.setDiffuse(0, 0, 0, 1)
        this.smallAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.smallAlgaeAppearance.setEmission(1, 1, 1, 1)


        this.mediumAlgaeAppearance = new CGFappearance(this.scene)
        this.mediumAlgaeAppearance.setAmbient(0, 0, 0, 1)
        this.mediumAlgaeAppearance.setDiffuse(0, 0, 0, 1)
        this.mediumAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.mediumAlgaeAppearance.setEmission(1, 1, 1, 1)
        
        this.bigAlgaeAppearance = new CGFappearance(this.scene)
        this.bigAlgaeAppearance.setAmbient(0, 0, 0, 1)
        this.bigAlgaeAppearance.setDiffuse(0, 0, 0, 1)
        this.bigAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.bigAlgaeAppearance.setEmission(1, 1, 1, 1)

        this.biggerAlgaeAppearance = new CGFappearance(this.scene)
        this.biggerAlgaeAppearance.setAmbient(0, 0, 0, 1)
        this.biggerAlgaeAppearance.setDiffuse(0, 0, 0, 1)
        this.biggerAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.biggerAlgaeAppearance.setEmission(1, 1, 1, 1)
        /*
                if (this.height > 1.25) {
                   
                }
                else if (this.height > 1.0) {
                   
                }
                else if (this.height > 0.75) {
                   
                else {
        
                }
                */
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