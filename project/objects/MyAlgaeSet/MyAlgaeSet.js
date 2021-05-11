import { CGFappearance, CGFshader } from '../../../lib/CGF.js'
import { MyAlgae } from './MyAlgae.js';


/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
 export class MyAlgaeSet {
    constructor(scene, num, maxNr, minNr, maxHeight, minHeight, radius, size) {
      this.scene = scene
      this.algae = []
      this.algaePos = []

      this.createAlgae(num, maxNr, minNr, maxHeight, minHeight, radius, size)
      this.createTextures()

      this.shader = new CGFshader(this.scene.gl, "./shaders/MyAlgaeSet.vert", "./shaders/MyAlgaeSet.frag")
    }

    createAlgae(num, maxNr, minNr, maxHeight, minHeight, radius, size){
        for(let i = 0; i < num; i++){
            this.algae.push(new MyAlgae(this.scene, maxNr, minNr, maxHeight, minHeight, radius, size, this))
            this.algaePos.push([Math.floor(Math.random() * (25 - (-25) + 1) ) -25, Math.floor(Math.random() * (25 - (-25) + 1) ) -25])
        }
    }

    createTextures() {
        this.smallAlgaeAppearance = new CGFappearance(this.scene)
        this.smallAlgaeAppearance.setAmbient(0.14, 0.30, 0.08, 1)
        this.smallAlgaeAppearance.setDiffuse(0.14, 0.30, 0.08, 1)
        this.smallAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.smallAlgaeAppearance.setEmission(0, 0, 0, 1)


        this.mediumAlgaeAppearance = new CGFappearance(this.scene)
        this.mediumAlgaeAppearance.setAmbient(0.21, 0.50, 0.18, 1)
        this.mediumAlgaeAppearance.setDiffuse(0.21, 0.50, 0.18, 1)
        this.mediumAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.mediumAlgaeAppearance.setEmission(0, 0, 0, 1)

        this.bigAlgaeAppearance = new CGFappearance(this.scene)
        this.bigAlgaeAppearance.setAmbient(0.47, 0.67, 0.35, 1)
        this.bigAlgaeAppearance.setDiffuse(0.47, 0.67, 0.35, 1)
        this.bigAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.bigAlgaeAppearance.setEmission(0, 0, 0, 1)

        this.biggerAlgaeAppearance = new CGFappearance(this.scene)
        this.biggerAlgaeAppearance.setAmbient(0.79, 0.87, 0.54, 1)
        this.biggerAlgaeAppearance.setDiffuse(0.79, 0.87, 0.54, 1)
        this.biggerAlgaeAppearance.setSpecular(0.0, 0.0, 0.0, 1)
        this.biggerAlgaeAppearance.setEmission(0, 0, 0, 1)

    }

    update(t){
        this.shader.setUniformsValues({timeFactor: (t % 10000000) * (2 * Math.PI) / 10000, lightPosition: this.scene.lights[0].position})
    }

    display(){

        this.scene.setActiveShader(this.shader)
        
        for(let i = 0; i < this.algae.length; i++){
            this.scene.pushMatrix()
            this.scene.translate(this.algaePos[i][0], 0, this.algaePos[i][1])            
            this.algae[i].display()
            this.scene.popMatrix();
        }

        this.scene.setActiveShaderSimple(this.scene.defaultShader)
    }

    enableNormalViz(){
        this.algae.forEach(algae => algae.enableNormalViz())
    }
    
    disableNormalViz(){
        this.algae.forEach(algae => algae.disableNormalViz())
    }
}