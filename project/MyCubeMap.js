import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js'
import { MyQuad } from './MyQuad.js'

/**
 * MyUnitQuadCube
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyCubeMap extends CGFobject {
  constructor(
    scene,
  ) {
    super(scene)
    this.quad = new MyQuad(scene)
  
    //------Cube Material
    this.cubeMaterial = new CGFappearance(scene)
    this.cubeMaterial.setAmbient(0.1, 0.1, 0.1, 1)
    this.cubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1)
    this.cubeMaterial.setSpecular(0.1, 0.1, 0.1, 1)
    this.cubeMaterial.setShininess(10.0)
    //------
  }

  setTexture(top,front,right,back,left,bottom) {
    this.topTexture = top
    this.frontTexture = front
    this.rightTexture = right
    this.backTexture = back
    this.leftTexture = left
    this.bottomTexture = bottom
  }

  display() {

    this.scene.pushMatrix()

    this.scene.scale(100, 100, 100)

    this.cubeMaterial.apply()

    //main square

    this.scene.pushMatrix()

    this.scene.translate(0, 0, 0.5)

    this.cubeMaterial.setTexture(this.frontTexture)

    this.cubeMaterial.apply()

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    )

    this.quad.display()

    this.scene.popMatrix()

    this.scene.pushMatrix()

    this.scene.rotate(Math.PI, 0, 1, 0)

    this.scene.translate(0, 0, 0.5)

    this.cubeMaterial.setTexture(this.backTexture)

    this.cubeMaterial.apply()

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    )

    this.quad.display()

    this.scene.popMatrix()

    this.scene.pushMatrix()

    this.scene.pushMatrix()

    this.scene.translate(0, -0.5, 0)

    this.scene.rotate(Math.PI / 2, 1, 0, 0)

    this.cubeMaterial.setTexture(this.bottomTexture)

    this.cubeMaterial.apply()

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    )

    this.quad.display()

    this.scene.popMatrix()

    this.scene.pushMatrix()

    this.scene.translate(0, 0.5, 0)

    this.scene.rotate(Math.PI / 2, -1, 0, 0)

    this.cubeMaterial.setTexture(this.topTexture)

    this.cubeMaterial.apply()

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    )

    this.quad.display()

    this.scene.popMatrix()

    this.scene.popMatrix()

    this.scene.pushMatrix()

    this.scene.pushMatrix()

    this.scene.translate(-0.5, 0, 0)

    this.scene.rotate(Math.PI / 2, 0, -1, 0)

    this.cubeMaterial.setTexture(this.leftTexture)

    this.cubeMaterial.apply()

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    )

    this.quad.display()

    this.scene.popMatrix()

    this.scene.pushMatrix()

    this.scene.translate(0.5, 0, 0)

    this.scene.rotate(Math.PI / 2, 0, 1, 0)

    this.cubeMaterial.setTexture(this.rightTexture)

    this.cubeMaterial.apply()

    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    )

    this.quad.display()

    this.scene.popMatrix()

    this.scene.popMatrix()

    this.scene.popMatrix()
  }
}
