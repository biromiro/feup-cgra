import { MyMovingObject } from '../MyMovingObject.js'
import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../../../lib/CGF.js'
import { MyFish } from './MyFish.js'

/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 */
 export class MyMovingFish extends MyMovingObject {
    constructor(scene, orientationAngle, velocity, position) {

      let fish = new MyFish(scene, 
                            ()=>{return this.velocity},
                            ()=>{return this.rotationLeft}, 
                            ()=>{return this.rotationRight})

      super(scene, fish, orientationAngle, velocity, position)

      super.setMaximumHeight(9.5)
      super.setMinimumHeight(0.5)

      this.fish = fish
    }


    display(){
      super.display()
    }
}