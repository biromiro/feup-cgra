import { CGFobject, CGFappearance } from '../../lib/CGF.js'

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 * @orientationAngle - Object facing torwards angle
 * @velocity - Initial velocity
 * @position - Current object position
 */
export class MyMovingObject{
  constructor(scene, object, orientationAngle, velocity, position) {
    this.orientationAngle = orientationAngle
    this.x = position[0]
    this.initialx = position[0]
    this.y = position[1]
    this.initialy = position[1]
    this.z = position[2]
    this.initialz = position[2]
    this.velocity = velocity
    this.scaleFactor = 1
    this.setControllabeParameters()
    
    this.scene = scene
    this.object = object
  }
  
  setControllabeParameters(){
    this.velocityOffset = 0.001
    this.rotationOffset = 0.01
    this.maxVelocity = 0.5
    this.friction = 0.005
  }

  display(){
    
    this.scene.pushMatrix()
  
    this.scene.translate(this.x, 0, this.z)
    this.scene.rotate(this.orientationAngle, 0, 1, 0)

    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor)

    this.object.display()

    this.scene.defaultAppearance.apply()
    this.scene.popMatrix()
  }

  update() {
    console.log(`hello, x = ${this.x}, z = ${this.z}`)
    this.velocity -= this.velocity*this.friction
    this.x += this.velocity * Math.sin(this.orientationAngle)
    this.z += this.velocity * Math.cos(this.orientationAngle)
  }

  turn(val) {
    val *= this.rotationOffset
    this.orientationAngle += val
  }

  accelerate(val) {
    val *= this.velocityOffset
    let newVelocity = this.velocity + val
    if(newVelocity > 0){
      if(newVelocity < this.maxVelocity) this.velocity += val
      else this.velocity = maxVelocity
    } else { this.velocity = 0 }
  }

  reset() {
    this.x = this.initialx
    this.y = this.initialy
    this.z = this.initialz
    this.orientationAngle = 0
    this.setControllabeParameters()
  }
}
