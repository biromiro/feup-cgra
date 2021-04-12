import { CGFobject } from '../lib/CGF.js'
/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
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
    this.velocityOffset = 0.001
    this.rotationOffset = 0.01
    this.maxVelocity = 0.5
    this.friction = 0.005
  }

  display(){
    this.scene.pushMatrix()
    this.scene.translate(this.scene.movingObject.x, 0, this.scene.movingObject.z)
    this.scene.rotate(this.scene.movingObject.orientationAngle, 0, 1, 0)
    this.scene.rotate(Math.PI / 2, 1, 0, 0)

    this.scene.translate(0, -0.5, 0)

    super.display()
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
  }
}
