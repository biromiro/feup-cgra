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
    constructor(scene, orientationAngle, velocity, position, rockSet) {

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
      this.toCollectRock = false 
      this.collectedOrReleased = false
      // needed because of the jitter caused by a key press,
      // making it catch and release in a short amount of time
    }

    update(t){
      if(this.toCollectRock && !this.collectedOrReleased) {
        super.getCaughtObject() !== undefined ? this.releaseRock() : this.catchRock()
        this.collectedOrReleased = true
        this.toCollectRock = false
      }
      super.update(t)
     
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
        console.log(rock.x, rock.y, rock.z);
        const distance = Math.sqrt(Math.pow(this.x - rock.x, 2) + Math.pow(this.y - rock.y, 2) + Math.pow(this.z - rock.z, 2))
        if(minPair[1] > distance) minPair = [rock, distance]
      });

      if(minPair[1] <= 1.5){
        super.setCaughtObject(minPair[0])
      }
    }

    reset(){
      const caughtObject = super.getCaughtObject();
      [caughtObject.x, caughtObject.y, caughtObject.z] = caughtObject.initialPos
      super.setCaughtObject(undefined)
      super.reset()
    }

    releaseRock(){

    }


    display(){
      super.display()
    }
}