import { MyAlgae } from './MyAlgae.js';


/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
 export class MyAlgaeSet {
    constructor(scene, slices) {
      this.pillar = new MyPillar(scene, slices)
      this.scene = scene
    }

    display(){
        this.scene.pushMatrix()

        this.scene.translate(6.8, 0, -3.2)

        this.scene.scale(0.5, 1, 0.5)
        
        this.pillar.display()

        this.scene.pushMatrix()

        this.scene.translate(8.5, 0, 2)
        this.pillar.display()

        this.scene.translate(5.7, 0, -22)
        this.pillar.display()

        this.scene.translate(5.7, 0, -22)
        this.pillar.display()

        this.scene.popMatrix()

        this.scene.translate(5.7, 0, -22)
        this.pillar.display()

        this.scene.translate(5.7, 0, -22)
        this.pillar.display()

        this.scene.popMatrix()
    }

    enableNormalViz(){
        this.pillar.enableNormalViz()
        
    }
    
    disableNormalViz(){
        this.pillar.disableNormalViz()
    }
}