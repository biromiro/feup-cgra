import { CGFobject } from '../lib/CGF.js'
/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyMovingObject extends CGFobject {
  constructor(scene, slices, orientationAngle, velocity, position) {
    super(scene)
    this.slices = slices
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
    this.initBuffers()
  }

  initBuffers() {
    this.vertices = []
    this.indices = []
    this.normals = []

    for (let j = 0; j <= 1; j++) {
      let ang = 0
      let alphaAng = (2 * Math.PI) / this.slices - Math.PI / 8
      for (let i = 0; i < this.slices; i++) {
        // All vertices have to be declared for a given face
        // even if they are shared with others, as the normals
        // in each face will be different
        if (i == this.slices - 1) alphaAng = 2 * Math.PI - ang
        let sa = Math.sin(ang)
        let saa = Math.sin(ang + alphaAng)
        let ca = Math.cos(ang)
        let caa = Math.cos(ang + alphaAng)

        if (j == 0) {
          this.vertices.push(caa, 0, -saa)
          this.vertices.push(ca, 0, -sa)
          this.vertices.push(0, 0, 0)
        } else {
          this.vertices.push(0, 2, 0)
          this.vertices.push(ca, 0, -sa)
          this.vertices.push(caa, 0, -saa)
        }

        console.log(
          `{Iteration ${i}: Vertices -> [0,${j},0],[${ca},0,${-sa}],[${caa},0,${-saa}]}\n`
        )

        let normal

        if (j == 0) {
          normal = [0, -1, 0]
        } else {
          // triangle normal computed by cross product of two edges
          normal = [saa - sa, ca * saa - sa * caa, caa - ca]

          // normalization
          let nsize = Math.sqrt(
            normal[0] * normal[0] +
              normal[1] * normal[1] +
              normal[2] * normal[2]
          )
          normal[0] /= nsize
          normal[1] /= nsize
          normal[2] /= nsize
        }

        // push normal once for each vertex of this triangle
        this.normals.push(...normal)
        this.normals.push(...normal)
        this.normals.push(...normal)

        this.indices.push(
          3 * (i + j * this.slices),
          3 * (i + j * this.slices) + 1,
          3 * (i + j * this.slices) + 2
        )
        ang += alphaAng
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES
    this.initGLBuffers()
  }
  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */
  updateBuffers(complexity) {
    this.slices = 3 + Math.round(9 * complexity) //complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers()
    this.initNormalVizBuffers()
  }

  update() {
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
