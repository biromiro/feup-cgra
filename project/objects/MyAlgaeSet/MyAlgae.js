import { CGFappearance, CGFobject, CGFshader } from '../../../lib/CGF.js'
import { MyStackedPyramid } from '../../primitives/MyStackedPyramid.js';


/**
 * MyAlgae
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyAlgae extends CGFobject {
    constructor(scene, maxNr, minNr, maxHeight, minHeight, radius) {
        super(scene)

        this.algae = new MyStackedPyramid(scene, 4, 4);
        this.algaeVec = []
        this.algaePos = []
        this.populateAlgae(maxNr, minNr, maxHeight, minHeight, radius)
        this.createTextures()


    }

    getNr = (max, min) => (Math.random() * (max - min) + min)

    getPos = (radius) => [Math.random() * radius, Math.random() * radius]

    populateAlgae(maxNr, minNr, maxHeight, minHeight, radius) {
        let nr = this.getNr(maxNr, minNr)
        for (let i = 0; i < nr; i++) {
            this.algaeVec.push(this.getNr(maxHeight, minHeight))
            this.algaePos.push(this.getPos(radius))
        }
    }

    createTextures() {
        this.smallAlgaeAppearance = new CGFappearance(this.scene)
        this.smallAlgaeAppearance.setAmbient(1, 0, 0, 1)
        this.smallAlgaeAppearance.setDiffuse(1, 0, 0, 1)
        this.smallAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.smallAlgaeAppearance.setEmission(0, 0, 0, 1)


        this.mediumAlgaeAppearance = new CGFappearance(this.scene)
        this.mediumAlgaeAppearance.setAmbient(0, 1, 0, 1)
        this.mediumAlgaeAppearance.setDiffuse(0, 0, 0, 1)
        this.mediumAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.mediumAlgaeAppearance.setEmission(0, 0, 0, 1)

        this.bigAlgaeAppearance = new CGFappearance(this.scene)
        this.bigAlgaeAppearance.setAmbient(0, 0, 1, 1)
        this.bigAlgaeAppearance.setDiffuse(0, 0, 0, 1)
        this.bigAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.bigAlgaeAppearance.setEmission(0, 0, 0, 1)

        this.biggerAlgaeAppearance = new CGFappearance(this.scene)
        this.biggerAlgaeAppearance.setAmbient(1, 1, 0, 1)
        this.biggerAlgaeAppearance.setDiffuse(0, 0, 0, 1)
        this.biggerAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.biggerAlgaeAppearance.setEmission(0, 0, 0, 1)

    }

    display() {
        this.scene.pushMatrix()

        

        this.scene.rotate(Math.PI / 2, 0, 1, 0)

        for (let i = 0; i < this.algaeVec.length; i++) {
            this.scene.pushMatrix()
            let height = this.algaeVec[i]
            let min = Math.min(...this.algaeVec)
            let interval = Math.max(...this.algaeVec) / 4

            
            if (height > min + 3 * interval) {
                this.biggerAlgaeAppearance.apply()
            }
            else if (height > min + 2 * interval) {
                this.bigAlgaeAppearance.apply()
            }
            else if (height > min + interval) {
                this.mediumAlgaeAppearance.apply()
            }
            else {
                this.smallAlgaeAppearance.apply()
            }

            
            this.scene.translate(this.algaePos[i][0], height, this.algaePos[i][1])

            this.scene.scale(0.1, height, 0.1)

            this.algae.display()

            this.scene.popMatrix()
        }


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