import { CGFobject } from '../../lib/CGF.js'
export class MyStackedPyramid extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene)
    this.slices = slices
    this.stacks = stacks
    this.initBuffers()
  }

  getHeight = (stack) => (-2 / this.stacks * stack + 2)

  initBuffers() {
    this.vertices = []
    this.indices = []
    this.normals = []

    let alphaAng = (2 * Math.PI) / this.slices
    let heightVar = 2 / this.stacks


    for (let ang = 0; ang <= this.slices; ang++) {

      let sin = Math.sin(ang * alphaAng)
      let cos = Math.cos(ang * alphaAng)
      let nsin = Math.sin((ang + 1) * alphaAng)
      let ncos = Math.cos((ang + 1) * alphaAng)

      let normal = [nsin - sin, (cos * nsin - sin * ncos), ncos - cos]

      sin = -sin
      nsin = -nsin

      // normalization
      let nsize = Math.sqrt(
        normal[0] * normal[0] +
        normal[1] * normal[1] +
        normal[2] * normal[2]
      )
      normal[0] /= nsize
      normal[1] /= nsize
      normal[2] /= nsize

      for (let height = 0; height <= this.stacks; height++) {
        this.vertices.push(cos * ((height * heightVar) / 2), this.getHeight(height), sin * ((height * heightVar) / 2))
        this.vertices.push(cos * (((height + 1) * heightVar) / 2), this.getHeight(height + 1), sin * (((height + 1) * heightVar) / 2))
        this.vertices.push(ncos * (((height + 1) * heightVar) / 2), this.getHeight(height + 1), nsin * (((height + 1) * heightVar) / 2))

        let vertexNr = this.vertices.length / 3

        this.indices.push(vertexNr - 3, vertexNr - 2, vertexNr - 1)

        this.normals.push(...normal)
        this.normals.push(...normal)
        this.normals.push(...normal)

      }


      for (let height = 1; height <= this.stacks; height++) {
        this.vertices.push(ncos * (((height + 1) * heightVar) / 2), this.getHeight(height + 1), nsin * (((height + 1) * heightVar) / 2))
        this.vertices.push(ncos * ((height * heightVar) / 2), this.getHeight(height), nsin * ((height * heightVar) / 2))
        this.vertices.push(cos * ((height * heightVar) / 2), this.getHeight(height), sin * ((height * heightVar) / 2))


        let vertexNr = this.vertices.length / 3

        this.indices.push(vertexNr - 3, vertexNr - 2, vertexNr - 1)

        this.normals.push(...normal)
        this.normals.push(...normal)
        this.normals.push(...normal)

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

  display() {
    this.scene.pushMatrix()

    this.scene.translate(0, -1, 0)

    super.display()

    this.scene.popMatrix()
  }
}
