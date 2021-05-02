import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../lib/CGF.js'
import { MyCylinder } from '../primitives/MyCylinder.js';


/**
 * MyPillar
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
export class MyPillar extends CGFobject {
    constructor(scene, slices, position) {
        super(scene)

        this.createTextures()

        this.cylinder = new MyCylinder(scene, this.cylinderAppearance, slices);

        this.x = position[0]
        this.z = position[1]
    }

    createTextures() {
        this.cylinderAppearance = new CGFappearance(this.scene)
        this.cylinderAppearance.setAmbient(0, 0, 0, 1)
        this.cylinderAppearance.setDiffuse(0, 0, 0, 1)
        this.cylinderAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.cylinderAppearance.setEmission(1, 1, 1, 1)
        this.cylinderTex = new CGFtexture(this.scene, "images/pillar.jpg")
        this.cylinderAppearance.setTexture(this.cylinderTex)
    }

    display() {
        this.scene.pushMatrix()
        
        this.cylinderAppearance.apply()

        this.scene.translate(this.x, 0, this.z)

        this.cylinder.display()

        this.scene.defaultAppearance.apply()

        this.scene.popMatrix()
    }

    enableNormalViz() {
        this.cylinder.enableNormalViz()
    }

    disableNormalViz() {
        this.cylinder.disableNormalViz()
    }
}