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
    constructor(scene, orientationAngle, velocity, position, rockSet, nest) {

      let fish = new MyFish(scene, 
                            ()=>{return this.velocity},
                            ()=>{return this.rotationLeft}, 
                            ()=>{return this.rotationRight})

      super(scene, fish, orientationAngle, velocity, position)

      super.setMaximumHeight(9.5)
      super.setMinimumHeight(0.5)
      super.scaleFactor = 0.5

      this.fish = fish
      this.rockSetToFind = rockSet
      this.nest = nest
      this.toCollectRock = false 
      this.collectedOrReleased = false
      // needed because of the jitter caused by a key press,
      // making it catch and release in a short amount of time
      this.pileHeight = 0.1
    }

    update(t){
      if(this.toCollectRock && !this.collectedOrReleased) {
        super.getCaughtObject() !== undefined ? this.releaseRock() : this.catchRock()
        this.collectedOrReleased = true
        this.toCollectRock = false
      }
      this.rockSetToFind.update(t)
      super.update(t)
    }

    getDistance(object1, object2){
      return Math.sqrt(Math.pow(object1.x - object2.x, 2) + Math.pow((object1.y ? object1.y : 0) - (object2.y ? object2.y : 0), 2) + Math.pow(object1.z - object2.z, 2))
    }

    collectRock(){
      this.toCollectRock = true
    }

    collectRockReleaseKey(){
      this.collectedOrReleased = false
      this.toCollectRock = false
    }

    catchRock(){
      if(this.y > this.minHeight ) return
      let minPair = [undefined, Infinity]

      this.rockSetToFind.rocks.forEach(rock => {
        const distance = this.getDistance(this, rock)
        if(minPair[1] > distance) minPair = [rock, distance]
      });

      if(minPair[1] <= 1.5){
        super.setCaughtObject(minPair[0])
      }
    }

    reset(){
      const caughtObject = super.getCaughtObject();
      if(caughtObject)
        [caughtObject.x, caughtObject.y, caughtObject.z] = caughtObject.initialPos
      super.setCaughtObject(undefined)
      super.reset()
    }

    releaseRock(){
      if(this.y > this.minHeight ) return
      const dist =  this.getDistance(this, this.nest)
      console.log(dist, this.nest.radius)
      if(dist > this.nest.radius) return
      console.log("hello")
      const caughtObject = super.getCaughtObject();
      caughtObject.setParabolicThrow([this.nest.x, this.pileHeight, this.nest.z])
      this.pileHeight += this.caughtObject.yDeform
      
      super.setCaughtObject(undefined)
    }

    display(){
      super.display()
    }
}