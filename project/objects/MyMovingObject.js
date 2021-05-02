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
    this.previousOrientationAngle = 0

    this.x = position[0]
    this.initialx = position[0]
    this.y = position[1]
    this.initialy = position[1]
    this.z = position[2]
    this.initialz = position[2]
    this.velocity = velocity
    this.ascendVelocity = 0
    this.scaleFactor = 1
    this.setControllabeParameters()
    this.rotationLeft = false
    this.rotationRight = false

    this.scene = scene
    this.object = object
  }
  
  setControllabeParameters(){
    this.velocityOffset = 0.001
    this.rotationOffset = 0.01
    this.maxVelocity = 1
    this.friction = 0.005
    this.ascendVelocityOffset = 0.05
    this.maxHeight = 5
    this.minHeight = 0
  }

  display(){
    
    this.scene.pushMatrix()
  
    this.scene.translate(this.x, this.y, this.z)
    this.scene.rotate(this.orientationAngle, 0, 1, 0)

    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor)

    this.object.display()

    this.scene.defaultAppearance.apply()
    this.scene.popMatrix()
  }

  update(t) {
    this.velocity -= this.velocity*this.friction
    this.x += this.velocity * Math.sin(this.orientationAngle)
    this.y += this.ascendVelocity
    this.y = (this.y > this.maxHeight) ? this.maxHeight : (this.y < this.minHeight ? this.minHeight : this.y)
    this.z += this.velocity * Math.cos(this.orientationAngle)
    if(this.previousOrientationAngle == this.orientationAngle){
      this.rotationLeft = false
      this.rotationRight = false
    }
    this.previousOrientationAngle = this.orientationAngle
    if(this.object.update != undefined){
      this.object.update(t)
    }
    this.ascendVelocity = 0
  }

  turn(val) {
    val < 0 ? this.rotationRight = true : this.rotationLeft = true;
    val *= this.rotationOffset
    this.orientationAngle += val
  }

  accelerate(val) {
    val *= this.velocityOffset
    let newVelocity = this.velocity + val
    if(newVelocity < this.maxVelocity) this.velocity += val
    else this.velocity = maxVelocity
  }

  ascend() {
    this.ascendVelocity = this.ascendVelocityOffset
  }

  descend() {
    this.ascendVelocity = -this.ascendVelocityOffset
  }

  reset() {
    this.x = this.initialx
    this.y = this.initialy
    this.z = this.initialz
    this.orientationAngle = 0
    this.setControllabeParameters()
  }

  enableNormalViz(){
    this.object.enableNormalViz()
  }

  disableNormalViz(){
    this.object.disableNormalViz()
  }

  setMaximumHeight(height){
    this.maxHeight = height
  }

  setMinimumHeight(height){
    this.minHeight = height
  }
}
