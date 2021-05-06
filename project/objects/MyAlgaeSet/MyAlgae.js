import { CGFappearance, CGFobject, CGFshader } from '../../../lib/CGF.js'
import { MyStackedPyramid } from '../../primitives/MyStackedPyramid.js';


/**
 * MyAlgae
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyAlgae extends CGFobject {
    constructor(scene, maxNr, minNr, maxHeight, minHeight, radius, size, set) {
        super(scene)
        this.size = size
        this.radius = radius
        this.set = set
        this.algae = new MyStackedPyramid(scene, 4, 4);
        this.algaeVec = []
        this.algaePos = []
        this.populateAlgae(maxNr, minNr, maxHeight, minHeight, radius)

        this.min = Math.min(...this.algaeVec)
        this.interval = Math.max(...this.algaeVec) / 4

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

    display() {
        this.scene.pushMatrix()

        this.scene.rotate(Math.PI / 4, 0, 1, 0)

        this.scene.translate(-this.radius / 2, 0, -this.radius / 2)

        

        for (let i = 0; i < this.algaeVec.length; i++) {
            this.scene.pushMatrix()
            let height = this.algaeVec[i]

            if (this.set != undefined) {

                if (height > this.min + 3 * this.interval) {
                    this.set.biggerAlgaeAppearance.apply()
                }
                else if (height > this.min + 2 * this.interval) {
                    this.set.bigAlgaeAppearance.apply()
                }
                else if (height > this.min + this.interval) {
                    this.set.mediumAlgaeAppearance.apply()
                }
                else {
                    this.set.smallAlgaeAppearance.apply()
                }
            }

            this.scene.translate(this.algaePos[i][0], height, this.algaePos[i][1])

            this.scene.scale(this.size, height, this.size)

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