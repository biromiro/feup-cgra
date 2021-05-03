import { MyPillar } from './MyPillar.js';


/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
 export class MyPillarSet {
    constructor(scene, slices) {
      this.pillar = new MyPillar(scene, slices)
      this.scene = scene
    }

    display(){
        this.scene.pushMatrix()

        this.scene.translate(6, 0, -3)
        this.pillar.display()

        this.scene.pushMatrix()

        this.scene.translate(5.7, 0, 1.5)
        this.pillar.display()

        this.scene.translate(5.7, 0, -22)
        this.pillar.display()

        this.scene.popMatrix()

        this.scene.translate(5.7, 0, -21)
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