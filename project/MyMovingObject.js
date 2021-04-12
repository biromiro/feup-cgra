import { CGFobject, CGFappearance } from '../lib/CGF.js'
/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 * @orientationAngle - Object facing torwards angle
 * @velocity - Initial velocity
 * @position - Current object position
 */
export class MyMovingObject extends CGFobject {
  constructor(scene, orientationAngle, velocity, position) {
    super(scene)
    this.orientationAngle = orientationAngle
    this.x = position[0]
    this.initialx = position[0]
    this.y = position[1]
    this.initialy = position[0]
    this.z = position[2]
    this.initialz = position[0]
    this.coordinates = position
    this.initialCoordinates = position
    console.log(`x = ${this.x}, z = ${this.z}`)
    this.velocity = velocity
    this.setControllabeParameters()

    this.movingObjectAppearance = new CGFappearance(scene)
    this.movingObjectAppearance.setAmbient(0.3, 0.3, 0.3, 1)
    this.movingObjectAppearance.setDiffuse(0.7, 0.7, 0.7, 1)
    this.movingObjectAppearance.setSpecular(0.0, 0.0, 0.0, 1)
    this.movingObjectAppearance.setShininess(120)
  }
  
  setControllabeParameters(){
    this.velocityOffset = 0.001
    this.rotationOffset = 0.01
    this.maxVelocity = 0.5
    this.friction = 0.005
  }

  display(){
    
    this.scene.pushMatrix()
    
    this.movingObjectAppearance.apply()
    
    this.scene.translate(this.scene.movingObject.x, 0, this.scene.movingObject.z)
    this.scene.rotate(this.scene.movingObject.orientationAngle, 0, 1, 0)
    this.scene.rotate(Math.PI / 2, 1, 0, 0)

    this.scene.translate(0, -0.5, 0)

    super.display()

    this.scene.defaultAppearance.apply()
    this.scene.popMatrix()
  }

  update() {
    this.velocity -= this.velocity*this.friction
    this.x += this.velocity * Math.sin(this.orientationAngle)
    this.z += this.velocity * Math.cos(this.orientationAngle)
    console.log(`x = ${this.x}, z = ${this.z}, velocity = ${this.velocity}`)
  }

  turn(val) {
    val *= this.rotationOffset
    this.orientationAngle -= val
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
